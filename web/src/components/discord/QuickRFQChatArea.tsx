/**
 * Quick RFQ Chat Area - Discord 频道专用
 * 快速提交 RFQ 请求，AI 智能匹配供应商
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
  Package,
  Zap,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  Factory,
  Clock,
  Star,
  TrendingUp,
  Globe,
} from "lucide-react";
import MemberList from "./MemberList";
import { WelcomeCard } from "./WelcomeCard";
import { channelWelcomeConfigs } from "@/lib/channelWelcomeConfig";
import { DemoMessage, demoScenarios, getCurrentTimestamp as getDemoTimestamp } from "@/lib/liveDemoData";

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
  type: "quote" | "info" | "success" | "error" | "rfq";
  title: string;
  description?: string;
  fields?: { name: string; value: string; inline?: boolean }[];
  footer?: string;
  color?: string;
}

interface QuickRFQChatAreaProps {
  channelName: string;
  channelDescription: string;
}

const getCurrentTimestamp = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `Today at ${hours}:${minutes}`;
};

// 预设的对话消息
const initialMessages: Message[] = [
  {
    id: "msg-1",
    user: { name: "Alex Thompson" },
    content: "Hi! I'm looking for a supplier for portable power stations, around 300W capacity.",
    timestamp: "Today at 09:15 AM",
  },
  {
    id: "msg-2",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
    content: "Hello Alex! 👋 I can help you find the right supplier. Could you provide more details?\n\n📦 **Quantity needed?**\n💰 **Budget per unit?**\n⏰ **Required delivery timeline?**\n🎯 **Any specific certifications?** (CE, FCC, UL, etc.)",
    timestamp: "Today at 09:15 AM",
  },
  {
    id: "msg-3",
    user: { name: "Alex Thompson" },
    content: "Need about 2000 units, budget is $85-100/unit, want CE and FCC certified. Delivery within 60 days.",
    timestamp: "Today at 09:17 AM",
  },
  {
    id: "msg-4",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
    content: "🔍 Searching our supplier database...",
    timestamp: "Today at 09:17 AM",
  },
  {
    id: "msg-5",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
    content: "✅ Found **4** qualified suppliers matching your requirements!",
    timestamp: "Today at 09:18 AM",
    embed: {
      type: "rfq",
      title: "🏭 Supplier Match Results",
      color: "#5865F2",
      fields: [
        { name: "🥇 Shenzhen PowerTech Co.", value: "⭐ 4.9/5.0 | FOB $92 | CE, FCC, UL certified\n📊 Capacity: 50K+/month | Lead time: 45 days", inline: false },
        { name: "🥈 Dongguan Energy Solutions", value: "⭐ 4.7/5.0 | FOB $88 | CE, FCC certified\n📊 Capacity: 30K/month | Lead time: 50 days", inline: false },
        { name: "🥉 Guangzhou Green Power", value: "⭐ 4.6/5.0 | FOB $95 | CE, FCC, RoHS certified\n📊 Capacity: 25K/month | Lead time: 40 days", inline: false },
        { name: "4️⃣ Huizhou Battery Tech", value: "⭐ 4.5/5.0 | FOB $85 | CE certified\n📊 Capacity: 20K/month | Lead time: 55 days", inline: false },
      ],
      footer: "RFQ ID: #RFQ-20260202-001 | Reply with supplier number to get detailed quote",
    },
    reactions: [
      { emoji: "🎯", count: 5 },
      { emoji: "👍", count: 8 },
    ],
  },
  {
    id: "msg-6",
    user: { name: "Alex Thompson" },
    content: "Great! I'm interested in supplier #1 and #3. Can you get detailed quotes?",
    timestamp: "Today at 09:20 AM",
  },
  {
    id: "msg-7",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
    content: "Perfect choice! 📨 I've sent detailed RFQ requests to:\n\n• **Shenzhen PowerTech Co.**\n• **Guangzhou Green Power**\n\nYou should receive formal quotations within **24-48 hours**. I'll notify you when they respond!\n\n💡 Tip: You can track all your RFQs in #my-rfqs channel.",
    timestamp: "Today at 09:20 AM",
    reactions: [
      { emoji: "🙏", count: 3 },
      { emoji: "⚡", count: 2 },
    ],
  },
  {
    id: "msg-8",
    user: { name: "Jennifer Wu" },
    content: "I need LED strip lights, 5000 meters, SMD5050 RGB type, waterproof IP65. Target price under $2/meter.",
    timestamp: "Today at 09:35 AM",
  },
  {
    id: "msg-9",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
    content: "🔍 Analyzing your requirements for LED strip lights...",
    timestamp: "Today at 09:35 AM",
  },
  {
    id: "msg-10",
    user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
    content: "✨ Found **6** suppliers for SMD5050 RGB LED strips!",
    timestamp: "Today at 09:36 AM",
    embed: {
      type: "rfq",
      title: "💡 LED Strip Supplier Matches",
      color: "#23A559",
      fields: [
        { name: "📦 Product Match", value: "SMD5050 RGB LED Strip, IP65 Waterproof", inline: false },
        { name: "💰 Price Range", value: "$1.50 - $1.95 /meter", inline: true },
        { name: "📊 MOQ", value: "1000m - 5000m", inline: true },
        { name: "🚚 Lead Time", value: "15-25 days", inline: true },
        { name: "🏭 Top Supplier", value: "**Shenzhen LED World** - ⭐ 4.8 | $1.65/m | 15 days", inline: false },
      ],
      footer: "6 suppliers found | 3 with samples available | RFQ ID: #RFQ-20260202-002",
    },
    reactions: [
      { emoji: "💡", count: 4 },
      { emoji: "🔥", count: 6 },
    ],
  },
];

export default function QuickRFQChatArea({
  channelName,
  channelDescription,
}: QuickRFQChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMemberList, setShowMemberList] = useState(true);
  const [isLiveDemoPlaying, setIsLiveDemoPlaying] = useState(true);
  const [currentDemoStep, setCurrentDemoStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const demoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 实时演示逻辑
  useEffect(() => {
    if (!isLiveDemoPlaying) {
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
      }
      return;
    }

    const quickRfqScenario = demoScenarios.find((s) => s.id === "quick-rfq");
    if (!quickRfqScenario || currentDemoStep >= quickRfqScenario.messages.length) {
      return;
    }

    const currentMessage = quickRfqScenario.messages[currentDemoStep];
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
  }, [isLiveDemoPlaying, currentDemoStep]);

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
        user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
        content: "🔍 Analyzing your RFQ requirements...",
        timestamp: getCurrentTimestamp(),
      };
      setMessages((prev) => [...prev, processingMessage]);

      setTimeout(() => {
        const responseMessage: Message = {
          id: `response-${Date.now()}`,
          user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
          content: "Thanks for your inquiry! I've received your RFQ request.",
          timestamp: getCurrentTimestamp(),
          embed: {
            type: "info",
            title: "📋 RFQ Received",
            color: "#5865F2",
            fields: [
              { name: "📝 Your Request", value: userInput.slice(0, 100) + (userInput.length > 100 ? "..." : ""), inline: false },
              { name: "🔄 Status", value: "Processing - Matching suppliers...", inline: true },
              { name: "⏱️ Estimated Time", value: "< 2 minutes", inline: true },
            ],
            footer: "You'll be notified when suppliers are matched",
          },
        };
        setMessages((prev) => [...prev, responseMessage]);
        setIsProcessing(false);
      }, 2000);
    }, 500);
  };

  return (
    <div className="flex-1 flex flex-col bg-discord-bg h-screen">
      {/* 顶部工具栏 */}
      <header className="h-12 border-b border-black/10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-discord-text-muted" />
          <h1 className="font-bold text-discord-text-header">{channelName}</h1>
          <div className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold rounded">
            RFQ
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

      {/* 频道描述 */}
      <div className="px-4 py-2 bg-discord-server/50 border-b border-black/10">
        <p className="text-sm text-discord-text-muted flex items-center gap-2">
          <FileText className="w-4 h-4" />
          {channelDescription}
        </p>
      </div>

      {/* 主体区域 */}
      <div className="flex flex-1 min-h-0">
        {/* 消息区域 */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* 欢迎卡片 */}
            {channelWelcomeConfigs["quick-rfq"] && (
              <WelcomeCard {...channelWelcomeConfigs["quick-rfq"]} />
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
                  placeholder="Describe your sourcing requirements... (product, quantity, budget, timeline)"
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
              <Sparkles className="w-3 h-3 inline mr-1" />
              AI-powered supplier matching system
            </p>
          </div>
        </div>

        {/* 成员列表 */}
        <MemberList showList={showMemberList} />
      </div>
    </div>
  );
}

// ==================== 消息组件 ====================

function MessageRow({ message }: { message: Message }) {
  return (
    <div className="flex gap-4 group hover:bg-discord-hover/30 -mx-4 px-4 py-2 rounded">
      {/* 头像 */}
      <div className="w-10 h-10 rounded-full bg-discord-blurple flex items-center justify-center text-white font-bold shrink-0">
        {message.user.isBot ? (
          <Bot className="w-5 h-5" />
        ) : (
          message.user.name[0].toUpperCase()
        )}
      </div>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        {/* 用户名和时间 */}
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-medium ${message.user.isBot ? "text-discord-blurple" : "text-discord-text-header"}`}>
            {message.user.name}
          </span>
          {message.user.isBot && (
            <span className="px-1.5 py-0.5 bg-discord-blurple text-white text-[10px] rounded font-medium flex items-center gap-0.5">
              <CheckCircle2 className="w-2.5 h-2.5" />
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
        <div className="space-y-2">
          {embed.fields.map((field, i) => (
            <div key={i} className={field.inline ? "inline-block mr-4" : ""}>
              <div className="text-xs text-discord-text-muted font-semibold">{field.name}</div>
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
  // 处理粗体和代码块
  const parts = content.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="px-1 py-0.5 bg-discord-server rounded text-sm">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}
