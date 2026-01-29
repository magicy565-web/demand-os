import { HeroSection } from "@/components/HeroSection";
import { DemandScrollList } from "@/components/DemandScrollList";
import { StatsPanel } from "@/components/StatsPanel";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* 粒子背景 */}
      <ParticleBackground />
      
      {/* 动态网格背景 */}
      <div className="fixed inset-0 cyber-grid-animated pointer-events-none -z-5" />

      {/* 顶部英雄区 */}
      <HeroSection />

      {/* 实时统计面板 */}
      <StatsPanel />

      {/* 自动滚动需求列表 - 核心展示区 */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
            <h2 className="font-cyber text-2xl md:text-3xl text-cyber-cyan neon-text flex items-center gap-3">
              <span className="animate-pulse">🔥</span>
              实时需求信号
              <span className="text-sm font-normal text-cyber-green animate-blink">LIVE</span>
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
          </div>
          <p className="text-center text-gray-400 mt-2 text-sm">
            全球需求实时滚动 · 点击卡片查看详情 · 一键对接商机
          </p>
        </div>
        
        {/* 全宽度滚动区域 */}
        <DemandScrollList />
      </section>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
