/**
 * Demand OS - AI 智能体脚本 v2.0 (工业园区专业版)
 * 
 * 功能: 
 * 1. 生成专业化的B2B采购需求数据
 * 2. 包含完整的贸易术语、付款条件、认证要求
 * 3. 自动计算利润预估
 * 4. 智能匹配园区内供应商
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
  
  // 汇率配置
  EXCHANGE_RATE: 7.25, // USD to CNY
};

// ==================== 类型定义 ====================
type Incoterm = "EXW" | "FOB" | "CIF" | "DDP" | "DAP";
type PaymentTerm = "T/T 100% advance" | "T/T 30/70" | "T/T 30% deposit" | "L/C at sight" | "L/C 30 days" | "L/C 60 days" | "L/C 90 days" | "OA 30 days" | "OA 60 days" | "OA 90 days" | "D/P" | "D/A";
type Certification = "CE" | "FCC" | "UL" | "RoHS" | "REACH" | "FDA" | "ISO9001" | "ISO14001" | "GOTS" | "OEKO-TEX" | "BSCI" | "SA8000" | "GS" | "CB" | "ETL" | "CCC";

interface ProfitEstimate {
  target_price_usd: number;
  suggested_cost_cny: number;
  estimated_margin: number;
  exchange_rate: number;
  shipping_cost_estimate: number;
  certification_cost: number;
}

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
  
  // 新增专业字段
  incoterm?: Incoterm;
  incoterm_location?: string;
  payment_term?: PaymentTerm;
  certifications_required?: Certification[];
  moq?: number;
  moq_unit?: string;
  lead_time_days?: number;
  sample_required?: boolean;
  buyer_type?: "brand" | "retailer" | "wholesaler" | "agent" | "platform";
  buyer_region?: string;
  profit_estimate?: ProfitEstimate;
}

// ==================== 专业化数据库 ====================
const MOCK_DATA = {
  categories: [
    "消费电子", "服装纺织", "工业材料", "新能源", 
    "医疗器械", "家居用品", "汽车配件", "户外运动", "美妆个护"
  ],
  
  regions: ["北美", "欧洲", "英国", "澳洲", "东南亚", "中东", "日本", "韩国"],
  
  // 更专业的来源平台
  platforms: [
    "Amazon Vendor Central",
    "Amazon FBA",
    "Walmart DSV",
    "Costco 2025 Sourcing Plan",
    "Target Direct Import",
    "TikTok Shop US (爆品返单)",
    "TikTok Shop UK",
    "Temu 平台招商",
    "SHEIN 供应链",
    "Alibaba RFQ",
    "Global Sources",
    "Canton Fair 2025",
    "Brand Direct Sourcing"
  ],
  
  incoterms: ["FOB", "CIF", "DDP", "EXW", "DAP"] as Incoterm[],
  
  incotermLocations: {
    "FOB": ["Shenzhen", "Ningbo", "Shanghai", "Guangzhou", "Qingdao"],
    "CIF": ["Los Angeles", "New York", "Hamburg", "Rotterdam", "Felixstowe"],
    "DDP": ["Los Angeles", "Chicago", "Dallas", "Atlanta", "Frankfurt"],
    "EXW": ["Factory"],
    "DAP": ["Amazon FBA Warehouse", "Walmart DC"]
  },
  
  paymentTerms: [
    "T/T 30/70",
    "T/T 30% deposit", 
    "L/C at sight",
    "L/C 60 days",
    "OA 30 days",
    "OA 60 days"
  ] as PaymentTerm[],
  
  certificationsByCategory: {
    "消费电子": ["CE", "FCC", "UL", "RoHS", "REACH"] as Certification[],
    "服装纺织": ["OEKO-TEX", "GOTS", "BSCI", "ISO9001"] as Certification[],
    "工业材料": ["ISO9001", "ISO14001", "CE", "RoHS"] as Certification[],
    "新能源": ["CE", "UL", "CB", "ISO9001", "ISO14001"] as Certification[],
    "医疗器械": ["FDA", "CE", "ISO9001", "ISO14001"] as Certification[],
    "家居用品": ["CE", "FCC", "RoHS", "REACH", "BSCI"] as Certification[],
    "汽车配件": ["ISO9001", "IATF16949", "CE", "RoHS"] as Certification[],
    "户外运动": ["CE", "GS", "BSCI", "ISO9001"] as Certification[],
    "美妆个护": ["FDA", "CE", "ISO9001", "REACH"] as Certification[]
  },
  
  urgencyLevels: ["low", "medium", "high", "critical"] as ("low" | "medium" | "high" | "critical")[],
  
  buyerTypes: ["brand", "retailer", "wholesaler", "agent", "platform"] as const,
  
  // 专业化的需求标题模板
  titleTemplates: {
    "消费电子": [
      "TWS蓝牙耳机OEM订单 - {platform}",
      "智能手表代工需求 - CE/FCC认证",
      "无线充电器批量采购 - UL认证必备",
      "手机保护壳定制 - {quantity}万件/月",
      "智能家居控制器 - Zigbee/Matter协议",
      "便携式储能电源 - 户外品类爆品",
      "电动牙刷ODM - 北美渠道返单"
    ],
    "服装纺织": [
      "有机棉T恤代工 - GOTS认证工厂",
      "运动瑜伽裤 - {platform}供应商招募",
      "儿童服装OEM - OEKO-TEX必备",
      "冲锋衣ODM - 功能性面料",
      "快时尚女装 - 7天翻单能力",
      "工装裤定制 - Carhartt同款"
    ],
    "家居用品": [
      "LED灯具供应商 - ETL/UL认证",
      "收纳用品批发 - Amazon FBA卖家",
      "厨房小家电OEM - FDA认证",
      "智能扫地机 - {platform}选品",
      "户外家具代工 - 欧洲市场"
    ],
    "新能源": [
      "便携式电站OEM - 户外储能",
      "太阳能板组件 - 欧洲项目",
      "锂电池Pack - UL1973认证",
      "电动滑板车代工 - 共享出行",
      "充电桩模块 - 北美市场"
    ],
    "户外运动": [
      "露营帐篷ODM - {platform}爆品",
      "登山包代工 - 70L大容量",
      "折叠桌椅批量 - 户外品类",
      "渔具套装 - 北美市场",
      "滑雪装备OEM - 欧洲品牌"
    ],
    "美妆个护": [
      "面膜OEM - FDA工厂",
      "护肤品代工 - 清洁美妆",
      "美容仪ODM - 红光/射频",
      "洗护用品批发 - 酒店渠道",
      "化妆刷套装 - TikTok爆品"
    ]
  },
  
  // 专业描述模板
  descriptionTemplates: [
    "寻找具备{certifications}认证能力的供应商，要求月产能{capacity}以上。付款条件: {payment}，贸易条款: {incoterm} {location}。",
    "品牌方长期合作需求，年采购量约{annual_volume}，需具备{certifications}认证。样品审核后签订框架协议。",
    "平台选品返单需求，首单{quantity}，后续每月稳定{monthly_volume}。要求{lead_time}天内交货，{payment}付款。",
    "渠道商紧急补货需求，{deadline}前必须出货。需具备{certifications}，接受{inspection}验货。",
    "新品开发需求，需要ODM能力。目标单价{target_price}，含{incoterm}报价。通过审核后年采购量预估{annual_volume}。"
  ]
};

// ==================== 工具函数 ====================
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

// 计算利润预估
function calculateProfitEstimate(targetPriceUSD: number, category: string): ProfitEstimate {
  // 基于品类的成本系数
  const costFactors: Record<string, number> = {
    "消费电子": 0.55,
    "服装纺织": 0.50,
    "家居用品": 0.45,
    "新能源": 0.60,
    "户外运动": 0.48,
    "美妆个护": 0.35,
    "default": 0.50
  };
  
  const costFactor = costFactors[category] || costFactors.default;
  const variance = randomFloat(-0.05, 0.05);
  const actualCostFactor = costFactor + variance;
  
  const suggestedCostCNY = Math.round(targetPriceUSD * CONFIG.EXCHANGE_RATE * actualCostFactor);
  const shippingCost = randomFloat(0.5, 2.5);
  const certCost = randomFloat(0.1, 0.5);
  
  const totalCostUSD = suggestedCostCNY / CONFIG.EXCHANGE_RATE + shippingCost + certCost;
  const margin = ((targetPriceUSD - totalCostUSD) / targetPriceUSD) * 100;
  
  return {
    target_price_usd: targetPriceUSD,
    suggested_cost_cny: suggestedCostCNY,
    estimated_margin: Math.round(margin * 10) / 10,
    exchange_rate: CONFIG.EXCHANGE_RATE,
    shipping_cost_estimate: shippingCost,
    certification_cost: certCost
  };
}

// ==================== 模拟数据生成器 ====================
function generateMockDemand(): Demand {
  const category = randomChoice(MOCK_DATA.categories);
  const platform = randomChoice(MOCK_DATA.platforms);
  const incoterm = randomChoice([...MOCK_DATA.incoterms]) as Incoterm;
  const incotermLocations = MOCK_DATA.incotermLocations[incoterm];
  const incotermLocation = randomChoice(incotermLocations);
  const paymentTerm = randomChoice([...MOCK_DATA.paymentTerms]) as PaymentTerm;
  const urgency = randomChoice([...MOCK_DATA.urgencyLevels]) as "low" | "medium" | "high" | "critical";
  const buyerType = randomChoice([...MOCK_DATA.buyerTypes]) as "brand" | "retailer" | "wholesaler" | "agent" | "platform";
  const region = randomChoice(MOCK_DATA.regions);
  
  // 获取品类对应的认证要求
  const availableCerts = MOCK_DATA.certificationsByCategory[category as keyof typeof MOCK_DATA.certificationsByCategory] 
    || ["ISO9001", "CE"] as Certification[];
  const certCount = randomInt(2, Math.min(4, availableCerts.length));
  const certifications = availableCerts.slice(0, certCount);
  
  // 生成价格和数量
  const quantity = randomInt(500, 50000);
  const targetPriceUSD = randomFloat(5, 150);
  const minPrice = Math.round(targetPriceUSD * 0.85 * 100) / 100;
  const maxPrice = Math.round(targetPriceUSD * 1.15 * 100) / 100;
  
  // 生成标题
  const titleTemplates = MOCK_DATA.titleTemplates[category as keyof typeof MOCK_DATA.titleTemplates] 
    || [`${category}产品采购需求`];
  let title = randomChoice(titleTemplates);
  title = title
    .replace("{platform}", platform.split(" ")[0])
    .replace("{quantity}", String(Math.round(quantity / 10000)));
  
  // 生成专业描述
  const leadTime = urgency === "critical" ? randomInt(7, 14) : 
                   urgency === "high" ? randomInt(14, 21) : 
                   urgency === "medium" ? randomInt(21, 30) : randomInt(30, 45);
  
  const description = `【${platform}】${title}。贸易条款: ${incoterm} ${incotermLocation}，付款方式: ${paymentTerm}。` +
    `认证要求: ${certifications.join("/")}。交期${leadTime}天，MOQ ${Math.round(quantity * 0.2)} ${randomChoice(["件", "套", "PCS"])}。` +
    `通过审核后预计年采购量 ${randomInt(5, 50)}万${randomChoice(["件", "套", "USD"])}。`;
  
  // 计算利润预估
  const profitEstimate = calculateProfitEstimate(targetPriceUSD, category);
  
  // 计算商业价值评分
  let businessValue = 50;
  if (profitEstimate.estimated_margin >= 25) businessValue += 20;
  else if (profitEstimate.estimated_margin >= 18) businessValue += 15;
  else if (profitEstimate.estimated_margin >= 12) businessValue += 10;
  
  if (quantity >= 10000) businessValue += 15;
  else if (quantity >= 5000) businessValue += 10;
  
  if (urgency === "critical" || urgency === "high") businessValue += 10;
  if (platform.includes("Amazon") || platform.includes("Walmart") || platform.includes("Costco")) businessValue += 10;
  
  businessValue = Math.min(98, Math.max(40, businessValue + randomInt(-5, 5)));
  
  return {
    title,
    description,
    category,
    region,
    price_range: `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`,
    urgency,
    quantity,
    unit: randomChoice(["件", "套", "PCS", "组"]),
    source_platform: platform,
    business_value: businessValue,
    tags: [
      category,
      incoterm,
      buyerType === "brand" ? "品牌直采" : 
      buyerType === "retailer" ? "零售商" : 
      buyerType === "platform" ? "平台订单" : "批发商",
      profitEstimate.estimated_margin >= 18 ? "高利润" : "标准利润"
    ],
    status: "active",
    
    // 专业字段
    incoterm,
    incoterm_location: `${incoterm} ${incotermLocation}`,
    payment_term: paymentTerm,
    certifications_required: certifications,
    moq: Math.round(quantity * 0.2),
    moq_unit: "PCS",
    lead_time_days: leadTime,
    sample_required: Math.random() > 0.3,
    buyer_type: buyerType,
    buyer_region: region,
    profit_estimate: profitEstimate
  };
}

// ==================== AI 生成器 ====================
async function generateAIDemand(openai: OpenAI): Promise<Demand | null> {
  const prompt = `你是一个国际贸易专家和全球B2B采购需求生成器。请生成一条针对中国工厂的真实B2B采购需求RFQ。

【核心要求】
1. 这是给中国工厂老板看的采购需求，必须专业、具体、可操作
2. 必须包含完整的国际贸易术语，让工厂能够准确核算成本
3. 所有字段都必须填写，不能为空

【必须返回JSON格式，包含以下字段】:
{
  "title": "专业采购标题 (产品名+采购方式，如 'TWS蓝牙耳机OEM订单 - Amazon Vendor Central')",
  "description": "详细需求描述 (包含：产品规格要求、贸易条款、认证要求、品质标准、交期要求)",
  "category": "行业分类 (选择: 消费电子/服装纺织/新能源/家居用品/户外运动/美妆个护/医疗器械/汽车配件)",
  "region": "目标市场 (选择: 北美/欧洲/英国/澳洲/东南亚/日本/韩国/中东)",
  "price_range": "目标单价范围美元 (如 '$12.50 - $15.00')",
  "urgency": "紧急度 (选择: low/medium/high/critical)",
  "quantity": 采购数量(纯数字，如 20000),
  "unit": "单位 (选择: PCS/SET/KG/M/PAIR)",
  "source_platform": "来源平台 (选择: Amazon Vendor Central/Walmart DSV/Costco Sourcing/Target Direct/TikTok Shop US/SHEIN供应链/Alibaba RFQ/Canton Fair)",
  "business_value": 商业价值评分(40-98之间的整数),
  "tags": ["产品标签", "贸易术语", "认证标签", "利润标签"],
  "incoterms": "贸易术语 (选择: FOB Shanghai/FOB Ningbo/FOB Shenzhen/CIF Hamburg/CIF Los Angeles/DDP Los Angeles/EXW Guangzhou)",
  "payment_terms": "付款方式 (选择: 30% T/T Deposit/L/C at sight/OA 60 Days/100% T/T Advance)",
  "target_price": "具体目标单价美元 (如 '$12.50')",
  "suggested_margin": "预估利润率 (如 '18%')",
  "certifications_required": ["认证要求数组，如 CE, FCC, UL, RoHS, GOTS, BSCI"],
  "moq": 最小起订量(纯数字),
  "lead_time_days": 交期天数(纯数字),
  "sample_required": 是否需样品(true/false),
  "buyer_type": "买家类型 (选择: brand/retailer/platform/wholesaler)",
  "profit_estimate": {
    "target_price_usd": 目标价美元(数字，如 12.5),
    "suggested_cost_cny": 建议出厂价人民币(数字，如 55),
    "estimated_margin": 预估毛利率百分比(数字，如 18.5),
    "exchange_rate": 7.25,
    "shipping_cost_estimate": 预估运费美元每件(数字，如 1.2),
    "certification_cost": 认证成本分摊美元每件(数字，如 0.3)
  }
}

【重要提示】
- incoterms 和 payment_terms 是必填的核心业务字段
- target_price 和 suggested_margin 必须是具体数值
- 生成的内容要真实可信，像真实的国际采购需求
- 只返回JSON，不要任何其他文字`;

  try {
    const completion = await openai.chat.completions.create({
      model: CONFIG.MODEL_NAME,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return null;

    // 尝试解析 JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const data = JSON.parse(jsonMatch[0]);
    
    // 标准化字段名称（兼容新旧格式）
    return {
      ...data,
      incoterm: data.incoterms?.split(" ")[0] || data.incoterm,
      incoterm_location: data.incoterms || data.incoterm_location,
      payment_term: data.payment_terms || data.payment_term,
      status: "active"
    };
  } catch (error) {
    console.error("[AI] 生成失败:", error instanceof Error ? error.message : String(error));
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
