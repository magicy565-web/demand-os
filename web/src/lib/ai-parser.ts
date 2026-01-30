/**
 * AI 意图解析服务
 * 使用 OpenAI GPT 将用户的模糊描述转化为结构化查询对象
 */

import { StructuredQuery } from "@/types/auto-request";

/**
 * System Prompt - 定义 AI 的角色和输出格式
 */
const PARSER_SYSTEM_PROMPT = `你是一个专业的 B2B 采购助手，专门从用户的模糊描述中提取关键采购参数。

你的任务是将用户的自然语言输入解析为结构化的 JSON 格式。

# 输出格式要求
严格返回以下 JSON 结构（不要包含任何其他文本）：

{
  "intent": "sourcing_request" | "product_inquiry" | "price_check" | "supplier_search",
  "category": "产品大类（Consumer Electronics, Apparel, Home & Garden, etc.）",
  "keywords": ["关键词1", "关键词2", "关键词3"],
  "target_price": {
    "min": 最低价格数字,
    "max": 最高价格数字,
    "currency": "USD"
  },
  "moq": {
    "min": 最小起订量数字,
    "max": 最大起订量数字,
    "unit": "pcs"
  },
  "special_requirements": ["Dropshipping", "OEM", "Private Label", ...],
  "delivery_time": "交期要求（如：15-20天）",
  "certifications": ["CE", "FCC", "FDA", ...],
  "confidence": 0.0-1.0 置信度分数
}

# 示例

用户输入：找一款 TWS 蓝牙耳机，带主动降噪，预算 $10 以内，支持一件代发
输出：
{
  "intent": "sourcing_request",
  "category": "Consumer Electronics",
  "keywords": ["TWS", "Bluetooth Earbuds", "Active Noise Cancelling", "ANC"],
  "target_price": { "max": 10, "currency": "USD" },
  "moq": { "min": 1, "unit": "pcs" },
  "special_requirements": ["Dropshipping"],
  "confidence": 0.92
}

用户输入：智能手表，类似 Apple Watch，要有血氧监测，15 刀左右，500 件起订
输出：
{
  "intent": "sourcing_request",
  "category": "Consumer Electronics",
  "keywords": ["Smart Watch", "Blood Oxygen", "SpO2", "Fitness Tracker"],
  "target_price": { "min": 12, "max": 18, "currency": "USD" },
  "moq": { "min": 500, "unit": "pcs" },
  "confidence": 0.88
}

# 注意事项
1. 如果用户未明确价格，根据产品类型估算合理范围
2. "一件代发" = Dropshipping，MOQ = 1
3. 如果未提及交期，不要填写 delivery_time
4. confidence 基于用户输入的明确程度：非常明确(0.9+), 较明确(0.7-0.9), 模糊(0.5-0.7), 非常模糊(<0.5)
5. 只返回 JSON，不要添加任何解释文字
`;

/**
 * 调用 OpenAI API 解析用户输入
 */
export async function parseUserQuery(
  userInput: string
): Promise<StructuredQuery> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn("OPENAI_API_KEY not found, using fallback parser");
    return fallbackParser(userInput);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: PARSER_SYSTEM_PROMPT },
          { role: "user", content: userInput },
        ],
        temperature: 0.3, // 低温度，更确定性的输出
        max_tokens: 500,
        response_format: { type: "json_object" }, // 强制 JSON 输出
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    const parsed = JSON.parse(content) as Partial<StructuredQuery>;

    // 合并默认值和解析结果
    return {
      intent: parsed.intent || "sourcing_request",
      category: parsed.category,
      keywords: parsed.keywords || [],
      target_price: parsed.target_price,
      moq: parsed.moq,
      special_requirements: parsed.special_requirements || [],
      delivery_time: parsed.delivery_time,
      certifications: parsed.certifications || [],
      confidence: parsed.confidence || 0.5,
      original_query: userInput,
    };
  } catch (error) {
    console.error("AI parsing error:", error);
    // Fallback to rule-based parser
    return fallbackParser(userInput);
  }
}

/**
 * 回退解析器 - 基于规则的简单解析
 * 当 OpenAI API 不可用时使用
 */
function fallbackParser(userInput: string): StructuredQuery {
  const input = userInput.toLowerCase();
  const keywords: string[] = [];
  let category: string | undefined;
  let target_price: StructuredQuery["target_price"];
  let moq: StructuredQuery["moq"];
  const special_requirements: string[] = [];

  // 关键词提取
  const productKeywords = [
    "耳机", "手表", "手环", "音箱", "充电器", "数据线",
    "衣服", "裤子", "鞋子", "包包",
    "灯", "桌子", "椅子", "杯子",
    "earbuds", "watch", "speaker", "charger", "cable",
    "tws", "bluetooth", "smart", "wireless"
  ];

  productKeywords.forEach(kw => {
    if (input.includes(kw)) {
      keywords.push(kw);
    }
  });

  // 类别识别
  if (input.match(/耳机|音箱|手表|充电|电子|智能|earbuds|watch|speaker|smart|electronic/)) {
    category = "Consumer Electronics";
  } else if (input.match(/衣服|裤子|鞋|服装|apparel|clothing/)) {
    category = "Apparel";
  } else if (input.match(/家居|灯|桌|椅|杯|home/)) {
    category = "Home & Garden";
  }

  // 价格提取
  const priceMatch = input.match(/(\d+)\s*[-到~]\s*(\d+)\s*[刀美元块dollar$]/);
  if (priceMatch) {
    target_price = {
      min: parseInt(priceMatch[1]),
      max: parseInt(priceMatch[2]),
      currency: "USD",
    };
  } else {
    const singlePriceMatch = input.match(/(\d+)\s*[刀美元块dollar$]/);
    if (singlePriceMatch) {
      const price = parseInt(singlePriceMatch[1]);
      target_price = {
        min: price * 0.8,
        max: price * 1.2,
        currency: "USD",
      };
    }
  }

  // MOQ 提取
  const moqMatch = input.match(/(\d+)\s*件/);
  if (moqMatch) {
    moq = {
      min: parseInt(moqMatch[1]),
      unit: "pcs",
    };
  }

  // 特殊要求
  if (input.match(/一件代发|dropship|代发/)) {
    special_requirements.push("Dropshipping");
    if (!moq) {
      moq = { min: 1, unit: "pcs" };
    }
  }
  if (input.match(/oem|定制|贴牌/)) {
    special_requirements.push("OEM");
  }
  if (input.match(/私人品牌|private label/)) {
    special_requirements.push("Private Label");
  }

  return {
    intent: "sourcing_request",
    category,
    keywords,
    target_price,
    moq,
    special_requirements,
    confidence: 0.6, // 规则解析置信度较低
    original_query: userInput,
  };
}

/**
 * 验证解析结果是否足够明确
 */
export function isQueryValid(query: StructuredQuery): boolean {
  // 至少需要关键词或类别
  if (query.keywords.length === 0 && !query.category) {
    return false;
  }

  // 置信度不能太低
  if (query.confidence < 0.4) {
    return false;
  }

  return true;
}
