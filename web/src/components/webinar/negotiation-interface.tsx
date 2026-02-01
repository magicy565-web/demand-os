"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Mic, Video, MonitorUp, Circle, Languages, Check } from "lucide-react";
import Image from "next/image";

export function NegotiationInterface() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [specUpdate, setSpecUpdate] = useState(false);
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

  // Animation sequence
  useEffect(() => {
    if (!isVisible) return;

    const sequence = [
      { delay: 500, action: () => setAnimationPhase(1) },   // Show interface
      { delay: 2000, action: () => setAnimationPhase(2) },  // Buyer speaks
      { delay: 4000, action: () => setAnimationPhase(3) },  // AI translating
      { delay: 5500, action: () => setAnimationPhase(4) },  // Translation complete
      { delay: 7000, action: () => setSpecUpdate(true) },   // Spec updates
      { delay: 8500, action: () => setAnimationPhase(5) },  // Confirmed
      { delay: 12000, action: () => {
        // Reset
        setAnimationPhase(0);
        setSpecUpdate(false);
        setTimeout(() => setAnimationPhase(1), 500);
      }},
    ];

    const timers = sequence.map(({ delay, action }) =>
      setTimeout(action, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [isVisible, animationPhase === 0]);

  const specs = [
    { label: "尺寸", value: "20 x 10 cm", fixed: true },
    { label: "颜色", oldValue: "标准白色", newValue: "哑光黑", updated: true },
    { label: "材质", value: "食品级PP", fixed: true },
    { label: "MOQ", value: "500件起", fixed: true },
  ];

  return (
    <section ref={sectionRef} className="bg-[#F3F4F6] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge variant="outline" className="mb-4 border-[#D4AF37]/30 text-[#D4AF37]">
            实时对接
          </Badge>
          <h2 className="font-serif text-3xl lg:text-5xl text-[#0A192F] mb-4 chinese-heading">
            语言不通？AI来搞定
          </h2>
          <p className="text-[#0A192F]/60 max-w-2xl mx-auto chinese-text">
            实时AI翻译，让中国工厂和海外买家无缝沟通。需求变更即时同步到产品规格。
          </p>
        </div>

        {/* Interface Window */}
        <div
          className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Window Frame */}
          <div className="glass-dark rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0A192F] border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-white/80 text-sm font-mono">Live Sourcing Room 01</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white/60 text-xs">安全连接</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-5 min-h-[450px]">
              {/* Video Feed - Left */}
              <div className="lg:col-span-3 relative bg-[#0A192F]">
                <Image
                  src="/images/video-call-split.jpg"
                  alt="视频对接"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent" />

                {/* Video Controls */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Mic className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <MonitorUp className="w-4 h-4 text-white" />
                  </div>
                  <Badge className="bg-red-500 text-white text-xs">
                    <Circle className="w-2 h-2 mr-1 fill-current" />
                    REC
                  </Badge>
                </div>

                {/* Participant Labels */}
                <div className="absolute top-1/4 left-4 px-3 py-1.5 glass rounded-sm">
                  <p className="text-white text-xs">中国供应商 - 佛山 Tech Co.</p>
                </div>
                <div className="absolute top-3/4 left-4 px-3 py-1.5 glass rounded-sm">
                  <p className="text-white text-xs">美国买家 - John (Walmart)</p>
                </div>

                {/* Chat Bubbles */}
                <div className="absolute bottom-4 left-4 right-4 space-y-3">
                  {/* Buyer Message */}
                  <div
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      animationPhase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                      J
                    </div>
                    <div className="glass rounded-sm px-4 py-2 max-w-xs">
                      <p className="text-white text-sm font-mono">
                        {"Can we change the handle finish to Matte Black?"}
                      </p>
                    </div>
                  </div>

                  {/* AI Translation */}
                  <div
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      animationPhase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
                      <Languages className="w-4 h-4 text-[#0A192F]" />
                    </div>
                    <div className={`glass rounded-sm px-4 py-2 max-w-xs border ${
                      animationPhase >= 4 ? "border-green-500/50" : "border-[#D4AF37]/50"
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs ${
                          animationPhase >= 4 ? "text-green-400" : "text-[#D4AF37]"
                        }`}>
                          {animationPhase >= 4 ? "翻译完成" : "AI翻译中..."}
                        </span>
                        {animationPhase < 4 && (
                          <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-1 h-1 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-1 h-1 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        )}
                      </div>
                      <p className={`text-sm font-mono transition-all duration-500 ${
                        animationPhase >= 4 ? "text-white" : "text-white/60"
                      }`}>
                        我们可以把手柄的表面处理改成哑光黑吗？
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs Panel - Right */}
              <div className="lg:col-span-2 bg-white p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-lg text-[#0A192F] chinese-heading">产品规格</h3>
                  <Badge variant="outline" className="text-xs border-[#0A192F]/20">
                    实时同步
                  </Badge>
                </div>

                {/* Product Image */}
                <div className="relative w-full h-32 mb-6 rounded-sm overflow-hidden bg-[#F3F4F6]">
                  <Image
                    src="/images/smart-hub-product.jpg"
                    alt="产品图"
                    fill
                    className="object-contain p-4"
                  />
                </div>

                {/* Spec List */}
                <div className="space-y-4">
                  {specs.map((spec, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between py-2 border-b border-[#0A192F]/10 last:border-b-0 transition-all duration-500 ${
                        spec.updated && specUpdate ? "bg-[#D4AF37]/10 -mx-2 px-2 rounded" : ""
                      }`}
                    >
                      <span className="text-[#0A192F]/60 text-sm chinese-text">{spec.label}</span>
                      {spec.updated ? (
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm transition-all duration-500 ${
                              specUpdate ? "line-through text-[#0A192F]/30" : "text-[#0A192F]"
                            }`}
                          >
                            {spec.oldValue}
                          </span>
                          {specUpdate && (
                            <span className="text-[#D4AF37] font-medium text-sm animate-fade-in-up chinese-text">
                              {spec.newValue}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[#0A192F] text-sm chinese-text">{spec.value}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Confirmation Badge */}
                <div
                  className={`mt-6 p-4 rounded-sm bg-green-50 border border-green-200 flex items-center gap-3 transition-all duration-500 ${
                    animationPhase >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-green-700 font-medium text-sm chinese-text">需求已确认</p>
                    <p className="text-green-600/70 text-xs chinese-text">规格变更已同步至订单系统</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
