'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IndustrialBelt } from '@/types/industrial';
import { MapPin, TrendingUp, Factory, ArrowRight } from 'lucide-react';

interface IndustrialBeltCardEnhancedProps {
  belt: IndustrialBelt;
  index: number;
}

// 5种颜色方案
const colorSchemes = [
  { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30', accent: 'text-cyan-400', hover: 'hover:border-cyan-400/60' },
  { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', accent: 'text-purple-400', hover: 'hover:border-purple-400/60' },
  { bg: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30', accent: 'text-emerald-400', hover: 'hover:border-emerald-400/60' },
  { bg: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30', accent: 'text-orange-400', hover: 'hover:border-orange-400/60' },
  { bg: 'from-indigo-500/20 to-violet-500/20', border: 'border-indigo-500/30', accent: 'text-indigo-400', hover: 'hover:border-indigo-400/60' },
];

export function IndustrialBeltCardEnhanced({ belt, index }: IndustrialBeltCardEnhancedProps) {
  const colorScheme = colorSchemes[index % colorSchemes.length];
  
  // 格式化工厂数量
  const formatFactoryCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Link href={`/industry-os/${belt.id}`}>
      <motion.div
        className={`relative bg-gradient-to-br ${colorScheme.bg} backdrop-blur-xl rounded-2xl border ${colorScheme.border} p-6 cursor-pointer group overflow-hidden transition-all ${colorScheme.hover}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute -top-8 -right-8 w-32 h-32 ${colorScheme.accent} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
          <div className={`absolute -bottom-8 -left-8 w-32 h-32 ${colorScheme.accent} rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        </div>

        {/* 内容 */}
        <div className="relative z-10">
          {/* 标题和位置 */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {belt.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{belt.province}</span>
            </div>
          </div>

          {/* 核心产品标签 */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-400 mb-2">核心产品</p>
            <div className="flex flex-wrap gap-2">
              {belt.core_products.slice(0, 3).map((product, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded text-slate-200 hover:border-white/40 transition-colors"
                >
                  {product}
                </span>
              ))}
              {belt.core_products.length > 3 && (
                <span className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded text-slate-200">
                  +{belt.core_products.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* 产业优势 */}
          <div className="mb-6">
            <p className="text-sm text-slate-300 line-clamp-2">
              {belt.advantages}
            </p>
          </div>

          {/* 底部数据和按钮 */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex gap-6">
              {/* 工厂数量 */}
              <div className="flex items-center gap-2">
                <Factory className="w-4 h-4 text-slate-400" />
                <div className="text-right">
                  <p className="text-xs text-slate-400">工厂</p>
                  <p className="text-lg font-bold text-white">
                    {formatFactoryCount(belt.factory_count)}
                  </p>
                </div>
              </div>

              {/* 增长率 */}
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <div className="text-right">
                  <p className="text-xs text-slate-400">增长</p>
                  <p className="text-lg font-bold text-emerald-400">
                    +12%
                  </p>
                </div>
              </div>
            </div>

            {/* 查看详情按钮 */}
            <button
              className={`p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all group-hover:translate-x-1`}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 脉冲边框动画 */}
        <motion.div
          className={`absolute inset-0 rounded-2xl pointer-events-none border ${colorScheme.border}`}
          animate={{
            boxShadow: [
              `inset 0 0 0 1px rgba(0, 0, 0, 0)`,
              `inset 0 0 0 2px rgba(0, 0, 0, 0.1)`,
              `inset 0 0 0 1px rgba(0, 0, 0, 0)`,
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </Link>
  );
}
