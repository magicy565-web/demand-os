'use client';

import { motion } from 'framer-motion';
import { IndustrialBelt } from '@/types/industrial';
import { Factory, MapPin, Package, TrendingUp, Award } from 'lucide-react';

interface IndustrialBeltTooltipProps {
  belt: IndustrialBelt;
  position: { x: number; y: number };
}

export default function IndustrialBeltTooltip({ belt, position }: IndustrialBeltTooltipProps) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(20px, -50%)',
      }}
      initial={{ opacity: 0, scale: 0.9, x: -10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        {/* 连接线 */}
        <div className="absolute -left-5 top-1/2 w-5 h-px bg-gradient-to-r from-transparent to-cyan-400" />
        
        {/* 卡片主体 */}
        <div className="bg-slate-900/98 backdrop-blur-xl border-2 border-cyan-500/50 rounded-xl shadow-2xl p-5 min-w-[340px]">
          {/* 标题区 */}
          <div className="mb-4 pb-4 border-b border-slate-700/50">
            <h3 className="text-xl font-bold text-cyan-300 mb-1 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {belt.name}
            </h3>
            <p className="text-sm text-slate-400">{belt.province}</p>
          </div>

          {/* 核心数据 */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Factory className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs text-slate-500">工厂数量</div>
                <div className="text-sm font-bold text-white">
                  {belt.factory_count.toLocaleString()}+
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <div className="text-xs text-slate-500">年产值</div>
                <div className="text-sm font-bold text-white">
                  ¥{belt.annual_output}亿
                </div>
              </div>
            </div>
          </div>

          {/* 核心品类 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                核心品类
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {belt.core_categories.slice(0, 4).map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs text-purple-300 font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* 核心优势 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-green-400" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                核心优势
              </span>
            </div>
            <ul className="space-y-1.5">
              {belt.advantages.slice(0, 3).map((advantage, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span className="text-xs text-slate-300 leading-relaxed">
                    {advantage}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 底部提示 */}
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <p className="text-xs text-cyan-400/80 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              点击查看详细工厂列表
            </p>
          </div>

          {/* 底部装饰条 */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 rounded-b-xl" />
        </div>

        {/* 发光效果 */}
        <div className="absolute inset-0 bg-cyan-500/10 rounded-xl blur-2xl -z-10" />
      </div>
    </motion.div>
  );
}
