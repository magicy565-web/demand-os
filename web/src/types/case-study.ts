/**
 * 案例库数据类型定义
 */

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  
  // 红人信息
  influencer: {
    name: string;
    handle: string;
    avatar: string;
    followers: string;
    niche: string;
  };
  
  // 工厂信息
  factory: {
    id: string;
    name: string;
    location: string;
  };
  
  // 产品信息
  product: {
    name: string;
    category: string;
    image: string;
    description: string;
  };
  
  // 合作模式
  cooperationMode: 'dropshipping' | 'wholesale' | 'exclusive';
  
  // 业绩数据
  metrics: {
    orderQuantity: number;
    gmv: number;
    profitMargin: number;
    duration: string; // 如 "30 天"
  };
  
  // 时间线
  timeline: {
    initiatedAt: string;
    productionStarted: string;
    firstShipment: string;
    completedAt: string;
  };
  
  // 评价
  testimonial: {
    rating: number;
    comment: string;
    author: string; // 'influencer' | 'factory'
  }[];
  
  // 成功要素
  successFactors: string[];
  
  // 媒体资源
  media: {
    campaignVideos?: string[];
    productPhotos?: string[];
  };
  
  // 元数据
  featured: boolean;
  publishedAt: string;
  status: 'ongoing' | 'completed';
}
