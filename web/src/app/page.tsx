import { Header } from "@/components/layout/header"
import { Hero } from "@/components/pages/hero"
import { DemandTicker } from "@/components/demand-ticker"
import { RealTimeOverseasServices } from "@/components/features/real-time-overseas-services"
import { GlobalShowroomsPreviewV2 as GlobalShowroomsPreview } from "@/components/features/global-showrooms-preview-v2"


import { KnowledgeSection } from "@/components/features/knowledge-section"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-paper-mist via-surface to-paper-warm">
      <Header />
      <Hero />
      <DemandTicker />
      <RealTimeOverseasServices />
      <GlobalShowroomsPreview />


      <KnowledgeSection />
      <Footer />
    </main>
  )
}
