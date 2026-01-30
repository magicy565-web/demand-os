/**
 * Live Demo System - 实时演示系统
 * 
 * 用于在 Discord 界面中模拟真实的用户交互和 AI 响应
 */

// 消息类型
export interface DemoMessage {
  id: string;
  user: {
    name: string;
    avatar?: string;
    isBot?: boolean;
    botTag?: string;
  };
  content: string;
  timestamp?: string;
  embed?: EmbedData;
  reactions?: { emoji: string; count: number; reacted?: boolean }[];
  delay?: number; // 发送延迟（毫秒）
  typingDuration?: number; // 打字显示时长（毫秒）
}

export interface EmbedData {
  type: "quote" | "info" | "success" | "error";
  title: string;
  description?: string;
  fields?: { name: string; value: string; inline?: boolean }[];
  footer?: string;
  color?: string;
  thumbnail?: string;
}

// 演示场景
export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  messages: DemoMessage[];
}

// ============ 预设演示场景 ============

export const demoScenarios: DemoScenario[] = [
  {
    id: "tiktok-product-quote",
    name: "TikTok Product Quote",
    description: "User shares TikTok link, AI automatically identifies product and provides quote",
    messages: [
      {
        id: "demo-1",
        user: { name: "Sarah Chen" },
        content: "Just saw an amazing humidifier on TikTok, want to know the factory price 🤔",
        delay: 1000,
        typingDuration: 2000,
      },
      {
        id: "demo-2",
        user: { name: "Sarah Chen" },
        content: "https://www.tiktok.com/@trending_gadgets/video/7328901234567890",
        delay: 2000,
        typingDuration: 1500,
      },
      {
        id: "demo-3",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "🔄 Analyzing TikTok video content...",
        delay: 1000,
        typingDuration: 1000,
      },
      {
        id: "demo-4",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "✅ Video analysis complete! Product identified and suppliers matched",
        delay: 2500,
        typingDuration: 1500,
        embed: {
          type: "quote",
          title: "⚡ Instant Quote",
          color: "#23A559",
          fields: [
            { name: "📦 Product", value: "**Anti-Gravity Water Drop Humidifier**", inline: false },
            { name: "💰 FOB Price", value: "$4.85 / unit", inline: true },
            { name: "📊 MOQ", value: "1,000 pcs", inline: true },
            { name: "🚚 Lead Time", value: "15-20 days", inline: true },
            { name: "🏭 Matched Factories", value: "3 certified suppliers", inline: true },
            { name: "🎯 AI Confidence", value: "🟢🟢🟢🟢🟢🟢🟢🟢🟢⚪ 92%", inline: false },
          ],
          footer: "RFQ ID: #SR-20240130-001 | Powered by Demand-OS",
        },
        reactions: [
          { emoji: "🔥", count: 5, reacted: true },
          { emoji: "💰", count: 3 },
          { emoji: "👍", count: 8 },
        ],
      },
      {
        id: "demo-5",
        user: { name: "Sarah Chen" },
        content: "Amazing! The price looks good, can you provide samples?",
        delay: 3000,
        typingDuration: 2000,
      },
      {
        id: "demo-6",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "Absolutely! I've contacted the factory for you. Sample costs:\n\n• Sample: $25/unit (with custom LOGO)\n• Shipping: $18 (DHL Express, 3-5 days)\n• Sample cost deductible from bulk order\n\nShall I place the sample order for you?",
        delay: 2000,
        typingDuration: 3000,
      },
    ],
  },
  {
    id: "quick-rfq",
    name: "Quick RFQ",
    description: "User submits RFQ request, AI quickly matches suppliers",
    messages: [
      {
        id: "rfq-1",
        user: { name: "Mike Liu" },
        content: "Hi everyone! I need to source Bluetooth earbuds, any supplier recommendations?",
        delay: 1000,
        typingDuration: 2000,
      },
      {
        id: "rfq-2",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "Hello! I can help you match suppliers quickly. Please provide:\n\n1️⃣ Budget range\n2️⃣ Minimum order quantity\n3️⃣ Lead time requirements\n4️⃣ Special features (ANC, waterproof, etc.)",
        delay: 1500,
        typingDuration: 2500,
      },
      {
        id: "rfq-3",
        user: { name: "Mike Liu" },
        content: "Budget $8-12/unit, MOQ 5000 pcs, need ANC feature, 40 days lead time",
        delay: 2500,
        typingDuration: 2000,
      },
      {
        id: "rfq-4",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "🔍 Matching suppliers intelligently...",
        delay: 1000,
        typingDuration: 1000,
      },
      {
        id: "rfq-5",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "✨ Found 5 qualified suppliers for you",
        delay: 3000,
        typingDuration: 1500,
        embed: {
          type: "info",
          title: "🎯 供应商匹配结果",
          color: "#5865F2",
          fields: [
            { name: "🥇 深圳声谷科技", value: "⭐ 4.8/5.0 | FOB $9.80 | 认证：ISO9001, CE", inline: false },
            { name: "🥈 东莞音频工厂", value: "⭐ 4.6/5.0 | FOB $10.50 | 认证：FCC, RoHS", inline: false },
            { name: "🥉 惠州智能声学", value: "⭐ 4.5/5.0 | FOB $11.20 | 认证：CE, BQB", inline: false },
          ],
          footer: "匹配度基于：价格、产能、认证、历史评价 | RFQ ID: #RFQ-20240130-002",
        },
        reactions: [
          { emoji: "🎯", count: 4 },
          { emoji: "👏", count: 6 },
        ],
      },
    ],
  },
  {
    id: "market-analysis",
    name: "市场趋势分析",
    description: "AI 提供实时市场洞察和趋势分析",
    messages: [
      {
        id: "market-1",
        user: { name: "Emma Wang", avatar: "/avatars/user3.png" },
        content: "@Demand-OS Bot 最近智能手表品类有什么趋势？",
        delay: 1000,
        typingDuration: 2000,
      },
      {
        id: "market-2",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "🔍 正在分析智能手表市场数据...",
        delay: 1500,
        typingDuration: 1000,
      },
      {
        id: "market-3",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "📊 基于最近 30 天的数据分析",
        delay: 2500,
        typingDuration: 1500,
        embed: {
          type: "success",
          title: "📈 智能手表市场趋势报告",
          color: "#F59E0B",
          fields: [
            { name: "🔥 热门功能", value: "血氧检测 (+45%)\n心率监测 (+32%)\nNFC 支付 (+28%)", inline: true },
            { name: "💰 价格区间", value: "入门级: $25-40\n中端: $40-80\n高端: $80-150", inline: true },
            { name: "📊 需求增长", value: "本月询盘量 +67%\n订单量 +43%\n平均客单价 +15%", inline: false },
            { name: "🌍 主要市场", value: "北美 (38%) | 欧洲 (29%) | 东南亚 (22%)", inline: false },
            { name: "⚡ 推荐策略", value: "主推 $50-70 价格带产品，强调健康监测功能", inline: false },
          ],
          footer: "数据来源：Demand-OS Intelligence | 更新时间：2 小时前",
        },
        reactions: [
          { emoji: "📊", count: 8 },
          { emoji: "🔥", count: 5 },
          { emoji: "💡", count: 7 },
        ],
      },
    ],
  },
];

// 获取当前时间戳（格式化）
export const getCurrentTimestamp = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `Today at ${hours}:${minutes}`;
};
