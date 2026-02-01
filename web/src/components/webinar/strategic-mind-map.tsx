"use client";

import React from "react"

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Camera, Database, Lock, Globe } from "lucide-react";

interface BranchNode {
  id: string;
  label: string;
  subLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  angle: number;
  subBranches: string[];
}

export function StrategicMindMap() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
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

  // Animation sequence
  useEffect(() => {
    if (!isVisible) return;

    const phases = [
      { delay: 500, phase: 1 },   // Show center node
      { delay: 1500, phase: 2 },  // Draw main branches
      { delay: 3000, phase: 3 },  // Show sub-branches
      { delay: 4500, phase: 4 },  // Start particle flow
    ];

    const timers = phases.map(({ delay, phase }) =>
      setTimeout(() => setAnimationPhase(phase), delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  const branches: BranchNode[] = [
    {
      id: "visual",
      label: "视觉升维",
      subLabel: "Visual Upgrade",
      icon: Camera,
      angle: -45,
      subBranches: ["好莱坞级摄制", "XR虚拟场景"],
    },
    {
      id: "data",
      label: "精准数据",
      subLabel: "Precision Data",
      icon: Database,
      angle: 45,
      subBranches: ["广交会名单", "海关数据"],
    },
    {
      id: "global",
      label: "全球发布",
      subLabel: "Global Launch",
      icon: Globe,
      angle: 135,
      subBranches: ["300+ 垂直买手", "欧美时区直播"],
    },
    {
      id: "asset",
      label: "私域沉淀",
      subLabel: "Asset Retention",
      icon: Lock,
      angle: -135,
      subBranches: ["询盘转化", "CRM归档"],
    },
  ];

  const getPosition = (angle: number, distance: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * distance,
      y: Math.sin(rad) * distance,
    };
  };

  return (
    <section ref={sectionRef} className="bg-[#0A192F] py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge variant="outline" className="mb-4 border-[#D4AF37]/30 text-[#D4AF37]">
            战略闭环
          </Badge>
          <h2 className="font-serif text-3xl lg:text-5xl text-white mb-4 chinese-heading">
            四维战略，一站闭环
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto chinese-text">
            从单一工厂到全球生态系统，看我们如何用四步战略连接所有节点。
          </p>
        </div>

        {/* Mind Map Container */}
        <div className="relative h-[600px] lg:h-[700px] flex items-center justify-center">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="text-white/20">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* SVG Lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="-350 -350 700 700"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Main Branch Lines */}
            {branches.map((branch, index) => {
              const endPos = getPosition(branch.angle, 180);
              return (
                <g key={branch.id}>
                  <line
                    x1="0"
                    y1="0"
                    x2={endPos.x}
                    y2={endPos.y}
                    stroke="#D4AF37"
                    strokeWidth="2"
                    strokeDasharray="1000"
                    strokeDashoffset={animationPhase >= 2 ? 0 : 1000}
                    style={{
                      transition: "stroke-dashoffset 1.5s ease-out",
                      transitionDelay: `${index * 200}ms`,
                    }}
                  />
                  
                  {/* Sub-branch lines */}
                  {branch.subBranches.map((_, subIndex) => {
                    const subAngle = branch.angle + (subIndex === 0 ? -25 : 25);
                    const subEndPos = getPosition(subAngle, 280);
                    return (
                      <line
                        key={subIndex}
                        x1={endPos.x}
                        y1={endPos.y}
                        x2={subEndPos.x}
                        y2={subEndPos.y}
                        stroke="#D4AF37"
                        strokeWidth="1"
                        strokeOpacity="0.5"
                        strokeDasharray="500"
                        strokeDashoffset={animationPhase >= 3 ? 0 : 500}
                        style={{
                          transition: "stroke-dashoffset 1s ease-out",
                          transitionDelay: `${index * 200 + subIndex * 100 + 800}ms`,
                        }}
                      />
                    );
                  })}
                </g>
              );
            })}

            {/* Particle Flow */}
            {animationPhase >= 4 && branches.map((branch, index) => {
              const endPos = getPosition(branch.angle, 180);
              return (
                <circle
                  key={`particle-${branch.id}`}
                  r="4"
                  fill="#D4AF37"
                  style={{
                    animation: `flowParticle${index} 3s ease-in-out infinite`,
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <animate
                    attributeName="cx"
                    values={`0;${endPos.x}`}
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${index * 0.5}s`}
                  />
                  <animate
                    attributeName="cy"
                    values={`0;${endPos.y}`}
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${index * 0.5}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${index * 0.5}s`}
                  />
                </circle>
              );
            })}
          </svg>

          {/* Center Node */}
          <div
            className={`absolute z-10 transition-all duration-1000 ${
              animationPhase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center animate-glow-pulse">
              <div className="text-center">
                <p className="text-[#0A192F] font-serif text-lg font-bold chinese-heading">您的品牌</p>
                <p className="text-[#0A192F]/70 text-xs">Your Brand</p>
              </div>
            </div>
          </div>

          {/* Branch Nodes */}
          {branches.map((branch, index) => {
            const pos = getPosition(branch.angle, 180);
            const Icon = branch.icon;
            return (
              <div
                key={branch.id}
                className={`absolute z-10 transition-all duration-700 ${
                  animationPhase >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: "translate(-50%, -50%)",
                  transitionDelay: `${index * 200 + 300}ms`,
                }}
              >
                <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-sm bg-[#0A192F] border border-[#D4AF37]/50 flex flex-col items-center justify-center p-3 hover:border-[#D4AF37] hover:scale-105 transition-all cursor-pointer">
                  <Icon className="w-6 h-6 text-[#D4AF37] mb-2" />
                  <p className="text-white text-sm font-medium text-center chinese-text">{branch.label}</p>
                  <p className="text-white/50 text-xs text-center">{branch.subLabel}</p>
                </div>
              </div>
            );
          })}

          {/* Sub-branch Nodes */}
          {branches.map((branch, branchIndex) => {
            return branch.subBranches.map((subBranch, subIndex) => {
              const subAngle = branch.angle + (subIndex === 0 ? -25 : 25);
              const pos = getPosition(subAngle, 280);
              return (
                <div
                  key={`${branch.id}-${subIndex}`}
                  className={`absolute z-10 transition-all duration-500 ${
                    animationPhase >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: "translate(-50%, -50%)",
                    transitionDelay: `${branchIndex * 200 + subIndex * 100 + 1000}ms`,
                  }}
                >
                  <div className="px-3 py-2 rounded-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <p className="text-white/80 text-xs whitespace-nowrap chinese-text">{subBranch}</p>
                  </div>
                </div>
              );
            });
          })}
        </div>

        {/* Caption */}
        <p
          className={`text-center text-white/50 text-sm mt-8 chinese-text transition-all duration-1000 delay-1000 ${
            animationPhase >= 4 ? "opacity-100" : "opacity-0"
          }`}
        >
          金色光点代表数据流动 — 从您的品牌核心流向全球各个触点
        </p>
      </div>
    </section>
  );
}
