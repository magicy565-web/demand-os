/**
 * Chat 类型定义
 * 用于对话式采购 Agent 功能
 */

export type MessageRole = 'user' | 'agent' | 'system';

export type MessageType = 
  | 'text'           // 纯文本消息
  | 'product'        // 产品分析结果
  | 'factories'      // 工厂匹配结果
  | 'pricing'        // 报价信息
  | 'processing'     // 处理中状态
  | 'error';         // 错误消息

export interface Message {
  id: string;
  role: MessageRole;
  type: MessageType;
  content: string;
  timestamp: Date;
  data?: MessageData;
}

export interface MessageData {
  // 产品分析数据
  product?: {
    name: string;
    category: string;
    trendScore: number;
    lifecycle: 'emerging' | 'explosive' | 'mature';
    features?: string[];
    views?: number;
    likes?: number;
  };
  
  // 工厂匹配数据
  factories?: Array<{
    id: string;
    name: string;
    matchScore: number;
    matchReasons: string[];
    location?: string;
    certifications?: string[];
  }>;
  
  // 报价数据
  pricing?: {
    dropshipping: { price: number; moq: number };
    wholesale: { price: number; moq: number };
    exclusive: { price: number; moq: number };
  };
  
  // ROI 预测数据
  roi?: {
    estimatedRevenue: number;
    estimatedProfit: number;
    profitMargin: number;
    paybackDays: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
  
  // 处理步骤
  steps?: Array<{
    id: string;
    agent: 'Traffic' | 'Capacity' | 'Execution' | 'Financial';
    action: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    log: string[];
  }>;
  
  // 快捷操作按钮
  quickActions?: Array<{
    id: string;
    label: string;
    action: string;
    icon?: string;
  }>;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

export interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string | null;
  isProcessing: boolean;
  error: string | null;
}
