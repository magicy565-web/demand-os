import { OpenAI } from "openai";

/**
 * Nova AI 支持的模型列表
 */
export const NOVA_MODELS = {
  GPT5: "[逆次]gpt-5",
  GPT41: "[逆次]gpt-4.1",
  O4MINI: "[逆次]o4-mini",
  QWEN3: "[限时]qwen3",
  GEMINI3: "[次]gemini-3-flash-preview",
} as const;

/**
 * 默认模型（优先级顺序）
 * 1. [逆次]gpt-4.1 (3.89s) - 主要模型
 * 2. [逆次]o4-mini (4.51s) - 备用模型
 * 3. gemini-2.5-flash (2.95s) - 最终备用
 */
export const DEFAULT_MODEL = NOVA_MODELS.GPT41;

/**
 * Nova AI 客户端配置
 * 使用 OpenAI 兼容接口连接到 Nova AI
 */
export const createNovaAIClient = (model: string = DEFAULT_MODEL) => {
  const apiKey = process.env.NOVA_AI_API_KEY || "sk-LIs2MGKmDuGZhcfHbvLs1EiWHPwm2ELf3E8JkJXlFXgFLPBM";
  const baseURL = process.env.NOVA_AI_BASE_URL || "https://once.novai.su/v1";

  return new OpenAI({
    apiKey,
    baseURL,
    defaultHeaders: {
      "User-Agent": "Demand-OS/1.0",
    },
    timeout: 120000, // 增加超时时间到 120 秒
    maxRetries: 5, // 启用重试机制
  });
};

/**
 * 调用 Nova AI 生成任务规划
 * @param query 用户查询
 * @param model 使用的模型
 * @returns 结构化的任务规划
 */
export async function generateTaskPlan(query: string, model: string = DEFAULT_MODEL) {
  const client = createNovaAIClient(model);

  const systemPrompt = `你是一个专业的 AI 采购助手。用户会提出采购相关的需求，你需要：
1. 理解用户的意图
2. 将任务分解为 3-5 个清晰的执行步骤
3. 返回 JSON 格式的执行计划

每个步骤必须包含：
- id: 步骤 ID (step_1, step_2, ...)
- title: 步骤标题
- description: 步骤描述
- type: 步骤类型 ("analysis" | "search" | "evaluation" | "recommendation" | "summary")
- status: 初始状态 ("pending")

返回格式必须是有效的 JSON，包含 steps 数组。`;

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `用户需求：${query}\n\n请生成执行计划，返回 JSON 格式。`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content || "";

    // 尝试解析 JSON
    try {
      // 查找 JSON 块
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const plan = JSON.parse(jsonMatch[0]);
        return plan;
      }
    } catch (e) {
      console.error("Failed to parse task plan JSON:", e);
    }

    // 如果解析失败，返回默认计划
    return generateDefaultPlan(query);
  } catch (error) {
    console.error(`Error calling Nova AI with model ${model}:`, error);
    
    // 如果当前模型失败，尝试其他模型
    if (model !== NOVA_MODELS.GPT41) {
      console.log(`Retrying with fallback model: ${NOVA_MODELS.GPT41}`);
      return generateTaskPlan(query, NOVA_MODELS.GPT41);
    }
    
    // 所有模型都失败，返回默认计划
    return generateDefaultPlan(query);
  }
}

/**
 * 生成默认任务计划（当 AI 调用失败时）
 */
function generateDefaultPlan(query: string) {
  return {
    steps: [
      {
        id: "step_1",
        title: "理解需求",
        description: query,
        type: "analysis",
        status: "pending",
      },
      {
        id: "step_2",
        title: "数据收集",
        description: "收集相关的市场和供应商数据",
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
        title: "推荐方案",
        description: "提供最佳的采购方案",
        type: "recommendation",
        status: "pending",
      },
    ],
  };
}

/**
 * 调用 Nova AI 执行具体步骤
 * @param stepTitle 步骤标题
 * @param context 上下文信息
 * @param model 使用的模型
 * @returns 步骤执行结果
 */
export async function executeTaskStep(
  stepTitle: string,
  context: string,
  model: string = DEFAULT_MODEL
) {
  const client = createNovaAIClient(model);

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `你是一个专业的 AI 采购助手。当前正在执行步骤：${stepTitle}`,
        },
        {
          role: "user",
          content: context,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error(`Error executing task step with model ${model}:`, error);
    
    // 如果当前模型失败，尝试其他模型
    if (model !== NOVA_MODELS.GPT41) {
      console.log(`Retrying with fallback model: ${NOVA_MODELS.GPT41}`);
      return executeTaskStep(stepTitle, context, NOVA_MODELS.GPT41);
    }
    
    throw error;
  }
}

/**
 * 调用 Nova AI 进行流式响应（用于实时反馈）
 * @param messages 消息历史
 * @param model 使用的模型
 * @returns 流式响应
 */
export async function streamTaskExecution(
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
  model: string = DEFAULT_MODEL
) {
  const client = createNovaAIClient(model);

  return client.chat.completions.create({
    model,
    messages,
    temperature: 0.7,
    max_tokens: 3000,
    stream: true,
  });
}

/**
 * 获取所有可用的模型列表
 */
export function getAvailableModels() {
  return Object.values(NOVA_MODELS);
}
