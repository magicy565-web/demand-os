'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  Zap,
  Factory,
  DollarSign,
  ArrowRight,
  Award,
  Clock
} from 'lucide-react';
import { Opportunity } from '@/types/opportunity';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onViewDetails: (id: string) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onViewDetails }) => {
  const lifecycleConfig = {
    emerging: { label: '萌芽期', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    explosive: { label: '爆发期', color: 'bg-rose-100 text-rose-700 border-rose-200' },
    mature: { label: '成熟期', color: 'bg-slate-100 text-slate-700 border-slate-200' }
  };

  const riskConfig = {
    low: { label: '低风险', color: 'text-emerald-600' },
    medium: { label: '中风险', color: 'text-amber-600' },
    high: { label: '高风险', color: 'text-rose-600' }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all group"
    >
      {/* 视频缩略图 */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={opportunity.sourceVideoThumbnail} 
          alt={opportunity.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* 趋势评分 */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={`${lifecycleConfig[opportunity.lifecycleStage].color} border font-bold px-3 py-1`}>
            <Zap className="w-3 h-3 mr-1" />
            {lifecycleConfig[opportunity.lifecycleStage].label}
          </Badge>
          <Badge className="bg-slate-900/80 backdrop-blur-md border-none text-white px-3 py-1 font-bold">
            <TrendingUp className="w-3 h-3 mr-1" />
            {opportunity.trendMetrics.viralScore}/100
          </Badge>
        </div>

        {/* 红人信息 */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <img 
            src={opportunity.influencer.avatar} 
            className="w-10 h-10 rounded-full border-2 border-white/80 shadow-lg"
          />
          <div>
            <div className="text-white font-bold text-sm">{opportunity.influencer.handle}</div>
            <div className="text-white/80 text-xs">{opportunity.influencer.followers} followers</div>
          </div>
        </div>

        {/* 流量数据 */}
        <div className="absolute bottom-4 right-4 flex gap-3">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-lg px-2 py-1">
            <Eye className="w-3 h-3 text-white" />
            <span className="text-white text-xs font-bold">{opportunity.trendMetrics.views}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-lg px-2 py-1">
            <Heart className="w-3 h-3 text-rose-400" />
            <span className="text-white text-xs font-bold">{opportunity.trendMetrics.likes}</span>
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-black text-slate-900 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">
            {opportunity.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
            {opportunity.description}
          </p>
        </div>

        {/* 匹配工厂 */}
        <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Factory className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">已匹配工厂</span>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px] font-bold">
              {opportunity.matchedFactories.length} 家
            </Badge>
          </div>
          
          {opportunity.matchedFactories.slice(0, 1).map((match, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-900 mb-1">{match.factory.name}</div>
                <div className="flex items-center gap-2">
                  <Award className="w-3 h-3 text-amber-500" />
                  <span className="text-xs text-slate-600">匹配度: <span className="font-bold text-blue-600">{match.matchScore}%</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ROI 预测 */}
        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs text-slate-500 mb-1">预估投资</div>
            <div className="text-lg font-black text-slate-900">
              ${(opportunity.roiPrediction.initialInvestment / 1000).toFixed(0)}K
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">预估收入</div>
            <div className="text-lg font-black text-emerald-600">
              ${(opportunity.roiPrediction.projectedRevenue / 1000).toFixed(0)}K
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">利润率</div>
            <div className="text-lg font-black text-blue-600">
              {opportunity.roiPrediction.profitMargin}%
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">回本周期</div>
            <div className="text-lg font-black text-slate-900">
              {opportunity.roiPrediction.paybackPeriod}
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="flex-1 h-11 border-slate-300 hover:bg-slate-50 font-bold"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            查看报价
          </Button>
          <Button 
            onClick={() => onViewDetails(opportunity.id)}
            className="flex-1 h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold gap-2 group/btn"
          >
            详细分析
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>

        {/* 风险提示 */}
        <div className="mt-3 text-center">
          <span className={`text-xs font-bold ${riskConfig[opportunity.roiPrediction.riskLevel].color}`}>
            {riskConfig[opportunity.roiPrediction.riskLevel].label}
          </span>
          <span className="text-xs text-slate-400 ml-2">
            • 检测于 {new Date(opportunity.detectedAt).toLocaleDateString('zh-CN')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
