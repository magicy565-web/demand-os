"use client";

import { motion } from "framer-motion";
import { Demand } from "@/types/demand";
import { Card3D } from "./Card3D";
import {
  formatRelativeTime,
  formatNumber,
  getUrgencyLabel,
  getBusinessValueColor,
} from "@/lib/utils";

interface DemandCardEnhancedProps {
  demand: Demand;
  index: number;
}

// 根据紧急程度返回光效颜色
const getGlowColor = (urgency: string) => {
  switch (urgency) {
    case "critical":
      return "rgba(255, 0, 110, 0.5)";
    case "high":
      return "rgba(255, 0, 110, 0.3)";
    case "medium":
      return "rgba(157, 78, 221, 0.4)";
    default:
      return "rgba(0, 245, 255, 0.4)";
  }
};

// 入场动画变体
const cardVariants = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hidden: (_index: number) => ({
    opacity: 0,
    y: 100,
    rotateX: -30,
    scale: 0.8,
    filter: "blur(10px)",
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: index * 0.08,
      duration: 0.6,
    },
  }),
  hover: {
    y: -8,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

// 新需求弹入动画
const newItemVariants = {
  initial: {
    opacity: 0,
    scale: 0,
    rotateY: 180,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 0.8,
    },
  },
};

export function DemandCardEnhanced({ demand, index }: DemandCardEnhancedProps) {
  const valueColor = getBusinessValueColor(demand.business_value);
  const glowColor = getGlowColor(demand.urgency);
  const isNew = Date.now() - new Date(demand.created_at).getTime() < 60000; // 1分钟内的是新数据

  return (
    <motion.div
      custom={index}
      variants={isNew ? newItemVariants : cardVariants}
      initial={isNew ? "initial" : "hidden"}
      animate={isNew ? "animate" : "visible"}
      whileHover="hover"
      layout
      layoutId={demand.id}
    >
      <Card3D glowColor={glowColor} intensity={12}>
        <div className="p-5">
          {/* 新需求标记 */}
          {isNew && (
            <motion.div
              className="absolute top-3 right-3 z-30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-green" />
              </span>
            </motion.div>
          )}

          {/* 顶部状态栏 */}
          <div className="flex items-center justify-between mb-4">
            <motion.span
              className="text-xs font-mono text-gray-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 + 0.2 }}
            >
              {formatRelativeTime(demand.created_at)}
            </motion.span>
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 + 0.2 }}
            >
              <span
                className={`text-xs font-mono px-2 py-1 rounded-full border backdrop-blur-sm ${
                  demand.urgency === "critical"
                    ? "border-cyber-red bg-cyber-red/20 text-cyber-red animate-pulse shadow-lg shadow-cyber-red/20"
                    : demand.urgency === "high"
                    ? "border-cyber-pink bg-cyber-pink/20 text-cyber-pink"
                    : demand.urgency === "medium"
                    ? "border-cyber-yellow bg-cyber-yellow/20 text-cyber-yellow"
                    : "border-cyber-green bg-cyber-green/20 text-cyber-green"
                }`}
              >
                {getUrgencyLabel(demand.urgency)}
              </span>
            </motion.div>
          </div>

          {/* 标题 - 带打字机效果 */}
          <motion.h3
            className="text-lg font-semibold text-white mb-2 group-hover:text-cyber-cyan transition-colors line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.3 }}
          >
            {demand.title}
          </motion.h3>

          {/* 描述 */}
          <motion.p
            className="text-sm text-gray-400 mb-4 line-clamp-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.4 }}
          >
            {demand.description}
          </motion.p>

          {/* 标签 - 交错动画 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {demand.tags?.slice(0, 3).map((tag, tagIndex) => (
              <motion.span
                key={tagIndex}
                className="text-xs px-2 py-1 bg-cyber-dark border border-cyber-purple/30 rounded text-cyber-purple hover:border-cyber-purple hover:bg-cyber-purple/10 transition-all cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 + 0.5 + tagIndex * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                #{tag}
              </motion.span>
            ))}
          </div>

          {/* 数据网格 */}
          <motion.div
            className="grid grid-cols-2 gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 + 0.6 }}
          >
            <div className="bg-cyber-black/50 rounded-lg p-3 border border-transparent hover:border-cyber-cyan/30 transition-colors">
              <div className="text-xs text-gray-500 mb-1">地区</div>
              <div className="text-sm text-cyber-cyan font-mono">{demand.region}</div>
            </div>
            <div className="bg-cyber-black/50 rounded-lg p-3 border border-transparent hover:border-cyber-purple/30 transition-colors">
              <div className="text-xs text-gray-500 mb-1">分类</div>
              <div className="text-sm text-cyber-purple font-mono">{demand.category}</div>
            </div>
            <div className="bg-cyber-black/50 rounded-lg p-3 border border-transparent hover:border-white/20 transition-colors">
              <div className="text-xs text-gray-500 mb-1">数量</div>
              <div className="text-sm text-white font-mono">
                {formatNumber(demand.quantity)} {demand.unit}
              </div>
            </div>
            <div className="bg-cyber-black/50 rounded-lg p-3 border border-transparent hover:border-cyber-pink/30 transition-colors">
              <div className="text-xs text-gray-500 mb-1">来源</div>
              <div className="text-sm text-cyber-pink font-mono">{demand.source_platform}</div>
            </div>
          </motion.div>

          {/* 价格区间 - 带闪光效果 */}
          <motion.div
            className="relative bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10 rounded-lg p-3 mb-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.7 }}
          >
            {/* 扫光效果 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />
            <div className="relative">
              <div className="text-xs text-gray-500 mb-1">预算范围</div>
              <div className="text-lg font-bold text-cyber-green font-mono">
                {demand.price_range}
              </div>
            </div>
          </motion.div>

          {/* 底部信息 */}
          <motion.div
            className="flex items-center justify-between pt-3 border-t border-gray-800/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.8 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">商业价值</span>
              <div className="flex items-center gap-1">
                <div className="w-16 h-1.5 bg-cyber-dark rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${demand.business_value}%` }}
                    transition={{ duration: 1.2, delay: index * 0.08 + 0.9, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      demand.business_value >= 80
                        ? "bg-gradient-to-r from-cyber-green to-cyber-cyan"
                        : demand.business_value >= 60
                        ? "bg-gradient-to-r from-cyber-cyan to-cyber-purple"
                        : demand.business_value >= 40
                        ? "bg-gradient-to-r from-cyber-yellow to-cyber-pink"
                        : "bg-gray-500"
                    }`}
                  />
                </div>
                <motion.span
                  className={`text-sm font-bold font-mono ${valueColor}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 + 1.2, type: "spring" }}
                >
                  {demand.business_value}
                </motion.span>
              </div>
            </div>

            {/* 操作按钮 */}
            <motion.button
              className="relative text-xs text-cyber-cyan hover:text-white transition-colors font-mono group/btn overflow-hidden px-3 py-1 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">查看详情 →</span>
              <motion.div
                className="absolute inset-0 bg-cyber-cyan/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </Card3D>
    </motion.div>
  );
}
