'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { IndustrialPark } from '@/types/industrial';
import IndustrialParkSidePanel from './IndustrialParkSidePanel';
import industrialParksData from '@/data/industrial-parks.json';

interface IndustrialParkMapProps {
  onParkClick?: (parkId: number) => void;
}

/**
 * 精确的产业园区位置映射表
 * 基于中国地图的真实坐标（百分比）
 */
const PARK_POSITION_ACCURATE: Record<number, { x: number; y: number }> = {
  1: { x: 64.79, y: 89.60 },  // 深圳
  2: { x: 75.72, y: 70.33 },  // 宁波
  3: { x: 63.42, y: 88.34 },  // 佛山
  4: { x: 74.32, y: 66.57 },  // 苏州
};

/**
 * 产业园区标记颜色配置
 */
const PARK_COLORS: Record<string, { 
  dot: string; 
  ring: string; 
  glow: string;
  text: string;
}> = {
  cyan: { dot: 'bg-cyan-400', ring: 'border-cyan-400', glow: 'rgba(34, 211, 238, 0.4)', text: 'text-cyan-300' },
  amber: { dot: 'bg-amber-400', ring: 'border-amber-400', glow: 'rgba(251, 191, 36, 0.4)', text: 'text-amber-300' },
  emerald: { dot: 'bg-emerald-400', ring: 'border-emerald-400', glow: 'rgba(52, 211, 153, 0.4)', text: 'text-emerald-300' },
  purple: { dot: 'bg-purple-400', ring: 'border-purple-400', glow: 'rgba(168, 85, 247, 0.4)', text: 'text-purple-300' },
};

/**
 * 获取产业园区位置
 */
function getParkPosition(parkId: number) {
  return PARK_POSITION_ACCURATE[parkId] || { x: 50, y: 50 };
}

/**
 * 获取产业园区颜色配置
 */
function getParkColors(colorKey: string) {
  return PARK_COLORS[colorKey as keyof typeof PARK_COLORS] || PARK_COLORS.cyan;
}

export default function IndustrialParkMap({ onParkClick }: IndustrialParkMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPark, setSelectedPark] = useState<IndustrialPark | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  
  const parks = useMemo(() => {
    return (industrialParksData as { parks: IndustrialPark[] }).parks;
  }, []);

  const handleParkClick = (park: IndustrialPark) => {
    console.log('Park clicked:', park.name);
    setSelectedPark(park);
    setIsSidePanelOpen(true);
    if (onParkClick) {
      onParkClick(park.id);
    }
  };

  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false);
    // 延迟关闭以允许动画完成
    setTimeout(() => setSelectedPark(null), 300);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[600px]">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#0a1628]" />
      
      {/* 背景网格 */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 212, 255, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 212, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* 中国地图容器 */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 pointer-events-none">
        <div className="relative w-full h-full">
          {/* 中国地图 SVG */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-full h-full">
              <img
                src="/china-provinces-map.svg"
                alt="中国省份地图"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{
                  filter: 'brightness(1.2) contrast(1.3) saturate(0.8) hue-rotate(160deg) drop-shadow(0 0 20px rgba(0, 212, 255, 0.4))',
                  opacity: 0.65,
                }}
              />
            </div>
          </div>

          {/* 产业园区标注层 */}
          <div className="absolute inset-0 pointer-events-auto">
            {parks.map((park) => {
              const pos = getParkPosition(park.id);
              const colors = getParkColors(park.markerColor);
              
              return (
                <motion.div
                  key={park.id}
                  className="absolute cursor-pointer group z-50 pointer-events-auto"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => handleParkClick(park)}
                >
                  {/* 产业园区标注点 - 彩色圆形（点击时有反馈） */}
                  <motion.div
                    className={`absolute w-4 h-4 ${colors.dot} rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg`}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  
                  {/* 脉冲动画环 */}
                  <motion.div
                    className={`absolute w-4 h-4 border-2 ${colors.ring} rounded-full transform -translate-x-1/2 -translate-y-1/2`}
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* 标签 - 显示产业园区名称和图标 */}
                  <motion.div
                    className={`absolute left-6 top-0 bg-slate-900/80 backdrop-blur-md border ${colors.ring} border-opacity-50 rounded-lg px-3 py-2 whitespace-nowrap text-xs pointer-events-none`}
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`font-semibold ${colors.text} flex items-center gap-2`}>
                      <span>{park.markerIcon}</span>
                      <span>{park.name}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">点击查看详情</div>
                  </motion.div>

                  {/* 连接线 */}
                  <motion.div
                    className={`absolute left-4 top-1/2 w-2 h-px bg-gradient-to-r ${colors.ring} to-transparent`}
                    animate={{ scaleX: [0.5, 1] }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 右侧侧滑卡片面板 */}
      <IndustrialParkSidePanel
        park={selectedPark}
        isOpen={isSidePanelOpen}
        onClose={handleCloseSidePanel}
      />
    </div>
  );
}
