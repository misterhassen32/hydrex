'use client'

import { motion } from 'framer-motion'
import { MapPin, Globe } from 'lucide-react'
import { useState } from 'react'

const departments = [
  { name: 'Hérault', number: '34', city: 'Montpellier' },
  { name: 'Gard', number: '30', city: 'Nîmes' },
  { name: 'Vaucluse', number: '84', city: 'Avignon' },
  { name: 'Aude', number: '11', city: 'Carcassonne' },
  { name: 'Pyrénées-Orientales', number: '66', city: 'Perpignan' },
  { name: 'Bouches-du-Rhône', number: '13', city: 'Marseille' },
]

// Approximate SVG positions for each department within the France outline
const deptPositions = [
  { number: '34', x: 205, y: 345, path: 'M188,320 Q185,305 198,300 L220,298 Q235,302 238,315 L240,335 Q238,355 225,362 L200,360 Q188,355 188,340 Z' },
  { number: '30', x: 238, y: 305, path: 'M220,298 L248,290 Q265,295 268,310 L270,330 Q265,345 250,348 L238,340 Q238,320 240,315 L235,302 Z' },
  { number: '84', x: 278, y: 280, path: 'M265,258 Q275,250 295,252 L310,260 Q318,270 315,285 L308,300 Q298,308 285,310 L270,305 Q265,298 268,310 L265,295 Q262,275 265,258 Z' },
  { number: '11', x: 150, y: 355, path: 'M128,330 Q132,315 148,310 L170,308 Q185,312 188,325 L188,340 Q185,360 170,370 L148,375 Q130,372 128,355 Z' },
  { number: '66', x: 108, y: 380, path: 'M88,355 Q92,340 108,335 L128,330 Q130,345 128,355 L128,370 Q122,395 108,400 L92,398 Q82,390 88,375 Z' },
  { number: '13', x: 310, y: 335, path: 'M295,312 Q308,305 320,310 L338,318 Q350,330 348,348 L340,365 Q328,378 312,375 L298,370 Q288,358 290,340 Z' },
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
  hidden: { opacity: 0, x: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Zone() {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null)

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

        {/* Two-column layout: Map + Department list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-12"
        >
          {/* SVG Map — left on desktop, top on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[#f5f9ff] to-[#e3f2fd] rounded-2xl p-6 md:p-8 shadow-lg border border-[#e3f2fd]">
              <svg
                viewBox="0 0 400 440"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto max-h-[480px]"
                role="img"
                aria-label="Carte du sud de la France montrant les départements d'intervention HYDREX"
              >
                <defs>
                  {/* Blue glow filter for highlighted departments */}
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feFlood floodColor="#1976d2" floodOpacity="0.6" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="shadow" />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Stronger glow on hover */}
                  <filter id="glow-hover" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feFlood floodColor="#42a5f5" floodOpacity="0.8" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="shadow" />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="shadow" />
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Subtle drop shadow for France outline */}
                  <filter id="outline-shadow" x="-5%" y="-5%" width="110%" height="110%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0a2540" floodOpacity="0.1" />
                  </filter>
                </defs>

                {/* France outline - simplified hexagonal shape */}
                <path
                  d="M95,35 L140,20 L195,15 L250,20 L300,30 L340,55 L365,90 L375,130 L370,175 L360,210 L365,250 L355,285 L345,310 L350,345 L340,370 L320,390 L290,400 L260,405 L230,410 L195,415 L155,410 L115,400 L85,385 L70,360 L60,325 L55,285 L50,245 L40,200 L35,160 L42,120 L55,80 L72,55 Z"
                  fill="#f5f9ff"
                  stroke="#c5cae9"
                  strokeWidth="1.5"
                  filter="url(#outline-shadow)"
                />

                {/* Mediterranean Sea label */}
                <text
                  x="240"
                  y="432"
                  textAnchor="middle"
                  fill="#90caf9"
                  fontSize="11"
                  fontStyle="italic"
                  fontFamily="Inter, sans-serif"
                >
                  Méditerranée
                </text>
                {/* Sea wave hints */}
                <path d="M160,418 Q180,412 200,418 Q220,424 240,418 Q260,412 280,418" fill="none" stroke="#bbdefb" strokeWidth="1" opacity="0.6" />
                <path d="M140,425 Q165,419 190,425 Q215,431 240,425 Q265,419 290,425" fill="none" stroke="#bbdefb" strokeWidth="0.8" opacity="0.4" />

                {/* Department zones */}
                {deptPositions.map((dept) => {
                  const isHovered = hoveredDept === dept.number
                  return (
                    <g key={dept.number}>
                      {/* Department shape */}
                      <path
                        d={dept.path}
                        fill={isHovered ? '#42a5f5' : '#1976d2'}
                        stroke={isHovered ? '#64b5f6' : '#0d47a1'}
                        strokeWidth="1.2"
                        filter={isHovered ? 'url(#glow-hover)' : 'url(#glow)'}
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={() => setHoveredDept(dept.number)}
                        onMouseLeave={() => setHoveredDept(null)}
                      />
                      {/* Department number label */}
                      <text
                        x={dept.x}
                        y={dept.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="white"
                        fontSize="14"
                        fontWeight="700"
                        fontFamily="Inter, sans-serif"
                        style={{ pointerEvents: 'none', transition: 'all 0.3s ease' }}
                      >
                        {dept.number}
                      </text>
                    </g>
                  )
                })}

                {/* Paris marker for reference */}
                <circle cx="230" cy="105" r="4" fill="#0a2540" opacity="0.3" />
                <text
                  x="230"
                  y="95"
                  textAnchor="middle"
                  fill="#0a2540"
                  fontSize="9"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                  opacity="0.4"
                >
                  Paris
                </text>

                {/* HYDREX coverage label */}
                <text
                  x="200"
                  y="290"
                  textAnchor="middle"
                  fill="#0d47a1"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                  opacity="0.5"
                >
                  ZONE HYDREX
                </text>

                {/* Connecting dotted line around the zone */}
                <path
                  d="M88,335 Q88,290 130,275 Q180,258 240,255 Q300,258 340,280 Q360,295 350,340 Q345,380 320,390 Q280,405 230,410 Q170,405 130,395 Q85,380 82,355 Z"
                  fill="none"
                  stroke="#42a5f5"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />
              </svg>
            </div>
          </motion.div>

          {/* Department list — right on desktop, below on mobile */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-4"
          >
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-[#0a2540] mb-2"
            >
              Nos départements couverts
            </motion.h3>
            {departments.map((dept) => (
              <motion.div
                key={dept.number}
                variants={cardVariants}
                whileHover={{ x: 6, boxShadow: '0 12px 32px rgba(10,37,64,0.10)' }}
                onMouseEnter={() => setHoveredDept(dept.number)}
                onMouseLeave={() => setHoveredDept(null)}
                className={`bg-white rounded-xl p-5 flex items-center gap-4 shadow-md border-l-4 transition-all duration-300 cursor-default ${
                  hoveredDept === dept.number
                    ? 'border-l-[#42a5f5] border-t border-r border-b border-[#42a5f5]/30 bg-[#f5f9ff]'
                    : 'border-l-[#1976d2] border-t border-r border-b border-[#e3f2fd]'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                  hoveredDept === dept.number ? 'bg-[#1976d2]' : 'bg-[#e3f2fd]'
                }`}>
                  <MapPin className={`w-6 h-6 transition-colors duration-300 ${
                    hoveredDept === dept.number ? 'text-white' : 'text-[#1976d2]'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-bold text-[#0a2540]">{dept.name}</p>
                  <p className="text-sm text-[#0a2540]/60 font-medium">
                    {dept.city} · Département {dept.number}
                  </p>
                </div>
                <span className={`text-2xl font-bold transition-colors duration-300 ${
                  hoveredDept === dept.number ? 'text-[#1976d2]' : 'text-[#42a5f5]/40'
                }`}>
                  {dept.number}
                </span>
              </motion.div>
            ))}
          </motion.div>
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
