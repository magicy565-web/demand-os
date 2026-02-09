'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndustrialBelt } from '@/types/industrial';
import IndustrialBeltTooltipEnhanced from './IndustrialBeltTooltip-Enhanced';

interface ChinaIndustrialMapProps {
  industrialBelts: IndustrialBelt[];
  onBeltClick?: (belt: IndustrialBelt) => void;
}

/**
 * 精确的产业带位置映射表
 * 基于SimpleMaps SVG文件中真实城市坐标的线性回归计算
 * 参考点: 北京(682.1,324.3), 上海(756.1,492.6)
 * 转换系数: 经度14.596像素/度, 纬度19.412像素/度
 */
const BELT_POSITION_ACCURATE: Record<number, { x: number; y: number }> = {
  1: { x: 64.79, y: 89.60 },  // 深圳 (SVG: 647.9,661.2)
  2: { x: 75.72, y: 70.33 },  // 宁波 (SVG: 757.2,519.0)
  3: { x: 63.42, y: 88.34 },  // 佛山 (SVG: 634.2,651.9)
  4: { x: 73.57, y: 71.82 },  // 义乌 (SVG: 735.7,530.1)
  5: { x: 74.32, y: 66.57 },  // 苏州 (SVG: 743.2,491.3)
  6: { x: 63.63, y: 88.06 },  // 广州 (SVG: 636.3,649.9)
  7: { x: 73.46, y: 72.61 },  // 永康 (SVG: 734.6,535.9)
  8: { x: 68.62, y: 87.46 },  // 汕头 (SVG: 686.2,645.5)
};

/**
 * 使用精确坐标获取产业带位置
 */
function getBeltPosition(beltId: number, lat: number, lng: number) {
  // 使用根据真实SVG参考点计算的精确位置
  if (BELT_POSITION_ACCURATE[beltId]) {
    return BELT_POSITION_ACCURATE[beltId];
  }
  
  // 备用：使用算法推算（用于未来添加的产业带）
  return latLngToSVGPercent(lat, lng);
}

/**
 * 经纬度转换为 SVG 坐标（百分比）
 * 基于SimpleMaps真实参考点的线性回归算法
 * 参考点: 北京(116.40°,39.90°)→(682.1,324.3), 上海(121.47°,31.23°)→(756.1,492.6)
 */
function latLngToSVGPercent(lat: number, lng: number) {
  // 基于SVG真实坐标的转换系数 (viewBox: 1000x738)
  const LNG_SCALE = 14.596;  // 像素/度 (经度)
  const LAT_SCALE = 19.412;  // 像素/度 (纬度) - 修正后的值
  const BEIJING_LNG = 116.40;
  const BEIJING_LAT = 39.90;
  const BEIJING_SVG_X = 682.1;
  const BEIJING_SVG_Y = 324.3;
  
  // 计算SVG像素坐标
  const svgX = (lng - BEIJING_LNG) * LNG_SCALE + BEIJING_SVG_X;
  const svgY = (BEIJING_LAT - lat) * LAT_SCALE + BEIJING_SVG_Y;

  
  // 转换为百分比 (viewBox: 1000x738)
  return {
    x: Math.max(0, Math.min(100, (svgX / 1000) * 100)),
    y: Math.max(0, Math.min(100, (svgY / 738) * 100)),
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
        <div className="relative w-full h-full">
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
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => handleBeltHover(belt, e)}
                  onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => handleBeltHover(belt, e)}
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
          <IndustrialBeltTooltipEnhanced
            belt={hoveredBelt}
            position={tooltipPosition}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
