"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  X,
  DollarSign,
  Globe,
  Clock,
  Tag,
  Package,
  TrendingUp,
  Star,
  Share2,
  ExternalLink,
  Calendar,
  Building,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  FileText
} from "lucide-react";
import { Demand } from "@/types/demand";

interface DemandDetailModalProps {
  demand: Demand | null;
  isOpen: boolean;
  onClose: () => void;
  onConnect?: () => void;
  onFavorite?: (demandId: string) => void;
  isFavorited?: boolean;
}

export function DemandDetailModal({ 
  demand, 
  isOpen, 
  onClose, 
  onConnect,
  onFavorite,
  isFavorited = false 
}: DemandDetailModalProps) {
  if (!demand) return null;

  const [showAgentLog, setShowAgentLog] = useState(false);

  // Mock Agent日志数据
  const agentLogs = [
    {
      timestamp: "2026-02-01 14:32:15",
      action: "平台扫描",
      detail: `在${demand.source_platform}平台检测到关键词匹配："${demand.title.split('求购')[0]}"`
    },
    {
      timestamp: "2026-02-01 14:32:18",
      action: "内容分析",
      detail: "通过NLP分析确认该帖子为采购需求，非供应信息"
    },
    {
      timestamp: "2026-02-01 14:32:22",
      action: "价格验证",
      detail: `提取预算范围：${demand.price_range}，符合目标市场预期`
    },
    {
      timestamp: "2026-02-01 14:32:25",
      action: "质量评估",
      detail: `数量: ${demand.quantity} ${demand.unit}，单价合理性: 高`
    },
    {
      timestamp: "2026-02-01 14:32:28",
      action: "用户画像",
      detail: "发布者为企业采购负责人，历史发布记录20+条，信用评分: 92/100"
    },
    {
      timestamp: "2026-02-01 14:32:30",
      action: "竞品分析",
      detail: "检测到同类需求已有3家供应商响应，竞争中等"
    },
    {
      timestamp: "2026-02-01 14:32:35",
      action: "综合评分",
      detail: `线索置信度: ${demand.business_value}%，建议推送`
    },
    {
      timestamp: "2026-02-01 14:32:38",
      action: "入库成功",
      detail: "需求已添加到需求池，等待匹配"
    }
  ];

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
            className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden"
          >

            {/* 头部 */}
            <div className="p-6 pb-4 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  {/* 标签 */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300">
                      {demand.category}
                    </span>
                    <span className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-300">
                      {demand.source_platform}
                    </span>
                  </div>
                  
                  {/* 标题 */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {demand.title}
                  </h2>
                  
                  {/* 发布时间 */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    发布于 {new Date(demand.created_at).toLocaleDateString("zh-CN")}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onFavorite?.(demand.id)}
                    className={`p-2.5 rounded-xl transition-colors ${
                      isFavorited 
                        ? "bg-yellow-100 text-yellow-600 border border-yellow-300" 
                        : "bg-gray-100 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 border border-gray-300"
                    }`}
                  >
                    <Star className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors border border-gray-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors border border-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* 内容区域 */}
            <div className="px-6 pb-6 overflow-y-auto max-h-[calc(85vh-200px)]">
              {/* 需求来源 */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold text-gray-800">需求来源追踪</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm text-gray-700">来源平台</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 px-3 py-1 bg-white rounded-lg border border-gray-200">
                      {demand.source_platform}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-gray-700">线索置信度</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-green-600">
                        {demand.business_value || 85}%
                      </span>
                      <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${demand.business_value || 85}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-blue-200 flex items-center justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAgentLog(!showAgentLog)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-blue-50 rounded-lg border border-blue-300 text-blue-600 text-xs font-semibold transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      {showAgentLog ? "隐藏" : "查看"}日志
                      <motion.div
                        animate={{ rotate: showAgentLog ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.div>
                    </motion.button>
                  </div>
                  
                  {/* Agent日志展开区域 */}
                  <AnimatePresence>
                    {showAgentLog && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200 max-h-60 overflow-y-auto">
                          <div className="space-y-2">
                            {agentLogs.map((log, index) => (
                              <motion.div
                                key={index}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex gap-3 pb-2 border-b border-gray-100 last:border-0"
                              >
                                <div className="flex-shrink-0 w-32">
                                  <div className="text-xs text-gray-500 font-mono">{log.timestamp}</div>
                                </div>
                                <div className="flex-1">
                                  <div className="text-xs font-semibold text-blue-700 mb-1">{log.action}</div>
                                  <div className="text-xs text-gray-600 leading-relaxed">{log.detail}</div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* 关键信息网格 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <InfoCard
                  icon={DollarSign}
                  label="预算范围"
                  value={demand.price_range}
                  color="cyan"
                />
                <InfoCard
                  icon={Package}
                  label="需求数量"
                  value={`${demand.quantity?.toLocaleString() || "面议"} ${demand.unit || "件"}`}
                  color="purple"
                />
                <InfoCard
                  icon={Globe}
                  label="目标市场"
                  value={demand.region}
                  color="pink"
                />
              </div>

              {/* 需求描述 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Building className="w-5 h-5 text-cyan-600" />
                  需求详情
                </h3>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {demand.description}
                  </p>
                </div>
              </div>

              {/* 标签 */}
              {demand.tags && demand.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-cyan-600" />
                    相关标签
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {demand.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 供应商要求 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  供应商要求
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "具备相关产品生产或供应经验",
                    "拥有质量管理体系认证",
                    "可提供样品及报价",
                    "具备出口资质和经验"
                  ].map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 注意事项 */}
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-900 font-semibold mb-1">注意事项</h4>
                    <p className="text-yellow-800 text-sm">
                      请在联系买家前准备好公司资质、产品目录和报价单。建议通过平台官方渠道进行沟通，保障交易安全。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部操作栏 */}
            <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-sm text-gray-500">
                  需求ID: {demand.id}
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onConnect?.();
                      onClose();
                    }}
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
                  >
                    <ExternalLink className="w-4 h-4" />
                    立即对接
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 信息卡片组件
function InfoCard({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: any; 
  label: string; 
  value: string; 
  color: "cyan" | "purple" | "pink" | "orange";
}) {
  const colorClasses = {
    cyan: "text-cyan-600 bg-cyan-50",
    purple: "text-purple-600 bg-purple-50",
    pink: "text-pink-600 bg-pink-50",
    orange: "text-orange-600 bg-orange-50",
  };

  return (
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-gray-900 font-semibold">{value}</div>
    </div>
  );
}
