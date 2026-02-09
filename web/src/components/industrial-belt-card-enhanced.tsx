'use client';

import { motion } from 'framer-motion';
import { IndustrialBelt } from '@/types/industrial';
import { ArrowRight, Factory, Zap, TrendingUp, MapPin } from 'lucide-react';
import Link from 'next/link';

interface IndustrialBeltCardEnhancedProps {
  belt: IndustrialBelt;
  index?: number;
}

export function IndustrialBeltCardEnhanced({ belt, index = 0 }: IndustrialBeltCardEnhancedProps) {
  // 根据产业带ID生成渐变色
  const gradientColors = [
    'from-cyan-500/20 to-blue-500/20',
    'from-purple-500/20 to-pink-500/20',
    'from-emerald-500/20 to-teal-500/20',
    'from-orange-500/20 to-red-500/20',
    'from-indigo-500/20 to-violet-500/20',
  ];
  const borderColors = [
    'border-cyan-500/50',
    'border-purple-500/50',
    'border-emerald-500/50',
    'border-orange-500/50',
    'border-indigo-500/50',
  ];
  const accentColors = [
    'text-cyan-400',
    'text-purple-400',
    'text-emerald-400',
    'text-orange-400',
    'text-indigo-400',
  ];

  const gradientClass = gradientColors[index % gradientColors.length];
  const borderClass = borderColors[index % borderColors.length];
  const accentClass = accentColors[index % accentColors.length];

  return (
    <Link href={`/industry-os/${belt.id}`}>
      <motion.div
        className={`group relative h-full bg-gradient-to-br ${gradientClass} backdrop-blur-xl rounded-2xl border ${borderClass} p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:border-opacity-100`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ 
          y: -8,
          boxShadow: '0 20px 40px rgba(0, 212, 255, 0.15)',
        }}
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        {/* 内容 */}
        <div className="relative z-10 flex flex-col h-full">
          {/* 顶部：标题和位置 */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
              {belt.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{belt.province}</span>
            </div>
          </div>

          {/* 中部：核心产品 */}
          <div className="mb-4 flex-1">
            <div className="text-xs font-semibold text-slate-400 mb-2">核心产品</div>
            <div className="flex flex-wrap gap-2">
              {belt.core_products.slice(0, 3).map((product, idx) => (
                <span
                  key={idx}
                  className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-slate-200 group-hover:border-cyan-400/50 transition-all`}
                >
                  {product}
                </span>
              ))}
              {belt.core_products.length > 3 && (
                <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-slate-400">
                  +{belt.core_products.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* 优势描述 */}
          <div className="mb-4">
            <p className="text-sm text-slate-300 line-clamp-2 group-hover:text-slate-200 transition-colors">
              {belt.advantages}
            </p>
          </div>

          {/* 底部：数据和按钮 */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4">
              {/* 工厂数量 */}
              <div className="flex items-center gap-2">
                <Factory className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold text-white">
                  {(belt.factory_count / 1000).toFixed(1)}K
                </span>
              </div>

              {/* 增长趋势 */}
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-white">+12%</span>
              </div>
            </div>

            {/* 查看详情按钮 */}
            <motion.div
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 ${accentClass} group-hover:from-cyan-500/50 group-hover:to-blue-500/50 transition-all`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </div>
        </div>

        {/* 边框光效 */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-transparent pointer-events-none"
          style={{
            borderImage: 'linear-gradient(45deg, rgba(0, 212, 255, 0), rgba(0, 212, 255, 0.3), rgba(0, 212, 255, 0)) 1',
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </Link>
  );
}
