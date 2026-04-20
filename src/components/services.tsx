'use client'

import { motion } from 'framer-motion'
import { Droplets, Gauge, Waves, Camera, Truck } from 'lucide-react'

const services = [
  {
    icon: Droplets,
    title: 'Débouchage et nettoyage de canalisations',
    description:
      'Intervention rapide pour déboucher et nettoyer vos canalisations. Nous éliminons les obstructions les plus tenaces et restaurons un écoulement optimal, quel que soit le diamètre ou le type de réseau.',
    image: '/svc-debouchage.png',
  },
  {
    icon: Gauge,
    title: 'Hydrocurage haute pression',
    description:
      'Nettoyage en profondeur par camion haute pression jusqu\'à 200 bars. L\'hydrocurage élimine tartre, graisses, boues et racines pour redonner toute sa capacité à vos canalisations.',
    image: '/svc-hydrocurage.png',
  },
  {
    icon: Waves,
    title: 'Curage réseaux EU/EP',
    description:
      'Curage spécialisé des réseaux d\'eaux usées (EU) et eaux pluviales (EP). Nous assurons l\'entretien complet de vos collecteurs, regard et ouvrages pour prévenir les inondations et les pollutions.',
    image: '/svc-curage.png',
  },
  {
    icon: Camera,
    title: 'Inspection caméra',
    description:
      'Diagnostic de précision par inspection vidéo de vos canalisations. Nos caméras HD repèrent fissures, déformations et intrusions. Un rapport vidéo détaillé vous est remis après chaque intervention.',
    image: '/pipe-inspection-cam.png',
  },
  {
    icon: Truck,
    title: 'Pompage',
    description:
      'Service de pompage complet : fosses septiques, bacs à graisses, puisards et regards. Vidange, curage et traitement des effluents dans le respect des normes environnementales en vigueur.',
    image: '/svc-pompage.png',
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
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: '#0a1628' }}
    >
      {/* Immersive Section Background Image */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.07]"
        style={{ backgroundImage: "url('/water-tech-bg.png')" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            style={{ color: '#90caf9' }}
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
            className="mx-auto mt-6 max-w-2xl text-base text-blue-200/70 md:text-lg"
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
                <div className="group relative h-full cursor-default overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-125"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 transition-all duration-500 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/20" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center px-6 py-10 text-center">
                    {/* Icon Circle - color inversion on hover */}
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#1976d2] transition-all duration-500 group-hover:bg-white">
                      <Icon
                        className="h-8 w-8 text-white transition-all duration-500 group-hover:text-[#1976d2]"
                        strokeWidth={1.8}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-lg font-bold leading-snug text-white md:text-xl">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-blue-100/80 md:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
