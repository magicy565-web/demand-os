"use client";

import { motion } from "framer-motion";
import { Demand } from "@/types/demand";
import {
  formatRelativeTime,
  formatNumber,
  getUrgencyLabel,
  getBusinessValueColor,
} from "@/lib/utils";

interface DemandCardProps {
  demand: Demand;
}

export function DemandCard({ demand }: DemandCardProps) {
  const valueColor = getBusinessValueColor(demand.business_value);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glow-card rounded-xl p-5 cursor-pointer group"
    >
      {/* 顶部状态栏 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-gray-500">
          {formatRelativeTime(demand.created_at)}
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-mono px-2 py-1 rounded-full border ${
              demand.urgency === "critical"
                ? "border-cyber-red bg-cyber-red/10 text-cyber-red animate-pulse"
                : demand.urgency === "high"
                ? "border-cyber-pink bg-cyber-pink/10 text-cyber-pink"
                : demand.urgency === "medium"
                ? "border-cyber-yellow bg-cyber-yellow/10 text-cyber-yellow"
                : "border-cyber-green bg-cyber-green/10 text-cyber-green"
            }`}
          >
            {getUrgencyLabel(demand.urgency)}
          </span>
        </div>
      </div>

      {/* 标题 */}
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyber-cyan transition-colors line-clamp-2">
        {demand.title}
      </h3>

      {/* 描述 */}
      <p className="text-sm text-gray-400 mb-4 line-clamp-3">{demand.description}</p>

      {/* 标签 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {demand.tags?.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-cyber-dark border border-cyber-purple/30 rounded text-cyber-purple"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 数据行 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-cyber-black/50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">地区</div>
          <div className="text-sm text-cyber-cyan font-mono">{demand.region}</div>
        </div>
        <div className="bg-cyber-black/50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">分类</div>
          <div className="text-sm text-cyber-purple font-mono">{demand.category}</div>
        </div>
        <div className="bg-cyber-black/50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">数量</div>
          <div className="text-sm text-white font-mono">
            {formatNumber(demand.quantity)} {demand.unit}
          </div>
        </div>
        <div className="bg-cyber-black/50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">来源</div>
          <div className="text-sm text-cyber-pink font-mono">{demand.source_platform}</div>
        </div>
      </div>

      {/* 价格区间 */}
      <div className="bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10 rounded-lg p-3 mb-4">
        <div className="text-xs text-gray-500 mb-1">预算范围</div>
        <div className="text-lg font-bold text-cyber-green font-mono">
          {demand.price_range}
        </div>
      </div>

      {/* 底部信息 */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">商业价值</span>
          <div className="flex items-center gap-1">
            <div className="w-16 h-1.5 bg-cyber-dark rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${demand.business_value}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full rounded-full ${
                  demand.business_value >= 80
                    ? "bg-cyber-green"
                    : demand.business_value >= 60
                    ? "bg-cyber-cyan"
                    : demand.business_value >= 40
                    ? "bg-cyber-yellow"
                    : "bg-gray-500"
                }`}
              />
            </div>
            <span className={`text-sm font-bold font-mono ${valueColor}`}>
              {demand.business_value}
            </span>
          </div>
        </div>

        {/* 操作按钮 */}
        <button className="text-xs text-cyber-cyan hover:text-white transition-colors font-mono">
          查看详情 →
        </button>
      </div>

      {/* 悬浮光效 */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 to-cyber-purple/5 rounded-xl" />
      </div>
    </motion.div>
  );
}
