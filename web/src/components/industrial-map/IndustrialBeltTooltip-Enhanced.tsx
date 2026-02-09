'use client';

import { motion } from 'framer-motion';
import { IndustrialBelt } from '@/types/industrial';
import { Factory, MapPin, Package, TrendingUp, Award, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

interface IndustrialBeltTooltipProps {
  belt: IndustrialBelt;
  position: { x: number; y: number };
}

// 5种颜色方案
const colorSchemes = [
  { 
    bg: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/50',
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    accentBorder: 'border-cyan-500/30',
    glow: 'bg-cyan-500/10',
    gradient: 'from-cyan-500 via-blue-500 to-cyan-500'
  },
  { 
    bg: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/50',
    accent: 'text-purple-400',
    accentBg: 'bg-purple-500/10',
    accentBorder: 'border-purple-500/30',
    glow: 'bg-purple-500/10',
    gradient: 'from-purple-500 via-pink-500 to-purple-500'
  },
  { 
    bg: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/50',
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/30',
    glow: 'bg-emerald-500/10',
    gradient: 'from-emerald-500 via-teal-500 to-emerald-500'
  },
  { 
    bg: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/50',
    accent: 'text-orange-400',
    accentBg: 'bg-orange-500/10',
    accentBorder: 'border-orange-500/30',
    glow: 'bg-orange-500/10',
    gradient: 'from-orange-500 via-red-500 to-orange-500'
  },
  { 
    bg: 'from-indigo-500/20 to-violet-500/20',
    border: 'border-indigo-500/50',
    accent: 'text-indigo-400',
    accentBg: 'bg-indigo-500/10',
    accentBorder: 'border-indigo-500/30',
    glow: 'bg-indigo-500/10',
    gradient: 'from-indigo-500 via-violet-500 to-indigo-500'
  },
];

export default function IndustrialBeltTooltipEnhanced({ belt, position }: IndustrialBeltTooltipProps) {
  // 根据产业带 ID 选择颜色方案
  const colorScheme = colorSchemes[belt.id % colorSchemes.length];

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(0, -50%)',
      }}
      initial={{ opacity: 0, scale: 0.9, x: -10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        {/* 连接线 */}
        <motion.div 
          className={`absolute -left-5 top-1/2 w-5 h-px bg-gradient-to-r from-transparent to-${colorScheme.accent.split('-')[1]}-400`}
          animate={{ scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* 卡片主体 - 添加最大高度和滚动 */}
        <motion.div 
          className={`relative bg-gradient-to-br ${colorScheme.bg} backdrop-blur-xl border-2 ${colorScheme.border} rounded-2xl shadow-2xl p-6 min-w-[360px] pointer-events-auto group cursor-pointer overflow-y-auto max-h-[85vh]`}
          whileHover={{ y: -4, boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3)` }}
        >
          {/* 背景装饰 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute -top-8 -right-8 w-32 h-32 ${colorScheme.accent} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
            <div className={`absolute -bottom-8 -left-8 w-32 h-32 ${colorScheme.accent} rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          </div>

          {/* 标题区 */}
          <div className="mb-4 pb-4 border-b border-slate-700/50 relative z-10">
            <h3 className={`text-xl font-bold ${colorScheme.accent} mb-1 flex items-center gap-2 group-hover:translate-x-1 transition-transform`}>
              <MapPin className="w-5 h-5 flex-shrink-0" />
              {belt.name}
            </h3>
            <p className="text-sm text-slate-400">{belt.province}</p>
          </div>

          {/* 核心数据 - 3列网格 */}
          <div className="grid grid-cols-3 gap-3 mb-5 relative z-10">
            {/* 工厂数量 */}
            <motion.div 
              className={`flex flex-col items-center p-3 ${colorScheme.accentBg} border ${colorScheme.accentBorder} rounded-lg group-hover:scale-105 transition-transform`}
              whileHover={{ scale: 1.05 }}
            >
              <Factory className={`w-5 h-5 ${colorScheme.accent} mb-1`} />
              <div className="text-xs text-slate-500">工厂</div>
              <div className={`text-lg font-bold ${colorScheme.accent}`}>
                {belt.factory_count > 1000 ? `${(belt.factory_count / 1000).toFixed(1)}K` : belt.factory_count}
              </div>
            </motion.div>

            {/* 增长率 */}
            <motion.div 
              className={`flex flex-col items-center p-3 ${colorScheme.accentBg} border ${colorScheme.accentBorder} rounded-lg group-hover:scale-105 transition-transform`}
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="w-5 h-5 text-emerald-400 mb-1" />
              <div className="text-xs text-slate-500">增长</div>
              <div className="text-lg font-bold text-emerald-400">+12%</div>
            </motion.div>

            {/* 产品类别 */}
            <motion.div 
              className={`flex flex-col items-center p-3 ${colorScheme.accentBg} border ${colorScheme.accentBorder} rounded-lg group-hover:scale-105 transition-transform`}
              whileHover={{ scale: 1.05 }}
            >
              <Package className="w-5 h-5 text-orange-400 mb-1" />
              <div className="text-xs text-slate-500">品类</div>
              <div className="text-lg font-bold text-orange-400">{belt.core_products.length}</div>
            </motion.div>
          </div>

          {/* 核心品类 */}
          <div className="mb-4 relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Package className={`w-4 h-4 ${colorScheme.accent}`} />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                核心品类
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {belt.core_products.slice(0, 3).map((product, index) => (
                <motion.span
                  key={index}
                  className={`px-3 py-1 ${colorScheme.accentBg} border ${colorScheme.accentBorder} rounded-full text-xs ${colorScheme.accent} font-medium`}
                  whileHover={{ scale: 1.05 }}
                >
                  {product}
                </motion.span>
              ))}
              {belt.core_products.length > 3 && (
                <span className={`px-3 py-1 ${colorScheme.accentBg} border ${colorScheme.accentBorder} rounded-full text-xs ${colorScheme.accent} font-medium`}>
                  +{belt.core_products.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* 核心优势 */}
          <div className="mb-5 relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                核心优势
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
              {belt.advantages}
            </p>
          </div>

          {/* 底部按钮区域 */}
          <div className="flex gap-3 relative z-10">
            {/* 查看详情按钮 */}
            <Link href={`/industrial-os/${belt.id}`} className="flex-1">
              <motion.button
                className={`w-full px-4 py-2.5 bg-gradient-to-r ${colorScheme.gradient} text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>查看详情</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>

            {/* 快速联系按钮 */}
            <motion.button
              className={`px-4 py-2.5 ${colorScheme.accentBg} border ${colorScheme.accentBorder} rounded-lg ${colorScheme.accent} font-semibold hover:border-opacity-100 transition-all flex items-center gap-1`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-4 h-4" />
              联系
            </motion.button>
          </div>

          {/* 底部装饰条 */}
          <motion.div 
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorScheme.gradient} rounded-b-2xl`}
            animate={{ scaleX: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* 发光效果 */}
        <motion.div 
          className={`absolute inset-0 ${colorScheme.glow} rounded-2xl blur-2xl -z-10`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
