"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DemandTable } from "@/components/DemandTable";
import { Footer } from "@/components/Footer";
import type { Demand } from "@/types/demand";
import { fetchDemands } from "@/lib/api";

// 统计卡片组件
function StatCard({ 
  title, 
  value, 
  change, 
  changeType = "positive",
  icon 
}: { 
  title: string; 
  value: string | number; 
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: string;
}) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <div className="stat-value">{value}</div>
          <div className="stat-label">{title}</div>
          {change && (
            <div className={`stat-change ${
              changeType === "positive" ? "stat-change-positive" : 
              changeType === "negative" ? "stat-change-negative" : 
              "text-gray-400"
            }`}>
              {changeType === "positive" ? "↑" : changeType === "negative" ? "↓" : "→"} {change}
            </div>
          )}
        </div>
        <div className="text-3xl opacity-50">{icon}</div>
      </div>
    </div>
  );
}

// 快速筛选按钮
function QuickFilter({ 
  label, 
  active, 
  onClick,
  count
}: { 
  label: string; 
  active: boolean; 
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
        active 
          ? "bg-blue-600 text-white" 
          : "bg-[#21262d] text-gray-400 hover:bg-[#30363d] hover:text-gray-200"
      }`}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${
          active ? "bg-blue-500" : "bg-[#30363d]"
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}

export default function Home() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    async function loadDemands() {
      try {
        const result = await fetchDemands();
        setDemands(result.data || []);
      } catch (error) {
        console.error("Failed to fetch demands:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDemands();

    // 定时刷新数据（30秒）
    const interval = setInterval(loadDemands, 30000);
    return () => clearInterval(interval);
  }, []);

  // 根据过滤器筛选需求
  const filteredDemands = demands.filter(d => {
    switch (activeFilter) {
      case "urgent":
        return d.urgency === "critical" || d.urgency === "high";
      case "high-value":
        return d.business_value >= 70;
      case "electronics":
        return d.category === "消费电子";
      case "textile":
        return d.category === "服装纺织";
      default:
        return true;
    }
  });

  // 计算统计数据
  const stats = {
    totalDemands: demands.length,
    urgentDemands: demands.filter(d => d.urgency === "critical" || d.urgency === "high").length,
    highValueDemands: demands.filter(d => d.business_value >= 70).length,
    avgBusinessValue: demands.length > 0 
      ? Math.round(demands.reduce((sum, d) => sum + d.business_value, 0) / demands.length)
      : 0,
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* 顶部导航 */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="text-2xl">🏭</span>
          Demand OS
          <span className="tag tag-blue ml-2">工业园区版</span>
        </div>
        <div className="nav-links">
          <Link href="/" className="nav-link active">需求大厅</Link>
          <Link href="/factory" className="nav-link">工厂中心</Link>
          <Link href="/analytics" className="nav-link">数据分析</Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="status-indicator status-active" />
          <span className="text-sm text-gray-400">系统运行中</span>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">全球采购需求实时看板</h1>
          <p className="text-gray-400">
            聚合 Amazon Vendor Central、Walmart DSV、Costco 采购计划等渠道的真实采购需求
          </p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="活跃需求" 
            value={stats.totalDemands} 
            change="今日 +12"
            changeType="positive"
            icon="📊"
          />
          <StatCard 
            title="紧急订单" 
            value={stats.urgentDemands} 
            change="需优先处理"
            changeType="negative"
            icon="⚡"
          />
          <StatCard 
            title="高利润机会" 
            value={stats.highValueDemands} 
            change="毛利 >18%"
            changeType="positive"
            icon="💰"
          />
          <StatCard 
            title="平均商业价值" 
            value={stats.avgBusinessValue} 
            change="评分"
            changeType="neutral"
            icon="📈"
          />
        </div>

        {/* 快速筛选 */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-sm text-gray-500 mr-2">快速筛选:</span>
          <QuickFilter 
            label="全部" 
            active={activeFilter === "all"} 
            onClick={() => setActiveFilter("all")}
            count={demands.length}
          />
          <QuickFilter 
            label="紧急订单" 
            active={activeFilter === "urgent"} 
            onClick={() => setActiveFilter("urgent")}
            count={stats.urgentDemands}
          />
          <QuickFilter 
            label="高利润" 
            active={activeFilter === "high-value"} 
            onClick={() => setActiveFilter("high-value")}
            count={stats.highValueDemands}
          />
          <QuickFilter 
            label="消费电子" 
            active={activeFilter === "electronics"} 
            onClick={() => setActiveFilter("electronics")}
          />
          <QuickFilter 
            label="服装纺织" 
            active={activeFilter === "textile"} 
            onClick={() => setActiveFilter("textile")}
          />
        </div>

        {/* 需求数据表格 */}
        <DemandTable demands={filteredDemands} loading={loading} />

        {/* 底部提示 */}
        <div className="mt-6 p-4 bg-[#161b22] border border-[#30363d] rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-medium text-white mb-1">如何使用需求看板？</h3>
              <p className="text-sm text-gray-400">
                1. 点击表头可按字段排序 · 2. 使用搜索框快速筛选 · 3. 点击「查看」进入详情页获取完整信息 · 4. 高利润订单标记为绿色，建议优先关注
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
