"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Demand } from "@/types/demand";

interface DemandTableProps {
  demands: Demand[];
  onSort?: (field: string, direction: "asc" | "desc") => void;
  loading?: boolean;
}

// 紧急度配置
const URGENCY_CONFIG = {
  low: { label: "一般", color: "text-green-400", bgColor: "bg-green-500/20", priority: 1 },
  medium: { label: "中等", color: "text-yellow-400", bgColor: "bg-yellow-500/20", priority: 2 },
  high: { label: "紧急", color: "text-orange-400", bgColor: "bg-orange-500/20", priority: 3 },
  critical: { label: "特急", color: "text-red-400", bgColor: "bg-red-500/20", priority: 4 },
};

// 格式化金额
function formatPrice(priceRange: string): string {
  return priceRange;
}

// 格式化时间
function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (hours < 1) return "刚刚";
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  return date.toLocaleDateString("zh-CN");
}

// 计算剩余时间（模拟）
function getRemainingTime(urgency: string): string {
  switch (urgency) {
    case "critical": return "< 24小时";
    case "high": return "2-3天";
    case "medium": return "7天";
    default: return "14天+";
  }
}

// 模拟利润率计算
function getEstimatedMargin(businessValue: number): { value: number; display: string } {
  // 基于商业价值评分模拟利润率
  const baseMargin = 10 + (businessValue / 100) * 20;
  const variance = (Math.random() - 0.5) * 6;
  const margin = Math.round((baseMargin + variance) * 10) / 10;
  return {
    value: margin,
    display: `${margin}%`
  };
}

export function DemandTable({ demands, loading = false }: DemandTableProps) {
  const [sortField, setSortField] = useState<string>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState<string>("");

  // 排序和过滤
  const processedDemands = useMemo(() => {
    let result = [...demands];
    
    // 过滤
    if (filter) {
      const lowerFilter = filter.toLowerCase();
      result = result.filter(d => 
        d.title.toLowerCase().includes(lowerFilter) ||
        d.category.toLowerCase().includes(lowerFilter) ||
        d.region.toLowerCase().includes(lowerFilter)
      );
    }
    
    // 排序
    result.sort((a, b) => {
      let aVal: number | string;
      let bVal: number | string;
      
      switch (sortField) {
        case "urgency":
          aVal = URGENCY_CONFIG[a.urgency]?.priority || 0;
          bVal = URGENCY_CONFIG[b.urgency]?.priority || 0;
          break;
        case "business_value":
          aVal = a.business_value;
          bVal = b.business_value;
          break;
        case "quantity":
          aVal = a.quantity;
          bVal = b.quantity;
          break;
        case "created_at":
        default:
          aVal = new Date(a.created_at).getTime();
          bVal = new Date(b.created_at).getTime();
      }
      
      if (sortDirection === "asc") {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });
    
    return result;
  }, [demands, sortField, sortDirection, filter]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) {
      return <span className="text-gray-600 ml-1">⇅</span>;
    }
    return (
      <span className="text-blue-400 ml-1">
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">
            <span className="status-indicator status-active mr-2" />
            实时需求列表
          </div>
        </div>
        <div className="p-8 text-center">
          <div className="loader mx-auto mb-4" />
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      {/* 头部 */}
      <div className="panel-header">
        <div className="panel-title">
          <span className="status-indicator status-active" />
          实时需求列表
          <span className="badge badge-primary ml-2">{demands.length}</span>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="搜索品类、地区..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-input w-48 text-sm"
          />
        </div>
      </div>

      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-12">#</th>
              <th 
                className="cursor-pointer hover:text-blue-400 transition-colors min-w-[200px]"
                onClick={() => handleSort("title")}
              >
                需求标题 <SortIcon field="title" />
              </th>
              <th className="w-24">品类</th>
              <th className="w-20">地区</th>
              <th 
                className="cursor-pointer hover:text-blue-400 transition-colors w-32"
                onClick={() => handleSort("price_range")}
              >
                目标价 <SortIcon field="price_range" />
              </th>
              <th 
                className="cursor-pointer hover:text-blue-400 transition-colors w-24"
                onClick={() => handleSort("quantity")}
              >
                数量 <SortIcon field="quantity" />
              </th>
              <th className="w-24">剩余时间</th>
              <th 
                className="cursor-pointer hover:text-blue-400 transition-colors w-24"
                onClick={() => handleSort("urgency")}
              >
                紧急度 <SortIcon field="urgency" />
              </th>
              <th 
                className="cursor-pointer hover:text-blue-400 transition-colors w-24"
                onClick={() => handleSort("business_value")}
              >
                预估毛利 <SortIcon field="business_value" />
              </th>
              <th className="w-24">操作</th>
            </tr>
          </thead>
          <tbody>
            {processedDemands.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-12 text-gray-500">
                  暂无匹配的需求数据
                </td>
              </tr>
            ) : (
              processedDemands.map((demand, index) => {
                const urgencyConfig = URGENCY_CONFIG[demand.urgency];
                const margin = getEstimatedMargin(demand.business_value);
                
                return (
                  <tr 
                    key={demand.id} 
                    className="group hover:bg-[#161b22] transition-colors cursor-pointer"
                  >
                    <td className="text-gray-500 font-mono text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td>
                      <Link href={`/demand/${demand.id}`} className="block">
                        <div className="font-medium text-gray-100 group-hover:text-blue-400 transition-colors">
                          {demand.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {demand.source_platform} · {formatTime(demand.created_at)}
                        </div>
                      </Link>
                    </td>
                    <td>
                      <span className="tag tag-blue">{demand.category}</span>
                    </td>
                    <td className="text-gray-400">{demand.region}</td>
                    <td className="font-mono text-sm text-blue-400 font-medium">
                      {formatPrice(demand.price_range)}
                    </td>
                    <td className="font-mono text-sm">
                      {demand.quantity.toLocaleString()} {demand.unit}
                    </td>
                    <td className="text-gray-400 text-sm">
                      {getRemainingTime(demand.urgency)}
                    </td>
                    <td>
                      <span className={`tag ${urgencyConfig?.bgColor} ${urgencyConfig?.color} border-0`}>
                        {urgencyConfig?.label}
                      </span>
                    </td>
                    <td>
                      <span className={margin.value >= 15 ? "profit-positive" : margin.value >= 10 ? "text-yellow-400" : "profit-neutral"}>
                        {margin.display}
                      </span>
                    </td>
                    <td>
                      <Link 
                        href={`/demand/${demand.id}`}
                        className="btn-outline text-xs py-1 px-2"
                      >
                        查看
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 底部统计 */}
      <div className="px-4 py-3 border-t border-[#21262d] bg-[#161b22] flex items-center justify-between text-sm text-gray-400">
        <div>
          显示 {processedDemands.length} 条需求
          {filter && ` (已过滤)`}
        </div>
        <div className="flex items-center gap-4">
          <span>
            高利润订单: {processedDemands.filter(d => d.business_value >= 70).length} 条
          </span>
          <span className="text-green-400">
            ● 数据实时更新中
          </span>
        </div>
      </div>
    </div>
  );
}

export default DemandTable;
