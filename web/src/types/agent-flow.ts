/**
 * Viral Tracker Agent Flow 类型定义
 */

export type AgentStepStatus = 'idle' | 'processing' | 'completed' | 'failed';

export interface AgentStep {
  id: string;
  name: string;
  description: string;
  status: AgentStepStatus;
  output?: any;
  timestamp: string;
}

export interface ViralTrendTask {
  id: string;
  sourceUrl: string; // TikTok 视频链接
  productTitle?: string;
  trendMetrics: {
    views: string;
    likes: string;
    growthVelocity: number; // 增长速率
  };
  steps: AgentStep[];
  overallStatus: AgentStepStatus;
  matchedFactoryId?: string;
  roiPrediction?: {
    investment: number;
    projectedRevenue: number;
    paybackPeriod: string;
  };
}

export interface AgentLog {
  id: string;
  taskId: string;
  message: string;
  level: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}
