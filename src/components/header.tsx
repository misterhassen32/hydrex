'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, ChevronRight, Clock, Droplets } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'

const navLinks = [
  { label: 'Prestations', href: '#prestations' },
  { label: 'Inspection Caméra', href: '#inspection-camera' },
  { label: 'Professionnels', href: '#professionnels' },
  { label: "Zone d'Intervention", href: '#zone-intervention' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const id = href.replace('#', '')
      const element = document.getElementById(id)

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      if (mobileOpen) {
        setMobileOpen(false)
      }
    },
    [mobileOpen]
  )

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-hydrex-deep/5'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Image
                src="/logo.png"
                alt="HYDREX Logo"
                width={44}
                height={44}
                className="object-contain"
                priority
              />
            </motion.div>
            <div className="flex flex-col">
              <span
                className={`text-xl font-extrabold tracking-wider transition-colors duration-300 lg:text-2xl ${
                  scrolled
                    ? 'text-hydrex-deep'
                    : 'text-white'
                }`}
              >
                HYDREX
              </span>
              <span
                className={`text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 lg:text-[11px] ${
                  scrolled
                    ? 'text-hydrex-ocean'
                    : 'text-hydrex-sky'
                }`}
              >
                Hydrocurage & Assainissement
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.4 }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-300 rounded-lg group cursor-pointer ${
                    scrolled
                      ? 'text-hydrex-deep/80 hover:text-hydrex-ocean hover:bg-hydrex-light/50'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-hydrex-azur transition-all duration-300 w-0 group-hover:w-3/4`}
                  />
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Emergency CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Emergency Button - Desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="hidden lg:block"
            >
              <a href="tel:+33777720512">
                <Button
                  className="pulse-urgent relative overflow-hidden bg-hydrex-urgent hover:bg-hydrex-urgent/90 text-white font-bold rounded-full px-5 h-11 shadow-lg shadow-hydrex-urgent/25 transition-all duration-300 hover:shadow-xl hover:shadow-hydrex-urgent/30"
                  size="lg"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
                  <Phone className="size-4 mr-2 animate-pulse" />
                  <span className="text-xs sm:text-sm">URGENCE 24/7 : 07 77 72 05 12</span>
                </Button>
              </a>
            </motion.div>

            {/* Emergency Button - Mobile (compact) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="lg:hidden"
            >
              <a href="tel:+33777720512">
                <Button
                  className="pulse-urgent bg-hydrex-urgent hover:bg-hydrex-urgent/90 text-white rounded-full px-3 h-9 shadow-lg shadow-hydrex-urgent/25"
                  size="sm"
                >
                  <Phone className="size-3.5 mr-1.5 animate-pulse" />
                  <span className="text-[11px] font-bold">URGENCE</span>
                </Button>
              </a>
            </motion.div>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-lg transition-colors duration-300 ${
                      scrolled
                        ? 'text-hydrex-deep hover:bg-hydrex-light/50'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Menu className="size-6" />
                    <span className="sr-only">Menu de navigation</span>
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[85vw] sm:max-w-md p-0 bg-white">
                  <div className="flex flex-col h-full">
                    {/* Mobile Sheet Header */}
                    <SheetHeader className="p-6 pb-4 border-b border-hydrex-light bg-gradient-to-br from-hydrex-deep to-hydrex-ocean">
                      <SheetTitle className="flex items-center gap-3 text-white">
                        <Image
                          src="/logo.png"
                          alt="HYDREX"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                        <div className="flex flex-col">
                          <span className="text-lg font-extrabold tracking-wider">HYDREX</span>
                          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-hydrex-sky">
                            Hydrocurage & Assainissement
                          </span>
                        </div>
                      </SheetTitle>
                    </SheetHeader>

                    {/* Mobile Navigation Links */}
                    <nav className="flex-1 overflow-y-auto py-4">
                      <ul className="space-y-1 px-3">
                        {navLinks.map((link, index) => (
                          <motion.li
                            key={link.href}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * index + 0.2, duration: 0.3 }}
                          >
                            <a
                              href={link.href}
                              onClick={(e) => handleNavClick(e, link.href)}
                              className="flex items-center justify-between px-4 py-3.5 rounded-xl text-hydrex-deep font-medium transition-all duration-200 hover:bg-hydrex-light hover:text-hydrex-ocean group cursor-pointer"
                            >
                              <span className="flex items-center gap-3">
                                <Droplets className="size-4 text-hydrex-azur opacity-60 group-hover:opacity-100 transition-opacity" />
                                {link.label}
                              </span>
                              <ChevronRight className="size-4 text-hydrex-sky/50 group-hover:text-hydrex-azur group-hover:translate-x-0.5 transition-all" />
                            </a>
                          </motion.li>
                        ))}
                      </ul>
                    </nav>

                    {/* Mobile Emergency Footer */}
                    <div className="p-4 border-t border-hydrex-light bg-hydrex-ice">
                      <a href="tel:+33777720512" className="block">
                        <Button
                          className="pulse-urgent w-full bg-hydrex-urgent hover:bg-hydrex-urgent/90 text-white font-bold rounded-xl h-12 shadow-lg shadow-hydrex-urgent/25 relative overflow-hidden"
                          size="lg"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
                          <Phone className="size-5 mr-2.5 animate-pulse" />
                          <div className="flex flex-col items-start">
                            <span className="text-xs font-semibold opacity-90">URGENCE 24/7</span>
                            <span className="text-sm font-bold">07 77 72 05 12</span>
                          </div>
                        </Button>
                      </a>
                      <div className="flex items-center justify-center gap-2 mt-3 text-hydrex-ocean/70 text-xs">
                        <Clock className="size-3" />
                        <span>Intervention rapide 24h/24, 7j/7</span>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line when scrolled */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="h-[2px] bg-gradient-to-r from-hydrex-ocean via-hydrex-azur to-hydrex-sky origin-left"
          />
        )}
      </AnimatePresence>
    </motion.header>
  )
}
