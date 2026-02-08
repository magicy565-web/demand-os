"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  TrendingUp,
  Factory,
  Globe,
  BarChart3,
  Lightbulb,
  Target,
  Home as HomeIcon,
  Clock,
  List,
  MessageSquare,
  Gift,
  Smartphone,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [query, setQuery] = useState("");

  const quickActions = [
    { icon: Sparkles, label: "探索新功能", tag: "🔥" },
    { icon: Lightbulb, label: "AI产品设计", tag: "🎨" },
    { icon: Globe, label: "全球商品搜索" },
    { icon: Factory, label: "全球供应商搜索" },
    { icon: TrendingUp, label: "分析热卖品" },
    { icon: BarChart3, label: "评估市场潜力" },
    { icon: Target, label: "洞察趋势" },
  ];

  const agentTemplates = [
    {
      title: "工厂产能委托发布",
      category: "Supplier sourcing",
      description: "通过对话式交互，逐步引导工厂用户上传产品信息和特定需求",
      isNew: true,
      id: "factory-odm",
    },
    {
      title: "海外寻源",
      category: "Supplier sourcing",
      description: "智能匹配海外供应商，提供详细的供应商信息和报价",
      id: "overseas-sourcing",
    },
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    // 调用 API 启动任务
    const response = await fetch("/api/agent/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    
    // 跳转到结果页面
    router.push(`/task/${data.taskId}`);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* 左侧导航栏 */}
      <div
        className={`${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-[#f7f7f8] border-r border-gray-200 flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="text-2xl font-bold">Demand-OS</div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* 导航项 */}
        <nav className="flex-1 px-2">
          <NavItem
            icon={HomeIcon}
            label="首页"
            collapsed={sidebarCollapsed}
            active
          />
          <NavItem
            icon={Clock}
            label="历史记录"
            collapsed={sidebarCollapsed}
          />
          <NavItem icon={List} label="我的列表" collapsed={sidebarCollapsed} />
          <NavItem
            icon={MessageSquare}
            label="消息"
            collapsed={sidebarCollapsed}
            badge={4}
          />
        </nav>

        {/* 底部项 */}
        <div className="px-2 pb-4">
          <NavItem
            icon={Gift}
            label="邀请有礼"
            collapsed={sidebarCollapsed}
            highlight
          />
          <NavItem
            icon={Smartphone}
            label="下载 APP"
            collapsed={sidebarCollapsed}
          />
          <NavItem
            icon={HelpCircle}
            label="联系我们"
            collapsed={sidebarCollapsed}
          />
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-y-auto">
        {/* 顶部栏 */}
        <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option>简体中文 - CNY</option>
              <option>English - USD</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-emerald-500" />
              <span className="text-sm">3</span>
            </div>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600">
              免费试用
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
              YM
            </div>
          </div>
        </div>

        {/* 专属福利横幅 */}
        <div className="mx-6 mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-emerald-500" size={20} />
            <span className="text-emerald-700 font-medium">
              专属福利 — 30天免费试用！
            </span>
          </div>
          <button className="text-emerald-600 hover:text-emerald-700">→</button>
        </div>

        {/* 主标题 */}
        <div className="text-center mt-12 mb-8">
          <h1 className="text-5xl font-bold mb-2">Demand-OS</h1>
          <p className="text-xl text-gray-600">AI智能采购，一问搞定</p>
        </div>

        {/* 搜索框 */}
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <div className="relative bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:border-emerald-300 transition-colors">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="描述您的需求..."
              className="w-full px-6 py-4 text-lg resize-none outline-none rounded-2xl"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
            <div className="flex items-center justify-between px-6 pb-4">
              <button className="text-gray-400 hover:text-gray-600">
                <Search size={20} />
              </button>
              <div className="flex items-center gap-3">
                <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                  <option>快速</option>
                  <option>深度思考</option>
                </select>
                <button
                  onClick={handleSearch}
                  className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:from-emerald-600 hover:to-teal-600"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 快捷按钮 */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm flex items-center gap-2 transition-colors"
              >
                <action.icon size={16} />
                {action.label}
                {action.tag && <span>{action.tag}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Agent 模板库 */}
        <div className="max-w-6xl mx-auto px-6 pb-12">
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button className="px-4 py-2 border-b-2 border-emerald-500 text-emerald-600 font-medium">
              全部
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              供应商寻源
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              产品设计
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              市场分析
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentTemplates.map((template, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/agents/${template.id}/chat-v2`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold">{template.title}</h3>
                  {template.isNew && (
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-600 text-xs rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{template.category}</span>
                  <button className="text-sm text-emerald-600 hover:text-emerald-700">
                    查看详情 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  collapsed,
  active = false,
  badge,
  highlight = false,
}: {
  icon: any;
  label: string;
  collapsed: boolean;
  active?: boolean;
  badge?: number;
  highlight?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
        active
          ? "bg-white text-emerald-600"
          : highlight
          ? "bg-emerald-100 text-emerald-600"
          : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      <Icon size={20} />
      {!collapsed && (
        <>
          <span className="flex-1 text-left text-sm">{label}</span>
          {badge && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {badge}
            </span>
          )}
        </>
      )}
    </button>
  );
}
