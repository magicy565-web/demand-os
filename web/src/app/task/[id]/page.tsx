"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Home as HomeIcon,
  Clock,
  List,
  MessageSquare,
  Gift,
  Smartphone,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Share2,
  Edit,
  Play,
  Check,
  Loader2,
  AlertCircle,
  Search,
  Download,
} from "lucide-react";

interface Task {
  id: string;
  query: string;
  steps: {
    id: string;
    title: string;
    status: "completed" | "in_progress" | "pending" | "failed";
    result?: any;
  }[];
  finalResult?: any;
}

export default function TaskPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  const [followUpQuery, setFollowUpQuery] = useState("");

  useEffect(() => {
    // 轮询任务状态
    const fetchTask = async () => {
      const response = await fetch(`/api/agent/status?taskId=${taskId}`);
      const data = await response.json();
      setTask(data);
    };

    fetchTask();
    const interval = setInterval(fetchTask, 2000);

    return () => clearInterval(interval);
  }, [taskId]);

  if (!task) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-emerald-500" size={48} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* 左侧导航栏（与首页相同） */}
      <div
        className={`${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-[#f7f7f8] border-r border-gray-200 flex flex-col transition-all duration-300`}
      >
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

        <nav className="flex-1 px-2">
          <NavItem
            icon={HomeIcon}
            label="首页"
            collapsed={sidebarCollapsed}
            onClick={() => router.push("/home")}
          />
          <NavItem
            icon={Clock}
            label="历史记录"
            collapsed={sidebarCollapsed}
            active
          />
          <NavItem icon={List} label="我的列表" collapsed={sidebarCollapsed} />
          <NavItem
            icon={MessageSquare}
            label="消息"
            collapsed={sidebarCollapsed}
            badge={4}
          />
        </nav>

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
          <h1 className="text-xl font-semibold">{task.query}</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
              <List size={16} />
              我的列表
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
              <Share2 size={16} />
              分享
            </button>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600">
              免费试用
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
              YM
            </div>
          </div>
        </div>

        {/* 执行步骤卡片 */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">执行计划</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-white flex items-center gap-2">
                  <Edit size={14} />
                  编辑
                </button>
                <button className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 flex items-center gap-2">
                  <Play size={14} />
                  立即开始
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {task.steps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-4">
                  {/* 状态图标 */}
                  <div className="flex-shrink-0 mt-1">
                    {step.status === "completed" && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                    {step.status === "in_progress" && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Loader2 size={14} className="text-white animate-spin" />
                      </div>
                    )}
                    {step.status === "pending" && (
                      <div className="w-6 h-6 bg-gray-300 rounded-full" />
                    )}
                    {step.status === "failed" && (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <AlertCircle size={14} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* 步骤内容 */}
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">
                      第{index + 1}步：{step.title}
                    </h3>
                    {step.status === "in_progress" && (
                      <p className="text-sm text-gray-600">正在执行中...</p>
                    )}
                    {step.status === "completed" && step.result && (
                      <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                          {JSON.stringify(step.result, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* 连接线 */}
                  {index < task.steps.length - 1 && (
                    <div className="absolute left-[37px] w-0.5 h-8 bg-gray-300 mt-6" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 最终结果 */}
          {task.finalResult && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">最终结果</h2>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                  <Download size={14} />
                  下载
                </button>
              </div>

              {/* 结果表格 */}
              {task.finalResult.type === "table" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        {task.finalResult.columns.map((col: string) => (
                          <th key={col} className="px-4 py-2 text-left font-medium">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {task.finalResult.rows.map((row: any, index: number) => (
                        <tr key={index} className="border-b border-gray-100">
                          {task.finalResult.columns.map((col: string) => (
                            <td key={col} className="px-4 py-2">
                              {row[col]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 文本结果 */}
              {task.finalResult.type === "text" && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {task.finalResult.content}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 底部搜索框 */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:border-emerald-300 transition-colors">
            <textarea
              value={followUpQuery}
              onChange={(e) => setFollowUpQuery(e.target.value)}
              placeholder="继续提问或开始新任务..."
              className="w-full px-6 py-4 text-lg resize-none outline-none rounded-2xl"
              rows={2}
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
                <button className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:from-emerald-600 hover:to-teal-600">
                  →
                </button>
              </div>
            </div>
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
  onClick,
}: {
  icon: any;
  label: string;
  collapsed: boolean;
  active?: boolean;
  badge?: number;
  highlight?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
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
