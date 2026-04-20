'use client'

import { motion } from 'framer-motion'
import { Globe, Phone, Clock, Shield, Truck, MapPin } from 'lucide-react'
import { useState } from 'react'

// Departments positioned on the real France map image
// Coordinates are percentages relative to the map image container
const departments = [
  {
    number: '66',
    name: 'Pyrénées-Orientales',
    capital: 'Perpignan',
    left: 56,
    top: 84,
  },
  {
    number: '11',
    name: 'Aude',
    capital: 'Carcassonne',
    left: 57,
    top: 77,
  },
  {
    number: '34',
    name: 'Hérault',
    capital: 'Montpellier',
    left: 62,
    top: 79,
  },
  {
    number: '30',
    name: 'Gard',
    capital: 'Nîmes',
    left: 65,
    top: 75,
  },
  {
    number: '84',
    name: 'Vaucluse',
    capital: 'Avignon',
    left: 67,
    top: 70,
  },
  {
    number: '13',
    name: 'Bouches-du-Rhône',
    capital: 'Marseille',
    left: 69,
    top: 78,
  },
]

export default function Zone() {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null)
  const hoveredInfo = departments.find(d => d.number === hoveredDept)

  return (
    <section id="zone-intervention" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.05]"
        style={{ backgroundImage: "url('/water-tech-bg.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f9ff] via-white to-[#f0f4ff]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Une présence locale, une couverture nationale
          </p>
        </motion.div>

        {/* Map + Text layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* France Map with department overlays */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="rounded-2xl p-4 sm:p-6 md:p-8">
              {/* Map container — no border, clean */}
              <div className="relative w-full aspect-[449/506]">
                {/* Real France map image — with CSS filter to soften/remove the black outline */}
                <img
                  src="/france-map.png"
                  alt="Carte de France"
                  className="w-full h-auto select-none opacity-50 brightness-[2] contrast-[0.6] saturate-0"
                  draggable={false}
                />

                {/* Subtle overlay tint */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e3f2fd]/40 to-[#bbdefb]/20 rounded-lg pointer-events-none" />

                {/* Department markers overlay */}
                {departments.map((dept) => {
                  const isHovered = hoveredDept === dept.number
                  return (
                    <div
                      key={dept.number}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${dept.left}%`,
                        top: `${dept.top}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onMouseEnter={() => setHoveredDept(dept.number)}
                      onMouseLeave={() => setHoveredDept(null)}
                    >
                      {/* Subtle pulse ring — always visible */}
                      <div
                        className={`absolute rounded-full transition-all duration-500 ease-out ${
                          isHovered
                            ? 'bg-[#42a5f5]/20 scale-[3.5]'
                            : 'bg-[#1976d2]/10 scale-[2]'
                        }`}
                        style={{
                          width: '10px',
                          height: '10px',
                          top: '50%',
                          left: '50%',
                          marginTop: '-5px',
                          marginLeft: '-5px',
                        }}
                      />

                      {/* Main marker dot — small, grows on hover */}
                      <div
                        className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
                          isHovered
                            ? 'w-9 h-9 bg-[#42a5f5] shadow-lg shadow-[#42a5f5]/40 scale-110'
                            : 'w-6 h-6 bg-[#1976d2] shadow-md shadow-[#1976d2]/25'
                        }`}
                      >
                        <span
                          className={`text-white font-bold select-none transition-all duration-300 ${
                            isHovered ? 'text-[11px]' : 'text-[9px]'
                          }`}
                        >
                          {dept.number}
                        </span>
                      </div>

                      {/* Tooltip on hover */}
                      {isHovered && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-20 pointer-events-none">
                          <div className="bg-[#0a2540]/95 backdrop-blur-sm text-white rounded-lg px-3.5 py-2 shadow-xl whitespace-nowrap border border-white/10">
                            <p className="font-bold text-sm">
                              {dept.number} — {dept.name}
                            </p>
                            <p className="text-[#42a5f5] text-xs font-medium">
                              {dept.capital}
                            </p>
                          </div>
                          {/* Tooltip arrow */}
                          <div className="w-2.5 h-2.5 bg-[#0a2540]/95 rotate-45 mx-auto -mt-1.5 border-r border-b border-white/10" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Map legend — minimal */}
            <div className="flex items-center justify-center gap-5 mt-2 text-[11px] text-[#0a2540]/50">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1976d2]" />
                <span>Départements couverts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#42a5f5] shadow-sm shadow-[#42a5f5]/50" />
                <span>Survolez pour découvrir</span>
              </div>
            </div>
          </motion.div>

          {/* Descriptive text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="flex flex-col gap-7"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#0a2540] mb-4">
                Notre zone d&apos;intervention principale
              </h3>
              <p className="text-[#0a2540]/80 leading-relaxed mb-4">
                HYDREX est implanté au cœur du <strong className="text-[#0a2540]">sud de la France</strong>, 
                avec une couverture dédiée des départements de l&apos;Hérault (34), du Gard (30), 
                du Vaucluse (84), de l&apos;Aude (11), des Pyrénées-Orientales (66) et des 
                Bouches-du-Rhône (13).
              </p>
              <p className="text-[#0a2540]/80 leading-relaxed mb-4">
                Notre <strong className="text-[#0a2540]">proximité géographique</strong> avec les 
                grandes agglomérations — Montpellier, Nîmes, Avignon, Carcassonne, Perpignan et 
                Marseille — nous permet d&apos;intervenir rapidement sur l&apos;ensemble de la région 
                Occitanie et PACA.
              </p>
              <p className="text-[#0a2540]/80 leading-relaxed">
                Nos équipes connaissent parfaitement les <strong className="text-[#0a2540]">réseaux 
                d&apos;assainissement locaux</strong>, les réglementations en vigueur et les 
                spécificités de chaque commune pour vous garantir un service adapté et réactif.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-[#e3f2fd] hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-lg bg-[#e3f2fd] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-[#1976d2]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2540] text-sm">Intervention rapide</p>
                  <p className="text-[#0a2540]/60 text-xs">Sur place en moins de 2h</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-[#e3f2fd] hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-lg bg-[#e3f2fd] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-[#1976d2]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2540] text-sm">Expertise locale</p>
                  <p className="text-[#0a2540]/60 text-xs">Connaissance des réseaux</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-[#e3f2fd] hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-lg bg-[#e3f2fd] flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4 text-[#1976d2]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2540] text-sm">Équipements mobiles</p>
                  <p className="text-[#0a2540]/60 text-xs">Camions haute pression</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-[#e3f2fd] hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-lg bg-[#e3f2fd] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#1976d2]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2540] text-sm">6 départements</p>
                  <p className="text-[#0a2540]/60 text-xs">Occitanie &amp; PACA</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#0a2540] to-[#0d47a1] rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#42a5f5]/10 rounded-full blur-2xl" />
              <div className="relative flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-[#42a5f5]" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-2">Intervention sur toute la France</p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Au-delà de notre zone principale, HYDREX se déplace sur l&apos;ensemble 
                    du territoire français pour des interventions spécifiques ou des contrats 
                    d&apos;entretien. Nos camions haute pression et nos équipes qualifiées sont 
                    prêts à intervenir où que vous soyez.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#0d47a1] hover:bg-[#0a2540] text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#0d47a1]/20 group"
            >
              <Phone className="w-4 h-4" />
              Demander un devis gratuit
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
