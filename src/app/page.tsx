import Header from '@/components/header'
import Hero from '@/components/hero'
import { Services } from '@/components/services'
import Inspection from '@/components/inspection'
import Professionals from '@/components/professionals'
import Zone from '@/components/zone'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Inspection />
        <Professionals />
        <Zone />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
