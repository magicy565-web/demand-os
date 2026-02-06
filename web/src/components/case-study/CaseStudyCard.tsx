'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  TrendingUp, 
  Clock, 
  DollarSign,
  ArrowRight,
  Award,
  Package,
  Shield
} from 'lucide-react';
import { CaseStudy } from '@/types/case-study';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onViewDetails: (id: string) => void;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy, onViewDetails }) => {
  const modeConfig = {
    dropshipping: { label: '一件代发', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Package },
    wholesale: { label: '批量批发', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: TrendingUp },
    exclusive: { label: '独家供应', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Shield }
  };

  const mode = modeConfig[caseStudy.cooperationMode];
  const ModeIcon = mode.icon;

  const avgRating = caseStudy.testimonial.reduce((sum, t) => sum + t.rating, 0) / caseStudy.testimonial.length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all group"
    >
      {/* 产品图片 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={caseStudy.product.image} 
          alt={caseStudy.product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Featured 标签 */}
        {caseStudy.featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none px-3 py-1 font-bold">
              <Award className="w-3 h-3 mr-1" />
              精选案例
            </Badge>
          </div>
        )}

        {/* 合作模式 */}
        <div className="absolute top-4 right-4">
          <Badge className={`${mode.color} border font-bold px-3 py-1`}>
            <ModeIcon className="w-3 h-3 mr-1" />
            {mode.label}
          </Badge>
        </div>

        {/* 红人信息 */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <img 
            src={caseStudy.influencer.avatar} 
            className="w-12 h-12 rounded-full border-2 border-white/80 shadow-lg"
          />
          <div>
            <div className="text-white font-bold text-sm">{caseStudy.influencer.handle}</div>
            <div className="text-white/80 text-xs">{caseStudy.influencer.followers} • {caseStudy.influencer.niche}</div>
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="p-5">
        <h3 className="font-black text-slate-900 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">
          {caseStudy.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {caseStudy.description}
        </p>

        {/* 核心指标 */}
        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-slate-200">
          <div className="text-center">
            <div className="text-lg font-black text-emerald-600">${(caseStudy.metrics.gmv / 1000).toFixed(0)}K</div>
            <div className="text-[9px] text-slate-500 uppercase font-mono">GMV</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-black text-blue-600">{caseStudy.metrics.profitMargin}%</div>
            <div className="text-[9px] text-slate-500 uppercase font-mono">利润率</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-black text-slate-900">{caseStudy.metrics.duration}</div>
            <div className="text-[9px] text-slate-500 uppercase font-mono">周期</div>
          </div>
        </div>

        {/* 工厂信息 */}
        <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-200">
          <div className="text-xs text-slate-500 mb-1 uppercase font-mono">合作工厂</div>
          <div className="text-sm font-bold text-slate-900">{caseStudy.factory.name}</div>
          <div className="text-xs text-slate-500 mt-1">{caseStudy.factory.location}</div>
        </div>

        {/* 评分 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(avgRating) ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-900">{avgRating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-slate-500">{caseStudy.testimonial.length} 条评价</span>
        </div>

        {/* 操作按钮 */}
        <Button 
          onClick={() => onViewDetails(caseStudy.id)}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 rounded-xl font-bold gap-2 group/btn"
        >
          查看完整案例
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};
