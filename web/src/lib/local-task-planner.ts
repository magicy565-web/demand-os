/**
 * 本地智能任务规划引擎
 * 不依赖外部 AI 服务，提供可靠的任务规划功能
 */

export interface TaskStep {
  id: string;
  title: string;
  description: string;
  type: "analysis" | "search" | "evaluation" | "recommendation" | "summary";
  status: "pending" | "running" | "completed" | "failed";
}

export interface TaskPlan {
  steps: TaskStep[];
}

/**
 * 关键词到步骤类型的映射
 */
const keywordStepMap: Record<string, TaskStep[]> = {
  // 采购相关
  采购: [
    {
      id: "step_1",
      title: "需求分析",
      description: "分析采购需求、规格和预算",
      type: "analysis",
      status: "pending",
    },
    {
      id: "step_2",
      title: "供应商搜索",
      description: "在全球市场中搜索符合条件的供应商",
      type: "search",
      status: "pending",
    },
    {
      id: "step_3",
      title: "报价评估",
      description: "收集和评估多个供应商的报价",
      type: "evaluation",
      status: "pending",
    },
    {
      id: "step_4",
      title: "方案推荐",
      description: "基于成本、质量和交期推荐最优方案",
      type: "recommendation",
      status: "pending",
    },
  ],

  // 产品设计相关
  设计: [
    {
      id: "step_1",
      title: "需求理解",
      description: "理解产品设计需求和目标用户",
      type: "analysis",
      status: "pending",
    },
    {
      id: "step_2",
      title: "竞品分析",
      description: "分析竞争产品的设计特点和创新点",
      type: "search",
      status: "pending",
    },
    {
      id: "step_3",
      title: "设计方案评估",
      description: "评估不同的设计方案和原型",
      type: "evaluation",
      status: "pending",
    },
    {
      id: "step_4",
      title: "最终推荐",
      description: "推荐最优的设计方案",
      type: "recommendation",
      status: "pending",
    },
  ],

  // 市场分析相关
  市场: [
    {
      id: "step_1",
      title: "市场调研",
      description: "收集目标市场的基本信息和趋势",
      type: "analysis",
      status: "pending",
    },
    {
      id: "step_2",
      title: "数据收集",
      description: "收集市场规模、增长率和竞争格局数据",
      type: "search",
      status: "pending",
    },
    {
      id: "step_3",
      title: "机会评估",
      description: "评估市场机会和风险",
      type: "evaluation",
      status: "pending",
    },
    {
      id: "step_4",
      title: "战略建议",
      description: "提供市场进入或扩展战略建议",
      type: "recommendation",
      status: "pending",
    },
  ],

  // 供应链相关
  供应链: [
    {
      id: "step_1",
      title: "流程分析",
      description: "分析当前供应链流程和瓶颈",
      type: "analysis",
      status: "pending",
    },
    {
      id: "step_2",
      title: "数据收集",
      description: "收集供应链各环节的成本和效率数据",
      type: "search",
      status: "pending",
    },
    {
      id: "step_3",
      title: "优化方案评估",
      description: "评估不同的优化方案",
      type: "evaluation",
      status: "pending",
    },
    {
      id: "step_4",
      title: "实施建议",
      description: "提供供应链优化的实施建议",
      type: "recommendation",
      status: "pending",
    },
  ],

  // 品牌相关
  品牌: [
    {
      id: "step_1",
      title: "品牌定位分析",
      description: "分析目标市场和品牌定位",
      type: "analysis",
      status: "pending",
    },
    {
      id: "step_2",
      title: "竞争分析",
      description: "分析竞争品牌的定位和策略",
      type: "search",
      status: "pending",
    },
    {
      id: "step_3",
      title: "品牌策略评估",
      description: "评估不同的品牌策略",
      type: "evaluation",
      status: "pending",
    },
    {
      id: "step_4",
      title: "品牌建议",
      description: "提供品牌建设和推广建议",
      type: "recommendation",
      status: "pending",
    },
  ],

  // 默认步骤
  default: [
    {
      id: "step_1",
      title: "需求理解",
      description: "理解和分析用户需求",
      type: "analysis",
      status: "pending",
    },
    {
      id: "step_2",
      title: "信息收集",
      description: "收集相关的市场和行业信息",
      type: "search",
      status: "pending",
    },
    {
      id: "step_3",
      title: "方案评估",
      description: "评估不同的解决方案",
      type: "evaluation",
      status: "pending",
    },
    {
      id: "step_4",
      title: "最终推荐",
      description: "提供最优的解决方案和建议",
      type: "recommendation",
      status: "pending",
    },
  ],
};

/**
 * 根据查询生成本地任务规划
 * @param query 用户查询
 * @returns 任务规划
 */
export function generateLocalTaskPlan(query: string): TaskPlan {
  // 提取关键词
  const keywords = extractKeywords(query);

  // 查找匹配的步骤
  let steps: TaskStep[] = [];

  for (const keyword of keywords) {
    if (keywordStepMap[keyword]) {
      steps = keywordStepMap[keyword];
      break;
    }
  }

  // 如果没有找到匹配的步骤，使用默认步骤
  if (steps.length === 0) {
    steps = keywordStepMap.default;
  }

  // 根据查询长度调整步骤数量
  if (query.length > 100) {
    // 长查询可能需要更多步骤
    if (steps.length === 4) {
      steps.push({
        id: "step_5",
        title: "详细分析",
        description: "进行更深入的分析和研究",
        type: "analysis",
        status: "pending",
      });
    }
  }

  return { steps };
}

/**
 * 从查询中提取关键词
 */
function extractKeywords(query: string): string[] {
  const keywords = [
    "采购",
    "设计",
    "市场",
    "供应链",
    "品牌",
    "产品",
    "销售",
    "营销",
  ];

  return keywords.filter((keyword) => query.includes(keyword));
}

/**
 * 生成步骤的详细描述
 */
export function generateStepDescription(
  step: TaskStep,
  context: string
): string {
  const descriptions: Record<TaskStep["type"], string> = {
    analysis: `分析 "${context}" 的关键因素和机会`,
    search: `搜索和收集与 "${context}" 相关的数据和信息`,
    evaluation: `评估不同的方案和策略以解决 "${context}"`,
    recommendation: `基于分析结果为 "${context}" 提供最优建议`,
    summary: `总结 "${context}" 的关键发现和建议`,
  };

  return descriptions[step.type];
}

/**
 * 模拟步骤执行结果
 */
export function generateStepResult(step: TaskStep, context: string): string {
  const results: Record<TaskStep["type"], string> = {
    analysis: `✓ 已完成 "${context}" 的需求分析\n- 识别了关键需求\n- 明确了目标和约束\n- 制定了实施计划`,
    search: `✓ 已完成信息收集\n- 收集了 5+ 个相关数据源\n- 整理了市场趋势信息\n- 识别了潜在的机会和风险`,
    evaluation: `✓ 已完成方案评估\n- 评估了 3+ 个不同方案\n- 分析了成本效益\n- 比较了优缺点`,
    recommendation: `✓ 已生成最优推荐\n- 推荐方案具有最高的成本效益比\n- 预计可以实现 20-30% 的效率提升\n- 建议立即启动实施`,
    summary: `✓ 已完成总结\n- 核心发现：${context}\n- 关键建议：优先实施高效益方案\n- 后续步骤：制定详细的实施计划`,
  };

  return results[step.type];
}
