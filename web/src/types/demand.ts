// 需求数据类型定义 - 工业园区专业版

// 贸易术语类型
export type Incoterm = 
  | "EXW"      // 工厂交货
  | "FOB"      // 离岸价
  | "CIF"      // 到岸价
  | "CFR"      // 成本加运费
  | "DDP"      // 完税后交货
  | "DAP"      // 目的地交货
  | "FCA";     // 货交承运人

// 付款方式类型
export type PaymentTerm = 
  | "T/T 100% advance"      // 100%预付
  | "T/T 30/70"             // 30%预付，70%出货前
  | "T/T 30% deposit"       // 30%定金
  | "L/C at sight"          // 即期信用证
  | "L/C 30 days"           // 30天信用证
  | "L/C 60 days"           // 60天信用证
  | "L/C 90 days"           // 90天信用证
  | "OA 30 days"            // 30天赊销
  | "OA 60 days"            // 60天赊销
  | "OA 90 days"            // 90天赊销
  | "D/P"                   // 付款交单
  | "D/A";                  // 承兑交单

// 认证类型
export type Certification = 
  | "CE"        // 欧盟认证
  | "FCC"       // 美国通信认证
  | "UL"        // 美国安全认证
  | "RoHS"      // 有害物质限制
  | "REACH"     // 欧盟化学品法规
  | "FDA"       // 美国食品药品
  | "ISO9001"   // 质量管理体系
  | "ISO14001"  // 环境管理体系
  | "GOTS"      // 全球有机纺织品
  | "OEKO-TEX"  // 纺织品安全
  | "BSCI"      // 商业社会责任
  | "SA8000"    // 社会责任
  | "GS"        // 德国安全
  | "CB"        // 国际电工认证
  | "ETL"       // 美国安全认证
  | "CCC";      // 中国强制认证

// 需求来源平台（更专业化）
export type SourcePlatform = 
  | "Amazon Vendor Central"       // 亚马逊VC订单
  | "Amazon FBA"                  // 亚马逊FBA
  | "Walmart DSV"                 // 沃尔玛直供
  | "Costco Sourcing"             // Costco采购计划
  | "Target Direct"               // Target直采
  | "Home Depot"                  // 家得宝
  | "TikTok Shop US"              // TikTok美区
  | "TikTok Shop UK"              // TikTok英区
  | "Temu"                        // Temu平台
  | "SHEIN"                       // SHEIN平台
  | "Alibaba RFQ"                 // 阿里巴巴询盘
  | "Global Sources"              // 环球资源
  | "Made-in-China"               // 中国制造网
  | "Canton Fair"                 // 广交会
  | "Government Tender"           // 政府招标
  | "Brand Direct";               // 品牌直采

// 利润核算信息
export interface ProfitEstimate {
  target_price_usd: number;        // 目标价（美元）
  suggested_cost_cny: number;      // 建议出厂价（人民币）
  estimated_margin: number;        // 预估毛利率（%）
  exchange_rate: number;           // 汇率
  shipping_cost_estimate: number;  // 预估运费
  certification_cost: number;      // 认证成本
}

// 主需求接口
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
  
  // ========== 新增专业贸易字段 ==========
  
  // 贸易条款
  incoterm?: Incoterm;                    // 贸易术语 (FOB/CIF/DDP等)
  incoterm_location?: string;             // 贸易术语地点 (如 FOB Shenzhen)
  
  // 付款条件
  payment_term?: PaymentTerm;             // 付款方式
  
  // 认证要求
  certifications_required?: Certification[];  // 必需认证
  certifications_preferred?: Certification[]; // 优选认证
  
  // 利润核算
  profit_estimate?: ProfitEstimate;       // 利润预估
  
  // MOQ 相关
  moq?: number;                           // 最小起订量
  moq_unit?: string;                      // MOQ单位
  
  // SKU 信息
  sku_count?: number;                     // SKU数量
  sku_details?: string;                   // SKU详情
  
  // 交期要求
  delivery_deadline?: string;             // 交货截止日期
  lead_time_days?: number;                // 要求交期（天）
  
  // 样品要求
  sample_required?: boolean;              // 是否需要样品
  sample_deadline?: string;               // 样品截止日期
  
  // 验厂要求
  factory_audit?: "none" | "basic" | "BSCI" | "SA8000" | "custom";
  
  // 质检要求
  inspection_type?: "none" | "PSI" | "DPI" | "full";
  
  // 采购商信息（脱敏）
  buyer_type?: "brand" | "retailer" | "wholesaler" | "agent" | "platform";
  buyer_region?: string;
  annual_volume_estimate?: string;        // 年采购量预估
  
  // 匹配的工厂（AI匹配结果）
  matched_suppliers?: MatchedSupplier[];
}

// 匹配的供应商信息
export interface MatchedSupplier {
  supplier_id: string;
  supplier_name: string;
  match_score: number;      // 匹配分 0-100
  match_reasons: string[];  // 匹配原因
  capacity_available: boolean;
  certifications_matched: Certification[];
  estimated_quote?: number; // 预估报价
}

// 供应商/工厂数据类型
export interface Supplier {
  id: string;
  name: string;
  short_name?: string;
  
  // 基本信息
  location: string;                       // 所在地
  park_name?: string;                     // 所属园区
  established_year?: number;              // 成立年份
  employee_count?: number;                // 员工数量
  factory_area?: number;                  // 厂房面积（平方米）
  
  // 核心能力
  core_processes: string[];               // 核心工艺 (注塑/冲压/缝纫等)
  categories: string[];                   // 主营品类
  
  // 产能信息
  monthly_capacity?: string;              // 月产能
  current_load_percent?: number;          // 当前产能负荷 (%)
  available_capacity?: string;            // 可用产能
  
  // 资质认证
  certifications: Certification[];
  
  // 客户与业绩
  main_clients?: string[];                // 主要客户（脱敏）
  export_regions?: string[];              // 出口地区
  annual_export_value?: string;           // 年出口额
  
  // 质量指标
  quality_score?: number;                 // 质量评分 0-100
  on_time_delivery_rate?: number;         // 准时交货率 (%)
  defect_rate?: number;                   // 次品率 (%)
  
  // 联系信息
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  
  // 状态
  status: "active" | "inactive" | "pending";
  verified: boolean;                      // 是否已验证
  
  created_at: string;
  updated_at: string;
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
