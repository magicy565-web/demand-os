/**
 * Chat API - 封装与后端 Agent 的交互
 */

import { AgentResult, AgentStep } from '@/lib/agent-engine-v2';

export interface ChatAPIResponse {
  success: boolean;
  result?: AgentResult;
  steps?: AgentStep[];
  error?: string;
  message?: string;
}

/**
 * 分析 TikTok 视频并运行完整 Agent Flow
 */
export async function analyzeProduct(tiktokUrl: string): Promise<ChatAPIResponse> {
  try {
    const response = await fetch('/api/agent/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tiktokUrl }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Chat API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * 检测输入内容是否为 TikTok 链接
 */
export function isTikTokUrl(input: string): boolean {
  const tiktokPatterns = [
    /tiktok\.com\/@[\w.-]+\/video\/\d+/i,
    /vm\.tiktok\.com\/[\w]+/i,
    /vt\.tiktok\.com\/[\w]+/i,
    /tiktok\.com\/.*\/video\/\d+/i,
  ];

  return tiktokPatterns.some((pattern) => pattern.test(input));
}

/**
 * 提取 TikTok URL
 */
export function extractTikTokUrl(input: string): string | null {
  const urlMatch = input.match(/(https?:\/\/[^\s]+)/);
  if (urlMatch && isTikTokUrl(urlMatch[1])) {
    return urlMatch[1];
  }
  return null;
}

/**
 * 格式化价格
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/**
 * 格式化数字
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * 获取生命周期阶段的显示文本
 */
export function getLifecycleLabel(lifecycle: 'emerging' | 'explosive' | 'mature'): string {
  const labels = {
    emerging: '🌱 新兴期',
    explosive: '🚀 爆发期',
    mature: '📈 成熟期',
  };
  return labels[lifecycle];
}

/**
 * 获取风险等级的显示文本和颜色
 */
export function getRiskLevelInfo(riskLevel: 'low' | 'medium' | 'high'): {
  label: string;
  color: string;
  bgColor: string;
} {
  const info = {
    low: { label: '低风险', color: 'text-green-600', bgColor: 'bg-green-50' },
    medium: { label: '中风险', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    high: { label: '高风险', color: 'text-red-600', bgColor: 'bg-red-50' },
  };
  return info[riskLevel];
}
