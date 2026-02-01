"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode, Calendar, Users } from "lucide-react";

export function FinalCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#020617] py-24 lg:py-32 overflow-hidden noise-texture"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Label */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[#D4AF37] text-sm tracking-widest font-medium">
            2025 战略窗口期
          </span>
        </div>

        {/* Divider */}
        <div
          className={`w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8 transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        />

        {/* Main Headline */}
        <h2
          className={`font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6 chinese-heading transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-balance block">
            王座只有一个，
          </span>
          <span className="text-[#D4AF37] text-balance block">
            你不坐，竞争对手就会坐
          </span>
        </h2>

        {/* Subheadline */}
        <p
          className={`text-white/50 text-lg max-w-2xl mx-auto mb-12 chinese-text transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          犹豫的成本是试错成本的10000倍。今天锁定数字主权，明天领跑全球市场。
        </p>

        {/* CTA Block */}
        <div
          className={`flex flex-col lg:flex-row items-center justify-center gap-8 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Primary Button */}
          <Button
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#C9A227] text-[#020617] font-semibold px-10 py-7 text-lg rounded-sm group shadow-lg shadow-[#D4AF37]/20"
          >
            <Calendar className="w-5 h-5 mr-2" />
            预约品牌诊断
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* QR Code Block */}
          <div className="flex items-center gap-4 p-4 rounded-sm border border-[#D4AF37]/30 bg-[#D4AF37]/5">
            <div className="w-20 h-20 bg-white rounded-sm flex items-center justify-center">
              {/* QR Code Placeholder - Using icon as placeholder */}
              <QrCode className="w-14 h-14 text-[#020617]" />
            </div>
            <div className="text-left">
              <p className="text-white/80 text-sm font-medium chinese-text">扫码直通 CEO</p>
              <p className="text-white/40 text-xs chinese-text">每日限额：2 席</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div
          className={`mt-16 pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium text-lg">500+</p>
              <p className="text-white/40 text-xs chinese-text">品牌已入驻</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-white font-medium text-lg">$2.8亿</p>
              <p className="text-white/40 text-xs chinese-text">累计成交额</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-white font-medium text-lg">68 国</p>
              <p className="text-white/40 text-xs chinese-text">买家覆盖</p>
            </div>
          </div>
        </div>

        {/* Footer Quote */}
        <p
          className={`mt-16 text-white/30 text-sm italic chinese-text transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {"\"展会只有7天，互联网是永恒的。\""}
        </p>
      </div>
    </section>
  );
}
