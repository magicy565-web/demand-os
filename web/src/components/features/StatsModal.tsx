"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { DemandStatsPanel } from "./DemandStatsPanel";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StatsModal({ isOpen, onClose }: StatsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* 弹窗内容 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-5xl max-h-[85vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* 顶部渐变装饰 */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyber-cyan/10 to-transparent pointer-events-none" />

            {/* 头部 */}
            <div className="relative p-6 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">需求数据分析</h2>
                <p className="text-white/50 text-sm mt-1">实时统计 • 智能洞察</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2.5 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* 内容区域 */}
            <div className="px-6 pb-6 overflow-y-auto max-h-[calc(85vh-100px)]">
              <DemandStatsPanel />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
