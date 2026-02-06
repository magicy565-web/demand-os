/**
 * 红人工作台数据类型定义
 */

import { Factory } from './factory';
import { Opportunity } from './opportunity';

export interface InfluencerProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  email: string;
  phone: string;
  
  // 社交媒体数据
  socialMedia: {
    platform: 'tiktok' | 'instagram' | 'youtube';
    handle: string;
    followers: string;
    avgViews: string;
    engagementRate: number;
  }[];
  
  // 垂直领域
  niche: string[];
  
  // 核心指标
  metrics: {
    totalGMV: number;
    totalProjects: number;
    avgProfitMargin: number;
    successRate: number;
  };
  
  // 会员等级
  membershipTier: 'starter' | 'pro' | 'elite';
  
  joinedAt: string;
}

export interface CollaborationRequest {
  id: string;
  influencerId: string;
  factoryId: string;
  opportunityId?: string;
  
  // 合作详情
  productName: string;
  productCategory: string;
  cooperationMode: 'dropshipping' | 'wholesale' | 'exclusive';
  quantity: number;
  targetPrice: number;
  
  // 需求描述
  requirements: string;
  targetMarket: string;
  expectedLaunchDate: string;
  
  // 状态
  status: 'pending' | 'accepted' | 'rejected' | 'negotiating' | 'confirmed';
  createdAt: string;
  updatedAt: string;
  
  // 工厂响应
  factoryResponse?: {
    message: string;
    quotedPrice: number;
    moq: number;
    leadTime: string;
    respondedAt: string;
  };
}

export interface ActiveProject {
  id: string;
  influencerId: string;
  factoryId: string;
  factory: Factory;
  
  // 产品信息
  product: {
    name: string;
    category: string;
    image: string;
  };
  
  // 合作详情
  cooperationMode: 'dropshipping' | 'wholesale' | 'exclusive';
  orderQuantity: number;
  unitPrice: number;
  totalValue: number;
  
  // 项目状态
  status: 'production' | 'quality-check' | 'shipping' | 'delivered' | 'completed';
  progress: number; // 0-100
  
  // 时间线
  timeline: {
    orderPlaced: string;
    productionStarted?: string;
    qualityCheckCompleted?: string;
    shipped?: string;
    delivered?: string;
  };
  
  // 物流信息
  shipping?: {
    trackingNumber: string;
    carrier: string;
    estimatedDelivery: string;
  };
  
  createdAt: string;
}

export interface SavedFactory {
  factoryId: string;
  factory: Factory;
  savedAt: string;
  notes?: string;
  tags: string[];
}

export interface Notification {
  id: string;
  type: 'collaboration_response' | 'project_update' | 'new_opportunity' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
