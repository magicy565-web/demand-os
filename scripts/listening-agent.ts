/**
 * Demand OS - AI 智能体脚本
 * 
 * 功能: 
 * 1. 模拟/生成全球电商平台的需求数据
 * 2. 调用 LLM 进行商业价值分析
 * 3. 格式化数据并写入 Directus
 * 
 * 运行方式: npx tsx scripts/listening-agent.ts
 */

import OpenAI from "openai";

// ==================== 配置区 ====================
const CONFIG = {
  // 运行模式: 'mock' = 模拟数据, 'ai' = 使用 AI 生成
  MODE: "mock" as "mock" | "ai",

  // Directus 后端配置
  DIRECTUS_URL: "https://admin.cnsubscribe.xyz",
  DIRECTUS_TOKEN: "N1pdvaUmZXAR9fkTfaL4xlsXsyiEzWvT",

  // LLM 配置 (OpenAI 兼容接口)
  LLM_KEY: "sk-xxxxxxxx", // 替换为你的 API Key
  LLM_URL: "https://api.openai.com/v1", // 或其他兼容接口
  MODEL_NAME: "gpt-4o-mini", // 或 o4-mini / deepseek-chat 等

  // 运行参数
  BATCH_SIZE: 5, // 每批生成的需求数量
  INTERVAL_MS: 30000, // 生成间隔 (毫秒)
  MAX_ITERATIONS: 100, // 最大迭代次数 (0 = 无限)
};

// ==================== 类型定义 ====================
interface Demand {
  title: string;
  description: string;
  category: string;
  region: string;
  price_range: string;
  urgency: "low" | "medium" | "high" | "critical";
  quantity: number;
  unit: string;
  source_platform: string;
  business_value: number;
  tags: string[];
  status: "active";
}

// ==================== 模拟数据生成器 ====================
const MOCK_DATA = {
  categories: [
    "消费电子", "服装纺织", "工业材料", "新能源", 
    "医疗器械", "物流服务", "食品饮料", "家居用品", "汽车配件"
  ],
  regions: ["北美", "欧洲", "亚太", "中国", "东南亚", "中东", "全球"],
  platforms: ["Amazon", "阿里巴巴", "独立站", "eBay", "政府采购", "行业展会", "Walmart"],
  urgencyLevels: ["low", "medium", "high", "critical"] as ("low" | "medium" | "high" | "critical")[],
  
  titles: {
    "消费电子": [
      "智能手表配件批量采购", "蓝牙耳机OEM代工需求", "手机保护壳定制",
      "无线充电器供应商寻找", "智能家居控制器采购"
    ],
    "服装纺织": [
      "有机棉T恤代工", "运动服面料采购", "童装OEM生产",
      "牛仔裤批量定制", "瑜伽服品牌代工"
    ],
    "工业材料": [
      "工业级3D打印耗材", "精密轴承批量采购", "特种钢材供应",
      "工业润滑油采购", "碳纤维材料定制"
    ],
    "新能源": [
      "锂电池组件采购", "充电桩模块供应", "太阳能板组件",
      "储能系统集成", "新能源汽车配件"
    ],
    "医疗器械": [
      "医用硅胶制品定制", "康复器械代工", "一次性医疗耗材",
      "诊断试剂原料", "医用包装材料"
    ],
    "物流服务": [
      "海外仓储服务", "跨境物流方案", "冷链运输服务",
      "FBA转运服务", "大件货物运输"
    ],
    "食品饮料": [
      "有机茶叶出口", "坚果原料采购", "功能饮料代工",
      "调味品OEM", "冻干食品加工"
    ],
    "家居用品": [
      "智能家具定制", "收纳用品批发", "厨房用具代工",
      "床上用品采购", "装饰品批量定制"
    ],
    "汽车配件": [
      "汽车座椅配件", "车载电子设备", "汽车照明系统",
      "刹车片批量采购", "汽车内饰定制"
    ]
  }
};

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMockDemand(): Demand {
  const category = randomChoice(MOCK_DATA.categories);
  const titles = MOCK_DATA.titles[category as keyof typeof MOCK_DATA.titles] || ["通用需求"];
  const title = randomChoice(titles);
  
  const minPrice = randomInt(1, 50) * 1000;
  const maxPrice = minPrice + randomInt(1, 100) * 1000;
  
  const descriptions: Record<string, string[]> = {
    "消费电子": [
      "寻找具备CE/FCC认证能力的供应商，要求品质稳定，交期准时。",
      "需要月产能10万件以上的代工厂，有出口经验优先。",
      "采购高品质电子元器件，需提供完整测试报告。"
    ],
    "服装纺织": [
      "需要具备GOTS/OEKO-TEX认证的工厂，月产能5万件以上。",
      "要求提供打样服务，面料需通过AZO测试。",
      "寻找有欧美品牌代工经验的服装工厂。"
    ],
    default: [
      "寻找优质供应商长期合作，要求品质稳定可靠。",
      "需要提供样品和详细报价，交期需在30天内。",
      "欢迎有实力的工厂主动联系，量大优先。"
    ]
  };
  
  const descList = descriptions[category] || descriptions.default;
  
  return {
    title,
    description: `${title}。${randomChoice(descList)}`,
    category,
    region: randomChoice(MOCK_DATA.regions),
    price_range: `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`,
    urgency: randomChoice(MOCK_DATA.urgencyLevels),
    quantity: randomInt(100, 50000),
    unit: randomChoice(["件", "套", "批", "吨", "箱"]),
    source_platform: randomChoice(MOCK_DATA.platforms),
    business_value: randomInt(40, 98),
    tags: [
      category,
      randomChoice(["B2B", "OEM", "ODM", "批发", "定制"]),
      randomChoice(["紧急", "长期合作", "样品先行", "大单优先"])
    ],
    status: "active"
  };
}

// ==================== AI 生成器 ====================
async function generateAIDemand(openai: OpenAI): Promise<Demand | null> {
  const prompt = `你是一个全球贸易需求模拟器。请生成一条真实的B2B采购需求数据。

要求:
1. 需求必须具体、专业，像真实的采购商发布的
2. 价格范围要合理
3. 商业价值评分 (0-100) 要根据需求金额、紧急程度、市场前景综合评估

请直接返回 JSON 格式 (不要 markdown):
{
  "title": "标题 (20字以内)",
  "description": "详细描述 (100字以内)",
  "category": "分类 (消费电子/服装纺织/工业材料/新能源/医疗器械/物流服务/食品饮料/家居用品/汽车配件)",
  "region": "地区 (北美/欧洲/亚太/中国/东南亚/中东/全球)",
  "price_range": "预算范围 (如 $10,000 - $50,000)",
  "urgency": "紧急度 (low/medium/high/critical)",
  "quantity": 数量(数字),
  "unit": "单位 (件/套/批/吨)",
  "source_platform": "来源平台",
  "business_value": 商业价值评分(0-100的数字),
  "tags": ["标签1", "标签2", "标签3"]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: CONFIG.MODEL_NAME,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return null;

    // 尝试解析 JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const data = JSON.parse(jsonMatch[0]);
    return {
      ...data,
      status: "active"
    };
  } catch (error) {
    console.error("[AI] 生成失败:", error);
    return null;
  }
}

// ==================== Directus API ====================
async function writeDemandToDirectus(demand: Demand): Promise<boolean> {
  try {
    const response = await fetch(`${CONFIG.DIRECTUS_URL}/items/demands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CONFIG.DIRECTUS_TOKEN}`,
      },
      body: JSON.stringify(demand),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[Directus] 写入失败:", response.status, error);
      return false;
    }

    const result = await response.json();
    console.log(`[Directus] ✓ 写入成功: ${demand.title} (ID: ${result.data?.id})`);
    return true;
  } catch (error) {
    console.error("[Directus] 请求失败:", error);
    return false;
  }
}

async function testConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${CONFIG.DIRECTUS_URL}/server/health`, {
      headers: {
        "Authorization": `Bearer ${CONFIG.DIRECTUS_TOKEN}`,
      },
    });
    
    if (response.ok) {
      console.log("[Directus] ✓ 连接成功");
      return true;
    } else {
      console.error("[Directus] ✗ 连接失败:", response.status);
      return false;
    }
  } catch (error) {
    console.error("[Directus] ✗ 无法连接:", error);
    return false;
  }
}

// ==================== 主程序 ====================
async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║            DEMAND OS - AI AGENT v1.0.0                   ║
║            工业绿洲 · 智能需求生成器                       ║
╚══════════════════════════════════════════════════════════╝

配置信息:
  - 模式: ${CONFIG.MODE}
  - 后端: ${CONFIG.DIRECTUS_URL}
  - 批量大小: ${CONFIG.BATCH_SIZE}
  - 生成间隔: ${CONFIG.INTERVAL_MS}ms
  - 最大迭代: ${CONFIG.MAX_ITERATIONS || "无限"}
`);

  // 测试 Directus 连接
  const connected = await testConnection();
  if (!connected) {
    console.error("\n[错误] 无法连接到 Directus 后端，请检查配置。");
    process.exit(1);
  }

  // 初始化 OpenAI 客户端 (仅 AI 模式)
  let openai: OpenAI | null = null;
  if (CONFIG.MODE === "ai") {
    openai = new OpenAI({
      apiKey: CONFIG.LLM_KEY,
      baseURL: CONFIG.LLM_URL,
    });
    console.log("[AI] 已连接到 LLM 服务");
  }

  let iteration = 0;
  let totalGenerated = 0;
  let totalFailed = 0;

  console.log("\n[Agent] 开始生成需求数据...\n");

  // 主循环
  while (CONFIG.MAX_ITERATIONS === 0 || iteration < CONFIG.MAX_ITERATIONS) {
    iteration++;
    console.log(`\n━━━ 第 ${iteration} 轮 ━━━`);

    for (let i = 0; i < CONFIG.BATCH_SIZE; i++) {
      let demand: Demand | null = null;

      if (CONFIG.MODE === "ai" && openai) {
        demand = await generateAIDemand(openai);
      } else {
        demand = generateMockDemand();
      }

      if (demand) {
        const success = await writeDemandToDirectus(demand);
        if (success) {
          totalGenerated++;
        } else {
          totalFailed++;
        }
      }

      // 小延迟避免请求过快
      await new Promise((r) => setTimeout(r, 500));
    }

    console.log(`\n[统计] 已生成: ${totalGenerated} | 失败: ${totalFailed}`);

    // 等待下一轮
    if (CONFIG.MAX_ITERATIONS === 0 || iteration < CONFIG.MAX_ITERATIONS) {
      console.log(`[Agent] 等待 ${CONFIG.INTERVAL_MS / 1000} 秒后继续...`);
      await new Promise((r) => setTimeout(r, CONFIG.INTERVAL_MS));
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════╗
║                    运行结束                               ║
╠══════════════════════════════════════════════════════════╣
║  总生成: ${String(totalGenerated).padStart(6)} 条                                    ║
║  总失败: ${String(totalFailed).padStart(6)} 条                                    ║
╚══════════════════════════════════════════════════════════╝
`);
}

// 启动
main().catch(console.error);
