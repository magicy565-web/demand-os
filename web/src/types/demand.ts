// 需求数据类型定义

export interface Demand {
  id: string;
  title: string;
  description: string;
  category: string;
  region: string;
  price_range: string;
  urgency: "low" | "medium" | "high" | "critical";
  quantity: number;
  unit: string;
  source_platform: string;
  business_value: number; // 0-100 商业价值评分
  tags: string[];
  image_url?: string;
  contact_info?: string;
  created_at: string;
  updated_at: string;
  status: "active" | "pending" | "fulfilled" | "expired";
}

export interface DemandStats {
  total_demands: number;
  active_demands: number;
  total_value: number;
  regions_covered: number;
  categories_count: number;
  avg_business_value: number;
}

export interface WebSocketMessage {
  type: "create" | "update" | "delete";
  collection: string;
  data: Demand;
}

// Directus 响应类型
export interface DirectusResponse<T> {
  data: T;
  meta?: {
    total_count?: number;
    filter_count?: number;
  };
}

// API 配置
export const API_CONFIG = {
  DIRECTUS_URL: process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://admin.cnsubscribe.xyz",
  WS_URL: process.env.NEXT_PUBLIC_WS_URL || "wss://admin.cnsubscribe.xyz/websocket",
};
