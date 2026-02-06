"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/Footer"
import { IndustrialMapHero } from "@/components/industrial-os-components/industrial-map-hero"
import { HeroSection } from "@/components/industrial-os-components/hero-section"
import { CommandBar } from "@/components/industrial-os-components/command-bar"
import { TrustTicker } from "@/components/industrial-os-components/trust-ticker"

export default function IndustrialOSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-paper-mist to-paper-warm">
      <Header />
      
      <IndustrialMapHero />
      
      <main className="pt-0" id="hero-section">
        <HeroSection />
        <CommandBar />
        <TrustTicker />
      </main>

      <Footer />
    </div>
  )
}
