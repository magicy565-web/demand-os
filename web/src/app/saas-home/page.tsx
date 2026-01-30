"use client";

import McKinseyNav from "@/components/McKinseyNav";
import McKinseyHero from "@/components/McKinseyHero";
import { Footer } from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CommandPalette from "@/components/CommandPalette";
import AIChatBot from "@/components/AIChatBot";

export default function SaaSHome() {
  return (
    <div className="min-h-screen bg-white">
      {/* 滚动进度条 */}
      <ScrollProgress />

      {/* 导航栏 */}
      <McKinseyNav />

      {/* Hero + Bento Grid */}
      <McKinseyHero />

      {/* 页脚 */}
      <Footer />

      {/* 返回顶部按钮 */}
      <BackToTop />

      {/* 命令面板 */}
      <CommandPalette />

      {/* AI 聊天机器人 */}
      <AIChatBot />
    </div>
  );
}
