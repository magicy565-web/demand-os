"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Shield, ArrowRight, Phone, CheckCircle } from "lucide-react";

interface ChatMessage {
  sender: "buyer" | "sales";
  message: string;
  highlight?: string;
}

export function ChatToCRM() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [orderData, setOrderData] = useState({
    client: "",
    sku: "",
    volume: "",
    value: "",
    status: "草稿",
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const chatMessages: ChatMessage[] = [
    { sender: "buyer", message: "样品收到了，质量很不错。" },
    { sender: "sales", message: "太好了！试单数量您考虑多少？" },
    { sender: "buyer", message: "先来500台智能喂食器吧。", highlight: "500台" },
  ];

  const fullTypingText = "先来500台智能喂食器吧。";

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
      { delay: 500, action: () => setAnimationPhase(1) },   // Show chat interface
      { delay: 1500, action: () => setAnimationPhase(2) },  // First message
      { delay: 3000, action: () => setAnimationPhase(3) },  // Second message
      { delay: 4500, action: () => setAnimationPhase(4) },  // Start typing third message
      { delay: 7000, action: () => setAnimationPhase(5) },  // Highlight detected
      { delay: 8000, action: () => setAnimationPhase(6) },  // AI extracting
      { delay: 9500, action: () => {
        setOrderData({
          client: "Mark Davis",
          sku: "智能喂食器",
          volume: "500 台",
          value: "$17,500",
          status: "待开票",
        });
        setAnimationPhase(7);
      }},
      { delay: 12000, action: () => {
        // Reset
        setAnimationPhase(0);
        setTypingText("");
        setOrderData({ client: "", sku: "", volume: "", value: "", status: "草稿" });
        setTimeout(() => setAnimationPhase(1), 500);
      }},
    ];

    const timers = sequence.map(({ delay, action }) =>
      setTimeout(action, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [isVisible, animationPhase === 0]);

  // Typing animation
  useEffect(() => {
    if (animationPhase !== 4) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullTypingText.length) {
        setTypingText(fullTypingText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [animationPhase]);

  return (
    <section ref={sectionRef} className="bg-[#0A192F] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge variant="outline" className="mb-4 border-[#D4AF37]/30 text-[#D4AF37]">
            私域收割
          </Badge>
          <h2 className="font-serif text-3xl lg:text-5xl text-white mb-4 chinese-heading">
            聊天即订单，离职不丢客
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto chinese-text">
            WhatsApp对话自动同步，AI智能提取关键信息，业务员离职也不会带走客户资源。
          </p>
        </div>

        {/* Demo Container */}
        <div
          className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="bg-white rounded-sm shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* WhatsApp Interface - Left */}
              <div className="lg:col-span-2 bg-[#F0F2F5] p-4">
                {/* WhatsApp Header */}
                <div className="bg-[#075E54] text-white rounded-t-sm px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                    MD
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Mark Davis</p>
                    <p className="text-white/70 text-xs">Walmart Buyer</p>
                  </div>
                  <Badge className="bg-white/20 text-white text-xs">已验证</Badge>
                </div>

                {/* Chat Area */}
                <div className="bg-[#E5DDD5] min-h-[350px] p-4 space-y-3 relative">
                  {/* Chat pattern background */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />

                  {/* Message 1 */}
                  <div
                    className={`flex justify-start transition-all duration-500 ${
                      animationPhase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="bg-white rounded-lg rounded-tl-none px-4 py-2 max-w-[80%] shadow-sm">
                      <p className="text-[#303030] text-sm chinese-text">{chatMessages[0].message}</p>
                      <p className="text-[#667781] text-xs text-right mt-1">10:32</p>
                    </div>
                  </div>

                  {/* Message 2 */}
                  <div
                    className={`flex justify-end transition-all duration-500 ${
                      animationPhase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none px-4 py-2 max-w-[80%] shadow-sm">
                      <p className="text-[#303030] text-sm chinese-text">{chatMessages[1].message}</p>
                      <p className="text-[#667781] text-xs text-right mt-1 flex items-center justify-end gap-1">
                        10:33
                        <Check className="w-3 h-3 text-[#53BDEB]" />
                        <Check className="w-3 h-3 text-[#53BDEB] -ml-2" />
                      </p>
                    </div>
                  </div>

                  {/* Message 3 - Typing Animation */}
                  <div
                    className={`flex justify-start transition-all duration-500 ${
                      animationPhase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="bg-white rounded-lg rounded-tl-none px-4 py-2 max-w-[80%] shadow-sm">
                      <p className="text-[#303030] text-sm chinese-text">
                        {animationPhase >= 5 ? (
                          <>
                            先来
                            <span className={`px-1 py-0.5 rounded transition-all duration-300 ${
                              animationPhase >= 5 ? "bg-[#D4AF37]/30 text-[#0A192F] font-medium" : ""
                            }`}>
                              500台
                            </span>
                            智能喂食器吧。
                          </>
                        ) : (
                          <>
                            {typingText}
                            <span className="animate-blink-cursor">|</span>
                          </>
                        )}
                      </p>
                      <p className="text-[#667781] text-xs text-right mt-1">10:35</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Connector */}
              <div className="lg:col-span-1 flex items-center justify-center py-6 lg:py-0 bg-[#F3F4F6]">
                <div
                  className={`flex flex-col items-center gap-3 transition-all duration-500 ${
                    animationPhase >= 6 ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center animate-glow-pulse">
                    <Sparkles className="w-6 h-6 text-[#0A192F]" />
                  </div>
                  <p className="text-[#0A192F] text-xs font-medium text-center chinese-text">
                    AI 提取中...
                  </p>
                  <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>

              {/* CRM Panel - Right */}
              <div className="lg:col-span-2 bg-white p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-lg text-[#0A192F] chinese-heading">CRM / 订单管理</h3>
                  <Badge variant="outline" className="text-xs border-[#0A192F]/20">
                    Q4 销售管道
                  </Badge>
                </div>

                {/* Order Card */}
                <div
                  className={`border rounded-sm p-4 transition-all duration-500 ${
                    animationPhase >= 7
                      ? "border-green-500/50 bg-green-50/30"
                      : "border-[#0A192F]/10 bg-[#F3F4F6]/50"
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#0A192F]/10">
                    <span className="font-mono text-sm text-[#0A192F]/60">#PO-2025-88</span>
                    <Badge
                      className={`text-xs transition-all duration-300 ${
                        animationPhase >= 7
                          ? "bg-green-500 text-white"
                          : "bg-[#0A192F]/10 text-[#0A192F]/60"
                      }`}
                    >
                      {orderData.status || "草稿"}
                    </Badge>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-3">
                    {[
                      { label: "客户", value: orderData.client },
                      { label: "产品", value: orderData.sku },
                      { label: "数量", value: orderData.volume },
                      { label: "金额", value: orderData.value },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-[#0A192F]/50 text-sm chinese-text">{item.label}</span>
                        <span
                          className={`text-sm font-medium transition-all duration-500 chinese-text ${
                            item.value ? "text-[#0A192F]" : "text-[#0A192F]/20"
                          }`}
                          style={{
                            transitionDelay: `${index * 100}ms`,
                          }}
                        >
                          {item.value || "---"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center gap-2 text-[#0A192F]/40">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs chinese-text">数据已加密归档</span>
                </div>

                {/* Success Message */}
                <div
                  className={`mt-6 p-4 rounded-sm bg-[#0A192F] text-white flex items-center gap-3 transition-all duration-500 ${
                    animationPhase >= 7 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-sm font-medium chinese-text">订单已创建</p>
                    <p className="text-white/60 text-xs chinese-text">自动同步至ERP系统</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Caption */}
        <p
          className={`text-center text-white/40 text-sm mt-8 chinese-text transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          WhatsApp 聊天自动同步 · 业务员离职不丢失客户资产
        </p>
      </div>
    </section>
  );
}
