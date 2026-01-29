"use client";

import SaaSHero from "@/components/SaaSHero";
import FeatureSection from "@/components/FeatureSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Link from "next/link";

export default function SaaSHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* 导航栏 */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-blue-400">⚡</span>
            <span>Demand-OS</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-blue-400 transition">
              产品特性
            </a>
            <a href="#pricing" className="hover:text-blue-400 transition">
              定价方案
            </a>
            <a href="#faq" className="hover:text-blue-400 transition">
              常见问题
            </a>
            <Link
              href="/"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            >
              进入系统
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32">
        <SaaSHero />
      </div>

      {/* 特性区 */}
      <div id="features">
        <FeatureSection />
      </div>

      {/* 定价区 */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* FAQ 区 */}
      <div id="faq">
        <FAQSection />
      </div>

      {/* CTA 区 */}
      <CTASection />

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">产品</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">特性</a></li>
                <li><a href="#" className="hover:text-white transition">定价</a></li>
                <li><a href="#" className="hover:text-white transition">安全</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">公司</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition">博客</a></li>
                <li><a href="#" className="hover:text-white transition">招聘</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">法律</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">隐私政策</a></li>
                <li><a href="#" className="hover:text-white transition">服务条款</a></li>
                <li><a href="#" className="hover:text-white transition">联系我们</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">社交媒体</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition">WeChat</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Demand-OS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
