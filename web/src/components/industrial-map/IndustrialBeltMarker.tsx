'use client';

import { motion } from 'framer-motion';
import { IndustrialBelt } from '@/types/industrial';

interface IndustrialBeltMarkerProps {
  belt: IndustrialBelt;
  x: number;
  y: number;
  index: number;
  isHovered: boolean;
  onHover: (belt: IndustrialBelt) => void;
  onLeave: () => void;
  onClick: () => void;
  onMouseMove: (e: React.MouseEvent<SVGGElement>) => void;
}

export default function IndustrialBeltMarker({
  belt,
  x,
  y,
  index,
  isHovered,
  onHover,
  onLeave,
  onClick,
  onMouseMove,
}: IndustrialBeltMarkerProps) {
  // 根据工厂数量计算标注大小
  const baseRadius = 5;
  const radius = baseRadius + Math.log(belt.factory_count / 1000) * 2;

  return (
    <motion.g
      className="cursor-pointer"
      onMouseEnter={() => onHover(belt)}
      onMouseLeave={onLeave}
      onMouseMove={onMouseMove}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* 外圈脉冲效果 */}
      <motion.circle
        cx={x}
        cy={y}
        r={radius * 2}
        fill="url(#pulseGradient)"
        animate={{
          r: [radius * 2, radius * 3, radius * 2],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 主圆点 */}
      <motion.circle
        cx={x}
        cy={y}
        r={radius}
        className="fill-cyan-400"
        filter="url(#glow)"
        animate={isHovered ? {
          r: radius * 1.5,
          fill: "#F97316",
        } : {
          r: radius,
          fill: "#00E0FF",
        }}
        transition={{ duration: 0.2 }}
      />

      {/* 中心高亮点 */}
      <circle
        cx={x}
        cy={y}
        r={radius * 0.4}
        className="fill-white"
        opacity="0.8"
      />

      {/* 产业带名称标签 */}
      <motion.text
        x={x}
        y={y - radius - 8}
        textAnchor="middle"
        className="text-xs font-medium fill-slate-200"
        filter="url(#shadow)"
        animate={isHovered ? {
          fontSize: "14px",
          fill: "#FFFFFF",
        } : {
          fontSize: "11px",
          fill: "#E2E8F0",
        }}
        transition={{ duration: 0.2 }}
      >
        {belt.name.replace('产业带', '')}
      </motion.text>

      {/* 工厂数量标签 */}
      <motion.text
        x={x}
        y={y + radius + 15}
        textAnchor="middle"
        className="text-[10px] fill-slate-400"
        animate={isHovered ? {
          opacity: 1,
          y: y + radius + 15,
        } : {
          opacity: 0.7,
          y: y + radius + 12,
        }}
      >
        {belt.factory_count.toLocaleString()}+ 工厂
      </motion.text>
    </motion.g>
  );
}
