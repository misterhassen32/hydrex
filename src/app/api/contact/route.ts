import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const contactSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Adresse email invalide'),
  telephone: z.string().min(1, 'Le numéro de téléphone est requis'),
  prestation: z.string().min(1, 'Veuillez sélectionner une prestation'),
  message: z.string().min(1, 'Le message est requis'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

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

    // Attempt to send email notification
    try {
      await sendEmailNotification(validatedData)
    } catch (emailError) {
      // Log email error but don't fail the request - data is saved in DB
      console.error('Email notification failed:', emailError)
    }

    return NextResponse.json(
      { success: true, id: submission.id },
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
 * Send email notification using the LLM skill to compose and notify
 * In production, you would use a proper email service (SendGrid, Resend, etc.)
 */
async function sendEmailNotification(data: z.infer<typeof contactSchema>) {
  // Email content that would be sent to misterhassen32@gmail.com
  const emailContent = {
    to: 'misterhassen32@gmail.com',
    subject: `Nouvelle demande de devis - ${data.prestation} - ${data.nom}`,
    body: `
      Nouvelle demande de devis reçue :

      Nom : ${data.nom}
      Email : ${data.email}
      Téléphone : ${data.telephone}
      Prestation souhaitée : ${data.prestation}
      
      Message :
      ${data.message}

      ---
      Envoyé depuis le site HYDREX
    `,
  }

  // Log the email content (in production, use a real email service)
  console.log('📧 Email notification:', JSON.stringify(emailContent, null, 2))

  // In production, replace this with actual email sending:
  // await sendEmail(emailContent)
}
