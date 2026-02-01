"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/industrial-os-components/hero-section"
import { StyleTuner } from "@/components/industrial-os-components/style-tuner"
import { CommandBar } from "@/components/industrial-os-components/command-bar"
import { TimelineWars } from "@/components/industrial-os-components/timeline-wars"
import { TrustTicker } from "@/components/industrial-os-components/trust-ticker"
import { ContainerLoader } from "@/components/industrial-os-components/container-loader"

export default function IndustrialOSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-paper-mist to-paper-warm">
      <Header />
      
      <main className="pt-16 lg:pt-20">
        <HeroSection />
        <StyleTuner />
        <TimelineWars />
        <CommandBar />
        <TrustTicker />
        <ContainerLoader />
      </main>

      <Footer />
    </div>
  )
}
