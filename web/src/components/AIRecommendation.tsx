"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Award,
} from "lucide-react";
import {
  recommendSuppliers,
  generateMockSuppliers,
  type Demand,
  type MatchScore,
} from "@/lib/ai-matching";

interface AIRecommendationProps {
  demand?: Demand;
}

export default function AIRecommendation({ demand }: AIRecommendationProps) {
  const [recommendations, setRecommendations] = useState<MatchScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  // 模拟需求数据
  const mockDemand: Demand = demand || {
    id: "d1",
    title: "TWS无线蓝牙耳机",
    description: "Amazon Best Seller爆品",
    category: "消费电子",
    region: "北美",
    priceRange: "$10.00 - $18.00",
    urgency: "critical",
    quantity: 50000,
    tags: ["CE", "FCC", "RoHS"],
  };

  useEffect(() => {
    // 模拟AI计算过程
    setIsLoading(true);
    const timer = setTimeout(() => {
      const suppliers = generateMockSuppliers();
      const matches = recommendSuppliers(mockDemand, suppliers, 5);
      setRecommendations(matches);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const suppliers = generateMockSuppliers();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl border border-purple-200/60 p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900">AI 智能推荐</h3>
          <p className="text-sm text-slate-600">
            基于多维度分析，为您匹配最优供应商
          </p>
        </div>
        {!isLoading && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            已匹配
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-purple-500" />
            </motion.div>
            <span className="text-lg font-medium text-slate-700">
              AI 正在分析匹配度...
            </span>
          </div>
          <div className="max-w-md mx-auto space-y-2">
            {["分析需求特征", "评估供应商能力", "计算匹配分数"].map(
              (step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.3 }}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <Zap className="w-4 h-4 text-purple-500" />
                  {step}
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      )}

      {/* Recommendations List */}
      <AnimatePresence>
        {!isLoading && recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {recommendations.map((match, index) => {
              const supplier = suppliers.find((s) => s.id === match.supplierId);
              if (!supplier) return null;

              return (
                <motion.div
                  key={match.supplierId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group cursor-pointer ${
                    selectedMatch === match.supplierId
                      ? "ring-2 ring-purple-500"
                      : ""
                  }`}
                  onClick={() => setSelectedMatch(match.supplierId)}
                >
                  {/* Rank Badge */}
                  {index === 0 && (
                    <div className="absolute -top-2 -left-2 z-10">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold shadow-lg">
                        <Award className="w-3 h-3" />
                        最佳匹配
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 mb-1">
                          {supplier.name}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-600">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            {supplier.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {supplier.responseTime}h响应
                          </div>
                        </div>
                      </div>

                      {/* Match Score */}
                      <div className="text-center">
                        <div className="relative w-16 h-16">
                          <svg className="w-16 h-16 transform -rotate-90">
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              stroke="#e2e8f0"
                              strokeWidth="4"
                              fill="none"
                            />
                            <motion.circle
                              cx="32"
                              cy="32"
                              r="28"
                              stroke="url(#gradient)"
                              strokeWidth="4"
                              fill="none"
                              strokeLinecap="round"
                              initial={{ strokeDashoffset: 176 }}
                              animate={{
                                strokeDashoffset:
                                  176 - (176 * match.score) / 100,
                              }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              strokeDasharray="176"
                            />
                            <defs>
                              <linearGradient
                                id="gradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#3b82f6" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-slate-900">
                              {match.score.toFixed(0)}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">匹配度</p>
                      </div>
                    </div>

                    {/* Match Reasons */}
                    <div className="space-y-1.5 mb-3">
                      {match.reasons.slice(0, 3).map((reason, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-700"
                        >
                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>

                    {/* Confidence */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-500" />
                        <span className="text-xs text-slate-600">
                          置信度: {match.confidence}%
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-500 text-white text-xs font-medium hover:bg-purple-600 transition-colors"
                      >
                        查看详情
                        <ArrowRight className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      {!isLoading && recommendations.length === 0 && (
        <div className="py-12 text-center text-slate-500">
          <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>暂无推荐结果</p>
        </div>
      )}

      {/* AI Insights */}
      {!isLoading && recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200"
        >
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900 mb-1">
                AI 洞察建议
              </p>
              <p className="text-xs text-blue-700">
                基于历史数据分析，建议优先考虑前2名供应商。预计交付周期30-45天，建议提前确认产能排期。
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
