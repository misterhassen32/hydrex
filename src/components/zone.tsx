'use client'

import { motion } from 'framer-motion'
import { MapPin, Globe } from 'lucide-react'

const departments = [
  { name: 'Hérault', number: '34' },
  { name: 'Gard', number: '30' },
  { name: 'Vaucluse', number: '84' },
  { name: 'Aude', number: '11' },
  { name: 'Pyrénées Orientales', number: '66' },
  { name: 'Bouches du Rhône', number: '13' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Zone() {
  return (
    <section id="zone-intervention" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#1976d2] font-semibold text-sm uppercase tracking-wider mb-3"
          >
            Couverture géographique
          </motion.p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a2540] mb-3">
            Zone d&apos;Intervention
          </h2>
          <p className="text-xl text-[#0d47a1] font-medium max-w-2xl mx-auto">
            Une présence locale, une couverture régionale
          </p>
        </motion.div>

        {/* Department cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
        >
          {departments.map((dept) => (
            <motion.div
              key={dept.number}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(10,37,64,0.12)' }}
              className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-md border border-[#e3f2fd] cursor-default transition-colors hover:border-[#42a5f5]/40"
            >
              <div className="w-12 h-12 rounded-lg bg-[#e3f2fd] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#1976d2]" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#0a2540]">{dept.name}</p>
                <p className="text-sm text-[#0a2540]/60 font-medium">
                  Département {dept.number}
                </p>
              </div>
              <span className="ml-auto text-2xl font-bold text-[#42a5f5]/40">
                {dept.number}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Special mention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white rounded-xl px-6 py-4 shadow-md border border-[#e3f2fd]">
            <Globe className="w-6 h-6 text-[#1976d2] flex-shrink-0" />
            <p className="text-[#0a2540]/80 font-medium">
              Intervention sur l&apos;ensemble du territoire français pour les besoins spécifiques.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
