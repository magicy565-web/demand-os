'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Factory as FactoryIcon,
  Star
} from 'lucide-react';
import { Factory } from '@/types/factory';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FactoryCardProps {
  factory: Factory;
  onViewDetails: (id: string) => void;
}

export const FactoryCard: React.FC<FactoryCardProps> = ({ factory, onViewDetails }) => {
  const certBadgeColors = {
    compliance: 'bg-blue-100 text-blue-700 border-blue-200',
    quality: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    fulfillment: 'bg-purple-100 text-purple-700 border-purple-200',
    export: 'bg-amber-100 text-amber-700 border-amber-200',
    eco: 'bg-green-100 text-green-700 border-green-200'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
    >
      {/* 封面图 */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={factory.coverImage} 
          alt={factory.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* 信任评分 */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 border border-white/50 shadow-lg">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-black text-slate-900">{factory.trustScore}</span>
              <span className="text-[10px] text-slate-500 font-mono">/100</span>
            </div>
            <div className="text-[9px] text-slate-500 uppercase font-mono text-center mt-0.5">Trust Score</div>
          </div>
        </div>

        {/* 认证徽章 */}
        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
          {factory.certifications.slice(0, 3).map(cert => (
            <Badge 
              key={cert.id} 
              className={`${certBadgeColors[cert.type]} border text-[9px] font-bold px-2 py-0.5`}
            >
              <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
              {cert.type.toUpperCase()}
            </Badge>
          ))}
        </div>
      </div>

      {/* 内容区 */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors">
              {factory.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="w-3 h-3" />
              <span>{factory.location.city}, {factory.location.province}</span>
              <span className="text-slate-300">•</span>
              <span>成立于 {factory.establishedYear}</span>
            </div>
          </div>
        </div>

        {/* 核心品类 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {factory.mainCategories.slice(0, 3).map((cat, idx) => (
            <span 
              key={idx}
              className="text-[10px] font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-slate-100">
          <div className="text-center">
            <div className="text-lg font-black text-emerald-600">{factory.stats.onTimeDeliveryRate}%</div>
            <div className="text-[9px] text-slate-500 uppercase font-mono">准时率</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-black text-blue-600">{factory.stats.totalOrders}+</div>
            <div className="text-[9px] text-slate-500 uppercase font-mono">历史订单</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-lg font-black text-slate-900">{factory.stats.averageRating}</span>
            </div>
            <div className="text-[9px] text-slate-500 uppercase font-mono">平均评分</div>
          </div>
        </div>

        {/* 产能状态 */}
        <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase">当前产能利用率</span>
            <span className="text-xs font-bold text-slate-900">{factory.productionCapacity.currentUtilization}%</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all"
              style={{ width: `${factory.productionCapacity.currentUtilization}%` }}
            />
          </div>
          <div className="mt-2 text-[10px] text-slate-600">
            <span className="font-bold text-emerald-600">{factory.productionCapacity.availableCapacity.toLocaleString()}</span> 件可用产能
          </div>
        </div>

        {/* 操作按钮 */}
        <Button 
          onClick={() => onViewDetails(factory.id)}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 rounded-xl font-bold gap-2 group/btn"
        >
          查看工厂详情
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};
