"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";

const benefits = [
  "14天免费试用",
  "无需信用卡",
  "专属客户成功经理",
  "随时可取消",
];

export default function CTASection() {
  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-electric-blue to-gold" />

      <div className="container-editorial relative">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-5">
              开始您的旅程
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-paper mb-6">
              准备好开启全球商机了吗？
            </h2>
            <p className="text-base lg:text-lg text-paper/70 max-w-2xl mx-auto leading-relaxed">
              加入 5000+ 企业的行列，用 Demand-OS 发现更多商业机会，
              <br className="hidden md:block" />
              让供需对接变得简单高效
            </p>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span className="text-sm text-paper/80">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/console"
              className="btn-gold flex items-center justify-center gap-2 text-base px-8 py-4"
            >
              <span>立即开始体验</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="btn-secondary border-paper/30 text-paper hover:bg-paper hover:text-navy flex items-center justify-center gap-2 text-base px-8 py-4"
            >
              <Calendar className="w-4 h-4" />
              <span>预约产品演示</span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
              <div>
                <p className="text-2xl font-serif text-gold mb-1">5,000+</p>
                <p className="text-xs text-paper/50 uppercase tracking-wider">企业客户</p>
              </div>
              <div className="hidden md:block w-px h-10 bg-white/20" />
              <div>
                <p className="text-2xl font-serif text-gold mb-1">600,000+</p>
                <p className="text-xs text-paper/50 uppercase tracking-wider">年处理供需信息</p>
              </div>
              <div className="hidden md:block w-px h-10 bg-white/20" />
              <div>
                <p className="text-2xl font-serif text-gold mb-1">99.9%</p>
                <p className="text-xs text-paper/50 uppercase tracking-wider">系统可用性</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
