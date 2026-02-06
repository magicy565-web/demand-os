/**
 * Viral Trend Capacity Tracker (VTCT) 数据类型定义
 */

export type OfferType = 'dropshipping' | 'wholesale' | 'exclusive';

export interface PriceOffer {
  type: OfferType;
  price: number;
  currency: string;
  moq: number;
  leadTime: string; // 如 "24h", "7-10 days"
  description: string;
}

export interface MediaAsset {
  id: string;
  type: 'video' | 'image' | 'raw_footage';
  url: string;
  thumbnail?: string;
  title: string;
  fileSize?: string;
}

export interface Influencer {
  id: string;
  handle: string; // TikTok @handle
  avatar: string;
  followers: string;
  niche: string;
}

export interface ViralProduct {
  id: string;
  title: string;
  category: string;
  trendingScore: number; // 0-100
  growthRate: string; // 如 "+250% last 24h"
  originalVideoUrl: string; // TikTok 视频链接
  originalVideoThumbnail: string;
  influencer: Influencer;
  
  // 核心业务数据
  offers: {
    dropshipping: PriceOffer;
    wholesale: PriceOffer;
    exclusive: PriceOffer;
  };
  
  // 生产资料
  assets: MediaAsset[];
  
  // 工厂信息
  factoryId: string;
  factoryName: string;
  capacityStatus: 'available' | 'limited' | 'sold_out';
  lastUpdated: string;
}

export interface VTCTState {
  products: ViralProduct[];
  selectedCategory: string;
  searchQuery: string;
  isLoading: boolean;
}
