'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle, Camera } from 'lucide-react'

const features = [
  'Caméra HD 4K',
  'Rapport vidéo complet',
  'Diagnostic en temps réel',
  'Conseils de réparation',
]

export default function Inspection() {
  return (
    <section id="inspection-camera" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image — left on desktop, second on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="order-2 lg:order-1 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/inspection-camera.png"
                alt="Inspection caméra haute définition HYDREX"
                width={640}
                height={480}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay badge */}
              <div className="absolute top-4 left-4 bg-[#0a2540]/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#42a5f5]" />
                <span className="text-sm font-semibold">Technologie 4K</span>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#e3f2fd] rounded-2xl -z-10" />
          </motion.div>

          {/* Text content — right on desktop, first on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#1976d2] font-semibold text-sm uppercase tracking-wider mb-3"
            >
              Focus Technique
            </motion.p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a2540] mb-2">
              Inspection Caméra
            </h2>
            <p className="text-xl text-[#0d47a1] font-medium mb-6">
              Diagnostic de précision
            </p>

            <div className="space-y-4 text-[#0a2540]/80 leading-relaxed mb-8">
              <p>
                Notre service d&apos;inspection par caméra offre un{' '}
                <strong className="text-[#0a2540]">diagnostic de précision avant intervention</strong>,
                permettant d&apos;identifier exactement la nature et la localisation du problème
                sans travaux inutiles.
              </p>
              <p>
                Grâce au <strong className="text-[#0a2540]">rendu visuel HD</strong>, vous bénéficiez
                d&apos;un contrôle complet de l&apos;état de vos canalisations. Chaque inspection donne
                lieu à des <strong className="text-[#0a2540]">rapports détaillés avec vidéos et photos</strong>,
                parfaits pour un suivi dans le temps.
              </p>
              <p>
                Notre technologie permet la{' '}
                <strong className="text-[#0a2540]">détection de fissures, racines, effondrements</strong>{' '}
                et tout autre défaut structurel avec une précision inégalée.
              </p>
            </div>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#1976d2] flex-shrink-0" />
                  <span className="text-[#0a2540] font-medium">{feature}</span>
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
              <Camera className="w-5 h-5" />
              Demander une inspection
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
