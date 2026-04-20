'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Shield, ThumbsUp, Building2 } from 'lucide-react'

const stats = [
  {
    icon: Clock,
    value: '24/7',
    label: 'Disponibilité',
  },
  {
    icon: Shield,
    value: '<2h',
    label: "Temps d'intervention",
  },
  {
    icon: ThumbsUp,
    value: '100%',
    label: 'Satisfaction',
  },
]

export default function Professionals() {
  return (
    <section id="professionnels" className="py-20 md:py-28 bg-[#f5f9ff] relative overflow-hidden">
      {/* Kitchen detail background - subtle blurred */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08]"
        style={{
          backgroundImage: "url('/pro-kitchen-detail.png')",
          filter: 'blur(2px)',
        }}
      />
      {/* Solid overlay */}
      <div className="absolute inset-0 bg-[#f5f9ff]/95" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text — left on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#1976d2] font-semibold text-sm uppercase tracking-wider mb-3"
            >
              Cible B2B
            </motion.p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a2540] mb-2">
              Professionnels &amp; Restaurants
            </h2>
            <p className="text-xl text-[#0d47a1] font-medium mb-6">
              Une réactivité absolue pour votre activité
            </p>

            <div className="space-y-4 text-[#0a2540]/80 leading-relaxed mb-10">
              <p>
                HYDREX accompagne les professionnels avec des programmes de{' '}
                <strong className="text-[#0a2540]">maintenance préventive planifiée</strong>,
                adaptés au rythme de votre activité. Nous anticipons les problèmes
                avant qu&apos;ils ne surviennent.
              </p>
              <p>
                Spécialistes de la <strong className="text-[#0a2540]">gestion des graisses et des fosses</strong>,
                nous assurons le bon fonctionnement de vos installations sanitaires et
                de vos réseaux d&apos;évacuation, conformément aux normes en vigueur.
              </p>
              <p>
                Notre <strong className="text-[#0a2540]">réactivité absolue</strong> et nos protocoles préventifs limitent drastiquement les risques d&apos;immobilisation de votre établissement. Et grâce à nos{' '}
                <strong className="text-[#0a2540]">contrats d&apos;entretien personnalisés</strong>,
                vous bénéficiez d&apos;un suivi sur mesure à tarif préférentiel.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="grid grid-cols-3 gap-4 mb-10"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.12 }}
                  className="bg-white rounded-xl p-4 sm:p-5 text-center shadow-md border border-[#e3f2fd]"
                >
                  <stat.icon className="w-6 h-6 text-[#1976d2] mx-auto mb-2" />
                  <p className="text-2xl sm:text-3xl font-bold text-[#0a2540]">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-[#0a2540]/70 font-medium mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-[#0d47a1] hover:bg-[#0a2540] text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-[#0d47a1]/20"
            >
              <Building2 className="w-5 h-5" />
              Obtenir un contrat d&apos;entretien
            </motion.a>
          </motion.div>

          {/* Image — right on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/pro-kitchen-detail.png"
                alt="Cuisine de restaurant professionnel entretenue par HYDREX"
                width={640}
                height={480}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 right-4 bg-[#0a2540]/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#42a5f5]" />
                <span className="text-sm font-semibold">Intervention &lt; 2h</span>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#e3f2fd] rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
