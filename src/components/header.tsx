'use client'

import { useState, useCallback, useSyncExternalStore } from 'react'
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
} from '@/components/ui/sheet'

const navLinks = [
  { label: 'Prestations', href: '#prestations' },
  { label: 'Inspection Caméra', href: '#inspection-camera' },
  { label: 'Professionnels', href: '#professionnels' },
  { label: "Zone d'Intervention", href: '#zone-intervention' },
  { label: 'Contact', href: '#contact' },
]

const emptySubscribe = () => () => {}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Use useSyncExternalStore to safely read scroll position without SSR mismatch
  const scrolled = useSyncExternalStore(
    emptySubscribe,
    () => window.scrollY > 20,
    () => false // SSR value
  )

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-hydrex-deep/5'
          : 'bg-[#06111f]/90 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-18 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group z-10">
            <div className="transition-transform duration-300 group-hover:rotate-[15deg] group-hover:scale-105">
              <Image
                src="/logo-icon.png"
                alt="HYDREX Logo"
                width={48}
                height={36}
                className="object-contain drop-shadow-sm sm:!w-[56px] sm:!h-[42px]"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-lg font-extrabold tracking-wider transition-colors duration-300 sm:text-xl lg:text-2xl ${
                  scrolled
                    ? 'text-hydrex-deep'
                    : 'text-white'
                }`}
              >
                HYDREX
              </span>
              <span
                className={`text-[8px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 sm:text-[10px] lg:text-[11px] ${
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
            {navLinks.map((link) => (
              <a
                key={link.href}
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
            ))}
          </nav>

          {/* Emergency CTA + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3 z-10">
            {/* Emergency Button - Desktop */}
            <div className="hidden lg:block">
              <a href="tel:+33777720512">
                <Button
                  className="pulse-urgent relative overflow-hidden bg-hydrex-urgent hover:bg-hydrex-urgent/90 text-white font-bold rounded-full px-5 h-11 shadow-lg shadow-hydrex-urgent/25 transition-all duration-300 hover:shadow-xl hover:shadow-hydrex-urgent/30"
                  size="lg"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
                  <Phone className="size-4 mr-2 animate-pulse" />
                  <span className="text-xs sm:text-sm">URGENCE : 07 77 72 05 12</span>
                </Button>
              </a>
            </div>

            {/* Emergency Button - Mobile (compact) */}
            <div className="lg:hidden">
              <a href="tel:+33777720512">
                <Button
                  className="pulse-urgent bg-hydrex-urgent hover:bg-hydrex-urgent/90 text-white rounded-full px-3 h-9 shadow-lg shadow-hydrex-urgent/25"
                  size="sm"
                >
                  <Phone className="size-3.5 mr-1.5 animate-pulse" />
                  <span className="text-[11px] font-bold">URGENCE</span>
                </Button>
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-lg transition-colors duration-300 min-w-[44px] min-h-[44px] ${
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
                    <SheetHeader className="p-5 sm:p-6 pb-4 border-b border-hydrex-light bg-gradient-to-br from-hydrex-deep to-hydrex-ocean">
                      <SheetTitle className="flex items-center gap-3 text-white">
                        <Image
                          src="/logo-icon.png"
                          alt="HYDREX"
                          width={40}
                          height={30}
                          className="object-contain drop-shadow-sm"
                        />
                        <div className="flex flex-col">
                          <span className="text-lg font-extrabold tracking-wider">HYDREX</span>
                          <span className="text-[9px] font-medium tracking-[0.15em] uppercase text-hydrex-sky">
                            Hydrocurage & Assainissement
                          </span>
                        </div>
                      </SheetTitle>
                    </SheetHeader>

                    {/* Mobile Navigation Links */}
                    <nav className="flex-1 overflow-y-auto py-4">
                      <ul className="space-y-1 px-3">
                        {navLinks.map((link) => (
                          <li key={link.href}>
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
                          </li>
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
                            <span className="text-xs font-semibold opacity-90">URGENCE</span>
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
    </header>
  )
}
