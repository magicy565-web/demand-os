import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { DemandTicker } from "@/components/demand-ticker"
import { DashboardPreview } from "@/components/dashboard-preview"
import { IndustryPractice } from "@/components/industry-practice"
import { Timeline30Days } from "@/components/timeline-30days"
import { FactoryEmpowerment } from "@/components/factory-empowerment"
import { PricingModel } from "@/components/pricing-model"
import { Leadership } from "@/components/leadership"
import { KnowledgeSection } from "@/components/knowledge-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <DemandTicker />
      <DashboardPreview />
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
