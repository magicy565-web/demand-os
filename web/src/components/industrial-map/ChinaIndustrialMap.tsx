'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndustrialBelt } from '@/types/industrial';
import IndustrialBeltTooltip from './IndustrialBeltTooltip';

interface ChinaIndustrialMapProps {
  industrialBelts: IndustrialBelt[];
  onBeltClick?: (belt: IndustrialBelt) => void;
}

/**
 * 手动校准的产业带位置映射表
 * 针对SimpleMaps中国地图 SVG (1000x738)
 * 基于实际地理位置和 SVG 显示效果精确校准
 */
const BELT_POSITION_FIXES: Record<number, { x: number; y: number }> = {
  1: { x: 72.5, y: 62.0 },  // 深圳电子信息产业带
  2: { x: 78.5, y: 44.0 },  // 宁波模具与注塑产业带
  3: { x: 66.0, y: 67.0 },  // 佛山泛家居产业带
  4: { x: 68.5, y: 51.0 },  // 义乌小商品产业带
  5: { x: 73.0, y: 40.0 },  // 苏州纺织丝绸产业带
  6: { x: 70.0, y: 65.0 },  // 广州番禺服装产业带
  7: { x: 72.0, y: 56.0 },  // 永康五金工具产业带
  8: { x: 80.5, y: 68.5 },  // 汕头澄海玩具产业带
};

/**
 * 使用校准表获取产业带位置
 */
function getBeltPosition(beltId: number, lat: number, lng: number) {
  // 优先使用校准表中的固定位置
  if (BELT_POSITION_FIXES[beltId]) {
    return BELT_POSITION_FIXES[beltId];
  }
  
  // 备用：使用公式推算（用于未来添加的产业带）
  return latLngToSVGPercent(lat, lng);
}

/**
 * 经纬度转换为 SVG 坐标（百分比）- 备用算法
 * 基于改进的 Mercator 投影映射
 */
function latLngToSVGPercent(lat: number, lng: number) {
  // SimpleMaps 中国地图的坐标系范围
  const CHINA_BOUNDS = {
    minLat: 18.2,   // 最南端（南海南部）
    maxLat: 53.5,   // 最北端（黑龙江北部）
    minLng: 73.5,   // 最西端（新疆西部）
    maxLng: 135.1,  // 最东端（黑龙江东部）
  };
  
  const SVG_WIDTH = 1000;
  const SVG_HEIGHT = 738;
  
  // 线性映射（Mercator 简化版）
  const x = ((lng - CHINA_BOUNDS.minLng) / (CHINA_BOUNDS.maxLng - CHINA_BOUNDS.minLng)) * SVG_WIDTH;
  const y = ((CHINA_BOUNDS.maxLat - lat) / (CHINA_BOUNDS.maxLat - CHINA_BOUNDS.minLat)) * SVG_HEIGHT;
  
  // 转换为百分比
  return {
    x: (x / SVG_WIDTH) * 100,
    y: (y / SVG_HEIGHT) * 100,
  };
}

export default function ChinaIndustrialMap({
  industrialBelts,
  onBeltClick,
}: ChinaIndustrialMapProps) {
  const [hoveredBelt, setHoveredBelt] = useState<IndustrialBelt | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const handleBeltHover = (belt: IndustrialBelt, event: React.MouseEvent) => {
    setHoveredBelt(belt);
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const handleBeltLeave = () => {
    setHoveredBelt(null);
  };

  const handleBeltClickInternal = (belt: IndustrialBelt) => {
    if (onBeltClick) {
      onBeltClick(belt);
    }
  };

  return (
    <div ref={mapRef} className="relative w-full h-full min-h-[600px]">
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
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div className="relative w-full h-full max-w-6xl max-h-[700px]">
          {/* 中国地图 SVG */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <img
                src="/china-provinces-map.svg"
                alt="中国省份地图"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: 'brightness(1.2) contrast(1.3) saturate(0.8) hue-rotate(160deg) drop-shadow(0 0 20px rgba(0, 212, 255, 0.4))',
                  opacity: 0.65,
                }}
              />
            </div>
          </div>

          {/* 产业带标注层 */}
          <div className="absolute inset-0">
            {industrialBelts.map((belt, index) => {
              const pos = getBeltPosition(belt.id, belt.coordinates.lat, belt.coordinates.lng);
              
              // 调试输出
              console.log(`${belt.name} (ID: ${belt.id}): lat=${belt.coordinates.lat}, lng=${belt.coordinates.lng} => x=${pos.x.toFixed(2)}%, y=${pos.y.toFixed(2)}%`);
              
              return (
                <motion.div
                  key={belt.id}
                  className="absolute cursor-pointer group z-10"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.12, duration: 0.6, type: 'spring' }}
                  onMouseEnter={(e) => handleBeltHover(belt, e)}
                  onMouseMove={(e) => handleBeltHover(belt, e)}
                  onMouseLeave={handleBeltLeave}
                  onClick={() => handleBeltClickInternal(belt)}
                >
                  {/* 外层脉冲圆环 */}
                  <motion.div
                    className="absolute rounded-full border-2 border-cyan-400/60"
                    animate={{
                      scale: [1, 2.5],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 0.3,
                      ease: 'easeOut',
                    }}
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      left: '-25px', 
                      top: '-25px',
                    }}
                  />

                  {/* 中层脉冲圆环 */}
                  <motion.div
                    className="absolute rounded-full border-2 border-cyan-300/40"
                    animate={{
                      scale: [1, 2],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 0.3,
                      delay: 0.5,
                      ease: 'easeOut',
                    }}
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      left: '-20px', 
                      top: '-20px',
                    }}
                  />

                  {/* 核心发光圆点 */}
                  <motion.div
                    className="relative w-4 h-4 bg-cyan-400 rounded-full"
                    whileHover={{ scale: 1.8 }}
                    style={{
                      boxShadow: `
                        0 0 15px rgba(0, 212, 255, 0.9),
                        0 0 30px rgba(0, 212, 255, 0.6),
                        0 0 45px rgba(0, 212, 255, 0.3)
                      `,
                    }}
                  >
                    {/* 内部高光 */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent" />
                  </motion.div>

                  {/* 产业带名称标签 */}
                  <motion.div
                    className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.12 + 0.4 }}
                  >
                    <div className="px-3 py-1.5 bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 rounded-lg shadow-xl">
                      <div className="text-xs font-bold text-cyan-300 mb-0.5 tracking-wide">
                        {belt.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        {belt.factory_count.toLocaleString()}+ 工厂
                      </div>
                    </div>
                  </motion.div>

                  {/* 连接线动画（向外辐射） */}
                  <svg
                    className="absolute top-0 left-0 pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                    style={{ width: '300px', height: '300px', left: '-150px', top: '-150px' }}
                  >
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                      const rad = (angle * Math.PI) / 180;
                      const x2 = 150 + Math.cos(rad) * 120;
                      const y2 = 150 + Math.sin(rad) * 120;
                      
                      return (
                        <motion.line
                          key={i}
                          x1="150"
                          y1="150"
                          x2={x2}
                          y2={y2}
                          stroke="#00d4ff"
                          strokeWidth="1.5"
                          strokeDasharray="6 6"
                          animate={{
                            strokeDashoffset: [0, -12],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 0.1,
                          }}
                        />
                      );
                    })}
                  </svg>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredBelt && (
          <IndustrialBeltTooltip
            belt={hoveredBelt}
            position={tooltipPosition}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
