import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并 Tailwind CSS 类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化货币
 */
export function formatCurrency(value: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * 格式化数量
 */
export function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

/**
 * 相对时间格式化
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "刚刚";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} 分钟前`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} 小时前`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} 天前`;
  return date.toLocaleDateString("zh-CN");
}

/**
 * 紧急度颜色映射
 */
export function getUrgencyColor(urgency: string): string {
  const colors: Record<string, string> = {
    low: "text-cyber-green",
    medium: "text-cyber-yellow",
    high: "text-cyber-pink",
    critical: "text-cyber-red",
  };
  return colors[urgency] || "text-gray-400";
}

/**
 * 紧急度标签映射
 */
export function getUrgencyLabel(urgency: string): string {
  const labels: Record<string, string> = {
    low: "常规",
    medium: "中等",
    high: "紧急",
    critical: "极紧急",
  };
  return labels[urgency] || urgency;
}

/**
 * 商业价值颜色
 */
export function getBusinessValueColor(value: number): string {
  if (value >= 80) return "text-cyber-green";
  if (value >= 60) return "text-cyber-cyan";
  if (value >= 40) return "text-cyber-yellow";
  return "text-gray-400";
}

/**
 * 生成随机 ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * 延迟函数
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
