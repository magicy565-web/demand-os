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
  Zap,
  Brain,
} from "lucide-react";

export default function HomeV2PageOptimized() {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [executionMode, setExecutionMode] = useState("fast");

  const quickActions = [
    { icon: Zap, label: "探索新功能", tag: "🔥", color: "from-orange-50 to-orange-100" },
    { icon: Lightbulb, label: "AI产品设计", tag: "🎨", color: "from-purple-50 to-purple-100" },
    { icon: Globe, label: "全球商品搜索", color: "from-blue-50 to-blue-100" },
    { icon: Factory, label: "全球供应商搜索", color: "from-cyan-50 to-cyan-100" },
    { icon: TrendingUp, label: "分析热卖品", color: "from-pink-50 to-pink-100" },
    { icon: BarChart3, label: "评估市场潜力", color: "from-indigo-50 to-indigo-100" },
    { icon: Target, label: "洞察趋势", color: "from-green-50 to-green-100" },
  ];

  const agentTemplates = [
    {
      title: "工厂产能委托发布",
      category: "Supplier sourcing",
      description: "通过对话式交互，逐步引导工厂用户上传产品信息和特定需求",
      isNew: true,
      id: "factory-odm",
      icon: Factory,
    },
    {
      title: "海外寻源",
      category: "Supplier sourcing",
      description: "智能匹配海外供应商，提供详细的供应商信息和报价",
      id: "overseas-sourcing",
      icon: Globe,
    },
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    try {
      const response = await fetch("/api/task/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      router.push(`/task/${data.taskId}`);
    } catch (error) {
      console.error("Error starting task:", error);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* 左侧导航栏 - 深度优化 */}
      <div
        className={`${
          sidebarCollapsed ? "w-20" : "w-[260px]"
        } bg-[#fcfcfc] border-r border-gray-100 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}
        style={{
          boxShadow: "1px 0 0 0 rgba(0,0,0,0.02), 2px 0 8px -2px rgba(0,0,0,0.04)",
        }}
      >
        {/* Logo 区域 */}
        <div className="px-4 py-5 flex items-center justify-between border-b border-[#e5e5e5]">
          {!sidebarCollapsed && (
            <div className="text-lg font-semibold tracking-tight text-gray-900">
              Demand-OS
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 hover:bg-gray-200 rounded-md transition-all duration-200 hover:scale-105"
          >
            {sidebarCollapsed ? (
              <ChevronRight size={18} className="text-gray-600" />
            ) : (
              <ChevronLeft size={18} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* 导航项 */}
        <nav className="flex-1 px-2 py-3 space-y-1">
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
        <div className="px-2 py-3 border-t border-[#e5e5e5] space-y-1">
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
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* 顶部栏 - 深度优化 */}
        <div className="border-b border-[#e5e5e5] px-6 py-3.5 flex items-center justify-between bg-white"
          style={{
            boxShadow: "0 1px 0 0 rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.03)",
          }}
        >
          <div className="flex items-center gap-4">
            <select className="px-3 py-1.5 border border-[#d0d0d0] rounded-md text-sm font-medium text-gray-700 hover:border-gray-400 transition-all duration-200 bg-white hover:shadow-sm">
              <option>简体中文 - CNY</option>
              <option>English - USD</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-md">
              <Sparkles size={14} className="text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">3</span>
            </div>
            <button className="px-4 py-1.5 bg-emerald-500 text-white rounded-md text-sm font-medium hover:bg-emerald-600 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              style={{
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
              }}
            >
              免费试用
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm">
              YM
            </div>
          </div>
        </div>

        {/* 主内容滚动区 */}
        <div className="flex-1 overflow-y-auto">
          {/* 专属福利横幅 */}
          <div className="mx-6 mt-6 p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 rounded-lg flex items-center justify-between transition-all duration-200 hover:shadow-md"
            style={{
              boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="text-emerald-600" size={18} />
              <span className="text-sm font-medium text-emerald-700">
                专属福利 — 30天免费试用！
              </span>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium transition-transform hover:translate-x-1">→</button>
          </div>

          {/* 主标题 - 精确排版 */}
          <div className="text-center mt-16 mb-10">
            <h1 className="text-[56px] font-extrabold text-gray-900 mb-3 tracking-[-0.03em] leading-tight">
              Demand-OS
            </h1>
            <p className="text-[20px] text-gray-500 font-medium tracking-tight">
              AI智能采购，一问搞定
            </p>
          </div>

          {/* 搜索框 - 深度优化 */}
          <div className="max-w-3xl mx-auto px-6 mb-10">
            <div
              className={`relative bg-white rounded-2xl border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isFocused
                  ? "border-emerald-400 ring-4 ring-emerald-500/10"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={{
                boxShadow: isFocused
                  ? "0 0 0 1px rgba(16,185,129,0.1), 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05), 0 0 20px rgba(16,185,129,0.15)"
                  : "0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 3px 0 rgba(0,0,0,0.1)",
              }}
            >
              {/* 搜索框内容 */}
              <div className="flex items-start gap-3 p-4">
                <Search
                  size={20}
                  className={`flex-shrink-0 mt-1 transition-colors duration-200 ${
                    isFocused ? "text-emerald-500" : "text-gray-400"
                  }`}
                />
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="描述您的需求..."
                  className="flex-1 text-base resize-none outline-none bg-transparent text-gray-900 placeholder-gray-400"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                />
              </div>

              {/* 底部操作栏 */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-50 bg-gray-50/30 backdrop-blur-sm rounded-b-2xl">
                <div className="text-xs text-gray-400">
                  Ctrl + Enter 快速提交
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-white rounded-md p-1 shadow-sm border border-gray-100">
                    <button
                      onClick={() => setExecutionMode("fast")}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                        executionMode === "fast"
                          ? "bg-emerald-50 text-emerald-700 shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Zap size={12} />
                      快速
                    </button>
                    <button
                      onClick={() => setExecutionMode("thinking")}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                        executionMode === "thinking"
                          ? "bg-emerald-50 text-emerald-700 shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Brain size={12} />
                      深度思考
                    </button>
                  </div>
                  <button
                    onClick={handleSearch}
                    className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                    style={{
                      boxShadow: "0 2px 4px 0 rgba(16,185,129,0.2)",
                    }}
                  >
                    <Search size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 快捷按钮 - 深度优化 */}
          <div className="max-w-3xl mx-auto px-6 mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`px-3.5 py-2 bg-gradient-to-br ${action.color} border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-gray-300 transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5`}
                  style={{
                    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0,0,0,0.05)";
                  }}
                >
                  <action.icon size={14} />
                  {action.label}
                  {action.tag && <span className="ml-0.5">{action.tag}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Agent 模板库 */}
          <div className="max-w-5xl mx-auto px-6 pb-12">
            <div className="flex gap-6 mb-6 border-b border-gray-200">
              <button className="px-0 py-3 border-b-2 border-emerald-500 text-emerald-600 font-medium text-sm transition-colors">
                全部
              </button>
              <button className="px-0 py-3 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                供应商寻源
              </button>
              <button className="px-0 py-3 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                产品设计
              </button>
              <button className="px-0 py-3 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                市场分析
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {agentTemplates.map((template) => (
                <AgentCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// NavItem 组件 - 深度优化
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
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : highlight
          ? "text-emerald-600 hover:bg-emerald-50"
          : "text-gray-700 hover:bg-gray-100"
      } ${collapsed ? "justify-center" : ""}`}
    >
      <Icon size={18} className="flex-shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1 text-left">{label}</span>
          {badge && (
            <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full font-semibold">
              {badge}
            </span>
          )}
        </>
      )}
    </button>
  );
}

// AgentCard 组件 - 深度优化
function AgentCard({ template }: { template: any }) {
  return (
    <div
      className="p-5 border border-gray-200 rounded-xl hover:border-emerald-300 transition-all duration-300 bg-white group cursor-pointer"
      style={{
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0,0,0,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <template.icon size={20} className="text-emerald-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{template.title}</h3>
            {template.isNew && (
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                NEW
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 font-medium">{template.category}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{template.description}</p>
      <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
        查看详情 <span>→</span>
      </button>
    </div>
  );
}
