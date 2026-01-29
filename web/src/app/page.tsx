"use client";

import { useState, useEffect, useRef } from "react";
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

// 标题组件 - 支持滚动隐藏
function CyberTitle({ isScrolling }: { isScrolling: boolean }) {
  return (
    <div className={`fixed top-12 left-0 right-0 z-30 text-center pointer-events-none transition-all duration-300 ${
      isScrolling ? 'opacity-0 -translate-y-20' : 'opacity-100 translate-y-0'
    }`}>
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 自动滚动功能 - 支持悬停暂停
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const scrollContainer = scrollContainerRef.current;
    let scrollSpeed = 2; // 像素/毫秒
    
    const autoScroll = () => {
      if (isPaused) return; // 暂停时不滚动
      
      if (scrollContainer.scrollHeight - scrollContainer.scrollTop > scrollContainer.clientHeight + 500) {
        scrollContainer.scrollTop += scrollSpeed;
      } else {
        // 到达底部，重新开始
        scrollContainer.scrollTop = 0;
      }
    };
    
    scrollIntervalRef.current = setInterval(autoScroll, 50);
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, [isPaused]);

  // 滚动事件处理 - 检测滚动方向和距离
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const scrollContainer = scrollContainerRef.current;
    let lastScrollTop = 0;
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScroll = scrollContainer.scrollTop;
      
      // 如果滚动距离超过 50px，显示隐藏效果
      if (currentScroll > 50) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
      
      lastScrollTop = currentScroll;
      
      // 清除之前的计时器
      clearTimeout(scrollTimer);
      
      // 滚动停止后 2 秒重新显示顶部控件
      scrollTimer = setTimeout(() => {
        if (currentScroll < 30) {
          setIsScrolling(false);
        }
      }, 2000);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-cyber-bg selection:bg-neon-primary selection:text-black">
      {/* 粒子背景 */}
      <ParticleBackground />
      
      {/* 扫描线效果 */}
      <ScanLine />
      
      {/* 角落装饰 */}
      <CornerDecorations />
      
      {/* 标题 */}
      <CyberTitle isScrolling={isScrolling} />
      
      {/* 实时统计 */}
      <LiveStats demands={demandCount} connections={connectionCount} />
      
      {/* 3D 舞台 - 瀑布流 */}
      <div 
        ref={scrollContainerRef}
        className="pt-40 pb-20 h-full overflow-y-auto scrollbar-hide transition-all duration-300"
        style={{ perspective: "2000px" }}
        onMouseEnter={() => {
          if (!isMobile) setIsPaused(true);
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            // 延迟 100ms 确保状态更新
            setTimeout(() => setIsPaused(false), 100);
          }
        }}
      >
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
            isMobile={isMobile}
          />
        </div>
      </div>
      
      {/* 底部渐变遮罩 */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyber-bg to-transparent pointer-events-none z-10" />
    </div>
  );
}
