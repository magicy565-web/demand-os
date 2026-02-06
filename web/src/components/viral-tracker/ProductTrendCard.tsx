'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Factory, Video, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { ViralProduct, OfferType } from '@/types/viral-tracker';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductTrendCardProps {
  product: ViralProduct;
  onViewDetails: (id: string) => void;
}

export const ProductTrendCard: React.FC<ProductTrendCardProps> = ({ product, onViewDetails }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
    >
      {/* 顶部视频/图片预览 */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={product.originalVideoThumbnail} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* 趋势评分 */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-rose-500 hover:bg-rose-600 border-none text-white gap-1 px-2 py-1">
            <TrendingUp className="w-3 h-3" />
            {product.growthRate}
          </Badge>
          <Badge className="bg-slate-900/80 backdrop-blur-md border-none text-white px-2 py-1">
            Score: {product.trendingScore}
          </Badge>
        </div>

        {/* 红人信息 */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <img src={product.influencer.avatar} className="w-6 h-6 rounded-full border border-white/50" />
          <span className="text-white text-xs font-medium">{product.influencer.handle}</span>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-slate-900 leading-tight line-clamp-1">{product.title}</h3>
          <span className="text-[10px] font-mono text-slate-400 uppercase">{product.category}</span>
        </div>

        {/* 核心报价预览 */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <PriceMiniCard 
            label="Dropshipping" 
            price={product.offers.dropshipping.price} 
            color="text-blue-600"
          />
          <PriceMiniCard 
            label="Wholesale" 
            price={product.offers.wholesale.price} 
            color="text-emerald-600"
          />
          <PriceMiniCard 
            label="Exclusive" 
            price={product.offers.exclusive.price} 
            color="text-amber-600"
            isExclusive
          />
        </div>

        {/* 产能与工厂 */}
        <div className="flex items-center justify-between py-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Factory className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-600 truncate max-w-[120px]">{product.factoryName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${
              product.capacityStatus === 'available' ? 'bg-emerald-500' : 
              product.capacityStatus === 'limited' ? 'bg-amber-500' : 'bg-rose-500'
            }`} />
            <span className="text-[10px] font-medium text-slate-500 uppercase">
              {product.capacityStatus.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs h-9 border-slate-200 hover:bg-slate-50 gap-1.5"
          >
            <Video className="w-3.5 h-3.5" />
            Assets
          </Button>
          <Button 
            size="sm" 
            onClick={() => onViewDetails(product.id)}
            className="flex-1 text-xs h-9 bg-slate-900 hover:bg-slate-800 text-white gap-1.5"
          >
            Get Offers
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const PriceMiniCard = ({ label, price, color, isExclusive }: { label: string, price: number, color: string, isExclusive?: boolean }) => (
  <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex flex-col items-center">
    <span className="text-[9px] text-slate-400 uppercase font-mono mb-0.5">{label}</span>
    <div className={`text-sm font-bold ${color}`}>
      ${price.toFixed(2)}
    </div>
    {isExclusive && <ShieldCheck className="w-2.5 h-2.5 text-amber-500 mt-0.5" />}
  </div>
);
