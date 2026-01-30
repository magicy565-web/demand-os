/**
 * Auto Request Beta 功能类型定义
 * 自动寻源系统的核心数据结构
 */

/**
 * 结构化查询对象 - AI 解析后的用户需求
 */
export interface StructuredQuery {
  intent: "sourcing_request" | "product_inquiry" | "price_check" | "supplier_search";
  category?: string;
  keywords: string[];
  target_price?: {
    min?: number;
    max?: number;
    currency: string;
  };
  moq?: {
    min?: number;
    max?: number;
    unit?: string;
  };
  special_requirements?: string[]; // "Dropshipping", "OEM", "Private Label", etc.
  delivery_time?: string;
  certifications?: string[];
  confidence: number; // AI 解析的置信度 0-1
  original_query: string; // 用户原始输入
}

/**
 * 产品匹配结果
 */
export interface ProductMatch {
  id: string;
  name: string;
  category: string;
  price: number;
  moq: number;
  supplier: {
    id: string;
    name: string;
    rating: number;
  };
  match_score: number; // 0-100
  match_reasons: string[];
  supports_dropshipping: boolean;
  certifications: string[];
  thumbnail?: string;
}

/**
 * 寻源工单状态
 */
export type SourcingStatus = "pending" | "processing" | "quoted" | "closed" | "failed";

/**
 * 寻源工单记录
 */
export interface SourcingRequest {
  id: string;
  user_id: string;
  user_name?: string;
  original_query: string; // 用户原始话术
  parsed_requirements: StructuredQuery; // AI 解析后的结构化数据
  status: SourcingStatus;
  priority: "high" | "medium" | "low";
  created_at: Date;
  updated_at: Date;
  assigned_to?: string; // 分配给哪个采购员
  estimated_response_time?: number; // 预计响应时间（小时）
  quotes?: SourcingQuote[]; // 人工报价列表
}

/**
 * 人工报价单
 */
export interface SourcingQuote {
  id: string;
  request_id: string;
  supplier_name: string;
  product_name: string;
  fob_price: number;
  moq: number;
  delivery_time: string;
  sample_available: boolean;
  sample_price?: number;
  notes?: string;
  created_by: string;
  created_at: Date;
}

/**
 * Auto Request API 响应类型
 */
export type AutoRequestResponse = 
  | {
      type: "product_match";
      data: {
        matches: ProductMatch[];
        total: number;
        query: StructuredQuery;
      };
    }
  | {
      type: "auto_request_triggered";
      data: {
        ticket_id: string;
        ticket: SourcingRequest;
        message: string;
        estimated_time: number;
      };
    }
  | {
      type: "parsing_error";
      data: {
        error: string;
        original_query: string;
      };
    };

/**
 * 聊天消息状态
 */
export type ChatStatus = "idle" | "analyzing" | "searching" | "escalating" | "error";

/**
 * AI 解析配置
 */
export interface AIParserConfig {
  model: string;
  temperature: number;
  max_tokens: number;
  system_prompt: string;
}
