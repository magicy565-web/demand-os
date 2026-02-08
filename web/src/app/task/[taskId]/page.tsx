"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { TaskResult, TaskStep } from "@/components/TaskResult";

export default function TaskPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params?.taskId as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [taskData, setTaskData] = useState<{
    query: string;
    steps: TaskStep[];
    status: "running" | "completed" | "failed";
  } | null>(null);

  useEffect(() => {
    if (taskId) {
      loadTaskData();
    }
  }, [taskId]);

  const loadTaskData = async () => {
    try {
      setLoading(true);
      
      // 模拟加载任务数据
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟任务数据
      const mockData = {
        query: "我需要采购一套高效的办公软件系统",
        status: "completed" as const,
        steps: [
          {
            id: "step_1",
            title: "需求分析",
            description: "分析采购需求、规格和预算",
            type: "analysis" as const,
            status: "completed" as const,
            result: "✓ 已完成需求分析\n\n**关键需求识别**：\n- 办公软件系统需要支持团队协作\n- 预算范围：中等规模企业预算\n- 必须支持云端同步和移动端访问\n\n**目标用户**：\n- 团队规模：50-200人\n- 主要使用场景：文档编辑、表格处理、演示文稿、团队沟通\n\n**技术要求**：\n- 跨平台支持（Windows、Mac、Linux、移动端）\n- 数据安全和隐私保护\n- 易于部署和维护",
            attachments: [
              {
                id: "att_1",
                name: "需求分析报告.pdf",
                type: "document" as const,
                url: "#",
                size: "2.3 MB",
              },
            ],
          },
          {
            id: "step_2",
            title: "供应商搜索",
            description: "在全球市场中搜索符合条件的供应商",
            type: "search" as const,
            status: "completed" as const,
            result: "✓ 已完成供应商搜索\n\n**找到 5 个符合条件的供应商**：\n\n1. **Microsoft 365**\n   - 全球领先的办公软件套件\n   - 包含 Word、Excel、PowerPoint、Teams 等\n   - 价格：$12.50/用户/月\n\n2. **Google Workspace**\n   - 云原生办公套件\n   - 包含 Docs、Sheets、Slides、Meet 等\n   - 价格：$12/用户/月\n\n3. **Zoho Workplace**\n   - 性价比高的替代方案\n   - 包含完整的办公应用\n   - 价格：$3/用户/月",
            data: {
              table: {
                headers: ["供应商", "价格", "用户评分", "支持平台"],
                rows: [
                  ["Microsoft 365", "$12.50/月", "4.5/5", "全平台"],
                  ["Google Workspace", "$12/月", "4.6/5", "全平台"],
                  ["Zoho Workplace", "$3/月", "4.3/5", "全平台"],
                ],
              },
            },
          },
          {
            id: "step_3",
            title: "报价评估",
            description: "收集和评估多个供应商的报价",
            type: "evaluation" as const,
            status: "completed" as const,
            result: "✓ 已完成报价评估\n\n**成本效益分析**：\n\n**Microsoft 365**\n- 优势：功能最全面，企业级支持，与 Windows 深度集成\n- 劣势：价格较高，需要持续订阅\n- 年度成本（100用户）：$15,000\n\n**Google Workspace**\n- 优势：云原生体验，协作功能强大，移动端体验好\n- 劣势：需要良好的网络连接\n- 年度成本（100用户）：$14,400\n\n**推荐排序**：\n1. Google Workspace - 最佳云端协作体验\n2. Microsoft 365 - 传统企业首选\n3. Zoho Workplace - 预算有限的最佳选择",
            attachments: [
              {
                id: "att_2",
                name: "成本对比分析.xlsx",
                type: "table" as const,
                url: "#",
                size: "156 KB",
              },
            ],
          },
          {
            id: "step_4",
            title: "方案推荐",
            description: "基于成本、质量和交期推荐最优方案",
            type: "recommendation" as const,
            status: "completed" as const,
            result: "✓ 已生成最优推荐方案\n\n**推荐方案：Google Workspace**\n\n**推荐理由**：\n1. 最佳的云端协作体验\n   - 实时协作编辑，无需保存\n   - 自动同步，随时随地访问\n\n2. 合理的价格\n   - $12/用户/月，性价比高\n   - 包含 Gmail、Drive、Meet 等全套工具\n\n3. 优秀的移动端支持\n   - iOS 和 Android 原生应用\n   - 离线编辑功能\n\n**实施建议**：\n- 第一阶段：试用 30 天（免费）\n- 第二阶段：小规模部署（20 用户）\n- 第三阶段：全面推广（100 用户）\n\n**预计效益**：\n- 提升协作效率 30%\n- 减少 IT 维护成本 40%\n- 提高移动办公能力 50%",
            attachments: [
              {
                id: "att_4",
                name: "实施方案.pdf",
                type: "document" as const,
                url: "#",
                size: "1.8 MB",
              },
            ],
          },
        ],
      };

      setTaskData(mockData);
      setLoading(false);
    } catch (err) {
      console.error("Error loading task data:", err);
      setError("加载任务数据失败");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 size={48} className="text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">加载任务数据...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-gray-900 font-medium mb-2">加载失败</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/home-v2")}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  if (!taskData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10"
        style={{
          boxShadow: "0 1px 0 0 rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.03)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/home-v2")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">返回</span>
          </button>
          <div className="flex items-center gap-2">
            {taskData.status === "completed" && (
              <>
                <CheckCircle2 size={20} className="text-emerald-500" />
                <span className="text-sm font-medium text-emerald-700">
                  任务完成
                </span>
              </>
            )}
            {taskData.status === "running" && (
              <>
                <Loader2 size={20} className="text-blue-500 animate-spin" />
                <span className="text-sm font-medium text-blue-700">
                  执行中...
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* 查询标题 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {taskData.query}
          </h1>
          <p className="text-sm text-gray-500">
            任务 ID: {taskId}
          </p>
        </div>

        {/* 任务步骤 */}
        <TaskResult steps={taskData.steps} />
      </div>
    </div>
  );
}
