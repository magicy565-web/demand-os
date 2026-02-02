/**
 * Factory Discover Chat Area - Discord 频道专用
 * AI 帮助发现和探索全球优质工厂
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
  Sparkles,
  Factory,
  MapPin,
  Star,
  Shield,
  Award,
  Clock,
  DollarSign,
  CheckCircle2,
  Loader2,
  Globe,
  Building2,
  BadgeCheck,
  Truck,
  Package,
  Zap,
  Heart,
  BookmarkPlus,
  ExternalLink,
  Filter,
} from "lucide-react";
import MemberList from "./MemberList";
import { WelcomeCard } from "./WelcomeCard";
import { channelWelcomeConfigs } from "@/lib/channelWelcomeConfig";
import { demoScenarios, getCurrentTimestamp as getDemoTimestamp } from "@/lib/liveDemoData";

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
  factoryCards?: FactoryCard[];
  reactions?: { emoji: string; count: number; reacted?: boolean }[];
}

interface FactoryCard {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  specialties: string[];
  certifications: string[];
  moq: string;
  leadTime: string;
  responseRate: string;
  verified: boolean;
  goldSupplier?: boolean;
  image?: string;
}

interface EmbedData {
  type: "factory" | "search" | "recommendation" | "info";
  title: string;
  description?: string;
  fields?: { name: string; value: string; inline?: boolean }[];
  footer?: string;
  color?: string;
}

interface FactoryDiscoverChatAreaProps {
  channelName: string;
  channelDescription: string;
}

const getCurrentTimestamp = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `Today at ${hours}:${minutes}`;
};

// 示例工厂数据
const sampleFactories: FactoryCard[] = [
  {
    id: "f1",
    name: "Shenzhen PowerTech Electronics Co., Ltd",
    location: "Shenzhen, Guangdong",
    rating: 4.9,
    reviews: 1247,
    specialties: ["Power Banks", "Wireless Chargers", "Portable Batteries"],
    certifications: ["ISO9001", "CE", "FCC", "RoHS"],
    moq: "500 pcs",
    leadTime: "15-20 days",
    responseRate: "98%",
    verified: true,
    goldSupplier: true,
  },
  {
    id: "f2",
    name: "Dongguan AudioPro Technology Ltd",
    location: "Dongguan, Guangdong",
    rating: 4.8,
    reviews: 892,
    specialties: ["TWS Earbuds", "Bluetooth Speakers", "Audio Accessories"],
    certifications: ["ISO9001", "CE", "BQB"],
    moq: "1000 pcs",
    leadTime: "20-25 days",
    responseRate: "95%",
    verified: true,
    goldSupplier: true,
  },
  {
    id: "f3",
    name: "Guangzhou Smart Home Solutions",
    location: "Guangzhou, Guangdong",
    rating: 4.7,
    reviews: 634,
    specialties: ["Smart Plugs", "LED Lighting", "Home Automation"],
    certifications: ["CE", "FCC", "ETL"],
    moq: "300 pcs",
    leadTime: "12-18 days",
    responseRate: "92%",
    verified: true,
  },
];

// 预设对话消息
const initialMessages: Message[] = [
  {
    id: "featured",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "DISCOVER" },
    content: "⭐ **Featured Factories This Week**\n\nHand-picked by our AI based on performance, reviews, and reliability:",
    timestamp: "Today at 09:00 AM",
    factoryCards: sampleFactories.slice(0, 2),
    reactions: [
      { emoji: "⭐", count: 15 },
      { emoji: "🏭", count: 8 },
    ],
  },
  {
    id: "msg-1",
    user: { name: "Michael Brown" },
    content: "@find LED strip light manufacturers with IP68 waterproof rating, need CE and UL certification",
    timestamp: "Today at 09:20 AM",
  },
  {
    id: "msg-2",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "DISCOVER" },
    content: "🔍 Searching for LED strip manufacturers with IP68 + CE/UL certifications...",
    timestamp: "Today at 09:20 AM",
  },
  {
    id: "msg-3",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "DISCOVER" },
    content: "✅ Found **12** qualified LED strip manufacturers! Here are the top matches:",
    timestamp: "Today at 09:21 AM",
    embed: {
      type: "search",
      title: "🔦 LED Strip Manufacturers - IP68 Certified",
      color: "#F59E0B",
      fields: [
        { name: "🏆 Best Match", value: "**Shenzhen LED World Co.**\n⭐ 4.9 (2,341 reviews) | 🏅 Gold Supplier\n📍 Shenzhen | ⏱️ 12-15 days | 💰 MOQ 500m", inline: false },
        { name: "🥈 Runner Up", value: "**Ningbo Bright Light Tech**\n⭐ 4.8 (1,892 reviews) | ✅ Verified\n📍 Ningbo | ⏱️ 15-18 days | 💰 MOQ 1000m", inline: false },
        { name: "🥉 Also Recommended", value: "**Foshan Illumination Ltd**\n⭐ 4.7 (1,456 reviews) | ✅ Verified\n📍 Foshan | ⏱️ 10-15 days | 💰 MOQ 300m", inline: false },
        { name: "🔐 Certifications", value: "All 3 suppliers have: CE, UL, RoHS, IP68 certified", inline: false },
      ],
      footer: "Reply with factory number (1-3) for detailed profile | 9 more matches available",
    },
    reactions: [
      { emoji: "🔦", count: 6 },
      { emoji: "👀", count: 4 },
    ],
  },
  {
    id: "msg-4",
    user: { name: "Michael Brown" },
    content: "Can you show me the full profile for #1 Shenzhen LED World?",
    timestamp: "Today at 09:25 AM",
  },
  {
    id: "msg-5",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "DISCOVER" },
    content: "📋 **Factory Profile: Shenzhen LED World Co.**",
    timestamp: "Today at 09:25 AM",
    embed: {
      type: "factory",
      title: "🏭 Shenzhen LED World Co., Ltd",
      color: "#23A559",
      fields: [
        { name: "📍 Location", value: "Shenzhen, Guangdong, China\nFactory Area: 15,000 sqm", inline: true },
        { name: "👥 Company Size", value: "500+ employees\nR&D Team: 50+", inline: true },
        { name: "📅 Established", value: "2008 (17 years)\n🏅 Gold Supplier 8 yrs", inline: true },
        { name: "🎯 Main Products", value: "• LED Strip Lights (IP20-IP68)\n• Neon Flex\n• LED Aluminum Profiles\n• Smart LED Controllers", inline: false },
        { name: "🏆 Certifications", value: "✅ CE | ✅ UL | ✅ FCC | ✅ RoHS | ✅ IP68 | ✅ ISO9001 | ✅ ISO14001", inline: false },
        { name: "💰 Pricing Tier", value: "FOB $0.85 - $2.50/m\nSample: $15-30\nPayment: T/T, L/C, PayPal", inline: true },
        { name: "📊 Performance", value: "Response: 98% (<12h)\nOn-time: 96%\nQuality: 99.2%", inline: true },
        { name: "🚚 Shipping", value: "Lead Time: 12-15 days\nExpress: 7 days (+15%)\nDoor-to-door available", inline: true },
        { name: "💬 Recent Review", value: "\"*Excellent quality and communication. Third order with them, always reliable.*\" - US Buyer, Jan 2026", inline: false },
      ],
      footer: "📞 Request Quote | 💬 Start Chat | ❤️ Save to Favorites",
    },
    reactions: [
      { emoji: "🏭", count: 9 },
      { emoji: "💯", count: 7 },
      { emoji: "❤️", count: 5 },
    ],
  },
  {
    id: "msg-6",
    user: { name: "Sarah Kim" },
    content: "@top pet products factories in China - looking for smart pet feeder manufacturers",
    timestamp: "Today at 09:40 AM",
  },
  {
    id: "msg-7",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "DISCOVER" },
    content: "🐾 **Top Pet Product Factories - Smart Feeders**\n\nFound **8** specialized manufacturers:",
    timestamp: "Today at 09:41 AM",
    embed: {
      type: "recommendation",
      title: "🏆 Top Smart Pet Feeder Manufacturers",
      color: "#8B5CF6",
      fields: [
        { name: "🥇 #1 Shenzhen PetTech Innovation", value: "⭐ 4.9 | 🏅 Gold | OEM/ODM Expert\n💰 $18-45/unit | 📦 MOQ 200 | ⏱️ 20 days\n✨ Specialty: App-controlled feeders, custom firmware", inline: false },
        { name: "🥈 #2 Ningbo Smart Pet Co.", value: "⭐ 4.8 | ✅ Verified | Fast Delivery\n💰 $22-55/unit | 📦 MOQ 100 | ⏱️ 15 days\n✨ Specialty: Camera integration, portion control", inline: false },
        { name: "🥉 #3 Guangzhou PawHome Tech", value: "⭐ 4.7 | ✅ Verified | Budget Friendly\n💰 $15-35/unit | 📦 MOQ 500 | ⏱️ 25 days\n✨ Specialty: Basic feeders, competitive pricing", inline: false },
        { name: "📈 Industry Insights", value: "• Smart pet feeder demand ↑156% YoY\n• Top features: WiFi, Camera, Voice\n• Recommended price point: $89-129 retail", inline: false },
      ],
      footer: "💡 Tip: Factories #1 and #2 offer free samples for qualified buyers",
    },
    reactions: [
      { emoji: "🐕", count: 8 },
      { emoji: "🏆", count: 6 },
      { emoji: "💰", count: 4 },
    ],
  },
  {
    id: "msg-8",
    user: { name: "David Zhang" },
    content: "@verified electronics factories Vietnam - want to diversify supply chain",
    timestamp: "Today at 10:00 AM",
  },
  {
    id: "msg-9",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "DISCOVER" },
    content: "🇻🇳 **Verified Electronics Factories in Vietnam**\n\nGreat choice for supply chain diversification! Here are our verified partners:",
    timestamp: "Today at 10:01 AM",
    embed: {
      type: "search",
      title: "🌏 Vietnam Electronics Manufacturing",
      color: "#EF4444",
      fields: [
        { name: "📊 Vietnam Overview", value: "• 23 verified electronics factories\n• Avg labor cost: 40% lower than China\n• Growing infrastructure investment\n• Key hubs: Ho Chi Minh, Hanoi, Bac Ninh", inline: false },
        { name: "🏭 Top Verified Factories", value: "**1. VinaTech Electronics** - Hanoi\n⭐ 4.6 | Consumer electronics, PCB assembly\n\n**2. Saigon Components Ltd** - HCMC\n⭐ 4.5 | Phone accessories, chargers\n\n**3. Delta Vietnam Manufacturing** - Bac Ninh\n⭐ 4.7 | Power supplies, adapters", inline: false },
        { name: "💡 Considerations", value: "✅ Lower tariffs to US/EU\n✅ Growing skilled workforce\n⚠️ Longer lead times (+5-7 days)\n⚠️ Smaller production capacity", inline: false },
      ],
      footer: "🔗 View full Vietnam factory directory | 📊 Compare China vs Vietnam costs",
    },
    reactions: [
      { emoji: "🇻🇳", count: 7 },
      { emoji: "🌏", count: 5 },
      { emoji: "📈", count: 3 },
    ],
  },
];

export default function FactoryDiscoverChatArea({
  channelName,
  channelDescription,
}: FactoryDiscoverChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMemberList, setShowMemberList] = useState(true);
  const [isLiveDemoPlaying, setIsLiveDemoPlaying] = useState(true);
  const [currentDemoStep, setCurrentDemoStep] = useState(0);
  const [demoStarted, setDemoStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const demoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const initialDelayRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 初始延迟逻辑：30秒后才开始演示
  useEffect(() => {
    if (!isLiveDemoPlaying) {
      setDemoStarted(false);
      return;
    }

    if (demoStarted) {
      return;
    }

    // 30秒后开始演示
    initialDelayRef.current = setTimeout(() => {
      setDemoStarted(true);
    }, 30000);

    return () => {
      if (initialDelayRef.current) {
        clearTimeout(initialDelayRef.current);
      }
    };
  }, [isLiveDemoPlaying, demoStarted]);

  // 实时演示逻辑
  useEffect(() => {
    if (!isLiveDemoPlaying || !demoStarted) {
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
      }
      return;
    }

    const factoryScenario = demoScenarios.find((s) => s.id === "factory-recommendation");
    if (!factoryScenario || currentDemoStep >= factoryScenario.messages.length) {
      return;
    }

    const currentMessage = factoryScenario.messages[currentDemoStep];
    const delay = currentMessage.delay || 1000;

    demoTimeoutRef.current = setTimeout(() => {
      const newMessage: Message = {
        id: currentMessage.id,
        user: currentMessage.user,
        content: currentMessage.content,
        timestamp: getDemoTimestamp(),
        embed: currentMessage.embed as any,
        reactions: currentMessage.reactions,
      };

      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        setCurrentDemoStep((prev) => prev + 1);
      }, 500);
    }, delay);

    return () => {
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
      }
    };
  }, [isLiveDemoPlaying, demoStarted, currentDemoStep]);

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

    // 模拟搜索响应
    setTimeout(() => {
      const processingMessage: Message = {
        id: `processing-${Date.now()}`,
        user: { name: "Demand-OS Bot", isBot: true, botTag: "DISCOVER" },
        content: "🔍 Searching our global factory database...",
        timestamp: getCurrentTimestamp(),
      };
      setMessages((prev) => [...prev, processingMessage]);

      setTimeout(() => {
        const responseMessage: Message = {
          id: `response-${Date.now()}`,
          user: { name: "Demand-OS Bot", isBot: true, botTag: "DISCOVER" },
          content: "I've analyzed your request and searched our database:",
          timestamp: getCurrentTimestamp(),
          embed: {
            type: "search",
            title: "🔍 Factory Search Results",
            color: "#5865F2",
            fields: [
              { name: "🔎 Your Query", value: userInput.slice(0, 100) + (userInput.length > 100 ? "..." : ""), inline: false },
              { name: "📊 Results", value: "Scanning 50,000+ verified factories...", inline: true },
              { name: "🌍 Regions", value: "China, Vietnam, India, Thailand", inline: true },
              { name: "💡 Next Steps", value: "For better results, try:\n• `@find [specific product]`\n• `@verified [region]`\n• Include certifications needed", inline: false },
            ],
            footer: "Full results loading... This may take a moment",
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
          <div className="ml-2 px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-bold rounded flex items-center gap-1">
            <Factory className="w-3 h-3" />
            NEW
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 px-2 py-1 bg-discord-server hover:bg-discord-hover rounded text-sm text-discord-text-muted hover:text-discord-text-normal transition">
            <Filter className="w-4 h-4" />
            Filters
          </button>
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

      {/* 快捷筛选标签 */}
      <div className="px-4 py-2 bg-discord-server/50 border-b border-black/10 flex items-center gap-2 overflow-x-auto">
        <QuickTag icon={BadgeCheck} label="Verified Only" active />
        <QuickTag icon={Award} label="Gold Suppliers" />
        <QuickTag icon={Globe} label="China" />
        <QuickTag icon={Globe} label="Vietnam" />
        <QuickTag icon={Globe} label="India" />
        <QuickTag icon={Clock} label="Fast Delivery" />
        <QuickTag icon={DollarSign} label="Low MOQ" />
      </div>

      {/* 主体区域 */}
      <div className="flex flex-1 min-h-0">
        {/* 消息区域 */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* 欢迎卡片 */}
            {channelWelcomeConfigs["factory-discover"] && (
              <WelcomeCard {...channelWelcomeConfigs["factory-discover"]} />
            )}
            
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
                  placeholder="Search factories... (e.g., @find wireless earbuds manufacturer with CE certification)"
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
              <Factory className="w-3 h-3 inline mr-1" />
              50,000+ verified factories worldwide • Updated daily
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

function QuickTag({ icon: Icon, label, active }: { icon: any; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
        active
          ? "bg-discord-blurple text-white"
          : "bg-discord-server text-discord-text-muted hover:bg-discord-hover hover:text-discord-text-normal"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

function MessageRow({ message }: { message: Message }) {
  return (
    <div className="flex gap-4 group hover:bg-discord-hover/30 -mx-4 px-4 py-2 rounded">
      {/* 头像 */}
      <div className="w-10 h-10 rounded-full bg-discord-blurple flex items-center justify-center text-white font-bold shrink-0">
        {message.user.isBot ? (
          <Factory className="w-5 h-5" />
        ) : (
          message.user.name[0].toUpperCase()
        )}
      </div>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        {/* 用户名和时间 */}
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-medium ${message.user.isBot ? "text-purple-400" : "text-discord-text-header"}`}>
            {message.user.name}
          </span>
          {message.user.isBot && (
            <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] rounded font-medium flex items-center gap-0.5">
              <Factory className="w-2.5 h-2.5" />
              {message.user.botTag}
            </span>
          )}
          <span className="text-xs text-discord-text-muted">{message.timestamp}</span>
        </div>

        {/* 消息内容 */}
        <div className="text-discord-text-normal whitespace-pre-wrap">
          {formatContent(message.content)}
        </div>

        {/* 工厂卡片 */}
        {message.factoryCards && message.factoryCards.length > 0 && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            {message.factoryCards.map((factory) => (
              <FactoryCardComponent key={factory.id} factory={factory} />
            ))}
          </div>
        )}

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

function FactoryCardComponent({ factory }: { factory: FactoryCard }) {
  return (
    <div className="bg-discord-server rounded-lg p-4 border border-discord-hover hover:border-discord-blurple/50 transition">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-discord-text-header text-sm">{factory.name}</h4>
            {factory.goldSupplier && (
              <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-500 text-[10px] rounded font-bold">GOLD</span>
            )}
            {factory.verified && (
              <BadgeCheck className="w-4 h-4 text-discord-blurple" />
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-discord-text-muted mt-1">
            <MapPin className="w-3 h-3" />
            {factory.location}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium text-discord-text-header">{factory.rating}</span>
          <span className="text-xs text-discord-text-muted">({factory.reviews})</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {factory.specialties.slice(0, 3).map((spec, i) => (
          <span key={i} className="px-2 py-0.5 bg-discord-hover text-discord-text-muted text-xs rounded">
            {spec}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <div className="text-discord-text-muted">MOQ</div>
          <div className="text-discord-text-normal font-medium">{factory.moq}</div>
        </div>
        <div>
          <div className="text-discord-text-muted">Lead Time</div>
          <div className="text-discord-text-normal font-medium">{factory.leadTime}</div>
        </div>
        <div>
          <div className="text-discord-text-muted">Response</div>
          <div className="text-green-400 font-medium">{factory.responseRate}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-discord-hover">
        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-discord-blurple hover:bg-discord-blurple/80 text-white text-xs font-medium rounded transition">
          <Send className="w-3 h-3" />
          Contact
        </button>
        <button className="p-1.5 hover:bg-discord-hover rounded transition">
          <Heart className="w-4 h-4 text-discord-text-muted hover:text-red-400" />
        </button>
        <button className="p-1.5 hover:bg-discord-hover rounded transition">
          <ExternalLink className="w-4 h-4 text-discord-text-muted hover:text-discord-text-normal" />
        </button>
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
        <div className="space-y-3">
          {embed.fields.map((field, i) => (
            <div key={i}>
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
