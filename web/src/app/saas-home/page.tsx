"use client";

import McKinseyNav from "@/components/McKinseyNav";
import McKinseyHero from "@/components/McKinseyHero";
import ImpactStats from "@/components/ImpactStats";
import TrustedEcosystem from "@/components/TrustedEcosystem";
import ThoughtLeadership from "@/components/ThoughtLeadership";
import CustomerSuccess from "@/components/CustomerSuccess";

export default function SaaSHome() {
  return (
    <div className="min-h-screen bg-white">
      {/* McKinsey 风格导航栏 */}
      <McKinseyNav />

      {/* Hero Section with 9-Module Bento Grid */}
      <McKinseyHero />

      {/* 影响力统计 */}
      <ImpactStats />

      {/* 生态系统 Logos */}
      <TrustedEcosystem />

      {/* 思想领导力 */}
      <ThoughtLeadership />

      {/* 客户成功案例 */}
      <CustomerSuccess />

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-serif font-bold mb-4 text-slate-900">
                解决方案
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-[#00509d] transition">
                    企业规划
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00509d] transition">
                    Demand-OS
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00509d] transition">
                    TikTok孵化器
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold mb-4 text-slate-900">
                服务
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-[#00509d] transition">
                    展览
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00509d] transition">
                    仓库
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00509d] transition">
                    会员俱乐部
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold mb-4 text-slate-900">
                资讯
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-[#00509d] transition">
                    活动
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00509d] transition">
                    新闻
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00509d] transition">
                    招聘
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold mb-4 text-slate-900">
                联系我们
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>info@hongyihong.com</li>
                <li>+86 400-888-8888</li>
                <li>广东省中山市</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2026 HONGYIHONG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
