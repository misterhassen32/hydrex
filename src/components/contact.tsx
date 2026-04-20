'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, Clock, Loader2, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const contactSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Adresse email invalide'),
  telephone: z.string().min(1, 'Le numéro de téléphone est requis'),
  prestation: z.string().min(1, 'Veuillez sélectionner une prestation'),
  message: z.string().min(1, 'Le message est requis'),
})

type ContactFormValues = z.infer<typeof contactSchema>

const prestationOptions = [
  { value: 'debouchage', label: 'Débouchage' },
  { value: 'hydrocurage', label: 'Hydrocurage' },
  { value: 'curage-eu-ep', label: 'Curage EU/EP' },
  { value: 'inspection-camera', label: 'Inspection caméra' },
  { value: 'pompage', label: 'Pompage' },
  { value: 'autre', label: 'Autre' },
]

const contactInfo = [
  {
    icon: Phone,
    label: 'Téléphone',
    value: '07 77 72 05 12',
    href: 'tel:+33777720512',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@hydrex.fr',
    href: 'mailto:contact@hydrex.fr',
  },
  {
    icon: MapPin,
    label: "Zone d'intervention",
    value: 'Sud de la France',
    href: null,
  },
  {
    icon: Clock,
    label: 'Disponibilité',
    value: '24h/24, 7j/7',
    href: null,
  },
]

const DESTINATION_EMAIL = 'misterhassen32@gmail.com'

function buildMailtoLink(data: ContactFormValues): string {
  const prestationLabel = prestationOptions.find(o => o.value === data.prestation)?.label || data.prestation
  const subject = encodeURIComponent(`Demande de devis - ${prestationLabel} - ${data.nom}`)
  const body = encodeURIComponent(
    `Nouvelle demande de devis :\n\n` +
    `Nom : ${data.nom}\n` +
    `Email : ${data.email}\n` +
    `Téléphone : ${data.telephone}\n` +
    `Prestation souhaitée : ${prestationLabel}\n\n` +
    `Message :\n${data.message}\n\n` +
    `---\nEnvoyé depuis le site HYDREX`
  )
  return `mailto:${DESTINATION_EMAIL}?subject=${subject}&body=${body}`
}

/**
 * Send email directly from the browser via FormSubmit.co
 * This is a client-side request, so it bypasses server-side Cloudflare blocks
 * First submission requires email confirmation (one-time)
 */
async function sendViaFormSubmit(data: ContactFormValues): Promise<boolean> {
  try {
    const prestationLabel = prestationOptions.find(o => o.value === data.prestation)?.label || data.prestation

    const formData = new FormData()
    formData.append('nom', data.nom)
    formData.append('email', data.email)
    formData.append('telephone', data.telephone)
    formData.append('prestation', prestationLabel)
    formData.append('message', data.message)
    formData.append('_subject', `🔹 Nouvelle demande de devis — ${prestationLabel} — ${data.nom}`)
    formData.append('_template', 'table')
    formData.append('_captcha', 'false')

    const response = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    })

    if (response.ok) {
      const result = await response.json()
      return result.success === true || result.message === 'Email was sent successfully'
    }
    return false
  } catch {
    return false
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nom: '',
      email: '',
      telephone: '',
      prestation: '',
      message: '',
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.emailSent) {
          // Email was sent via SMTP — fully automatic
          toast.success('Demande envoyée avec succès !', {
            description: 'Nous vous recontacterons dans les plus brefs délais.',
          })
          form.reset()
        } else {
          // Data saved but email couldn't be sent — fall back to mailto
          const mailtoLink = buildMailtoLink(data)
          window.location.href = mailtoLink
          toast.info('Votre client email va s\'ouvrir...', {
            description: 'Vérifiez que l\'email est bien pré-rempli et envoyez-le pour finaliser votre demande.',
          })
          form.reset()
        }
      } else {
        // API error — fall back to mailto
        const mailtoLink = buildMailtoLink(data)
        window.location.href = mailtoLink
        toast.info('Votre client email va s\'ouvrir...', {
          description: 'Vérifiez que l\'email est bien pré-rempli et envoyez-le pour finaliser votre demande.',
        })
        form.reset()
      }
    } catch {
      // Network error — fall back to mailto
      const mailtoLink = buildMailtoLink(data)
      window.location.href = mailtoLink
      toast.info('Votre client email va s\'ouvrir...', {
        description: 'Vérifiez que l\'email est bien pré-rempli et envoyez-le pour finaliser votre demande.',
        })
      form.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Background image with high transparency */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]"
        style={{ backgroundImage: "url('/water-tech-bg.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f9ff] via-white to-[#f0f4ff]" />

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-hydrex-deep mb-4">
            Contactez-nous
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Demande de devis gratuit et sans engagement
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid lg:grid-cols-5 gap-10 lg:gap-12"
        >
          {/* Form - 3 columns */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-hydrex-light/40 overflow-hidden">
              {/* Gradient accent bar on the left */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-hydrex-ocean via-hydrex-azur to-hydrex-sky rounded-l-2xl" />

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pl-2">
                  {/* Nom */}
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-hydrex-deep font-medium">
                          Nom <span className="text-hydrex-urgent">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Votre nom complet"
                            className="h-11 border-hydrex-light/80 focus:border-hydrex-azur focus:ring-hydrex-azur/20 shadow-sm transition-shadow focus:shadow-md"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email & Téléphone - 2 columns */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-hydrex-deep font-medium">
                            Email <span className="text-hydrex-urgent">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="votre@email.fr"
                              className="h-11 border-hydrex-light/80 focus:border-hydrex-azur focus:ring-hydrex-azur/20 shadow-sm transition-shadow focus:shadow-md"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="telephone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-hydrex-deep font-medium">
                            Téléphone <span className="text-hydrex-urgent">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="06 00 00 00 00"
                              className="h-11 border-hydrex-light/80 focus:border-hydrex-azur focus:ring-hydrex-azur/20 shadow-sm transition-shadow focus:shadow-md"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Prestation Select */}
                  <FormField
                    control={form.control}
                    name="prestation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-hydrex-deep font-medium">
                          Sélection de la prestation <span className="text-hydrex-urgent">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 w-full border-hydrex-light/80 focus:border-hydrex-azur focus:ring-hydrex-azur/20 shadow-sm transition-shadow focus:shadow-md">
                              <SelectValue placeholder="Choisissez une prestation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {prestationOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-hydrex-deep font-medium">
                          Message <span className="text-hydrex-urgent">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Décrivez votre besoin..."
                            rows={5}
                            className="border-hydrex-light/80 focus:border-hydrex-azur focus:ring-hydrex-azur/20 resize-none shadow-sm transition-shadow focus:shadow-md"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit - Premium gradient button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-hydrex-ocean to-hydrex-azur hover:from-hydrex-azur hover:to-hydrex-ocean text-white font-semibold text-base transition-all duration-300 rounded-lg shadow-lg shadow-hydrex-ocean/25 hover:shadow-xl hover:shadow-hydrex-azur/30 hover:scale-[1.01] active:scale-[0.99] group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        Envoyer ma demande
                        <ChevronRight className="ml-1 h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>

          {/* Contact Info - 2 columns */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-hydrex-deep rounded-2xl shadow-xl p-6 sm:p-8 text-white h-full flex flex-col justify-between border border-white/5">
              <div>
                <h3 className="text-2xl font-bold mb-2">Nos coordonnées</h3>
                <p className="text-white/70 mb-8">
                  Une équipe à votre écoute pour toute demande d&apos;information ou d&apos;intervention.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-hydrex-ocean/40 flex items-center justify-center">
                        <info.icon className="h-5 w-5 text-hydrex-sky" />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm font-medium">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-white font-semibold hover:text-hydrex-sky transition-colors duration-200"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white font-semibold">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency CTA */}
              <div className="mt-10 p-5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-hydrex-sky font-semibold text-sm mb-1">Urgence ?</p>
                <p className="text-white/80 text-sm mb-3">
                  Intervention rapide 24h/24, 7j/7 pour tous vos problèmes d&apos;assainissement.
                </p>
                <a
                  href="tel:+33777720512"
                  className="inline-flex items-center gap-2 bg-hydrex-urgent hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 pulse-urgent"
                >
                  <Phone className="h-4 w-4" />
                  Appeler maintenant
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
