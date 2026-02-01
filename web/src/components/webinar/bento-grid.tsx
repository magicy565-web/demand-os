"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, Send, Package, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function BentoGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const [buttonState, setButtonState] = useState<"idle" | "hover" | "clicked" | "success">("idle");
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

  // Animation sequence for the live demo
  useEffect(() => {
    if (!isVisible) return;

    const sequence = [
      { delay: 0, action: () => setAnimationPhase(1) }, // Show interface
      { delay: 2000, action: () => setAnimationPhase(2) }, // Highlight product card
      { delay: 3500, action: () => setCursorPosition({ x: 85, y: 65 }) }, // Move cursor to button
      { delay: 4500, action: () => setButtonState("hover") },
      { delay: 5000, action: () => setButtonState("clicked") },
      { delay: 5200, action: () => setButtonState("success") },
      { delay: 7500, action: () => setAnimationPhase(3) }, // Show toast
      { delay: 10000, action: () => {
        // Reset animation
        setAnimationPhase(0);
        setCursorPosition({ x: 50, y: 50 });
        setButtonState("idle");
        setTimeout(() => setAnimationPhase(1), 500);
      }},
    ];

    const timers = sequence.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [isVisible, animationPhase === 0]);

  const products = [
    { name: "智能喂食器 Pro", price: "$45 - $52", sku: "SKU-001" },
    { name: "宠物饮水机 X2", price: "$28 - $35", sku: "SKU-002" },
    { name: "智能猫砂盆", price: "$120 - $140", sku: "SKU-003" },
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
            效率引擎
          </Badge>
          <h2 className="font-serif text-3xl lg:text-5xl text-[#0A192F] mb-4 chinese-heading">
            30分钟，发布全产品矩阵
          </h2>
          <p className="text-[#0A192F]/60 max-w-2xl mx-auto chinese-text">
            不再是单品直播，而是完整的产品发布会。让买家一目了然你的全部实力。
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Live Video - Large Card */}
          <div
            className={`lg:col-span-2 lg:row-span-2 relative rounded-sm overflow-hidden bg-[#0A192F] min-h-[500px] transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Video Background */}
            <Image
              src="/images/live-presenter.jpg"
              alt="直播演示"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent" />

            {/* Live Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500 rounded-sm">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse-live" />
                <span className="text-white text-sm font-medium">直播中</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 rounded-sm">
                <Eye className="w-4 h-4 text-white" />
                <span className="text-white text-sm">458 观看</span>
              </div>
            </div>

            {/* Stream Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="glass-dark rounded-sm p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-white font-medium chinese-text">工厂直供 - Tech Co.</p>
                    <p className="text-white/60 text-sm chinese-text">正在展示 2025 智能家居系列...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Product Catalog - Right Side */}
            <div
              className={`absolute top-4 right-4 w-64 transition-all duration-500 ${
                animationPhase >= 1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="glass rounded-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-white text-sm font-medium">直播商品目录</p>
                </div>
                <div className="p-2 space-y-2">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-sm transition-all duration-300 ${
                        index === 0 && animationPhase >= 2
                          ? "bg-[#D4AF37]/20 border border-[#D4AF37]/50 scale-105"
                          : "bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-sm bg-white/10 flex items-center justify-center">
                          <Package className="w-6 h-6 text-white/60" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate chinese-text">
                            {product.name}
                          </p>
                          <p className="text-[#D4AF37] text-xs">{product.price}/件</p>
                        </div>
                      </div>
                      {index === 0 && (
                        <Button
                          size="sm"
                          className={`w-full mt-2 text-xs transition-all duration-200 ${
                            buttonState === "success"
                              ? "bg-[#10B981] hover:bg-[#10B981] text-white"
                              : buttonState === "clicked"
                              ? "bg-[#C9A227] scale-95"
                              : buttonState === "hover"
                              ? "bg-[#C9A227]"
                              : "bg-[#D4AF37] hover:bg-[#C9A227]"
                          } text-[#0A192F]`}
                        >
                          {buttonState === "success" ? "询价已发送" : "立即询价"}
                          {buttonState !== "success" && (
                            <Send className="w-3 h-3 ml-1" />
                          )}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Cursor */}
            <div
              className={`absolute w-6 h-6 pointer-events-none transition-all duration-1000 ease-out z-50 ${
                animationPhase >= 2 ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: `${cursorPosition.x}%`,
                top: `${cursorPosition.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 drop-shadow-lg">
                <path
                  d="M5 3L19 12L12 13L9 20L5 3Z"
                  fill="white"
                  stroke="#0A192F"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Toast Notification */}
            <div
              className={`absolute top-20 left-1/2 -translate-x-1/2 transition-all duration-500 ${
                animationPhase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              <div className="glass-dark px-4 py-3 rounded-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </div>
                <p className="text-white text-sm chinese-text">工厂已收到您的询价，请查看邮箱</p>
              </div>
            </div>
          </div>

          {/* Product Cards - Right Side */}
          {[
            { title: "一键索样", desc: "直播中即可提交样品需求，工厂24小时内响应", color: "bg-white" },
            { title: "实时翻译", desc: "AI同声传译，打破语言障碍，无缝对接全球买家", color: "bg-[#0A192F]" },
          ].map((card, index) => (
            <div
              key={index}
              className={`rounded-sm p-6 transition-all duration-1000 ${card.color} ${
                card.color === "bg-[#0A192F]" ? "text-white" : "text-[#0A192F]"
              }`}
              style={{
                transitionDelay: `${(index + 1) * 200 + 400}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <div className={`w-12 h-12 rounded-sm ${
                card.color === "bg-[#0A192F]" ? "bg-[#D4AF37]/20" : "bg-[#0A192F]/10"
              } flex items-center justify-center mb-4`}>
                <ArrowUpRight className={`w-6 h-6 ${
                  card.color === "bg-[#0A192F]" ? "text-[#D4AF37]" : "text-[#0A192F]"
                }`} />
              </div>
              <h3 className="font-serif text-xl mb-2 chinese-heading">{card.title}</h3>
              <p className={`text-sm chinese-text ${
                card.color === "bg-[#0A192F]" ? "text-white/70" : "text-[#0A192F]/60"
              }`}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
