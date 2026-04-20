'use client'

import { motion } from 'framer-motion'
import { Globe, Phone, Clock, Shield, Truck, MapPin } from 'lucide-react'
import { useState } from 'react'

// Detailed France outline path (realistic hexagonal shape with Brittany, Normandy, etc.)
const francePath = 'M188,8 L198,2 L212,0 L226,2 L240,6 L254,8 L264,14 L274,22 L284,32 L292,44 L298,56 L304,66 L310,72 L320,76 L330,74 L340,70 L350,72 L356,80 L360,90 L358,102 L354,112 L350,122 L352,134 L358,146 L362,156 L360,168 L356,178 L354,188 L356,198 L362,210 L368,222 L370,234 L366,246 L362,256 L364,268 L370,278 L374,290 L372,302 L368,312 L370,324 L372,336 L368,348 L362,358 L354,366 L348,374 L342,382 L334,390 L324,396 L314,400 L304,404 L294,406 L284,408 L274,410 L264,412 L254,414 L244,416 L234,416 L224,414 L214,412 L204,408 L194,406 L184,402 L174,396 L164,390 L156,382 L148,372 L140,362 L134,350 L128,338 L122,326 L116,312 L110,298 L104,284 L100,270 L96,256 L90,242 L86,228 L82,214 L80,200 L78,186 L76,172 L78,158 L82,144 L86,130 L90,116 L96,104 L104,92 L112,82 L120,72 L128,62 L138,52 L148,44 L158,36 L168,28 L178,18 Z'

// Brittany peninsula extension
const brittanyPath = 'M80,200 L72,198 L62,200 L52,204 L44,210 L38,218 L34,228 L32,238 L34,248 L40,256 L48,260 L56,258 L64,252 L72,244 L78,234 L82,224 L82,214 Z'

// Corsica
const corsicaPath = 'M384,380 L388,374 L392,376 L394,384 L392,394 L388,402 L384,408 L380,410 L376,406 L374,398 L376,390 L380,384 Z'

// Department paths with accurate geographic positioning
const departments = [
  {
    number: '34',
    name: 'Hérault',
    capital: 'Montpellier',
    cx: 256,
    cy: 332,
    path: 'M238,312 L248,304 L260,302 L272,306 L280,314 L284,326 L282,340 L276,352 L266,360 L254,364 L242,360 L234,352 L230,340 L232,326 Z',
  },
  {
    number: '30',
    name: 'Gard',
    capital: 'Nîmes',
    cx: 292,
    cy: 308,
    path: 'M272,290 L284,284 L298,286 L310,294 L318,306 L320,320 L316,334 L306,342 L294,344 L282,340 L276,328 L274,314 L272,302 Z',
  },
  {
    number: '84',
    name: 'Vaucluse',
    capital: 'Avignon',
    cx: 310,
    cy: 270,
    path: 'M294,252 L308,246 L322,250 L334,260 L340,274 L336,288 L326,298 L312,300 L300,296 L292,284 L290,270 Z',
  },
  {
    number: '11',
    name: 'Aude',
    capital: 'Carcassonne',
    cx: 218,
    cy: 338,
    path: 'M200,318 L212,310 L226,308 L238,312 L242,324 L240,338 L236,352 L226,362 L214,366 L202,360 L194,350 L190,336 Z',
  },
  {
    number: '66',
    name: 'Pyrénées-Orientales',
    capital: 'Perpignan',
    cx: 186,
    cy: 370,
    path: 'M170,350 L184,342 L200,340 L210,350 L214,364 L210,380 L202,394 L190,404 L178,408 L166,402 L158,390 L156,376 L160,362 Z',
  },
  {
    number: '13',
    name: 'Bouches-du-Rhône',
    capital: 'Marseille',
    cx: 338,
    cy: 332,
    path: 'M320,312 L334,304 L348,308 L360,318 L368,332 L366,348 L358,360 L346,368 L332,370 L320,364 L312,352 L310,338 L314,324 Z',
  },
]

// Major city markers for geographic reference
const cities = [
  { name: 'Paris', x: 262, y: 82, isDept: false },
  { name: 'Lyon', x: 310, y: 208, isDept: false },
  { name: 'Toulouse', x: 190, y: 284, isDept: false },
  { name: 'Bordeaux', x: 130, y: 260, isDept: false },
  { name: 'Marseille', x: 340, y: 348, isDept: true },
  { name: 'Montpellier', x: 256, y: 348, isDept: true },
  { name: 'Nîmes', x: 292, y: 322, isDept: true },
  { name: 'Avignon', x: 312, y: 282, isDept: true },
  { name: 'Perpignan', x: 186, y: 382, isDept: true },
  { name: 'Carcassonne', x: 218, y: 352, isDept: true },
]

export default function Zone() {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null)
  const hoveredInfo = departments.find(d => d.number === hoveredDept)

  return (
    <section id="zone-intervention" className="py-20 md:py-28 relative overflow-hidden">
      {/* Transparent background */}
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
          {/* France SVG Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[#f5f9ff] to-[#e3f2fd] rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-[#e3f2fd]/80">
              <svg
                viewBox="0 0 420 440"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
                role="img"
                aria-label="Carte de France avec les départements d'intervention HYDREX"
              >
                <defs>
                  <filter id="glow-default" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodColor="#1976d2" floodOpacity="0.45" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="shadow" />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glow-hover" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feFlood floodColor="#42a5f5" floodOpacity="0.75" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="shadow" />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="shadow" />
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="france-shadow" x="-3%" y="-3%" width="106%" height="106%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0a2540" floodOpacity="0.06" />
                  </filter>
                </defs>

                {/* France mainland outline */}
                <path
                  d={francePath}
                  fill="white"
                  stroke="#c5cae9"
                  strokeWidth="1.5"
                  filter="url(#france-shadow)"
                />

                {/* Brittany peninsula */}
                <path
                  d={brittanyPath}
                  fill="white"
                  stroke="#c5cae9"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Corsica */}
                <path
                  d={corsicaPath}
                  fill="white"
                  stroke="#c5cae9"
                  strokeWidth="1.2"
                />
                <text x="384" y="418" textAnchor="middle" fill="#90caf9" fontSize="7" fontStyle="italic" fontFamily="Inter, sans-serif">Corse</text>

                {/* Subtle region boundary lines for context */}
                <g opacity="0.08" stroke="#78909c" strokeWidth="0.5" fill="none">
                  <path d="M90,140 Q200,138 355,144" />
                  <path d="M80,200 Q190,196 360,204" />
                  <path d="M70,260 Q180,256 365,264" />
                  <path d="M90,310 Q195,306 370,314" />
                  <path d="M180,50 Q176,200 184,400" />
                  <path d="M260,30 Q258,180 266,380" />
                  <path d="M330,60 Q328,190 336,370" />
                </g>

                {/* Major non-dept cities - subtle markers */}
                {cities.filter(c => !c.isDept).map(city => (
                  <g key={city.name}>
                    <circle cx={city.x} cy={city.y} r="2.5" fill="#0a2540" opacity="0.2" />
                    <text
                      x={city.x}
                      y={city.y - 8}
                      textAnchor="middle"
                      fill="#0a2540"
                      fontSize="7"
                      fontWeight="500"
                      fontFamily="Inter, sans-serif"
                      opacity="0.3"
                    >
                      {city.name}
                    </text>
                  </g>
                ))}

                {/* Highlighted department zones */}
                {departments.map((dept) => {
                  const isHovered = hoveredDept === dept.number
                  return (
                    <g key={dept.number}>
                      <path
                        d={dept.path}
                        fill={isHovered ? '#42a5f5' : '#1976d2'}
                        stroke={isHovered ? '#64b5f6' : '#0d47a1'}
                        strokeWidth={isHovered ? '2' : '1.2'}
                        filter={isHovered ? 'url(#glow-hover)' : 'url(#glow-default)'}
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                          opacity: isHovered ? 1 : 0.9,
                        }}
                        onMouseEnter={() => setHoveredDept(dept.number)}
                        onMouseLeave={() => setHoveredDept(null)}
                      />
                      <text
                        x={dept.cx}
                        y={dept.cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="white"
                        fontSize="12"
                        fontWeight="800"
                        fontFamily="Inter, sans-serif"
                        style={{
                          pointerEvents: 'none',
                          transition: 'all 0.35s ease',
                        }}
                      >
                        {dept.number}
                      </text>
                    </g>
                  )
                })}

                {/* Dept city markers */}
                {cities.filter(c => c.isDept).map(city => (
                  <g key={city.name}>
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="2"
                      fill="white"
                      stroke="#0d47a1"
                      strokeWidth="0.8"
                      opacity="0.7"
                    />
                  </g>
                ))}

                {/* Hover tooltip - simple conditional, no AnimatePresence */}
                {hoveredInfo && (
                  <g>
                    <rect
                      x={hoveredInfo.cx - 72}
                      y={hoveredInfo.cy - 55}
                      width="144"
                      height="40"
                      rx="8"
                      fill="#0a2540"
                      opacity="0.95"
                    />
                    <polygon
                      points={`${hoveredInfo.cx - 5},${hoveredInfo.cy - 15} ${hoveredInfo.cx + 5},${hoveredInfo.cy - 15} ${hoveredInfo.cx},${hoveredInfo.cy - 9}`}
                      fill="#0a2540"
                      opacity="0.95"
                    />
                    <text
                      x={hoveredInfo.cx}
                      y={hoveredInfo.cy - 38}
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="Inter, sans-serif"
                    >
                      {hoveredInfo.number} — {hoveredInfo.name}
                    </text>
                    <text
                      x={hoveredInfo.cx}
                      y={hoveredInfo.cy - 23}
                      textAnchor="middle"
                      fill="#42a5f5"
                      fontSize="9"
                      fontWeight="500"
                      fontFamily="Inter, sans-serif"
                    >
                      {hoveredInfo.capital}
                    </text>
                  </g>
                )}

                {/* Mediterranean Sea */}
                <text
                  x="290"
                  y="424"
                  textAnchor="middle"
                  fill="#90caf9"
                  fontSize="9"
                  fontStyle="italic"
                  fontFamily="Inter, sans-serif"
                  opacity="0.7"
                >
                  Méditerranée
                </text>
                <path d="M220,416 Q240,410 260,416 Q280,422 300,416 Q320,410 340,416" fill="none" stroke="#bbdefb" strokeWidth="0.8" opacity="0.4" />
                <path d="M230,426 Q250,420 270,426 Q290,432 310,426 Q330,420 350,426" fill="none" stroke="#bbdefb" strokeWidth="0.6" opacity="0.25" />

                {/* Dotted zone boundary */}
                <path
                  d="M158,370 Q155,338 170,318 Q188,300 218,290 Q250,282 282,280 Q314,282 340,290 Q364,300 370,326 Q372,356 360,370 Q344,386 322,396 Q290,406 254,410 Q218,410 192,400 Q166,390 158,370 Z"
                  fill="none"
                  stroke="#42a5f5"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />

                {/* HYDREX zone label */}
                <text
                  x="260"
                  y="296"
                  textAnchor="middle"
                  fill="#0d47a1"
                  fontSize="8"
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                  opacity="0.2"
                >
                  ZONE HYDREX
                </text>
              </svg>
            </div>

            {/* Map legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-[#0a2540]/60">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-sm bg-[#1976d2]" />
                <span>Départements couverts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-sm bg-[#42a5f5]" />
                <span>Survolez pour découvrir</span>
              </div>
            </div>
          </motion.div>

          {/* Descriptive text - right side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="flex flex-col gap-7"
          >
            {/* Zone description */}
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

            {/* Key benefits */}
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

            {/* Nationwide mention */}
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

            {/* CTA */}
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
