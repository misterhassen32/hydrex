# Task 3-a: Header Component

## Summary
Created `/home/z/my-project/src/components/header.tsx` — a premium, responsive header component for the HYDREX website.

## Features Implemented
1. **Sticky header** — Fixed at top with `fixed top-0` and z-50
2. **Logo** — Image component with `/logo.svg` + "HYDREX" text + "Hydrocurage & Assainissement" tagline
3. **Navigation links** — Prestations, Inspection Caméra, Professionnels, Zone d'Intervention, Contact (hidden on mobile, visible on lg+)
4. **Emergency CTA** — Red pulsing button with `pulse-urgent` class, shimmer animation, links to `tel:+33777720512`. Desktop shows full text, mobile shows compact version
5. **Mobile responsive** — Sheet/drawer from shadcn/ui with animated links, droplet icons, chevron arrows, and emergency footer
6. **Glassmorphism** — Uses `glass` CSS class when scrolled (transparent initially, blur backdrop on scroll)
7. **Framer Motion** — Entry animation (slide down), hover effects on logo, staggered nav link animations, accent line animation, mobile menu item animations
8. **Lucide icons** — Phone, Menu, ChevronRight, Clock, Droplets
9. **'use client'** directive included
10. **Imports** from `@/components/ui/sheet` and `@/components/ui/button`

## Color Palette Used
- Deep navy `#0a2540` via `text-hydrex-deep`
- Ocean blue `#0d47a1` via `text-hydrex-ocean`
- Azur `#1976d2` via `bg-hydrex-azur`
- Sky `#42a5f5` via `text-hydrex-sky`
- Light blue bg `#e3f2fd` via `bg-hydrex-light` / `bg-hydrex-ice`
- Urgent red `#dc2626` via `bg-hydrex-urgent`

## Additional Details
- Bottom accent gradient line appears when scrolled (animated with framer-motion)
- Nav links have hover underline animation
- Logo has spring hover animation (rotate + scale)
- Mobile sheet has gradient header with deep navy → ocean blue
- Emergency button footer in mobile sheet with "24h/24, 7j/7" availability text
