// 产业带数据类型定义
export interface IndustrialBelt {
  id: number;
  name: string;
  province: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  svg_path_id: string;
  core_products: string[];
  advantages: string;
  factory_count: number;
  status: string;
}

// 产业园区数据类型定义
export interface IndustrialPark {
  id: number;
  name: string;
  location: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  description: string;
  stats: {
    factories: string;
    categories: number;
    growth: string;
    coverage: string;
  };
  products: string[];
  advantages: string[];
  opportunities: Array<{
    title: string;
    description: string;
  }>;
  contact: {
    phone: string;
    email: string;
  };
  markerColor: string;
  markerIcon: string;
}

// 工厂数据类型定义
export interface Factory {
  id: number;
  name: string;
  industrial_belt_id: number;
  main_products: string[];
  moq: number;
  lead_time: number;
  certifications: string[];
  status: string;
}

// RFQ 数据类型定义
export interface RFQItem {
  sku: string;
  name: string;
  specs?: Record<string, any>;
  features?: string[];
  packaging?: Record<string, any>;
  quantity: number;
  target_price: number;
  compliance?: string[];
}

export interface RFQ {
  rfq_title: string;
  incoterms: string;
  currency: string;
  items: RFQItem[];
}

// 工厂匹配结果类型定义
export interface FactoryMatch {
  factory: Factory;
  score: number;
  matchedProducts: string[];
  reason: string;
}
