# Task 6 - Contact Component Upgrade

## Summary
Successfully rewrote `/home/z/my-project/src/components/contact.tsx` with all requested upgrades.

## Changes Made

### 1. Section Background
- Added `/contact-center.png` as a subtle background image
- Uses absolute-positioned div with `bg-cover bg-center bg-no-repeat opacity-8`
- White overlay (`bg-white/92`) sits on top so content is fully readable
- Section uses `relative overflow-hidden` to contain the background layers

### 2. Mailto Fallback Implementation
- On form submit, first tries the `/api/contact` POST endpoint
- If it succeeds (response.ok), shows success toast and resets form
- If it fails (non-ok response or network error), constructs a `mailto:` link via `buildMailtoLink()`
- Mailto goes to `misterhassen32@gmail.com`
- Subject: `Demande de devis - {prestation label} - {nom}`
- Body includes all form fields formatted nicely with a footer line
- Uses `window.location.href = mailtoLink` to open the email client
- Shows toast "Votre client email va s'ouvrir..." with info variant

### 3. Premium Form Styling
- Form card: upgraded from `shadow-lg` to `shadow-xl`, border refined to `border-hydrex-light/40`
- Gradient accent bar: absolute-positioned 1.5px wide bar on the left (`from-hydrex-ocean via-hydrex-azur to-hydrex-sky`)
- Form has `pl-2` to account for the accent bar
- All inputs: added `shadow-sm` and `focus:shadow-md` transitions
- Submit button: gradient background (`from-hydrex-ocean to-hydrex-azur`), hover gradient reverse, `shadow-lg shadow-hydrex-ocean/25`, hover shadow upgrade, `scale-[1.01]` hover, `active:scale-[0.99]`, animated Send icon translation, ChevronRight that slides in on hover

### 4. Preserved Functionality
- react-hook-form with zodResolver
- zod validation schema (nom, email, telephone, prestation, message)
- Contact info panel with icons (Phone, Mail, MapPin, Clock)
- Emergency CTA with pulse-urgent animation
- Sonner toasts for all feedback
- Section `id="contact"` preserved
- Framer Motion animations (containerVariants, itemVariants, header animation)
- Responsive grid layout (lg:grid-cols-5)
- Select component for prestation options

## Lint Status
✅ ESLint passes cleanly with no errors

## Dev Server
✅ Compiled successfully
