import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { db } from '@/lib/db'

const contactSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Adresse email invalide'),
  telephone: z.string().min(1, 'Le numéro de téléphone est requis'),
  prestation: z.string().min(1, 'Veuillez sélectionner une prestation'),
  message: z.string().min(1, 'Le message est requis'),
})

const DESTINATION_EMAIL = 'misterhassen32@gmail.com'
const GMAIL_USER = 'misterhassen32@gmail.com'
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || ''

const prestationLabels: Record<string, string> = {
  debouchage: 'Débouchage',
  hydrocurage: 'Hydrocurage',
  'curage-eu-ep': 'Curage EU/EP',
  'inspection-camera': 'Inspection caméra',
  pompage: 'Pompage',
  autre: 'Autre',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)
    const prestationLabel = prestationLabels[validatedData.prestation] || validatedData.prestation

    // Save to database
    const submission = await db.contactSubmission.create({
      data: {
        nom: validatedData.nom,
        email: validatedData.email,
        telephone: validatedData.telephone,
        prestation: validatedData.prestation,
        message: validatedData.message,
      },
    })

    // Try Gmail SMTP (works if GMAIL_APP_PASSWORD env var is configured)
    if (GMAIL_APP_PASSWORD) {
      const smtpSent = await sendViaGmailSMTP(validatedData, prestationLabel)
      if (smtpSent) {
        return NextResponse.json(
          { success: true, id: submission.id, emailSent: true },
          { status: 201 }
        )
      }
    }

    // SMTP not available — tell client to use FormSubmit from browser
    return NextResponse.json(
      {
        success: true,
        id: submission.id,
        emailSent: false,
        prestationLabel,
        message: 'Donnée sauvegardée. Envoi email via le navigateur.',
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}

/**
 * Gmail SMTP — requires GMAIL_APP_PASSWORD environment variable
 * Setup: Google Account → Security → 2-Step Verification → App passwords
 */
async function sendViaGmailSMTP(data: z.infer<typeof contactSchema>, prestationLabel: string): Promise<boolean> {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Site HYDREX" <${GMAIL_USER}>`,
      to: DESTINATION_EMAIL,
      replyTo: data.email,
      subject: `🔹 Nouvelle demande de devis — ${prestationLabel} — ${data.nom}`,
      html: buildEmailHTML(data, prestationLabel),
    })

    console.log('📧 Email envoyé via Gmail SMTP ✓')
    return true
  } catch (error) {
    console.error('📧 Gmail SMTP échoué:', error)
    return false
  }
}

function buildEmailHTML(data: z.infer<typeof contactSchema>, prestationLabel: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #0a2540, #0d47a1); padding: 24px 32px;">
        <h1 style="color: white; margin: 0; font-size: 22px;">Nouvelle demande de devis</h1>
        <p style="color: #42a5f5; margin: 4px 0 0; font-size: 14px;">Site HYDREX — Formulaire de contact</p>
      </div>
      <div style="padding: 28px 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; width: 140px;">👤 Nom</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 15px; font-weight: 600;">${data.nom}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">📧 Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0d47a1; font-size: 15px; font-weight: 600;"><a href="mailto:${data.email}" style="color: #0d47a1;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">📱 Téléphone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 15px; font-weight: 600;"><a href="tel:${data.telephone}" style="color: #0f172a;">${data.telephone}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">🔧 Prestation</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 15px; font-weight: 600;">${prestationLabel}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; background: white; border-radius: 8px; padding: 16px 20px; border: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;">Message</p>
          <p style="color: #0f172a; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
      <div style="background: #f1f5f9; padding: 16px 32px; text-align: center;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">Envoyé depuis le formulaire de contact HYDREX</p>
      </div>
    </div>
  `
}
