'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndustrialBelt } from '@/types/industrial';
import IndustrialBeltSidePanel from './IndustrialBeltSidePanel';

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
  
  // 转换为百分比 (SVG viewBox: 1000x738)
  return {
    x: (svgX / 1000) * 100,
    y: (svgY / 738) * 100,
  };
}

export default function ChinaIndustrialMap({
  industrialBelts,
  onBeltClick,
}: ChinaIndustrialMapProps) {
  const [selectedBelt, setSelectedBelt] = useState<IndustrialBelt | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleBeltClick = (belt: IndustrialBelt) => {
    console.log('Belt clicked:', belt.name);
    setSelectedBelt(belt);
    setIsSidePanelOpen(true);
    if (onBeltClick) {
      onBeltClick(belt);
    }
  };

  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false);
    // 延迟关闭以允许动画完成
    setTimeout(() => setSelectedBelt(null), 300);
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

          {/* 产业带标注层 */}
          <div className="absolute inset-0 pointer-events-auto">
            {industrialBelts.map((belt, index) => {
              const pos = getBeltPosition(belt.id, belt.coordinates.lat, belt.coordinates.lng);
              
              return (
                <motion.div
                  key={belt.id}
                  className="absolute cursor-pointer group z-50 pointer-events-auto"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => handleBeltClick(belt)}
                >
                  {/* 产业带标注点 - 蓝色圆形（点击时有反馈） */}
                  <motion.div
                    className="absolute w-4 h-4 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  
                  {/* 脉冲动画环 */}
                  <motion.div
                    className="absolute w-4 h-4 border-2 border-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* 标签 - 显示产业带名称 */}
                  <motion.div
                    className="absolute left-6 top-0 bg-cyan-500/20 backdrop-blur-md border border-cyan-400/50 rounded-lg px-3 py-2 whitespace-nowrap text-xs text-cyan-200 pointer-events-none"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="font-semibold">{belt.name}</div>
                    <div className="text-xs text-cyan-300/80">点击查看详情</div>
                  </motion.div>

                  {/* 连接线 */}
                  <motion.div
                    className="absolute left-4 top-1/2 w-2 h-px bg-gradient-to-r from-cyan-400 to-transparent"
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
      <IndustrialBeltSidePanel
        belt={selectedBelt}
        isOpen={isSidePanelOpen}
        onClose={handleCloseSidePanel}
      />
    </div>
  );
}
