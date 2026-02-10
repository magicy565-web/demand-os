'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { IndustrialPark } from '@/types/industrial';
import { X, MapPin, Factory, TrendingUp, Package, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

interface IndustrialParkSidePanelProps {
  park: IndustrialPark | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function IndustrialParkSidePanel({ park, isOpen, onClose }: IndustrialParkSidePanelProps) {
  if (!park) return null;

  // 根据产业园区的颜色获取颜色方案
  const colorSchemes: Record<string, { bg: string; border: string; accent: string; text: string }> = {
    cyan: { bg: 'from-cyan-900/80 to-teal-900/80', border: 'border-cyan-500/50', accent: 'bg-cyan-500', text: 'text-cyan-300' },
    amber: { bg: 'from-amber-900/80 to-orange-900/80', border: 'border-amber-500/50', accent: 'bg-amber-500', text: 'text-amber-300' },
    emerald: { bg: 'from-emerald-900/80 to-teal-900/80', border: 'border-emerald-500/50', accent: 'bg-emerald-500', text: 'text-emerald-300' },
    purple: { bg: 'from-purple-900/80 to-indigo-900/80', border: 'border-purple-500/50', accent: 'bg-purple-500', text: 'text-purple-300' },
  };

  const colorScheme = colorSchemes[park.markerColor] || colorSchemes.cyan;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 半透明背景遮罩 */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* 右侧侧滑卡片 */}
          <motion.div
            className={`fixed right-0 top-0 h-screen w-full sm:w-[500px] bg-gradient-to-br ${colorScheme.bg} backdrop-blur-xl border-l-2 ${colorScheme.border} shadow-2xl z-50 overflow-y-auto`}
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* 关闭按钮 */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-white/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>

            {/* 园区图片 */}
            <motion.div
              className="relative h-64 w-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Image
                src={park.image}
                alt={park.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </motion.div>

            {/* 内容区域 */}
            <div className="p-6 space-y-6">
              {/* 园区标题 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="space-y-2"
              >
                <h2 className={`text-2xl font-bold ${colorScheme.text}`}>
                  {park.name}
                </h2>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="w-4 h-4" />
                  <span>{park.location} · {park.region}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{park.description}</p>
              </motion.div>

              {/* 核心数据 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-3"
              >
                <div className={`p-3 rounded-lg bg-slate-800/50 border ${colorScheme.border} border-opacity-30`}>
                  <div className="text-2xl mb-1">🏭</div>
                  <div className={`text-lg font-bold ${colorScheme.text}`}>{park.stats.factories}</div>
                  <div className="text-xs text-slate-400">工厂数量</div>
                </div>
                <div className={`p-3 rounded-lg bg-slate-800/50 border ${colorScheme.border} border-opacity-30`}>
                  <div className="text-2xl mb-1">📦</div>
                  <div className={`text-lg font-bold ${colorScheme.text}`}>{park.stats.categories}</div>
                  <div className="text-xs text-slate-400">产品类别</div>
                </div>
                <div className={`p-3 rounded-lg bg-slate-800/50 border ${colorScheme.border} border-opacity-30`}>
                  <div className="text-2xl mb-1">📈</div>
                  <div className={`text-lg font-bold ${colorScheme.text}`}>{park.stats.growth}</div>
                  <div className="text-xs text-slate-400">年增长率</div>
                </div>
                <div className={`p-3 rounded-lg bg-slate-800/50 border ${colorScheme.border} border-opacity-30`}>
                  <div className="text-2xl mb-1">🌍</div>
                  <div className={`text-lg font-bold ${colorScheme.text}`}>{park.stats.coverage}</div>
                  <div className="text-xs text-slate-400">全球覆盖</div>
                </div>
              </motion.div>

              {/* 核心优势 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-2"
              >
                <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <span className={`w-1 h-4 rounded-full ${colorScheme.accent}`} />
                  核心优势
                </h3>
                <div className="space-y-1">
                  {park.advantages.map((advantage, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className={`${colorScheme.text} mt-1`}>•</span>
                      <span>{advantage}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 核心产品线 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <span className={`w-1 h-4 rounded-full ${colorScheme.accent}`} />
                  核心产品线
                </h3>
                <div className="flex flex-wrap gap-2">
                  {park.products.map((product, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${colorScheme.border} border-opacity-30 bg-slate-800/50 text-slate-300 hover:border-opacity-60 transition-colors`}
                    >
                      {product}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* 合作机会 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="space-y-2"
              >
                <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <span className={`w-1 h-4 rounded-full ${colorScheme.accent}`} />
                  合作机会
                </h3>
                <div className="space-y-2">
                  {park.opportunities.map((opp, idx) => (
                    <div key={idx} className={`p-3 rounded-lg bg-slate-800/50 border ${colorScheme.border} border-opacity-30`}>
                      <div className="font-medium text-sm text-slate-200">{opp.title}</div>
                      <div className="text-xs text-slate-400 mt-1">{opp.description}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 联系方式 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`space-y-2 pt-4 border-t ${colorScheme.border} border-opacity-30`}
              >
                <h3 className="text-sm font-semibold text-slate-300">联系方式</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-400">{park.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-400">{park.contact.email}</span>
                  </div>
                </div>
              </motion.div>

              {/* CTA 按钮 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex gap-3 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-slate-700 to-slate-600 text-white font-medium text-sm hover:shadow-lg transition-shadow`}
                >
                  查看详情
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-4 py-2 rounded-lg border ${colorScheme.border} text-slate-300 font-medium text-sm hover:bg-slate-800/50 transition-colors`}
                >
                  立即联系
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
