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
        delay: 3000,
        typingDuration: 2000,
      },
      {
        id: "demo-2",
        user: { name: "Sarah Chen" },
        content: "https://www.tiktok.com/@trending_gadgets/video/7328901234567890",
        delay: 4000,
        typingDuration: 1500,
      },
      {
        id: "demo-3",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "🔄 Analyzing TikTok video content...",
        delay: 3000,
        typingDuration: 1000,
      },
      {
        id: "demo-4",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "✅ Video analysis complete! Product identified and suppliers matched",
        delay: 4500,
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
        delay: 5000,
        typingDuration: 2000,
      },
      {
        id: "demo-6",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "Absolutely! I've contacted the factory for you. Sample costs:\n\n• Sample: $25/unit (with custom LOGO)\n• Shipping: $18 (DHL Express, 3-5 days)\n• Sample cost deductible from bulk order\n\nShall I place the sample order for you?",
        delay: 4000,
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
        delay: 3000,
        typingDuration: 2000,
      },
      {
        id: "rfq-2",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "Hello! I can help you match suppliers quickly. Please provide:\n\n1️⃣ Budget range\n2️⃣ Minimum order quantity\n3️⃣ Lead time requirements\n4️⃣ Special features (ANC, waterproof, etc.)",
        delay: 3500,
        typingDuration: 2500,
      },
      {
        id: "rfq-3",
        user: { name: "Mike Liu" },
        content: "Budget $8-12/unit, MOQ 5000 pcs, need ANC feature, 40 days lead time",
        delay: 4000,
        typingDuration: 2000,
      },
      {
        id: "rfq-4",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "🔍 Matching suppliers intelligently...",
        delay: 3000,
        typingDuration: 1000,
      },
      {
        id: "rfq-5",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "✨ Found 5 qualified suppliers for you",
        delay: 5000,
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
        delay: 3000,
        typingDuration: 2000,
      },
      {
        id: "market-2",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "🔍 正在分析智能手表市场数据...",
        delay: 3500,
        typingDuration: 1000,
      },
      {
        id: "market-3",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "📊 基于最近 30 天的数据分析",
        delay: 4500,
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
  {
    id: "factory-recommendation",
    name: "Factory Recommendation",
    description: "AI recommends verified factories based on user needs",
    messages: [
      {
        id: "factory-1",
        user: { name: "Alex Johnson" },
        content: "Looking for a reliable LED strip manufacturer, need IP68 waterproof rating with CE certification",
        delay: 3000,
        typingDuration: 2500,
      },
      {
        id: "factory-2",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "🔍 Searching our verified factory database for LED strip manufacturers...",
        delay: 3500,
        typingDuration: 1500,
      },
      {
        id: "factory-3",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "✅ Found 8 verified manufacturers matching your criteria!",
        delay: 4000,
        typingDuration: 2000,
        embed: {
          type: "info",
          title: "🏭 Top Factory Recommendations",
          color: "#8B5CF6",
          fields: [
            { name: "🥇 Shenzhen LED World Co.", value: "⭐ 4.9/5.0 | 15 yrs experience\n📍 Shenzhen | CE, UL, IP68 certified\n💰 FOB $1.65/m | MOQ 500m", inline: false },
            { name: "🥈 Ningbo Bright Tech", value: "⭐ 4.8/5.0 | 12 yrs experience\n📍 Ningbo | CE, RoHS, IP68 certified\n💰 FOB $1.55/m | MOQ 1000m", inline: false },
            { name: "🥉 Guangzhou Lighting Pro", value: "⭐ 4.7/5.0 | 10 yrs experience\n📍 Guangzhou | CE certified, IP68\n💰 FOB $1.45/m | MOQ 2000m", inline: false },
          ],
          footer: "All factories verified by Demand-OS | Reply 1-3 for detailed profile",
        },
        reactions: [
          { emoji: "🏭", count: 6 },
          { emoji: "👍", count: 9 },
          { emoji: "🔥", count: 4 },
        ],
      },
      {
        id: "factory-4",
        user: { name: "Alex Johnson" },
        content: "Great! Can you show me factory #1's full profile and recent reviews?",
        delay: 5000,
        typingDuration: 2000,
      },
      {
        id: "factory-5",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "📋 **Shenzhen LED World Co., Ltd - Full Profile**\n\n🏆 **Gold Supplier** | Verified since 2016\n📍 Shenzhen, Guangdong, China\n👥 500+ employees | 15,000 sqm factory\n\n**Recent Reviews:**\n⭐⭐⭐⭐⭐ \"Excellent quality, fast response\" - US Buyer\n⭐⭐⭐⭐⭐ \"Third order, always reliable\" - UK Buyer\n⭐⭐⭐⭐ \"Good price, delivery on time\" - AU Buyer\n\n📞 Should I initiate contact or request samples?",
        delay: 4500,
        typingDuration: 3500,
        reactions: [
          { emoji: "⭐", count: 7 },
          { emoji: "💯", count: 5 },
        ],
      },
    ],
  },
  {
    id: "sample-order",
    name: "Sample Order Flow",
    description: "Complete sample ordering process with AI assistance",
    messages: [
      {
        id: "sample-1",
        user: { name: "Rachel Kim" },
        content: "I'd like to order samples from the TWS earbuds supplier you recommended earlier",
        delay: 1000,
        typingDuration: 2000,
      },
      {
        id: "sample-2",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "Of course! 📦 Let me prepare your sample order details.\n\nBased on your previous inquiry for TWS earbuds with ANC:\n\n**Supplier:** Shenzhen AudioPro Tech\n**Product:** TWS-A8 Pro with ANC\n**Sample Price:** $28/unit (retail $45)\n**Shipping:** DHL Express 3-5 days\n\nHow many samples would you like to order?",
        delay: 1500,
        typingDuration: 3000,
      },
      {
        id: "sample-3",
        user: { name: "Rachel Kim" },
        content: "I'll take 3 samples. Can I get them in different colors?",
        delay: 2500,
        typingDuration: 1500,
      },
      {
        id: "sample-4",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "✅ Perfect! Sample order prepared:",
        delay: 1500,
        typingDuration: 2000,
        embed: {
          type: "quote",
          title: "📦 Sample Order Summary",
          color: "#23A559",
          fields: [
            { name: "📱 Product", value: "TWS-A8 Pro with ANC (3 units)", inline: false },
            { name: "🎨 Colors", value: "Black × 1 | White × 1 | Navy Blue × 1", inline: true },
            { name: "💰 Total Cost", value: "$84 (samples) + $25 (shipping) = **$109**", inline: true },
            { name: "🚚 Delivery", value: "DHL Express: 3-5 business days", inline: true },
            { name: "📍 Destination", value: "Confirm your shipping address", inline: true },
          ],
          footer: "Sample ID: #SMP-20260202-003 | Reply CONFIRM to proceed",
        },
        reactions: [
          { emoji: "📦", count: 4 },
          { emoji: "✅", count: 6 },
        ],
      },
      {
        id: "sample-5",
        user: { name: "Rachel Kim" },
        content: "CONFIRM - ship to my saved address",
        delay: 2000,
        typingDuration: 1000,
      },
      {
        id: "sample-6",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "🎉 **Sample order confirmed!**\n\n✅ Order placed with Shenzhen AudioPro Tech\n✅ Payment link sent to your email\n✅ Tracking number will be provided within 24h\n\nYou'll receive updates at each shipping milestone. Questions? Just ask here!",
        delay: 2000,
        typingDuration: 2500,
        reactions: [
          { emoji: "🎉", count: 8 },
          { emoji: "🙏", count: 5 },
          { emoji: "🚀", count: 3 },
        ],
      },
    ],
  },
  {
    id: "bulk-negotiation",
    name: "Bulk Order Negotiation",
    description: "AI assists with price negotiation for bulk orders",
    messages: [
      {
        id: "bulk-1",
        user: { name: "David Chen" },
        content: "The samples arrived and quality is great! Ready to place a bulk order of 10,000 units. Can we negotiate the price?",
        delay: 1000,
        typingDuration: 2500,
      },
      {
        id: "bulk-2",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "Excellent news! 🎉 Let me analyze the pricing for your bulk order.\n\n📊 **Current Quote Analysis:**\n• Unit price: $9.80\n• Your quantity: 10,000 units\n• Current total: $98,000\n\n💡 Based on market data and this supplier's history, I can help negotiate. What's your target price?",
        delay: 2000,
        typingDuration: 3000,
      },
      {
        id: "bulk-3",
        user: { name: "David Chen" },
        content: "I'm hoping to get $8.50 per unit. Is that realistic?",
        delay: 2500,
        typingDuration: 1500,
      },
      {
        id: "bulk-4",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "🤔 **Negotiation Strategy:**\n\nBased on market analysis:\n• Average price for similar products: $9.20-10.50\n• This supplier's typical discount: 10-15%\n• Your target $8.50 = 13% discount\n\n✅ **Recommendation:** This is achievable! I suggest:\n1. Counter-offer at $8.20 (16% discount)\n2. Mention potential for repeat orders\n3. Offer flexible payment terms\n\nShall I send this negotiation to the supplier?",
        delay: 2000,
        typingDuration: 3500,
        reactions: [
          { emoji: "🧠", count: 6 },
          { emoji: "💰", count: 4 },
        ],
      },
      {
        id: "bulk-5",
        user: { name: "David Chen" },
        content: "Yes, please proceed with $8.20 initial offer",
        delay: 2000,
        typingDuration: 1500,
      },
      {
        id: "bulk-6",
        user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
        content: "📤 **Negotiation sent to supplier!**\n\n✅ Counter-offer: $8.20/unit for 10,000 pcs\n✅ Highlighted: Repeat order potential\n✅ Mentioned: Flexible payment terms available\n\n⏰ Expected response: 24-48 hours\n\nI'll notify you immediately when they respond. Based on their history, they typically accept or counter within 6 hours.",
        delay: 1500,
        typingDuration: 2500,
        embed: {
          type: "info",
          title: "📋 Negotiation Status",
          color: "#5865F2",
          fields: [
            { name: "🏭 Supplier", value: "Shenzhen AudioPro Tech", inline: true },
            { name: "📦 Quantity", value: "10,000 units", inline: true },
            { name: "💵 Your Offer", value: "$8.20/unit = $82,000", inline: true },
            { name: "📉 Savings", value: "$16,000 (if accepted)", inline: true },
          ],
          footer: "Negotiation ID: #NEG-20260202-001",
        },
        reactions: [
          { emoji: "🤝", count: 7 },
          { emoji: "💪", count: 5 },
          { emoji: "🙏", count: 4 },
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
