'use client'

import { motion } from 'framer-motion'
import { Globe, Phone, Clock, Shield, Truck, MapPin } from 'lucide-react'
import { useState } from 'react'

// Accurate France outline traced from real geographic coordinates
// Projection: x = (lon+5.5)*42, y = (51.2-lat)*63, viewBox 600x580
// Going clockwise from Dunkirk
const francePath = 'M330,10 L305,18 L280,55 L265,80 L235,100 L210,82 L180,68 L155,58 L148,70 L152,88 L140,118 L105,135 L70,148 L42,175 L58,200 L85,215 L130,240 L160,248 L152,278 L175,310 L188,348 L182,395 L172,438 L165,478 L185,498 L215,512 L245,520 L275,518 L310,525 L345,540 L352,510 L368,498 L392,480 L415,485 L440,495 L458,500 L478,512 L510,495 L535,478 L542,462 L548,445 L535,422 L518,405 L505,392 L478,378 L486,340 L490,318 L482,295 L498,272 L515,238 L535,218 L555,192 L562,168 L568,140 L542,128 L512,116 L480,105 L450,95 L428,85 L405,68 L378,42 L358,28 Z'

// Brittany peninsula (separate path to create proper peninsula shape)
const brittanyPath = 'M140,118 L125,108 L108,112 L92,120 L78,130 L65,142 L55,155 L48,168 L42,175 L58,200 L85,215 L105,210 L120,205 L135,195 L145,180 L150,165 L148,148 L145,132 Z'

// Corsica island
const corsicaPath = 'M548,490 L552,482 L558,478 L562,484 L560,496 L555,510 L550,520 L545,525 L540,518 L540,508 L542,498 Z'

// Departments with correct geographic positioning in the SE of France
// Slightly enlarged for visibility and interactivity
const departments = [
  {
    number: '34',
    name: 'Hérault',
    capital: 'Montpellier',
    cx: 385,
    cy: 492,
    path: 'M368,475 L380,468 L395,470 L408,478 L412,492 L406,506 L394,512 L380,510 L370,500 L366,488 Z',
  },
  {
    number: '30',
    name: 'Gard',
    capital: 'Nîmes',
    cx: 422,
    cy: 472,
    path: 'M408,458 L422,450 L438,455 L450,465 L454,480 L448,495 L435,502 L420,498 L410,488 L406,472 Z',
  },
  {
    number: '84',
    name: 'Vaucluse',
    capital: 'Avignon',
    cx: 448,
    cy: 438,
    path: 'M432,422 L448,415 L465,420 L475,432 L478,448 L470,462 L456,468 L440,465 L430,452 L428,436 Z',
  },
  {
    number: '11',
    name: 'Aude',
    capital: 'Carcassonne',
    cx: 352,
    cy: 510,
    path: 'M332,498 L348,490 L368,494 L378,506 L374,520 L362,530 L346,534 L332,526 L325,512 Z',
  },
  {
    number: '66',
    name: 'Pyrénées-Orientales',
    capital: 'Perpignan',
    cx: 325,
    cy: 538,
    path: 'M308,528 L322,520 L342,524 L354,535 L350,550 L338,560 L322,558 L308,548 L304,538 Z',
  },
  {
    number: '13',
    name: 'Bouches-du-Rhône',
    capital: 'Marseille',
    cx: 468,
    cy: 498,
    path: 'M454,485 L468,478 L485,482 L498,492 L502,508 L494,522 L480,528 L465,524 L454,512 L450,498 Z',
  },
]

// Reference cities on the map
const cities = [
  { name: 'Paris', x: 338, y: 148, isDept: false },
  { name: 'Lyon', x: 460, y: 340, isDept: false },
  { name: 'Toulouse', x: 240, y: 415, isDept: false },
  { name: 'Bordeaux', x: 200, y: 385, isDept: false },
  { name: 'Strasbourg', x: 558, y: 170, isDept: false },
  { name: 'Rennes', x: 115, y: 185, isDept: false },
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
                viewBox="0 0 600 580"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
                role="img"
                aria-label="Carte de France avec les départements d'intervention HYDREX"
              >
                <defs>
                  <filter id="glow-def" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodColor="#1976d2" floodOpacity="0.45" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="shadow" />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glow-hov" x="-60%" y="-60%" width="220%" height="220%">
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
                  <filter id="map-shadow" x="-3%" y="-3%" width="106%" height="106%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0a2540" floodOpacity="0.06" />
                  </filter>
                </defs>

                {/* France mainland */}
                <path
                  d={francePath}
                  fill="white"
                  stroke="#b0bec5"
                  strokeWidth="2"
                  filter="url(#map-shadow)"
                  strokeLinejoin="round"
                />

                {/* Brittany peninsula overlay (fills the gap) */}
                <path
                  d={brittanyPath}
                  fill="white"
                  stroke="#b0bec5"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* Corsica */}
                <path
                  d={corsicaPath}
                  fill="white"
                  stroke="#b0bec5"
                  strokeWidth="1.5"
                />
                <text x="550" y="535" textAnchor="middle" fill="#90caf9" fontSize="8" fontStyle="italic" fontFamily="Inter, sans-serif">Corse</text>

                {/* Reference cities */}
                {cities.map(city => (
                  <g key={city.name}>
                    <circle cx={city.x} cy={city.y} r="3" fill="#0a2540" opacity="0.15" />
                    <text
                      x={city.x}
                      y={city.y - 9}
                      textAnchor="middle"
                      fill="#0a2540"
                      fontSize="8"
                      fontWeight="600"
                      fontFamily="Inter, sans-serif"
                      opacity="0.35"
                    >
                      {city.name}
                    </text>
                  </g>
                ))}

                {/* Department zones */}
                {departments.map((dept) => {
                  const isHovered = hoveredDept === dept.number
                  return (
                    <g key={dept.number}>
                      <path
                        d={dept.path}
                        fill={isHovered ? '#42a5f5' : '#1976d2'}
                        stroke={isHovered ? '#64b5f6' : '#0d47a1'}
                        strokeWidth={isHovered ? '2.5' : '1.5'}
                        filter={isHovered ? 'url(#glow-hov)' : 'url(#glow-def)'}
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
                        fontSize="14"
                        fontWeight="800"
                        fontFamily="Inter, sans-serif"
                        style={{ pointerEvents: 'none' }}
                      >
                        {dept.number}
                      </text>
                    </g>
                  )
                })}

                {/* Hover tooltip */}
                {hoveredInfo && (
                  <g>
                    <rect
                      x={hoveredInfo.cx - 78}
                      y={hoveredInfo.cy - 60}
                      width="156"
                      height="42"
                      rx="8"
                      fill="#0a2540"
                      opacity="0.95"
                    />
                    <polygon
                      points={`${hoveredInfo.cx - 5},${hoveredInfo.cy - 18} ${hoveredInfo.cx + 5},${hoveredInfo.cy - 18} ${hoveredInfo.cx},${hoveredInfo.cy - 12}`}
                      fill="#0a2540"
                      opacity="0.95"
                    />
                    <text
                      x={hoveredInfo.cx}
                      y={hoveredInfo.cy - 42}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="700"
                      fontFamily="Inter, sans-serif"
                    >
                      {hoveredInfo.number} — {hoveredInfo.name}
                    </text>
                    <text
                      x={hoveredInfo.cx}
                      y={hoveredInfo.cy - 26}
                      textAnchor="middle"
                      fill="#42a5f5"
                      fontSize="10"
                      fontWeight="500"
                      fontFamily="Inter, sans-serif"
                    >
                      {hoveredInfo.capital}
                    </text>
                  </g>
                )}

                {/* Mediterranean Sea */}
                <text
                  x="420"
                  y="565"
                  textAnchor="middle"
                  fill="#90caf9"
                  fontSize="10"
                  fontStyle="italic"
                  fontFamily="Inter, sans-serif"
                  opacity="0.7"
                >
                  Méditerranée
                </text>
                <path d="M320,558 Q360,550 400,558 Q440,566 480,558 Q520,550 540,558" fill="none" stroke="#bbdefb" strokeWidth="1" opacity="0.4" />

                {/* Dotted zone boundary */}
                <path
                  d="M304,540 Q295,510 310,490 Q330,470 365,462 Q400,458 435,460 Q470,465 498,480 Q515,492 510,510 Q502,530 485,540 Q460,552 425,555 Q385,558 350,555 Q325,552 304,540 Z"
                  fill="none"
                  stroke="#42a5f5"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  opacity="0.3"
                />

                {/* Atlantic label */}
                <text
                  x="30"
                  y="330"
                  textAnchor="middle"
                  fill="#90caf9"
                  fontSize="9"
                  fontStyle="italic"
                  fontFamily="Inter, sans-serif"
                  opacity="0.5"
                  transform="rotate(-90, 30, 330)"
                >
                  Atlantique
                </text>

                {/* Manche label */}
                <text
                  x="200"
                  y="42"
                  textAnchor="middle"
                  fill="#90caf9"
                  fontSize="9"
                  fontStyle="italic"
                  fontFamily="Inter, sans-serif"
                  opacity="0.4"
                >
                  Manche
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
