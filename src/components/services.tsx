'use client'

import { motion } from 'framer-motion'
import { Droplets, Gauge, Waves, Camera, Container } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const services = [
  {
    icon: Droplets,
    title: 'Débouchage et nettoyage de canalisations',
    description:
      'Intervention rapide pour déboucher et nettoyer vos canalisations. Nous éliminons les obstructions les plus tenaces et restaurons un écoulement optimal, quel que soit le diamètre ou le type de réseau.',
  },
  {
    icon: Gauge,
    title: 'Hydrocurage haute pression',
    description:
      'Nettoyage en profondeur par camion haute pression jusqu\'à 200 bars. L\'hydrocurage élimine tartre, graisses, boues et racines pour redonner toute sa capacité à vos canalisations.',
  },
  {
    icon: Waves,
    title: 'Curage réseaux EU/EP',
    description:
      'Curage spécialisé des réseaux d\'eaux usées (EU) et eaux pluviales (EP). Nous assurons l\'entretien complet de vos collecteurs, regard et ouvrages pour prévenir les inondations et les pollutions.',
  },
  {
    icon: Camera,
    title: 'Inspection caméra',
    description:
      'Diagnostic de précision par inspection vidéo de vos canalisations. Nos caméras HD repèrent fissures, déformations et intrusions. Un rapport vidéo détaillé vous est remis après chaque intervention.',
  },
  {
    icon: Container,
    title: 'Pompage',
    description:
      'Service de pompage complet : fosses septiques, bacs à graisses, puisards et regards. Vidange, curage et traitement des effluents dans le respect des normes environnementales en vigueur.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export function Services() {
  return (
    <section
      id="prestations"
      className="py-20 md:py-28"
      style={{ backgroundColor: '#f5f9ff' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            style={{ color: '#0d47a1' }}
          >
            Nos Prestations
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 h-1 w-20 origin-center rounded-full"
            style={{ backgroundColor: '#1976d2' }}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
          >
            Des solutions professionnelles pour l&apos;entretien et la maintenance
            de vos réseaux d&apos;assainissement.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div key={service.title} variants={cardVariants}>
                <Card
                  className="group relative h-full cursor-default overflow-hidden border border-white/60 bg-white/70 py-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/80 hover:bg-white/90 hover:shadow-xl hover:shadow-[#1976d2]/10"
                >
                  <CardContent className="flex flex-col items-center text-center">
                    {/* Icon Circle */}
                    <div
                      className="mb-5 flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: '#e3f2fd' }}
                    >
                      <Icon
                        className="h-8 w-8"
                        style={{ color: '#1976d2' }}
                        strokeWidth={1.8}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className="mb-3 text-lg font-bold leading-snug"
                      style={{ color: '#0d47a1' }}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
