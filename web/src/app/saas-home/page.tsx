"use client";

import McKinseyNav from "@/components/McKinseyNav";
import McKinseyHero from "@/components/pages/McKinseyHero";
import { Footer } from "@/components/layout/Footer";

export default function SaaSHome() {
  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <McKinseyNav />

      {/* Hero + Bento Grid */}
      <McKinseyHero />

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
