'use client'

import { Header } from '@/components/layout/header'
import { Footer } from "@/components/layout/Footer"
import PageHero from '@/components/global-trust-components/page-hero'
import GlobalPresence from '@/components/global-trust-components/global-presence'
import PartnerLogos from '@/components/global-trust-components/partner-logos'
import AcquisitionMatrix from '@/components/global-trust-components/acquisition-matrix'
import ViewSwitcher from '@/components/global-trust-components/view-switcher'
import { ThemeProvider } from '@/components/global-trust-components/theme-provider'
import { ViewProvider } from '@/lib/view-context'

export default function GlobalTrustPage() {
  return (
    <ThemeProvider>
      <ViewProvider>
        <div className="min-h-screen bg-gradient-to-br from-surface via-paper-mist to-paper-warm">
          <Header />
          <main className="pt-16 lg:pt-20">
            <PageHero />
            <GlobalPresence />
            <PartnerLogos />
            <AcquisitionMatrix />
            <ViewSwitcher />
          </main>
          <Footer />
        </div>
      </ViewProvider>
    </ThemeProvider>
  )
}
