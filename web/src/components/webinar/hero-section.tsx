"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Play } from "lucide-react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-broadcast-studio.jpg')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0A192F]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Globe className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm font-medium tracking-wide">
            全球数字发布会
          </span>
        </div>

        {/* Main Headline */}
        <h1
          className={`font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block text-balance chinese-heading">将工厂变成</span>
          <span className="block text-[#D4AF37] text-balance chinese-heading">全球舞台</span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 chinese-text transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          不要只是参加展会，成为展会本身。
          <br className="hidden md:block" />
          用高端数字发布会触达全球300+精准买家，实现24/7曝光。
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#C9A227] text-[#0A192F] font-semibold px-8 py-6 text-lg rounded-sm group"
          >
            开启数字发布
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-sm group bg-transparent"
          >
            <Play className="mr-2 w-5 h-5" />
            观看演示
          </Button>
        </div>

        {/* Stats Bar */}
        <div
          className={`mt-16 pt-10 border-t border-white/10 grid grid-cols-3 gap-8 max-w-3xl mx-auto transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-3xl md:text-4xl font-serif text-[#D4AF37]">300+</p>
            <p className="text-sm text-white/60 mt-1 chinese-text">精准采购商</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-serif text-[#D4AF37]">24/7</p>
            <p className="text-sm text-white/60 mt-1 chinese-text">全球曝光</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-serif text-[#D4AF37]">30分钟</p>
            <p className="text-sm text-white/60 mt-1 chinese-text">发布全产品线</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
