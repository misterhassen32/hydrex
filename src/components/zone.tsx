'use client'

import { motion } from 'framer-motion'
import { Globe, Phone, MapPin, Clock, Shield, Truck } from 'lucide-react'
import { useState } from 'react'

// Real approximate department boundary paths for Occitanie & PACA regions
// Based on simplified geographic outlines of French departments
const deptPaths = [
  {
    number: '34',
    name: 'Hérault',
    capital: 'Montpellier',
    cx: 225,
    cy: 325,
    path: 'M195,295 L205,280 L225,275 L245,278 L260,285 L270,300 L275,320 L270,340 L260,355 L245,365 L230,370 L210,368 L195,360 L185,345 L182,325 L185,310 Z',
  },
  {
    number: '30',
    name: 'Gard',
    capital: 'Nîmes',
    cx: 280,
    cy: 310,
    path: 'M245,278 L260,270 L280,268 L295,275 L305,290 L310,310 L305,330 L295,345 L280,350 L265,348 L255,340 L250,325 L250,310 L248,295 Z',
  },
  {
    number: '84',
    name: 'Vaucluse',
    capital: 'Avignon',
    cx: 310,
    cy: 268,
    path: 'M280,240 L295,232 L315,235 L330,245 L340,260 L340,278 L335,292 L320,300 L305,298 L295,288 L285,275 L278,260 Z',
  },
  {
    number: '11',
    name: 'Aude',
    capital: 'Carcassonne',
    cx: 165,
    cy: 335,
    path: 'M140,310 L155,298 L175,292 L195,295 L200,310 L205,325 L200,340 L195,355 L180,368 L160,375 L140,370 L125,355 L120,335 L125,320 Z',
  },
  {
    number: '66',
    name: 'Pyrénées-Orientales',
    capital: 'Perpignan',
    cx: 110,
    cy: 370,
    path: 'M95,340 L115,325 L140,310 L145,325 L150,345 L148,365 L140,385 L130,400 L115,410 L95,412 L78,400 L70,380 L72,360 L80,345 Z',
  },
  {
    number: '13',
    name: 'Bouches-du-Rhône',
    capital: 'Marseille',
    cx: 335,
    cy: 325,
    path: 'M305,290 L320,280 L340,278 L355,288 L365,305 L368,325 L360,345 L348,358 L330,365 L315,360 L305,348 L298,330 L295,310 Z',
  },
]

// Simplified France hexagonal outline path
const franceOutline = 'M100,40 L145,22 L200,15 L255,18 L305,28 L345,55 L370,92 L380,135 L375,180 L365,215 L370,255 L360,290 L350,315 L355,350 L345,375 L325,395 L295,405 L265,410 L235,415 L200,420 L160,415 L120,405 L90,390 L75,365 L65,330 L60,290 L55,250 L45,205 L40,165 L47,125 L60,85 L77,58 Z'

export default function Zone() {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null)

  const hoveredDeptInfo = deptPaths.find(d => d.number === hoveredDept)

  return (
    <section id="zone-intervention" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background image with high transparency to avoid white */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]"
        style={{ backgroundImage: "url('/water-tech-bg.png')" }}
      />
      {/* Light blue tint overlay instead of plain white */}
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

        {/* Two-column layout: Map + Descriptive text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
        >
          {/* SVG France Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[#f5f9ff] to-[#e3f2fd] rounded-2xl p-6 md:p-8 shadow-lg border border-[#e3f2fd]">
              <svg
                viewBox="0 0 420 450"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto max-h-[500px]"
                role="img"
                aria-label="Carte de France montrant les départements d'intervention HYDREX"
              >
                <defs>
                  {/* Blue glow filter for highlighted departments */}
                  <filter id="dept-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feFlood floodColor="#1976d2" floodOpacity="0.5" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="shadow" />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Stronger glow on hover */}
                  <filter id="dept-glow-hover" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="7" result="blur" />
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
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0a2540" floodOpacity="0.08" />
                  </filter>
                  {/* Pulse animation for departments */}
                  <style>{`
                    .dept-zone {
                      transition: all 0.3s ease;
                      cursor: pointer;
                    }
                    .dept-zone:hover {
                      filter: url(#dept-glow-hover);
                    }
                    .dept-label {
                      pointer-events: none;
                      transition: all 0.3s ease;
                    }
                    @keyframes dept-pulse {
                      0%, 100% { opacity: 0.7; }
                      50% { opacity: 1; }
                    }
                  `}</style>
                </defs>

                {/* France outline */}
                <path
                  d={franceOutline}
                  fill="#f5f9ff"
                  stroke="#c5cae9"
                  strokeWidth="1.5"
                  filter="url(#outline-shadow)"
                />

                {/* Internal region boundaries hint */}
                <g opacity="0.15" stroke="#b0bec5" strokeWidth="0.5" fill="none">
                  <line x1="100" y1="150" x2="350" y2="160" />
                  <line x1="110" y1="220" x2="360" y2="230" />
                  <line x1="80" y1="300" x2="370" y2="310" />
                  <line x1="200" y1="100" x2="200" y2="400" />
                  <line x1="280" y1="80" x2="280" y2="380" />
                </g>

                {/* Paris marker */}
                <circle cx="235" cy="110" r="3.5" fill="#0a2540" opacity="0.25" />
                <text
                  x="235"
                  y="100"
                  textAnchor="middle"
                  fill="#0a2540"
                  fontSize="9"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                  opacity="0.3"
                >
                  Paris
                </text>

                {/* Highlighted department zones */}
                {deptPaths.map((dept) => {
                  const isHovered = hoveredDept === dept.number
                  return (
                    <g key={dept.number}>
                      {/* Department shape with glow */}
                      <path
                        d={dept.path}
                        fill={isHovered ? '#42a5f5' : '#1976d2'}
                        stroke={isHovered ? '#64b5f6' : '#0d47a1'}
                        strokeWidth="1.2"
                        filter={isHovered ? 'url(#dept-glow-hover)' : 'url(#dept-glow)'}
                        className="dept-zone"
                        onMouseEnter={() => setHoveredDept(dept.number)}
                        onMouseLeave={() => setHoveredDept(null)}
                        style={{
                          opacity: isHovered ? 1 : 0.85,
                          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                          transformOrigin: 'center',
                          transformBox: 'fill-box',
                        }}
                      />
                      {/* Department number label */}
                      <text
                        x={dept.cx}
                        y={dept.cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="white"
                        fontSize="13"
                        fontWeight="700"
                        fontFamily="Inter, sans-serif"
                        className="dept-label"
                      >
                        {dept.number}
                      </text>
                    </g>
                  )
                })}

                {/* Hover tooltip */}
                {hoveredDeptInfo && (
                  <g>
                    <rect
                      x={hoveredDeptInfo.cx - 60}
                      y={hoveredDeptInfo.cy - 45}
                      width="120"
                      height="26"
                      rx="6"
                      fill="#0a2540"
                      opacity="0.92"
                    />
                    <text
                      x={hoveredDeptInfo.cx}
                      y={hoveredDeptInfo.cy - 28}
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="600"
                      fontFamily="Inter, sans-serif"
                    >
                      {hoveredDeptInfo.number} - {hoveredDeptInfo.name}
                    </text>
                  </g>
                )}

                {/* Mediterranean Sea */}
                <text
                  x="240"
                  y="438"
                  textAnchor="middle"
                  fill="#90caf9"
                  fontSize="11"
                  fontStyle="italic"
                  fontFamily="Inter, sans-serif"
                >
                  Méditerranée
                </text>
                <path d="M160,422 Q180,416 200,422 Q220,428 240,422 Q260,416 280,422" fill="none" stroke="#bbdefb" strokeWidth="1" opacity="0.5" />

                {/* Dotted boundary around zone */}
                <path
                  d="M72,355 Q75,310 120,290 Q170,275 230,268 Q290,272 340,280 Q365,290 370,330 Q370,370 345,385 Q310,400 265,410 Q210,415 155,405 Q100,395 78,375 Z"
                  fill="none"
                  stroke="#42a5f5"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  opacity="0.35"
                />
              </svg>
            </div>
          </motion.div>

          {/* Descriptive text - right side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Zone description */}
            <div>
              <h3 className="text-2xl font-bold text-[#0a2540] mb-4">
                Notre cœur d&apos;activité
              </h3>
              <p className="text-[#0a2540]/80 leading-relaxed mb-4">
                HYDREX intervient en priorité dans le <strong className="text-[#0a2540]">sud de la France</strong>, 
                couvrant les départements de l&apos;Hérault (34), du Gard (30), du Vaucluse (84), 
                de l&apos;Aude (11), des Pyrénées-Orientales (66) et des Bouches-du-Rhône (13).
              </p>
              <p className="text-[#0a2540]/80 leading-relaxed mb-4">
                Notre <strong className="text-[#0a2540]">implantation locale</strong> nous garantit 
                des temps d&apos;intervention courts et une connaissance approfondie des réseaux 
                d&apos;assainissement de la région.
              </p>
              <p className="text-[#0a2540]/80 leading-relaxed">
                Nos équipes sont basées à proximité des principales agglomérations — Montpellier, 
                Nîmes, Avignon, Carcassonne, Perpignan et Marseille — pour une 
                <strong className="text-[#0a2540]"> réactivité maximale</strong> face à vos urgences.
              </p>
            </div>

            {/* Key benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-[#e3f2fd]">
                <div className="w-10 h-10 rounded-lg bg-[#e3f2fd] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#1976d2]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2540] text-sm">Intervention rapide</p>
                  <p className="text-[#0a2540]/60 text-xs">Sur place en moins de 2h</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-[#e3f2fd]">
                <div className="w-10 h-10 rounded-lg bg-[#e3f2fd] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#1976d2]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2540] text-sm">Expertise locale</p>
                  <p className="text-[#0a2540]/60 text-xs">Connaissance des réseaux</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-[#e3f2fd]">
                <div className="w-10 h-10 rounded-lg bg-[#e3f2fd] flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-[#1976d2]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2540] text-sm">Équipements mobiles</p>
                  <p className="text-[#0a2540]/60 text-xs">Camions haute pression</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-[#e3f2fd]">
                <div className="w-10 h-10 rounded-lg bg-[#e3f2fd] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#1976d2]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2540] text-sm">6 départements</p>
                  <p className="text-[#0a2540]/60 text-xs">Couverture régionale</p>
                </div>
              </div>
            </div>

            {/* Nationwide mention */}
            <div className="bg-gradient-to-r from-[#0a2540] to-[#0d47a1] rounded-xl p-5 text-white">
              <div className="flex items-start gap-3">
                <Globe className="w-6 h-6 text-[#42a5f5] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Intervention sur toute la France</p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Au-delà de notre zone principale, HYDREX se déplace sur l&apos;ensemble du territoire 
                    français pour des interventions spécifiques ou des contrats d&apos;entretien. 
                    Contactez-nous pour étudier votre besoin.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[#1976d2] font-semibold hover:text-[#0d47a1] transition-colors group"
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
