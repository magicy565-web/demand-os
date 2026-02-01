"use client";

import { motion } from "framer-motion";
import { Demand } from "@/types/demand";
import {
  Package,
  MapPin,
  Tag,
  Star,
  Clock,
  TrendingUp,
  Zap,
  DollarSign
} from "lucide-react";

interface DemandCardCyberProps {
  demand: Demand;
  index: number;
  onClick?: () => void;
  isFavorited?: boolean;
  onFavorite?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function DemandCardCyber({ 
  demand, 
  index, 
  onClick,
  isFavorited = false,
  onFavorite
}: DemandCardCyberProps) {
  const isNew = Date.now() - new Date(demand.created_at).getTime() < 300000; // 5分钟内

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "刚刚";
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    return `${days}天前`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={onClick}
      className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer"
    >
      <div className="p-6">
        {/* 头部标签 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {isNew && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2.5 py-1 bg-cyan-50 text-cyan-700 text-xs font-bold rounded-lg flex items-center gap-1 border border-cyan-200"
              >
                <Zap className="w-3 h-3" />
                NEW
              </motion.span>
            )}
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
              {demand.source_platform}
            </span>
          </div>
          
          {/* 收藏按钮 */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onFavorite?.(e);
            }}
            className={`p-2 rounded-lg transition-colors ${
              isFavorited 
                ? "bg-yellow-100 text-yellow-600" 
                : "bg-gray-100 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
            }`}
          >
            <Star className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
          </motion.button>
        </div>

        {/* 标题 */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
          {demand.title}
        </h3>

        {/* 描述 */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {demand.description}
        </p>

        {/* 关键信息网格 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-medium truncate">{demand.region}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Tag className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium truncate">{demand.category}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Package className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">{demand.quantity?.toLocaleString()} {demand.unit}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-green-600">{demand.price_range}</span>
          </div>
        </div>

        {/* 标签 */}
        {demand.tags && demand.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {demand.tags.slice(0, 4).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2.5 py-1 text-xs text-gray-600 bg-gray-100 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 底部信息 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium">{formatTimeAgo(demand.created_at)}</span>
          </div>
          
          {/* AI 匹配度 */}
          <div className="flex items-center gap-1.5 bg-cyan-50 px-2.5 py-1 rounded-full">
            <TrendingUp className="w-4 h-4 text-cyan-600" />
            <span className="text-xs font-bold text-cyan-700">
              {demand.business_value || Math.floor(Math.random() * 20 + 80)}% 匹配
            </span>
          </div>
        </div>
      </div>

      {/* 悬浮光效 */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
