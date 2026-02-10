'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { IndustrialBelt } from '@/types/industrial';
import { X, MapPin, Factory, TrendingUp, Package } from 'lucide-react';

interface IndustrialBeltSidePanelProps {
  belt: IndustrialBelt | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function IndustrialBeltSidePanel({ belt, isOpen, onClose }: IndustrialBeltSidePanelProps) {
  if (!belt) return null;

  // 根据产业带 ID 选择颜色方案
  const colorSchemes = [
    { bg: 'from-cyan-900/80 to-teal-900/80', border: 'border-cyan-500/50', accent: 'bg-cyan-500', text: 'text-cyan-300' },
    { bg: 'from-purple-900/80 to-indigo-900/80', border: 'border-purple-500/50', accent: 'bg-purple-500', text: 'text-purple-300' },
    { bg: 'from-emerald-900/80 to-teal-900/80', border: 'border-emerald-500/50', accent: 'bg-emerald-500', text: 'text-emerald-300' },
    { bg: 'from-orange-900/80 to-amber-900/80', border: 'border-orange-500/50', accent: 'bg-orange-500', text: 'text-orange-300' },
    { bg: 'from-indigo-900/80 to-blue-900/80', border: 'border-indigo-500/50', accent: 'bg-indigo-500', text: 'text-indigo-300' },
  ];

  const colorScheme = colorSchemes[belt.id % colorSchemes.length];

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
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* 卡片内容 */}
            <div className="p-8 pt-16">
              {/* 标题区域 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start gap-3 mb-2">
                  <MapPin className={`w-5 h-5 ${colorScheme.text} flex-shrink-0 mt-1`} />
                  <h2 className="text-3xl font-bold text-white">{belt.name}</h2>
                </div>
                <p className="text-sm text-gray-300 ml-8 mb-6">{belt.location}</p>
              </motion.div>

              {/* 核心数据卡片网格 */}
              <motion.div
                className="grid grid-cols-2 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {[
                  { icon: Factory, label: '工厂数量', value: `${(belt.factory_count / 1000).toFixed(1)}K+`, color: 'from-cyan-500 to-teal-500' },
                  { icon: Package, label: '产品类别', value: belt.core_products.length.toString(), color: 'from-purple-500 to-pink-500' },
                  { icon: TrendingUp, label: '年增长率', value: '+12%', color: 'from-emerald-500 to-green-500' },
                  { icon: MapPin, label: '全球覆盖', value: '150+', color: 'from-orange-500 to-amber-500' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`bg-gradient-to-br ${item.color} bg-opacity-10 border border-white/10 rounded-xl p-4 hover:border-white/30 transition-all`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.5)' }}
                  >
                    <item.icon className={`w-5 h-5 mb-2 bg-gradient-to-br ${item.color} bg-clip-text text-transparent`} />
                    <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                    <div className="text-xs text-gray-300">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* 产业优势 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <div className={`w-1 h-6 ${colorScheme.accent} rounded`} />
                  核心优势
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {belt.advantages}
                </p>
              </motion.div>

              {/* 核心产品线 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <div className={`w-1 h-6 ${colorScheme.accent} rounded`} />
                  核心产品线
                </h3>
                <div className="flex flex-wrap gap-2">
                  {belt.core_products.map((product, index) => (
                    <motion.span
                      key={index}
                      className={`px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs text-white hover:bg-white/20 transition-all`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
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
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <div className={`w-1 h-6 ${colorScheme.accent} rounded`} />
                  合作机会
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>• 供应商入驻：展示您的产品给全球采购商</div>
                  <div>• 采购商合作：寻找优质供应商和产品</div>
                  <div>• 产业联动：参与产业带生态建设</div>
                </div>
              </motion.div>

              {/* 联系方式 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8 pb-8 border-b border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <div className={`w-1 h-6 ${colorScheme.accent} rounded`} />
                  联系方式
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>📞 +86 (0)571-XXXX-XXXX</div>
                  <div>📧 contact@chainzhiyun.com</div>
                </div>
              </motion.div>

              {/* 操作按钮 */}
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  className={`flex-1 px-4 py-3 bg-gradient-to-r ${colorScheme.bg} border-2 border-white/30 rounded-lg text-white font-semibold hover:border-white/50 transition-all`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  查看详情
                </motion.button>
                <motion.button
                  className={`flex-1 px-4 py-3 bg-gradient-to-r ${colorScheme.bg} border-2 border-white/30 rounded-lg text-white font-semibold hover:border-white/50 transition-all`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
