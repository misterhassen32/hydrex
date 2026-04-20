'use client'

import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const navigationLinks = [
  { label: 'Prestations', href: '#prestations' },
  { label: 'Inspection Caméra', href: '#inspection-camera' },
  { label: 'Professionnels', href: '#professionnels' },
  { label: "Zone d'Intervention", href: '#zone-intervention' },
  { label: 'Contact', href: '#contact' },
]

const coordonnees = [
  { icon: Phone, label: '07 77 72 05 12', href: 'tel:+33777720512' },
  { icon: Mail, label: 'contact@hydrex.fr', href: 'mailto:contact@hydrex.fr' },
  { icon: MapPin, label: 'Sud de la France', href: null },
  { icon: Clock, label: '24h/24, 7j/7', href: null },
]

export default function Footer() {
  return (
    <footer className="bg-[#0a2540] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        >
          {/* Column 1: Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="HYDREX"
                width={36}
                height={36}
                className="object-contain"
              />
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-hydrex-sky">HYD</span>REX
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              L&apos;excellence technique au service de vos réseaux.
            </p>
            <p className="text-white/50 text-xs mt-4 leading-relaxed max-w-xs">
              Spécialistes en assainissement, hydrocurage haute pression et inspection caméra
              dans tout le Sud de la France.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-hydrex-sky mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-hydrex-sky mr-0 group-hover:mr-2 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Coordonnées */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-hydrex-sky mb-5">
              Coordonnées
            </h4>
            <ul className="space-y-3">
              {coordonnees.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-hydrex-sky flex-shrink-0" />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-white/70 text-sm">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Mentions légales */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-hydrex-sky mb-5">
              Informations
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                >
                  Mentions légales
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                >
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                >
                  CGV
                </a>
              </li>
            </ul>

            {/* Certification badge area */}
            <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-white/50 text-xs leading-relaxed">
                Entreprise certifiée et assurée pour toutes interventions d&apos;assainissement.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
              © 2025 HYDREX. Tous droits réservés.
            </p>
            <p className="text-white/30 text-xs">
              Assainissement &amp; Hydrocurage — Sud de la France
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
