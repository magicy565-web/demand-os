"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Activity,
  TrendingUp,
  Package,
  DollarSign,
  Users,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Globe,
  Warehouse,
  Search,
  Filter,
} from "lucide-react";
import TrendChart from "@/components/charts/TrendChart";
import RegionPieChart from "@/components/charts/RegionPieChart";
import UrgencyBarChart from "@/components/charts/UrgencyBarChart";
import ProfitGauge from "@/components/charts/ProfitGauge";
import LiveDataFeed from "@/components/charts/LiveDataFeed";
import AIRecommendation from "@/components/AIRecommendation";
import AIChatBot from "@/components/AIChatBot";

export default function ConsolePage() {
  const [liveData, setLiveData] = useState({
    demands: 1247,
    matches: 89,
    revenue: 234567,
    activeUsers: 423,
  });

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) => ({
        demands: prev.demands + Math.floor(Math.random() * 5),
        matches: prev.matches + Math.floor(Math.random() * 3),
        revenue: prev.revenue + Math.floor(Math.random() * 1000),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 最新需求数据
  const recentDemands = [
    {
      id: "1",
      title: "TWS耳机",
      region: "北美",
      value: "$328K",
      status: "critical",
      time: "2分钟前",
    },
    {
      id: "2",
      title: "有机棉T恤",
      region: "北美",
      value: "$245K",
      status: "high",
      time: "15分钟前",
    },
    {
      id: "3",
      title: "智能手表配件",
      region: "北美",
      value: "$1.85M",
      status: "critical",
      time: "30分钟前",
    },
    {
      id: "4",
      title: "户外LED灯",
      region: "北美",
      value: "$225K",
      status: "high",
      time: "1小时前",
    },
    {
      id: "5",
      title: "医疗硅胶制品",
      region: "欧洲",
      value: "$650K",
      status: "medium",
      time: "2小时前",
    },
  ];

  const stats = [
    {
      label: "总需求数",
      value: liveData.demands,
      change: "+12.3%",
      icon: Package,
      color: "blue",
    },
    {
      label: "智能匹配",
      value: liveData.matches,
      change: "+8.7%",
      icon: Zap,
      color: "purple",
    },
    {
      label: "交易额",
      value: `$${(liveData.revenue / 1000).toFixed(1)}K`,
      change: "+23.5%",
      icon: DollarSign,
      color: "green",
    },
    {
      label: "活跃用户",
      value: liveData.activeUsers,
      change: "+5.2%",
      icon: Users,
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <nav className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 group">
                <Image
                  src="/logo.png"
                  alt="Demand OS"
                  width={140}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-slate-600">系统运行中</span>
              </div>
            </div>
            
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              返回首页
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            控制台
          </h1>
          <p className="text-slate-600">
            实时监控全球需求，智能匹配供应链资源
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Data Visualization Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">数据分析</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              <TrendChart />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RegionPieChart />
                <UrgencyBarChart />
              </div>
            </div>
            
            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              <ProfitGauge />
              <LiveDataFeed />
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Demands - 2/3 width */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">最新需求</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Search className="w-5 h-5 text-slate-600" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Filter className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {recentDemands.map((demand, index) => (
                <motion.div
                  key={demand.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <StatusBadge status={demand.status} />
                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {demand.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          {demand.region}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {demand.value}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {demand.time}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <Link
                href="/demand"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-2 group"
              >
                查看全部需求
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Sidebar - 1/3 width */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                快捷操作
              </h3>
              <div className="space-y-3">
                <QuickAction
                  icon={Package}
                  label="发布新需求"
                  color="blue"
                />
                <QuickAction
                  icon={Warehouse}
                  label="供应商管理"
                  color="purple"
                />
                <QuickAction
                  icon={TrendingUp}
                  label="数据分析"
                  color="green"
                />
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                系统动态
              </h3>
              <div className="space-y-4">
                <ActivityItem
                  icon={CheckCircle}
                  text="新匹配：TWS耳机 × 深圳工厂"
                  time="刚刚"
                  color="green"
                />
                <ActivityItem
                  icon={Activity}
                  text="系统升级完成"
                  time="5分钟前"
                  color="blue"
                />
                <ActivityItem
                  icon={AlertCircle}
                  text="需求待审核：3条"
                  time="10分钟前"
                  color="orange"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Recommendation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">AI 智能匹配</h2>
          <AIRecommendation />
        </motion.div>
      </div>

      {/* AI Chat Bot */}
      <AIChatBot />
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; label: string }> = {
    critical: { bg: "bg-red-100", text: "text-red-700", label: "特急" },
    high: { bg: "bg-orange-100", text: "text-orange-700", label: "紧急" },
    medium: { bg: "bg-yellow-100", text: "text-yellow-700", label: "一般" },
    low: { bg: "bg-green-100", text: "text-green-700", label: "普通" },
  };

  const style = styles[status] || styles.low;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
    >
      {style.label}
    </span>
  );
}

// Quick Action Component
function QuickAction({
  icon: Icon,
  label,
  color,
}: {
  icon: any;
  label: string;
  color: string;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 p-3 rounded-xl bg-${color}-50 hover:bg-${color}-100 text-${color}-700 transition-colors group`}
    >
      <div className={`p-2 rounded-lg bg-${color}-100 group-hover:bg-${color}-200 transition-colors`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="font-medium text-sm">{label}</span>
      <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

// Activity Item Component
function ActivityItem({
  icon: Icon,
  text,
  time,
  color,
}: {
  icon: any;
  text: string;
  time: string;
  color: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600 mt-0.5`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-900">{text}</p>
        <p className="text-xs text-slate-500 mt-0.5">{time}</p>
      </div>
    </div>
  );
}
