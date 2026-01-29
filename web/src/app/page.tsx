"use client";

import { useState, useEffect } from "react";
import { DemandWaterfallEnhanced } from "@/components/DemandWaterfallEnhanced";
import { ParticleBackground } from "@/components/ParticleBackground";

// 实时统计数据组件
function LiveStats({ 
  demands, 
  connections 
}: { 
  demands: number; 
  connections: number;
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-2 max-w-xs">
      {/* 实时时间 */}
      <div className="px-3 py-2 bg-cyber-glass backdrop-blur-xl border border-neon-primary/20 rounded-lg">
        <div className="text-xs text-neon-primary/60 uppercase tracking-wider mb-1">System Time</div>
        <div className="text-xl md:text-2xl font-mono text-neon-primary animate-pulse-subtle">
          {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
        </div>
      </div>
      
      {/* 实时数据 */}
      <div className="px-3 py-2 bg-cyber-glass backdrop-blur-xl border border-neon-secondary/20 rounded-lg">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-xs text-neon-secondary/60 uppercase tracking-wider">Live Demands</div>
            <div className="text-lg md:text-xl font-mono text-neon-secondary">{demands}</div>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div>
            <div className="text-xs text-neon-secondary/60 uppercase tracking-wider">Connections</div>
            <div className="text-lg md:text-xl font-mono text-neon-secondary flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-neon-primary animate-pulse" />
              {connections}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 标题组件
function CyberTitle() {
  return (
    <div className="fixed top-12 left-0 right-0 z-30 text-center pointer-events-none">
      <h1 className="text-6xl md:text-8xl font-cyber font-bold tracking-wider">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-primary via-neon-secondary to-neon-purple animate-glow drop-shadow-lg">
          DEMAND OS
        </span>
      </h1>
      <p className="mt-3 text-sm md:text-base text-white/40 font-mono tracking-widest uppercase">
        Global Demand Intelligence · Real-time Stream
      </p>
      <div className="mt-2 flex items-center justify-center gap-3 text-xs md:text-sm flex-wrap px-4">
        <span className="text-neon-primary/60">Amazon VC</span>
        <span className="text-white/20">|</span>
        <span className="text-neon-secondary/60">Walmart DSV</span>
        <span className="text-white/20">|</span>
        <span className="text-neon-purple/60">Costco</span>
        <span className="text-white/20">|</span>
        <span className="text-neon-yellow/60">TikTok Shop</span>
      </div>
    </div>
  );
}

// 扫描线效果
function ScanLine() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-primary/30 to-transparent animate-scan-line" />
    </div>
  );
}

// 角落装饰
function CornerDecorations() {
  return (
    <>
      {/* 左上角 */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-20">
        <div className="absolute top-4 left-4 w-16 h-px bg-gradient-to-r from-neon-primary to-transparent" />
        <div className="absolute top-4 left-4 w-px h-16 bg-gradient-to-b from-neon-primary to-transparent" />
      </div>
      {/* 右上角 */}
      <div className="fixed top-0 right-0 w-32 h-32 pointer-events-none z-20">
        <div className="absolute top-4 right-4 w-16 h-px bg-gradient-to-l from-neon-primary to-transparent" />
        <div className="absolute top-4 right-4 w-px h-16 bg-gradient-to-b from-neon-primary to-transparent" />
      </div>
      {/* 左下角 */}
      <div className="fixed bottom-0 left-0 w-32 h-32 pointer-events-none z-20">
        <div className="absolute bottom-4 left-4 w-16 h-px bg-gradient-to-r from-neon-secondary to-transparent" />
        <div className="absolute bottom-4 left-4 w-px h-16 bg-gradient-to-t from-neon-secondary to-transparent" />
      </div>
      {/* 右下角 */}
      <div className="fixed bottom-0 right-0 w-32 h-32 pointer-events-none z-20">
        <div className="absolute bottom-4 right-4 w-16 h-px bg-gradient-to-l from-neon-secondary to-transparent" />
        <div className="absolute bottom-4 right-4 w-px h-16 bg-gradient-to-t from-neon-secondary to-transparent" />
      </div>
    </>
  );
}

export default function Home() {
  const [demandCount, setDemandCount] = useState(0);
  const [connectionCount] = useState(1);

  return (
    <div className="h-screen overflow-hidden bg-cyber-bg selection:bg-neon-primary selection:text-black">
      {/* 粒子背景 */}
      <ParticleBackground />
      
      {/* 扫描线效果 */}
      <ScanLine />
      
      {/* 角落装饰 */}
      <CornerDecorations />
      
      {/* 标题 */}
      <CyberTitle />
      
      {/* 实时统计 */}
      <LiveStats demands={demandCount} connections={connectionCount} />
      
      {/* 3D 舞台 - 瀑布流 */}
      <div className="pt-40 pb-20 h-full overflow-y-auto scrollbar-hide" style={{ perspective: "2000px" }}>
        <div 
          className="transition-all duration-700 ease-out w-full px-4"
          style={{ 
            transformStyle: "preserve-3d",
            transform: "rotateX(2deg)",
          }}
        >
          <DemandWaterfallEnhanced 
            mode="cyber"
            onDemandCountChange={setDemandCount}
          />
        </div>
      </div>
      
      {/* 底部渐变遮罩 */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyber-bg to-transparent pointer-events-none z-10" />
    </div>
  );
}
