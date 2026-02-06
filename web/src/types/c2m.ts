/**
 * C2M 引擎数据类型定义
 * 包含材质、市场、工厂、成本计算等核心数据结构
 */

// ============ 材质类型 ============
export interface Material {
  id: string;
  name: string;
  category: 'wood' | 'fabric';
  grade: string;
  basePrice: number; // 基准价格（元/件）
  priceMultiplier: number; // 价格系数
  unit: string; // 计量单位
  description?: string;
  certifications?: string[];
}

// ============ 市场风格类型 ============
export interface MarketStyle {
  id: string;
  name: string;
  region: string;
  moqMultiplier: number; // MOQ 系数
  stylePreferences: {
    materials: string[]; // 推荐材质 ID
    colors: string[];
    aesthetics: string[];
  };
  targetPrice?: number; // 目标价格范围
}

// ============ 工厂类型 ============
export interface Factory {
  id: string;
  name: string;
  province: string;
  industrialBeltId: string;
  mainProducts: string[];
  capabilities: string[];
  moq: number; // 最小起订量
  leadTime: number; // 交期（天）
  certifications: string[];
  rating: number; // 评分 0-5
  matchScore?: number; // 与用户需求的匹配度 0-100
  priceCompetitiveness?: number; // 价格竞争力 0-100
  deliveryReliability?: number; // 交期可靠性 0-100
  // 阶梯定价
  priceTiers: PriceTier[];
  status: 'active' | 'inactive';
}

// ============ 阶梯定价类型 ============
export interface PriceTier {
  minQty: number;
  maxQty?: number; // null 表示无上限
  unitPrice: number; // 单位价格（元/件）
  discount: number; // 折扣率 0-1
}

// ============ C2M 配置类型 ============
export interface C2MConfiguration {
  selectedMaterials: {
    wood?: Material;
    fabric?: Material;
  };
  selectedMarket?: MarketStyle;
  targetCost: number; // 目标成本（元）
  moq: number; // 起订量
  quantity: number; // 实际订购数量
  additionalRequirements?: string;
}

// ============ 成本计算结果 ============
export interface CostBreakdown {
  woodCost: number; // 木材成本
  fabricCost: number; // 面料成本
  laborCost: number; // 人工成本（基于 MOQ）
  overheadCost: number; // 管理成本
  logisticsCost: number; // 物流成本
  totalCost: number; // 总成本
  unitPrice: number; // 单位价格
  profitMargin?: number; // 利润空间
  withinBudget: boolean; // 是否在预算内
}

// ============ 工厂匹配结果 ============
export interface FactoryMatch {
  factory: Factory;
  matchScore: number; // 0-100
  reasons: string[]; // 匹配原因
  recommendedPrice: number; // 推荐报价
  estimatedLeadTime: number; // 预计交期
  priceTier: PriceTier; // 适用的阶梯价格
}

// ============ C2M 引擎状态 ============
export interface C2MEngineState {
  configuration: C2MConfiguration;
  costBreakdown: CostBreakdown;
  matchedFactories: FactoryMatch[];
  loading: boolean;
  error?: string;
}

// ============ 成本计算参数 ============
export interface CostCalculationParams {
  woodMaterial?: Material;
  fabricMaterial?: Material;
  moq: number;
  quantity: number;
  marketStyle?: MarketStyle;
}
