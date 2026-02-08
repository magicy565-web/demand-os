"use client"

import { Footer } from "@/components/layout/Footer"
import { IndustrialMapHero } from "@/components/industrial-os-components/industrial-map-hero"

export default function IndustrialOSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-paper-mist to-paper-warm">
      <IndustrialMapHero />
      <Footer />
    </div>
  )
}
