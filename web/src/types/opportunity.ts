/**
 * 商机推荐数据类型定义
 */

import { Factory, PricingTier } from './factory';

export interface TrendMetrics {
  views: string;
  likes: string;
  comments: string;
  shares: string;
  growthRate: number; // 增长率 (倍数)
  viralScore: number; // 0-100
}

export interface ProductFeatures {
  category: string;
  subCategory?: string;
  keywords: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface FactoryMatch {
  factory: Factory;
  matchScore: number; // 0-100
  matchReasons: string[];
  recommendedPricing: PricingTier[];
}

export interface ROIPrediction {
  initialInvestment: number;
  projectedRevenue: number;
  profitMargin: number; // 百分比
  paybackPeriod: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  
  // TikTok 趋势数据
  sourceVideoUrl: string;
  sourceVideoThumbnail: string;
  influencer: {
    handle: string;
    avatar: string;
    followers: string;
  };
  trendMetrics: TrendMetrics;
  
  // 产品特征
  productFeatures: ProductFeatures;
  
  // 匹配的工厂（Top 3）
  matchedFactories: FactoryMatch[];
  
  // ROI 预测
  roiPrediction: ROIPrediction;
  
  // 元数据
  detectedAt: string;
  lifecycleStage: 'emerging' | 'explosive' | 'mature';
  status: 'active' | 'fulfilled' | 'expired';
}
