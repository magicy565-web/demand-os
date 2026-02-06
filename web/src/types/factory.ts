/**
 * 认证工厂数据类型定义
 */

export type CertificationBadge = 
  | 'compliance' // 合规认证
  | 'quality' // 质量认证
  | 'fulfillment' // 履约认证
  | 'export' // 出口资质
  | 'eco'; // 环保认证

export type CooperationMode = 'dropshipping' | 'wholesale' | 'exclusive';

export interface Certification {
  id: string;
  type: CertificationBadge;
  name: string;
  issuedBy: string;
  issuedDate: string;
  validUntil?: string;
  verificationUrl?: string;
}

export interface ProductionCapacity {
  dailyOutput: number;
  monthlyOutput: number;
  currentUtilization: number; // 0-100
  availableCapacity: number;
  leadTime: string;
}

export interface PricingTier {
  mode: CooperationMode;
  unitPrice: number;
  moq: number;
  leadTime: string;
  description: string;
  features: string[];
}

export interface HistoricalCase {
  id: string;
  influencerName: string;
  influencerAvatar?: string;
  productName: string;
  orderQuantity: number;
  gmv: number;
  completedDate: string;
  rating: number;
  testimonial?: string;
}

export interface Factory {
  id: string;
  name: string;
  logo?: string;
  coverImage: string;
  location: {
    province: string;
    city: string;
    address: string;
  };
  establishedYear: number;
  employeeCount: string;
  
  // 认证信息
  certifications: Certification[];
  trustScore: number; // 0-100
  
  // 核心能力
  mainCategories: string[];
  productionCapacity: ProductionCapacity;
  
  // 报价体系
  pricingTiers: PricingTier[];
  
  // 历史案例
  historicalCases: HistoricalCase[];
  
  // 统计数据
  stats: {
    totalOrders: number;
    onTimeDeliveryRate: number; // 0-100
    qualityPassRate: number; // 0-100
    returnRate: number; // 0-100
    averageRating: number; // 0-5
  };
  
  // 联系方式
  contact: {
    manager: string;
    phone: string;
    email: string;
    wechat?: string;
  };
  
  // 媒体资源
  media: {
    factoryVideos: string[];
    productionLinePhotos: string[];
    certificationDocuments: string[];
  };
}
