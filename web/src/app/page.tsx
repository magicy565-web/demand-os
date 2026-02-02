import { Header } from "@/components/layout/header"
import { Hero } from "@/components/pages/hero"
import { DemandTicker } from "@/components/demand-ticker"
import { RealTimeOverseasServices } from "@/components/features/real-time-overseas-services"
import { IndustryPractice } from "@/components/industry-practice"
import { Timeline30Days } from "@/components/timeline-30days"
import { FactoryEmpowerment } from "@/components/factory-empowerment"
import { PricingModel } from "@/components/pricing-model"
import { Leadership } from "@/components/features/leadership"
import { KnowledgeSection } from "@/components/features/knowledge-section"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-paper-mist via-surface to-paper-warm">
      <Header />
      <Hero />
      <DemandTicker />
      <RealTimeOverseasServices />
      <IndustryPractice />
      <Timeline30Days />
      <FactoryEmpowerment />
      <PricingModel />
      <Leadership />
      <KnowledgeSection />
      <Footer />
    </main>
  )
}
