"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Demand } from "@/types/demand";
import { fetchDemands } from "@/lib/api";
import { formatRelativeTime, formatNumber } from "@/lib/utils";

// 模拟数据
const MOCK_DEMANDS: Demand[] = [
  {
    id: "1",
    title: "TWS蓝牙耳机OEM订单",
    description: "Amazon Vendor Central 大客户订单",
    category: "消费电子",
    region: "北美",
    price_range: "$8.50 - $12.00",
    urgency: "high",
    quantity: 20000,
    unit: "PCS",
    source_platform: "Amazon VC",
    business_value: 85,
    tags: ["CE", "FCC", "FOB"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: "active",
    incoterm: "FOB",
    incoterm_location: "FOB Shenzhen",
    payment_term: "T/T 30/70",
    profit_estimate: {
      target_price_usd: 10.25,
      suggested_cost_cny: 45,
      estimated_margin: 22.5,
      exchange_rate: 7.25,
      shipping_cost_estimate: 1.2,
      certification_cost: 0.3
    }
  },
  {
    id: "2",
    title: "有机棉T恤代工",
    description: "Walmart DSV 季节性订单",
    category: "服装纺织",
    region: "北美",
    price_range: "$4.50 - $6.00",
    urgency: "medium",
    quantity: 50000,
    unit: "PCS",
    source_platform: "Walmart DSV",
    business_value: 78,
    tags: ["GOTS", "BSCI", "DDP"],
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
    status: "active",
    incoterm: "DDP",
    incoterm_location: "DDP Los Angeles",
    payment_term: "OA 60 days",
    profit_estimate: {
      target_price_usd: 5.25,
      suggested_cost_cny: 22,
      estimated_margin: 15.8,
      exchange_rate: 7.25,
      shipping_cost_estimate: 0.8,
      certification_cost: 0.2
    }
  },
  {
    id: "3",
    title: "智能手表配件套装",
    description: "Costco 2025采购计划",
    category: "消费电子",
    region: "北美",
    price_range: "$15.00 - $22.00",
    urgency: "critical",
    quantity: 100000,
    unit: "SET",
    source_platform: "Costco",
    business_value: 92,
    tags: ["CE", "FCC", "UL", "CIF"],
    created_at: new Date(Date.now() - 1800000).toISOString(),
    updated_at: new Date(Date.now() - 1800000).toISOString(),
    status: "active",
    incoterm: "CIF",
    incoterm_location: "CIF Los Angeles",
    payment_term: "L/C at sight",
    profit_estimate: {
      target_price_usd: 18.5,
      suggested_cost_cny: 75,
      estimated_margin: 25.2,
      exchange_rate: 7.25,
      shipping_cost_estimate: 2.1,
      certification_cost: 0.5
    }
  },
  {
    id: "4",
    title: "户外露营LED灯",
    description: "TikTok Shop US 爆品返单",
    category: "家居用品",
    region: "北美",
    price_range: "$6.00 - $9.00",
    urgency: "high",
    quantity: 30000,
    unit: "PCS",
    source_platform: "TikTok Shop",
    business_value: 75,
    tags: ["FCC", "ETL", "FOB"],
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 7200000).toISOString(),
    status: "active",
    incoterm: "FOB",
    incoterm_location: "FOB Ningbo",
    payment_term: "T/T 30/70",
    profit_estimate: {
      target_price_usd: 7.5,
      suggested_cost_cny: 32,
      estimated_margin: 18.5,
      exchange_rate: 7.25,
      shipping_cost_estimate: 0.9,
      certification_cost: 0.25
    }
  },
  {
    id: "5",
    title: "医疗级硅胶制品",
    description: "欧洲医疗器械经销商",
    category: "医疗器械",
    region: "欧洲",
    price_range: "$2.50 - $4.00",
    urgency: "medium",
    quantity: 200000,
    unit: "PCS",
    source_platform: "Medica展会",
    business_value: 88,
    tags: ["FDA", "CE", "ISO13485"],
    created_at: new Date(Date.now() - 10800000).toISOString(),
    updated_at: new Date(Date.now() - 10800000).toISOString(),
    status: "active",
    incoterm: "DDP",
    incoterm_location: "DDP Hamburg",
    payment_term: "L/C 60 days",
    profit_estimate: {
      target_price_usd: 3.25,
      suggested_cost_cny: 12,
      estimated_margin: 20.8,
      exchange_rate: 7.25,
      shipping_cost_estimate: 0.4,
      certification_cost: 0.15
    }
  },
];

// 状态点组件
function StatusDot({ urgency }: { urgency: string }) {
  const colors: Record<string, string> = {
    critical: "bg-red-500",
    high: "bg-orange-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${colors[urgency] || colors.low}`} />
  );
}

// 表格行组件
function DemandRow({ demand }: { demand: Demand }) {
  const margin = demand.profit_estimate?.estimated_margin || 0;
  
  return (
    <tr className="border-b border-corp-border hover:bg-blue-50/50 transition-colors">
      {/* STATUS */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <StatusDot urgency={demand.urgency} />
          <span className="text-xs text-corp-text-sub uppercase">
            {demand.urgency === "critical" ? "特急" : 
             demand.urgency === "high" ? "紧急" :
             demand.urgency === "medium" ? "一般" : "普通"}
          </span>
        </div>
      </td>
      
      {/* DEMAND INFO */}
      <td className="px-4 py-3">
        <div>
          <Link 
            href={`/demand/${demand.id}`}
            className="font-medium text-corp-text-main hover:text-corp-accent transition-colors"
          >
            {demand.title}
          </Link>
          <div className="text-xs text-corp-text-sub mt-0.5">
            {demand.source_platform} · {demand.category}
          </div>
        </div>
      </td>
      
      {/* TRADE TERMS */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex flex-col gap-1">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
            {demand.incoterm || "TBD"}
          </span>
          <span className="text-xs text-corp-text-sub">
            {demand.payment_term || "待确认"}
          </span>
        </div>
      </td>
      
      {/* QUANTITY */}
      <td className="px-4 py-3 whitespace-nowrap text-right">
        <div className="font-mono text-sm text-corp-text-main">
          {formatNumber(demand.quantity)}
        </div>
        <div className="text-xs text-corp-text-sub">{demand.unit}</div>
      </td>
      
      {/* FINANCIALS */}
      <td className="px-4 py-3 whitespace-nowrap text-right">
        <div className="font-mono text-sm font-semibold text-corp-text-main">
          {demand.price_range}
        </div>
        <div className={`text-xs font-medium ${
          margin >= 18 ? "text-green-600" : 
          margin >= 12 ? "text-yellow-600" : "text-red-600"
        }`}>
          {margin > 0 ? `+${margin}%` : "计算中"}
        </div>
      </td>
      
      {/* REGION */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-sm text-corp-text-sub">{demand.region}</span>
      </td>
      
      {/* TIME */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-corp-text-sub">
        {formatRelativeTime(demand.created_at)}
      </td>
      
      {/* ACTION */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-corp-accent hover:text-blue-700 transition-colors">
            核算
          </button>
          <button className="text-sm font-medium text-corp-text-sub hover:text-corp-text-main transition-colors">
            接单
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function ConsolePage() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<string>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    async function loadDemands() {
      try {
        const result = await fetchDemands();
        if (result.data && result.data.length > 0) {
          setDemands(result.data);
        } else {
          setDemands(MOCK_DEMANDS);
        }
      } catch (error) {
        console.error("Failed to fetch demands:", error);
        setDemands(MOCK_DEMANDS);
      } finally {
        setLoading(false);
      }
    }
    loadDemands();

    // 定时刷新 (60秒)
    const interval = setInterval(loadDemands, 60000);
    return () => clearInterval(interval);
  }, []);

  // 排序处理
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // 排序后的数据
  const sortedDemands = [...demands].sort((a, b) => {
    let aVal: string | number = "";
    let bVal: string | number = "";
    
    switch (sortField) {
      case "urgency":
        const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        aVal = urgencyOrder[a.urgency as keyof typeof urgencyOrder] || 0;
        bVal = urgencyOrder[b.urgency as keyof typeof urgencyOrder] || 0;
        break;
      case "quantity":
        aVal = a.quantity;
        bVal = b.quantity;
        break;
      case "margin":
        aVal = a.profit_estimate?.estimated_margin || 0;
        bVal = b.profit_estimate?.estimated_margin || 0;
        break;
      case "created_at":
        aVal = new Date(a.created_at).getTime();
        bVal = new Date(b.created_at).getTime();
        break;
      default:
        aVal = String(a[sortField as keyof Demand] || "");
        bVal = String(b[sortField as keyof Demand] || "");
    }
    
    if (sortDirection === "asc") {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  // 统计数据
  const stats = {
    total: demands.length,
    urgent: demands.filter(d => d.urgency === "critical" || d.urgency === "high").length,
    highMargin: demands.filter(d => (d.profit_estimate?.estimated_margin || 0) >= 18).length,
  };

  // 表头排序指示器
  const SortIndicator = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1 text-corp-accent">
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-corp-bg text-corp-text-main font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-corp-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-corp-text-main">
                Global Demand Console
              </h1>
              <p className="text-sm text-corp-text-sub mt-0.5">
                全球采购需求管理 · 工业绿洲
              </p>
            </div>
            <div className="flex items-center gap-6">
              {/* 统计摘要 */}
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="font-bold text-corp-text-main">{stats.total}</div>
                  <div className="text-xs text-corp-text-sub">活跃需求</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-orange-600">{stats.urgent}</div>
                  <div className="text-xs text-corp-text-sub">紧急订单</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">{stats.highMargin}</div>
                  <div className="text-xs text-corp-text-sub">高利润</div>
                </div>
              </div>
              
              {/* 刷新按钮 */}
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-corp-accent text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                刷新数据
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* 筛选栏 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-corp-accent text-white rounded text-sm font-medium">
              全部
            </button>
            <button className="px-3 py-1.5 bg-white border border-corp-border text-corp-text-sub rounded text-sm hover:bg-gray-50">
              紧急
            </button>
            <button className="px-3 py-1.5 bg-white border border-corp-border text-corp-text-sub rounded text-sm hover:bg-gray-50">
              高利润
            </button>
            <button className="px-3 py-1.5 bg-white border border-corp-border text-corp-text-sub rounded text-sm hover:bg-gray-50">
              消费电子
            </button>
            <button className="px-3 py-1.5 bg-white border border-corp-border text-corp-text-sub rounded text-sm hover:bg-gray-50">
              服装纺织
            </button>
          </div>
          
          <div className="relative">
            <input 
              type="text"
              placeholder="搜索需求..."
              className="pl-8 pr-4 py-1.5 w-64 border border-corp-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-corp-accent/20 focus:border-corp-accent"
            />
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-corp-text-sub" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* 数据表格 */}
        <div className="bg-corp-surface border border-corp-border rounded-lg overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-corp-accent" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-corp-border">
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-corp-text-sub uppercase tracking-wider cursor-pointer hover:text-corp-text-main"
                      onClick={() => handleSort("urgency")}
                    >
                      Status <SortIndicator field="urgency" />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-corp-text-sub uppercase tracking-wider">
                      Demand Info
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-corp-text-sub uppercase tracking-wider">
                      Trade Terms
                    </th>
                    <th 
                      className="px-4 py-3 text-right text-xs font-bold text-corp-text-sub uppercase tracking-wider cursor-pointer hover:text-corp-text-main"
                      onClick={() => handleSort("quantity")}
                    >
                      Quantity <SortIndicator field="quantity" />
                    </th>
                    <th 
                      className="px-4 py-3 text-right text-xs font-bold text-corp-text-sub uppercase tracking-wider cursor-pointer hover:text-corp-text-main"
                      onClick={() => handleSort("margin")}
                    >
                      Financials <SortIndicator field="margin" />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-corp-text-sub uppercase tracking-wider">
                      Region
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-corp-text-sub uppercase tracking-wider cursor-pointer hover:text-corp-text-main"
                      onClick={() => handleSort("created_at")}
                    >
                      Time <SortIndicator field="created_at" />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-corp-text-sub uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDemands.map((demand) => (
                    <DemandRow key={demand.id} demand={demand} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 底部分页 */}
        <div className="mt-4 flex items-center justify-between text-sm text-corp-text-sub">
          <div>
            显示 {sortedDemands.length} 条记录
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-corp-border rounded hover:bg-gray-50 disabled:opacity-50" disabled>
              上一页
            </button>
            <span className="px-3 py-1 bg-corp-accent text-white rounded">1</span>
            <button className="px-3 py-1 border border-corp-border rounded hover:bg-gray-50 disabled:opacity-50" disabled>
              下一页
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
