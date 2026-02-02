/**
 * Market Trends Chat Area - Discord 频道专用
 * AI 提供实时市场洞察和趋势分析
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hash,
  Bell,
  Pin,
  Users,
  Search,
  Send,
  Smile,
  PlusCircle,
  Gift,
  Sticker,
  Bot,
  User as UserIcon,
  Sparkles,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  Globe,
  Zap,
  DollarSign,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Flame,
  Eye,
} from "lucide-react";
import MemberList from "./MemberList";

interface Message {
  id: string;
  user: {
    name: string;
    avatar?: string;
    isBot?: boolean;
    botTag?: string;
  };
  content: string;
  timestamp: string;
  embed?: EmbedData;
  reactions?: { emoji: string; count: number; reacted?: boolean }[];
}

interface EmbedData {
  type: "trend" | "analysis" | "alert" | "report";
  title: string;
  description?: string;
  fields?: { name: string; value: string; inline?: boolean }[];
  footer?: string;
  color?: string;
}

interface MarketTrendsChatAreaProps {
  channelName: string;
  channelDescription: string;
}

const getCurrentTimestamp = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `Today at ${hours}:${minutes}`;
};

// 预设的市场趋势对话
const initialMessages: Message[] = [
  {
    id: "welcome",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "AI" },
    content: `Welcome to **#market-trends** 📈\n\n🔮 **AI Market Intelligence Center**\n\nGet real-time insights on product trends, pricing dynamics, and market opportunities!\n\n**Commands:**\n• \`@trend [product]\` - Get trend analysis\n• \`@hotproducts\` - Today's trending products\n• \`@pricewatch [category]\` - Price monitoring\n• \`@forecast [product]\` - Demand forecast\n\n**Auto Updates:**\n🔔 Daily trend reports at 9:00 AM\n🔔 Price alerts for your watched products\n\nAsk me anything about market trends! 👇`,
    timestamp: "Today at 08:00 AM",
  },
  {
    id: "daily-report",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "AI" },
    content: "📊 **Daily Market Brief - February 2, 2026**",
    timestamp: "Today at 09:00 AM",
    embed: {
      type: "report",
      title: "🔥 Today's Hottest Categories",
      color: "#F59E0B",
      fields: [
        { name: "🥇 #1 Portable Energy", value: "📈 +127% search volume\n💰 Avg price: $45-150\n🌍 Top markets: US, EU, JP", inline: true },
        { name: "🥈 #2 AI Gadgets", value: "📈 +89% search volume\n💰 Avg price: $20-80\n🌍 Top markets: US, CN, KR", inline: true },
        { name: "🥉 #3 Smart Home", value: "📈 +67% search volume\n💰 Avg price: $15-60\n🌍 Top markets: US, EU, AU", inline: true },
        { name: "📉 Declining: Fast Fashion", value: "-23% vs last month | Market saturation warning", inline: false },
        { name: "🆕 Emerging: Pet Tech", value: "+45% growth | Low competition | High margins", inline: false },
      ],
      footer: "Updated: 2 hours ago | Next update: 6:00 PM",
    },
    reactions: [
      { emoji: "🔥", count: 12 },
      { emoji: "📊", count: 8 },
      { emoji: "💡", count: 6 },
    ],
  },
  {
    id: "msg-1",
    user: { name: "David Kim" },
    content: "@Demand-OS Bot @trend wireless earbuds - what's the market looking like for Q1 2026?",
    timestamp: "Today at 09:15 AM",
  },
  {
    id: "msg-2",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "AI" },
    content: "🔍 Analyzing wireless earbuds market data...",
    timestamp: "Today at 09:15 AM",
  },
  {
    id: "msg-3",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "AI" },
    content: "📊 **Wireless Earbuds Market Analysis - Q1 2026**",
    timestamp: "Today at 09:16 AM",
    embed: {
      type: "analysis",
      title: "🎧 Wireless Earbuds Trend Report",
      color: "#5865F2",
      fields: [
        { name: "📈 Market Growth", value: "+34% YoY\nGlobal market: $52.8B\nExpected Q1 growth: 8.2%", inline: true },
        { name: "🔥 Hot Features", value: "• Spatial Audio (+156%)\n• AI Noise Cancel (+89%)\n• Health Monitoring (+67%)", inline: true },
        { name: "💰 Price Segments", value: "Budget (<$30): 45% share\nMid ($30-80): 35% share\nPremium (>$80): 20% share", inline: true },
        { name: "🎯 Winning Price Point", value: "$25-45 range showing highest conversion\n⚡ Sweet spot: $35 with ANC feature", inline: false },
        { name: "🌍 Regional Demand", value: "🇺🇸 USA: Strong (+28%)\n🇪🇺 EU: Growing (+22%)\n🇯🇵 Japan: Stable (+12%)\n🇧🇷 Brazil: Emerging (+45%)", inline: false },
        { name: "⚠️ Risk Factors", value: "• High competition in budget segment\n• Apple AirPods 5 launch expected Q2\n• Chip supply constraints easing", inline: false },
      ],
      footer: "Data sources: Alibaba, Amazon, Industry reports | Confidence: 94%",
    },
    reactions: [
      { emoji: "🎯", count: 9 },
      { emoji: "📈", count: 7 },
      { emoji: "💡", count: 5 },
    ],
  },
  {
    id: "msg-4",
    user: { name: "Emma Rodriguez" },
    content: "Wow great insights! What about the supplier landscape? Are factories still competitive?",
    timestamp: "Today at 09:20 AM",
  },
  {
    id: "msg-5",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "AI" },
    content: "Great question! Here's the supplier landscape analysis:",
    timestamp: "Today at 09:21 AM",
    embed: {
      type: "analysis",
      title: "🏭 Supplier Landscape - Wireless Earbuds",
      color: "#23A559",
      fields: [
        { name: "📍 Manufacturing Hubs", value: "🇨🇳 Shenzhen: 68% global supply\n🇻🇳 Vietnam: 15% (growing)\n🇮🇳 India: 8% (emerging)", inline: true },
        { name: "💵 Price Trends", value: "FOB prices ↓ 12% vs 6mo ago\nMOQs more flexible\nSample costs reduced", inline: true },
        { name: "⏱️ Lead Times", value: "Average: 25-35 days\nExpress: 15-20 days\n🟢 Improving from 2025", inline: true },
        { name: "🏆 Top Verified Suppliers", value: "• Shenzhen AudioTech (⭐4.9)\n• Dongguan SoundPro (⭐4.8)\n• Huizhou EarWorks (⭐4.7)", inline: false },
      ],
      footer: "💡 Tip: Use #quick-rfq to get instant quotes from these suppliers",
    },
    reactions: [
      { emoji: "🏭", count: 6 },
      { emoji: "👍", count: 8 },
    ],
  },
  {
    id: "msg-6",
    user: { name: "James Chen" },
    content: "@hotproducts what's trending in the pet category?",
    timestamp: "Today at 09:35 AM",
  },
  {
    id: "msg-7",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "AI" },
    content: "🐾 **Pet Products Trending Now**",
    timestamp: "Today at 09:36 AM",
    embed: {
      type: "trend",
      title: "🔥 Hot Pet Products - February 2026",
      color: "#EC4899",
      fields: [
        { name: "🚀 #1 Smart Pet Feeders", value: "📈 +178% (30 days)\n💰 $25-65 FOB\n🎯 App-controlled, portion tracking", inline: false },
        { name: "🚀 #2 GPS Pet Trackers", value: "📈 +134% (30 days)\n💰 $12-28 FOB\n🎯 4G/LTE, waterproof", inline: false },
        { name: "🚀 #3 Self-Cleaning Litter Box", value: "📈 +98% (30 days)\n💰 $85-150 FOB\n🎯 Auto-sensing, odor control", inline: false },
        { name: "🌟 Emerging Opportunity", value: "**Pet Cameras with Treat Dispenser**\n📈 +256% search growth\n🏷️ Low competition score\n💰 High margin potential (40%+)", inline: false },
      ],
      footer: "🔔 Set up alerts: Reply 'watch pet-tech' to track this category",
    },
    reactions: [
      { emoji: "🐕", count: 7 },
      { emoji: "🔥", count: 11 },
      { emoji: "💰", count: 5 },
    ],
  },
  {
    id: "msg-8",
    user: { name: "Lisa Wang" },
    content: "The pet camera idea sounds interesting! Any data on competition level?",
    timestamp: "Today at 09:40 AM",
  },
  {
    id: "msg-9",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "AI" },
    content: "Absolutely! Here's the competitive analysis for pet cameras with treat dispensers:",
    timestamp: "Today at 09:41 AM",
    embed: {
      type: "analysis",
      title: "🎯 Competitive Analysis: Pet Camera + Treat Dispenser",
      color: "#8B5CF6",
      fields: [
        { name: "📊 Competition Score", value: "🟢 **32/100** (Low)\nOnly 847 Amazon listings\nFew dominant brands", inline: true },
        { name: "💰 Profit Potential", value: "🟢 **High**\nAvg selling: $89-149\nFOB cost: $28-45\nMargin: 45-65%", inline: true },
        { name: "📈 Demand Score", value: "🟢 **78/100** (High)\n45K monthly searches\n+256% growth", inline: true },
        { name: "🎯 Recommended Strategy", value: "• Target $99 price point\n• Focus on 1080p+ video quality\n• Include 2-way audio feature\n• Add mobile app control", inline: false },
        { name: "⚠️ Watch Out For", value: "• Furbo brand dominance\n• App development costs\n• WiFi connectivity issues", inline: false },
      ],
      footer: "Opportunity Score: 8.5/10 | Best entry window: Now - Q2 2026",
    },
    reactions: [
      { emoji: "🎯", count: 8 },
      { emoji: "💡", count: 6 },
      { emoji: "🚀", count: 4 },
    ],
  },
];

export default function MarketTrendsChatArea({
  channelName,
  channelDescription,
}: MarketTrendsChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMemberList, setShowMemberList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      user: { name: "You" },
      content: inputValue,
      timestamp: getCurrentTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = inputValue;
    setInputValue("");
    setIsProcessing(true);

    // 模拟 AI 响应
    setTimeout(() => {
      const processingMessage: Message = {
        id: `processing-${Date.now()}`,
        user: { name: "Demand-OS Bot", isBot: true, botTag: "AI" },
        content: "🔍 Analyzing market data for your query...",
        timestamp: getCurrentTimestamp(),
      };
      setMessages((prev) => [...prev, processingMessage]);

      setTimeout(() => {
        const responseMessage: Message = {
          id: `response-${Date.now()}`,
          user: { name: "Demand-OS Bot", isBot: true, botTag: "AI" },
          content: "I've analyzed your query. Here's what I found:",
          timestamp: getCurrentTimestamp(),
          embed: {
            type: "analysis",
            title: "📊 Market Analysis Result",
            color: "#5865F2",
            fields: [
              { name: "🔎 Query", value: userInput.slice(0, 80) + (userInput.length > 80 ? "..." : ""), inline: false },
              { name: "📈 Trend Status", value: "Analyzing historical data...", inline: true },
              { name: "🌍 Market Size", value: "Calculating...", inline: true },
              { name: "💡 Recommendation", value: "For detailed analysis, use specific commands:\n• `@trend [product]`\n• `@forecast [category]`", inline: false },
            ],
            footer: "Full report generating... Check back in 2-3 minutes",
          },
        };
        setMessages((prev) => [...prev, responseMessage]);
        setIsProcessing(false);
      }, 2500);
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col bg-discord-bg h-screen">
      {/* 顶部工具栏 */}
      <header className="h-12 border-b border-black/10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-discord-text-muted" />
          <h1 className="font-bold text-discord-text-header">{channelName}</h1>
          <div className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-bold rounded flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            LIVE
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-discord-text-muted hover:text-discord-text-normal cursor-pointer transition" />
          <Pin className="w-5 h-5 text-discord-text-muted hover:text-discord-text-normal cursor-pointer transition" />
          <button 
            onClick={() => setShowMemberList(!showMemberList)}
            className={`hover:text-discord-text-normal transition ${showMemberList ? 'text-discord-text-normal' : 'text-discord-text-muted'}`}
          >
            <Users className="w-5 h-5" />
          </button>
          <Search className="w-5 h-5 text-discord-text-muted hover:text-discord-text-normal cursor-pointer transition" />
        </div>
      </header>

      {/* 趋势指标条 */}
      <div className="px-4 py-2 bg-discord-server/50 border-b border-black/10 flex items-center gap-6 overflow-x-auto">
        <TrendIndicator label="Electronics" value="+12.5%" positive />
        <TrendIndicator label="Home & Garden" value="+8.3%" positive />
        <TrendIndicator label="Fashion" value="-3.2%" positive={false} />
        <TrendIndicator label="Pet Supplies" value="+24.7%" positive />
        <TrendIndicator label="Sports" value="+5.1%" positive />
      </div>

      {/* 主体区域 */}
      <div className="flex flex-1 min-h-0">
        {/* 消息区域 */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((message) => (
              <MessageRow key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 输入框 */}
          <div className="p-4 border-t border-black/10">
            <div className="relative">
              <div className="flex items-center gap-3 bg-discord-input rounded-lg px-4 py-3">
                <PlusCircle className="w-6 h-6 text-discord-text-muted hover:text-discord-text-normal cursor-pointer" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about market trends... (e.g., @trend smartwatch, @hotproducts)"
                  className="flex-1 bg-transparent text-discord-text-normal placeholder-discord-text-muted/50 outline-none"
                  disabled={isProcessing}
                />
                <div className="flex items-center gap-2">
                  <Gift className="w-6 h-6 text-discord-text-muted hover:text-discord-text-normal cursor-pointer" />
                  <Sticker className="w-6 h-6 text-discord-text-muted hover:text-discord-text-normal cursor-pointer" />
                  <Smile className="w-6 h-6 text-discord-text-muted hover:text-discord-text-normal cursor-pointer" />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isProcessing}
                    className="ml-2 p-2 rounded-full bg-discord-blurple hover:bg-discord-blurple/80 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-discord-text-muted mt-2 px-2">
              <BarChart3 className="w-3 h-3 inline mr-1" />
              AI-powered market intelligence - Updated every 2 hours
            </p>
          </div>
        </div>

        {/* 成员列表 */}
        <MemberList showList={showMemberList} />
      </div>
    </div>
  );
}

// ==================== 子组件 ====================

function TrendIndicator({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm whitespace-nowrap">
      <span className="text-discord-text-muted">{label}</span>
      <span className={`font-medium flex items-center gap-0.5 ${positive ? "text-green-400" : "text-red-400"}`}>
        {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {value}
      </span>
    </div>
  );
}

function MessageRow({ message }: { message: Message }) {
  return (
    <div className="flex gap-4 group hover:bg-discord-hover/30 -mx-4 px-4 py-2 rounded">
      {/* 头像 */}
      <div className="w-10 h-10 rounded-full bg-discord-blurple flex items-center justify-center text-white font-bold shrink-0">
        {message.user.isBot ? (
          <BarChart3 className="w-5 h-5" />
        ) : (
          message.user.name[0].toUpperCase()
        )}
      </div>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        {/* 用户名和时间 */}
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-medium ${message.user.isBot ? "text-green-400" : "text-discord-text-header"}`}>
            {message.user.name}
          </span>
          {message.user.isBot && (
            <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded font-medium flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" />
              {message.user.botTag}
            </span>
          )}
          <span className="text-xs text-discord-text-muted">{message.timestamp}</span>
        </div>

        {/* 消息内容 */}
        <div className="text-discord-text-normal whitespace-pre-wrap">
          {formatContent(message.content)}
        </div>

        {/* Embed 卡片 */}
        {message.embed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 max-w-2xl"
          >
            <EmbedCard embed={message.embed} />
          </motion.div>
        )}

        {/* 反应 */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex gap-1 mt-2">
            {message.reactions.map((reaction, i) => (
              <button
                key={i}
                className="flex items-center gap-1 px-2 py-1 bg-discord-server hover:bg-discord-hover rounded-full text-sm transition"
              >
                <span>{reaction.emoji}</span>
                <span className="text-discord-text-muted">{reaction.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmbedCard({ embed }: { embed: EmbedData }) {
  return (
    <div
      className="bg-discord-server rounded border-l-4 p-4"
      style={{ borderLeftColor: embed.color || "#5865F2" }}
    >
      <h4 className="text-discord-text-header font-bold mb-2">{embed.title}</h4>
      {embed.description && (
        <p className="text-discord-text-normal text-sm mb-3">{embed.description}</p>
      )}
      {embed.fields && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {embed.fields.map((field, i) => (
            <div key={i} className={field.inline === false ? "md:col-span-3" : ""}>
              <div className="text-xs text-discord-text-muted font-semibold mb-1">{field.name}</div>
              <div className="text-sm text-discord-text-normal whitespace-pre-wrap">{field.value}</div>
            </div>
          ))}
        </div>
      )}
      {embed.footer && (
        <div className="mt-3 pt-2 border-t border-discord-hover text-xs text-discord-text-muted">
          {embed.footer}
        </div>
      )}
    </div>
  );
}

function formatContent(content: string): React.ReactNode {
  const parts = content.split(/(\*\*.*?\*\*|`.*?`|@\w+)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="px-1 py-0.5 bg-discord-server rounded text-sm">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("@")) {
      return <span key={i} className="text-discord-blurple bg-discord-blurple/10 px-1 rounded">{part}</span>;
    }
    return part;
  });
}
