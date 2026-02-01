import { HeroSection } from "@/components/webinar/hero-section";
import { SplitComparison } from "@/components/webinar/split-comparison";
import { BentoGrid } from "@/components/webinar/bento-grid";
import { SocialProof } from "@/components/webinar/social-proof";
import { SourcingAgenda } from "@/components/webinar/sourcing-agenda";
import { StrategicMindMap } from "@/components/webinar/strategic-mind-map";
import { NegotiationInterface } from "@/components/webinar/negotiation-interface";
import { ChatToCRM } from "@/components/webinar/chat-to-crm";
import { FinalCTA } from "@/components/webinar/final-cta";
import Link from "next/link";

export default function WebinarPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      {/* Back to Home */}
      <div className="fixed top-4 left-4 z-50">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-colors"
        >
          ← 返回首页
        </Link>
      </div>

      {/* Hero - Full screen cinematic */}
      <HeroSection />

      {/* The Shift - Old vs New comparison */}
      <SplitComparison />

      {/* Efficiency Engine - Bento grid with live demo */}
      <BentoGrid />

      {/* Social Proof - Case studies with evidence */}
      <SocialProof />

      {/* Global Sourcing Agenda - Event calendar */}
      <SourcingAgenda />

      {/* Strategic Mind Map - Animated workflow */}
      <StrategicMindMap />

      {/* Negotiation Interface - AI translation demo */}
      <NegotiationInterface />

      {/* Chat to CRM - WhatsApp to order conversion */}
      <ChatToCRM />

      {/* Final CTA - Premium invitation */}
      <FinalCTA />

      {/* Footer */}
      <footer className="bg-[#020617] border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#D4AF37] flex items-center justify-center">
                <span className="text-[#020617] font-bold text-sm">鸿</span>
              </div>
              <span className="text-white font-semibold">线上展会</span>
            </div>
            <p className="text-white/30 text-sm">
              © 2026 鸿亿鸿 Demand-OS. 让每一个工厂都能触达全球。
            </p>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-white/40 hover:text-white/80 text-sm transition-colors">
                返回首页
              </Link>
              <Link href="#contact" className="text-white/40 hover:text-white/80 text-sm transition-colors">
                联系方式
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
