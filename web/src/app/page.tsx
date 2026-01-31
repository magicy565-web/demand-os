'use client'

import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { BentoGrid } from '@/components/bento-grid'
import { IndustryPractice } from '@/components/industry-practice'
import { Framework } from '@/components/framework'
import { Leadership } from '@/components/leadership'
import { KnowledgeSection } from '@/components/knowledge-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <Hero />
      <BentoGrid />
      <IndustryPractice />
      <Framework />
      <Leadership />
      <KnowledgeSection />
      <Footer />
    </main>
  )
}
