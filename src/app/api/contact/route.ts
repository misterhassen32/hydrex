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

const WEB3FORMS_KEY = '8275c86a-b55b-40a9-b268-89fbb5154708'

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
    await db.contactSubmission.create({
      data: {
        nom: validatedData.nom,
        email: validatedData.email,
        telephone: validatedData.telephone,
        prestation: validatedData.prestation,
        message: validatedData.message,
      },
    })

    // Send email via Web3Forms API
    // Web3Forms is designed for client-side use, but we proxy the request
    // adding browser-like headers to maximize compatibility
    try {
      const web3Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Origin': request.headers.get('origin') || 'https://hydrex.fr',
          'Referer': request.headers.get('referer') || 'https://hydrex.fr/',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nouveau Devis HYDREX - ${prestationLabel}`,
          from_name: 'Site Web HYDREX',
          nom: validatedData.nom,
          email: validatedData.email,
          telephone: validatedData.telephone,
          prestation: prestationLabel,
          message: validatedData.message,
        }),
      })

      const contentType = web3Response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        const web3Result = await web3Response.json()
        if (web3Result.success) {
          console.log('📧 Email envoyé via Web3Forms proxy ✓')
          return NextResponse.json(
            { success: true, emailSent: true },
            { status: 200 }
          )
        }
        console.error('📧 Web3Forms refusé:', web3Result.message)
      } else {
        // Got HTML (Cloudflare challenge) — Web3Forms blocked server-side
        console.error('📧 Web3Forms: reçu HTML au lieu de JSON (bloqué par Cloudflare)')
      }

      return NextResponse.json(
        { success: false, emailSent: false, error: 'Service email temporairement indisponible' },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('📧 Web3Forms erreur:', emailError)
      return NextResponse.json(
        { success: false, emailSent: false, error: 'Erreur envoi email' },
        { status: 200 }
      )
    }
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
