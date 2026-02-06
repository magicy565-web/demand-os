'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  TrendingUp, 
  Factory,
  Award,
  CheckCircle2,
  DollarSign,
  Clock,
  Package,
  Shield,
  ArrowRight
} from 'lucide-react';
import { Opportunity, FactoryMatch } from '@/types/opportunity';
import { CooperationMode } from '@/types/factory';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OpportunityDetailDialogProps {
  opportunity: Opportunity | null;
  isOpen: boolean;
  onClose: () => void;
  onViewFactory: (factoryId: string) => void;
}

export const OpportunityDetailDialog: React.FC<OpportunityDetailDialogProps> = ({
  opportunity,
  isOpen,
  onClose,
  onViewFactory
}) => {
  const [selectedFactory, setSelectedFactory] = useState<FactoryMatch | null>(null);
  const [selectedMode, setSelectedMode] = useState<CooperationMode>('wholesale');

  if (!opportunity) return null;

  const selectedPricing = selectedFactory?.recommendedPricing.find(p => p.mode === selectedMode);

  const modeConfig = {
    dropshipping: { icon: Package, color: 'blue', label: '一件代发' },
    wholesale: { icon: TrendingUp, color: 'emerald', label: '批量批发' },
    exclusive: { icon: Shield, color: 'amber', label: '独家供应' }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* 对话框 */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
            >
              {/* 头部 */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={opportunity.sourceVideoThumbnail} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl font-black text-white mb-3">{opportunity.title}</h2>
                  <div className="flex items-center gap-4">
                    <img 
                      src={opportunity.influencer.avatar} 
                      className="w-12 h-12 rounded-full border-2 border-white/80"
                    />
                    <div>
                      <div className="text-white font-bold">{opportunity.influencer.handle}</div>
                      <div className="text-white/80 text-sm">{opportunity.influencer.followers} followers</div>
                    </div>
                    <a 
                      href={opportunity.sourceVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 px-4 py-2 rounded-xl text-white text-sm font-bold transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      查看原视频
                    </a>
                  </div>
                </div>
              </div>

              {/* 内容区 */}
              <div className="p-8 max-h-[calc(90vh-16rem)] overflow-y-auto">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* 左侧：趋势分析 + 工厂列表 */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* 趋势数据 */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                        趋势数据分析
                      </h3>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-black text-blue-600 mb-1">{opportunity.trendMetrics.views}</div>
                          <div className="text-xs text-slate-500">播放量</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-rose-600 mb-1">{opportunity.trendMetrics.likes}</div>
                          <div className="text-xs text-slate-500">点赞数</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-emerald-600 mb-1">{opportunity.trendMetrics.comments}</div>
                          <div className="text-xs text-slate-500">评论数</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-amber-600 mb-1">{opportunity.trendMetrics.growthRate}x</div>
                          <div className="text-xs text-slate-500">增长倍数</div>
                        </div>
                      </div>
                    </div>

                    {/* 匹配工厂 */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Factory className="w-5 h-5 text-blue-500" />
                        智能匹配工厂 (Top {opportunity.matchedFactories.length})
                      </h3>
                      <div className="space-y-3">
                        {opportunity.matchedFactories.map((match, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedFactory(match)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              selectedFactory?.factory.id === match.factory.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 mb-1">{match.factory.name}</div>
                                <div className="text-xs text-slate-500">{match.factory.location.city}, {match.factory.location.province}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-amber-500" />
                                <span className="text-lg font-black text-blue-600">{match.matchScore}</span>
                                <span className="text-xs text-slate-500">/100</span>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              {match.matchReasons.slice(0, 2).map((reason, ridx) => (
                                <div key={ridx} className="flex items-start gap-2 text-xs text-slate-600">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                  <span>{reason}</span>
                                </div>
                              ))}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewFactory(match.factory.id);
                              }}
                              className="mt-3 w-full text-xs font-bold hover:bg-slate-100"
                            >
                              查看工厂详情 <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 右侧：报价方案 + ROI */}
                  <div className="space-y-6">
                    {/* ROI 预测 */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">ROI 预测</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs text-slate-400 mb-1">预估投资</div>
                          <div className="text-2xl font-black">${opportunity.roiPrediction.initialInvestment.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">预估收入</div>
                          <div className="text-2xl font-black text-emerald-400">${opportunity.roiPrediction.projectedRevenue.toLocaleString()}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                          <div>
                            <div className="text-xs text-slate-400 mb-1">利润率</div>
                            <div className="text-xl font-black text-blue-400">{opportunity.roiPrediction.profitMargin}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-400 mb-1">回本周期</div>
                            <div className="text-xl font-black">{opportunity.roiPrediction.paybackPeriod}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 报价方案 */}
                    {selectedFactory && (
                      <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">选择合作模式</h3>
                        
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {selectedFactory.recommendedPricing.map(tier => {
                            const config = modeConfig[tier.mode];
                            const Icon = config.icon;
                            const isSelected = selectedMode === tier.mode;
                            
                            return (
                              <button
                                key={tier.mode}
                                onClick={() => setSelectedMode(tier.mode)}
                                className={`p-3 rounded-xl border-2 transition-all ${
                                  isSelected 
                                    ? `border-${config.color}-500 bg-${config.color}-50` 
                                    : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                              >
                                <Icon className={`w-4 h-4 mx-auto mb-1 ${isSelected ? `text-${config.color}-600` : 'text-slate-400'}`} />
                                <div className={`text-[10px] font-bold ${isSelected ? `text-${config.color}-900` : 'text-slate-600'}`}>
                                  {config.label}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {selectedPricing && (
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <div className="text-xs text-slate-500 mb-1">单价</div>
                                <div className="text-2xl font-black text-slate-900">${selectedPricing.unitPrice.toFixed(2)}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-slate-500 mb-1">MOQ</div>
                                <div className="text-xl font-bold text-slate-900">{selectedPricing.moq}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{selectedPricing.leadTime}</span>
                            </div>
                            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-10 text-sm font-bold">
                              发起合作邀约
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
