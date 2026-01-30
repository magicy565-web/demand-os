import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ===== 原有工具函数 =====

/**
 * 格式化相对时间
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diffMs = now.getTime() - targetDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return '刚刚';
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  return targetDate.toLocaleDateString('zh-CN');
}

/**
 * 格式化数字（添加千分位）
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN');
}

/**
 * 获取紧急程度标签
 */
export function getUrgencyLabel(urgency: string | number): { label: string; color: string } {
  // 如果是字符串类型的 urgency
  if (typeof urgency === 'string') {
    const urgencyMap: Record<string, { label: string; color: string }> = {
      critical: { label: '紧急', color: 'text-red-500' },
      high: { label: '高', color: 'text-orange-500' },
      medium: { label: '中等', color: 'text-yellow-500' },
      low: { label: '普通', color: 'text-green-500' }
    };
    return urgencyMap[urgency] || { label: '未知', color: 'text-gray-500' };
  }
  
  // 如果是数字类型的 urgency
  if (urgency >= 8) return { label: '紧急', color: 'text-red-500' };
  if (urgency >= 5) return { label: '中等', color: 'text-yellow-500' };
  return { label: '普通', color: 'text-green-500' };
}

/**
 * 获取商业价值颜色
 */
export function getBusinessValueColor(value: number): string {
  if (value >= 80) return 'from-green-500 to-emerald-600';
  if (value >= 60) return 'from-blue-500 to-cyan-600';
  if (value >= 40) return 'from-yellow-500 to-orange-600';
  return 'from-gray-500 to-slate-600';
}
