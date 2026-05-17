'use client'

import { motion } from 'framer-motion'
import { Phone, FileText, Droplets } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero-truck.png)' }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 hero-gradient" />
        {/* Water shimmer effect */}
        <div className="absolute inset-0 shimmer opacity-30" />
      </div>

      {/* Decorative water drops */}
      <div className="absolute top-20 right-10 opacity-10 z-0">
        <Droplets className="w-64 h-64 text-white" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-5 z-0">
        <Droplets className="w-96 h-96 text-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium text-white/90">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              Intervention H24 / 7j/7
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
          >
            L&apos;excellence technique au service de{' '}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#42a5f5] to-[#90caf9]">
                vos réseaux
              </span>
            </span>
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed mb-10 max-w-2xl"
          >
            Assainissement, Hydrocurage & Inspection Caméra — Intervention H24 / 7j/7.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>
              <Button
                size="lg"
                className="group relative overflow-hidden bg-[#1976d2] hover:bg-[#42a5f5] text-white font-bold rounded-xl px-8 h-14 text-base shadow-xl shadow-[#1976d2]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#1976d2]/40"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <FileText className="mr-2 h-5 w-5" />
                Demander un Devis
              </Button>
            </a>
            <a href="tel:+33610521352">
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl px-8 h-14 text-base backdrop-blur-sm transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Appeler Maintenant
              </Button>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-14 flex flex-wrap items-center gap-6 text-white/50 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-white/30" />
              <span>Intervention rapide</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-white/30" />
              <span>Devis gratuit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-white/30" />
              <span>Experts certifiés</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#0a1628"
          />
        </svg>
      </div>
    </section>
  )
}
