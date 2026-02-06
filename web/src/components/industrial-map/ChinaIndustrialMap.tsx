'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndustrialBelt } from '@/types/industrial';
import IndustrialBeltTooltip from './IndustrialBeltTooltip';

interface ChinaIndustrialMapProps {
  industrialBelts: IndustrialBelt[];
  onBeltClick?: (belt: IndustrialBelt) => void;
}

// 中国地图的精确经纬度范围（基于实际地理数据）
const CHINA_BOUNDS = {
  minLng: 73.5,
  maxLng: 135.0,
  minLat: 18.0,
  maxLat: 53.5,
};

// SVG 地图的 viewBox 尺寸
const SVG_VIEWBOX = {
  width: 1000,
  height: 738,
};

/**
 * 经纬度转换为 SVG 坐标（百分比）
 * 校准后的版本，适配 SimpleMaps 的中国地图投影
 */
function latLngToSVGPercent(lat: number, lng: number) {
  // SimpleMaps 的中国地图使用的实际可视区域（经过测量）
  // 东南沿海地区在地图上的位置需要微调
  const MAP_CALIBRATION = {
    // 经度偏移：微调以匹配 SimpleMaps 的投影
    lngOffset: -5,
    // 纬度偏移：微调以匹配 SimpleMaps 的投影
    latOffset: 8,
    // 缩放系数：让标注更分散
    scale: 1.0,
  };
  
  // 基础线性映射
  let x = ((lng - CHINA_BOUNDS.minLng) / (CHINA_BOUNDS.maxLng - CHINA_BOUNDS.minLng)) * 100;
  let y = ((CHINA_BOUNDS.maxLat - lat) / (CHINA_BOUNDS.maxLat - CHINA_BOUNDS.minLat)) * 100;
  
  // 应用校准偏移和缩放
  x = (x + MAP_CALIBRATION.lngOffset) * MAP_CALIBRATION.scale;
  y = (y + MAP_CALIBRATION.latOffset) * MAP_CALIBRATION.scale;
  
  return { x, y };
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
              <svg
                viewBox="0 0 1000 738"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.4))',
                }}
              >
                {/* 省份地图 - 增强可见度 */}
                <image
                  href="/china-provinces-map.svg"
                  width="1000"
                  height="738"
                  opacity="0.65"
                  style={{
                    filter: 'brightness(1.2) contrast(1.3) saturate(0.8) hue-rotate(160deg)',
                  }}
                />
              </svg>
            </div>
          </div>

          {/* 产业带标注层 */}
          <div className="absolute inset-0">
            {industrialBelts.map((belt, index) => {
              const pos = latLngToSVGPercent(belt.coordinates.lat, belt.coordinates.lng);
              
              // 调试输出
              console.log(`${belt.name}: lat=${belt.coordinates.lat}, lng=${belt.coordinates.lng} => x=${pos.x.toFixed(2)}%, y=${pos.y.toFixed(2)}%`);
              
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
