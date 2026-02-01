"use client";

import { useState, useEffect } from "react";

// WeChat Message Component
function WeChatMessage({
  isUser,
  message,
  delay,
}: {
  isUser: boolean;
  message: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in-up`}
    >
      <div
        className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
          isUser
            ? "bg-[#95EC69] text-[#000000]"
            : "bg-[#2C2C2C] text-white"
        }`}
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: message.replace(
              /\*\*(.*?)\*\*/g,
              '<span class="text-[#D4AF37] font-bold">$1</span>'
            ),
          }}
        />
      </div>
    </div>
  );
}

// WeChat Interface Card
function WeChatCard() {
  const messages = [
    { isUser: false, message: "Global Launch 团队，汇报一下情况。", delay: 500 },
    { isUser: false, message: "直播才过了 7 天。", delay: 1200 },
    {
      isUser: false,
      message: "我们已经收到了 **120+** 条代理商询盘。比任何一次展会都快。",
      delay: 2000,
    },
    {
      isUser: true,
      message: "太好了！聚合引流策略生效了。",
      delay: 3200,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-white/40 font-mono tracking-wider">CASE-001</span>
        <span className="text-xs text-[#D4AF37]">速度证明</span>
      </div>
      
      <h3 className="font-serif text-xl text-white mb-1">JDS+ 宠物供应链</h3>
      <p className="text-white/50 text-sm mb-6">7天询盘爆发记录</p>

      {/* Phone Frame */}
      <div className="flex-1 bg-[#111111] rounded-2xl overflow-hidden border border-white/10">
        {/* Status Bar */}
        <div className="bg-[#1C1C1E] px-4 py-2 flex items-center justify-between">
          <span className="text-white/60 text-xs">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 border border-white/40 rounded-sm">
              <div className="w-3/4 h-full bg-white/60 rounded-sm" />
            </div>
          </div>
        </div>

        {/* WeChat Header */}
        <div className="bg-[#1C1C1E] px-4 py-3 border-b border-white/5 flex items-center gap-3">
          <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              J
            </div>
            <span className="text-white text-sm font-medium">JDS+ 王总</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="p-4 space-y-3 bg-[#111111] min-h-[240px]">
          {messages.map((msg, i) => (
            <WeChatMessage key={i} {...msg} />
          ))}
        </div>
      </div>

      {/* Key Metric */}
      <div className="mt-4 pt-4 border-t border-white/10 flex items-end justify-between">
        <span className="text-white/40 text-sm">询盘转化</span>
        <div className="text-right">
          <span className="text-3xl font-mono text-[#D4AF37] font-bold">120+</span>
          <span className="text-white/40 text-sm ml-2">/ 7天</span>
        </div>
      </div>
    </div>
  );
}

// Pricing Power Card
function PricingCard() {
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNew(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-white/40 font-mono tracking-wider">CASE-002</span>
        <span className="text-xs text-[#D4AF37]">溢价证明</span>
      </div>

      <h3 className="font-serif text-xl text-white mb-1">Dara 珠宝</h3>
      <p className="text-white/50 text-sm mb-6">品牌溢价能力提升</p>

      {/* Pricing Comparison */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-8">
          {/* Old Price */}
          <div className="text-center">
            <p className="text-white/30 text-xs mb-2 uppercase tracking-wider">OEM 代工价</p>
            <div className="relative">
              <span className="text-4xl font-mono text-white/30 line-through decoration-red-500/60 decoration-2">
                $25
              </span>
            </div>
            <p className="text-white/20 text-xs mt-2">无品牌溢价</p>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1">
            <svg
              className="w-8 h-8 text-[#D4AF37]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <span className="text-[8px] text-white/30 uppercase tracking-widest">
              转型
            </span>
          </div>

          {/* New Price */}
          <div
            className={`text-center transition-all duration-700 ${
              showNew ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <p className="text-[#D4AF37] text-xs mb-2 uppercase tracking-wider">品牌零售价</p>
            <div className="relative">
              <span className="text-5xl font-mono text-[#D4AF37] font-bold animate-glow-pulse">
                $35
              </span>
            </div>
            <p className="text-white/40 text-xs mt-2">"英伦风"发布会后</p>
          </div>
        </div>
      </div>

      {/* Premium Badge */}
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-white/40 text-sm">溢价提升</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-mono text-emerald-400 font-bold">+40%</span>
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Email Notification Card
function EmailCard() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExpanded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-white/40 font-mono tracking-wider">CASE-003</span>
        <span className="text-xs text-[#D4AF37]">信任证明</span>
      </div>

      <h3 className="font-serif text-xl text-white mb-1">TTNergy 储能</h3>
      <p className="text-white/50 text-sm mb-6">XR 技术缩短成交周期</p>

      {/* Email Card */}
      <div className="flex-1">
        <div
          className={`bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-700 ${
            expanded ? "scale-100 opacity-100" : "scale-95 opacity-80"
          }`}
        >
          {/* Email Header */}
          <div className="bg-[#F5F5F5] px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              {/* Outlook Icon */}
              <div className="w-10 h-10 bg-[#0078D4] rounded flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2 0V4.07c3.94.49 7 3.85 7 7.93s-3.06 7.44-7 7.93z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium text-sm">Mark Davis</span>
                  <span className="text-gray-400 text-xs">10:32 AM</span>
                </div>
                <p className="text-gray-500 text-xs">Senior Buyer, Power Solutions Inc.</p>
              </div>
            </div>
          </div>

          {/* Email Content */}
          <div className="p-4">
            <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">Subject</p>
            <h4 className="text-gray-900 font-medium text-sm mb-3">
              RE: Technical Specs via XR Demo
            </h4>
            <div className="h-px bg-gray-100 mb-3" />
            <p className="text-gray-700 text-sm leading-relaxed">
              The{" "}
              <span className="text-[#0078D4] font-medium">XR transparency demo</span>{" "}
              solved our safety concerns. No need to wait{" "}
              <span className="line-through text-gray-400">9 months</span> for on-site
              inspection.
            </p>
            <p className="text-gray-900 font-medium text-sm mt-3">
              {"Let's proceed to the contract."}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="px-4 pb-4 flex gap-2">
            <button className="px-3 py-1.5 bg-[#0078D4] text-white text-xs rounded font-medium">
              Reply
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded font-medium">
              Forward
            </button>
          </div>
        </div>
      </div>

      {/* Cycle Reduction */}
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-white/40 text-sm">成交周期</span>
        <div className="flex items-center gap-2">
          <span className="text-white/30 line-through text-sm">9个月</span>
          <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span className="text-emerald-400 font-mono font-bold">3周</span>
        </div>
      </div>
    </div>
  );
}

export function SocialProof() {
  return (
    <section className="relative bg-[#0A192F] py-24 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Section ID */}
      <div className="absolute top-8 left-8 text-white/10 font-mono text-xs tracking-widest">
        SEC-04 // EVIDENCE
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4 font-mono">
            Case Studies
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 tracking-tight">
            内幕铁证
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto chinese-text">
            不是宣传语，是来自真实客户的后台数据
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1 - WeChat (Large, spans 1 row on desktop) */}
          <div className="lg:row-span-2 bg-[#0A192F] border border-white/10 rounded-lg p-6 hover:border-[#D4AF37]/30 transition-colors duration-500">
            <WeChatCard />
          </div>

          {/* Card 2 - Pricing Power */}
          <div className="lg:col-span-2 bg-[#0A192F] border border-white/10 rounded-lg p-6 hover:border-[#D4AF37]/30 transition-colors duration-500">
            <PricingCard />
          </div>

          {/* Card 3 - Email */}
          <div className="lg:col-span-2 bg-[#0A192F] border border-white/10 rounded-lg p-6 hover:border-[#D4AF37]/30 transition-colors duration-500">
            <EmailCard />
          </div>
        </div>

        {/* Confidential Stamp */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white/40 text-sm font-mono tracking-wider">
              VERIFIED DATA · UPDATED Q4 2025
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
