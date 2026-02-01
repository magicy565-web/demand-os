"use client";

import { useEffect, useRef, useState } from "react";
import { X, Check, Plane, Users, Clock, Inbox } from "lucide-react";

export function SplitComparison() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const oldWayPains = [
    { icon: Plane, text: "高昂差旅成本" },
    { icon: Users, text: "展位仅9平米" },
    { icon: Clock, text: "只有7天曝光" },
    { icon: Inbox, text: "邮件无人回复" },
  ];

  const newWayBenefits = [
    { icon: Check, text: "零差旅成本" },
    { icon: Check, text: "无限货架空间" },
    { icon: Check, text: "24/7全球曝光" },
    { icon: Check, text: "30分钟触达300+买家" },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[600px]">
        {/* Old Way - Left Side */}
        <div className="relative bg-[#F3F4F6] py-16 lg:py-24 px-6 lg:px-12">
          {/* Desaturated Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
            style={{
              backgroundImage: "url('/images/old-trade-show.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F3F4F6] via-[#F3F4F6]/95 to-[#F3F4F6]/80" />

          <div
            className={`relative z-10 max-w-lg ml-auto transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-gray-300/50 mb-6">
              <span className="text-gray-600 text-sm font-medium tracking-wide">传统方式</span>
            </div>

            <h2 className="font-serif text-3xl lg:text-4xl text-gray-800 mb-6 chinese-heading">
              展会的困境
            </h2>

            <p className="text-gray-600 mb-8 chinese-text leading-relaxed">
              每年花费数十万参展，换来的是疲惫的奔波、有限的展位、
              和无尽的未回复邮件。时间和金钱，都消耗在了错误的地方。
            </p>

            <ul className="space-y-4">
              {oldWayPains.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-4 transition-all duration-500`}
                  style={{
                    transitionDelay: `${index * 150 + 300}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                  }}
                >
                  <div className="w-10 h-10 rounded-sm bg-gray-200 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="text-gray-700 chinese-text">{item.text}</span>
                  <X className="w-5 h-5 text-red-400 ml-auto" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* New Way - Right Side */}
        <div className="relative bg-[#0A192F] py-16 lg:py-24 px-6 lg:px-12">
          {/* Digital Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: "url('/images/digital-catalog.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0A192F] via-[#0A192F]/95 to-[#0A192F]/80" />

          <div
            className={`relative z-10 max-w-lg mr-auto transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-6">
              <span className="text-[#D4AF37] text-sm font-medium tracking-wide">Global Launch 方式</span>
            </div>

            <h2 className="font-serif text-3xl lg:text-4xl text-white mb-6 chinese-heading">
              数字发布的力量
            </h2>

            <p className="text-white/70 mb-8 chinese-text leading-relaxed">
              无限的数字空间、精准的采购商名单、专业的直播团队。
              30分钟内，让全球买家看见你的全部产品线。
            </p>

            <ul className="space-y-4">
              {newWayBenefits.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-4 transition-all duration-500`}
                  style={{
                    transitionDelay: `${index * 150 + 500}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(20px)",
                  }}
                >
                  <div className="w-10 h-10 rounded-sm bg-[#D4AF37]/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <span className="text-white chinese-text">{item.text}</span>
                  <Check className="w-5 h-5 text-[#10B981] ml-auto" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-2xl animate-glow-pulse">
          <span className="text-[#0A192F] font-serif text-xl font-bold">VS</span>
        </div>
      </div>
    </section>
  );
}
