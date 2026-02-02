/**
 * Auto Request Chat Area - Discord 频道专用
 * 在 Discord 界面中提供 AI 自动寻源功能
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
} from "lucide-react";
import { AutoRequestResponse, ChatStatus, ProductMatch } from "@/types/auto-request";

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
  products?: ProductMatch[];
  ticketId?: string;
}

interface AutoRequestChatAreaProps {
  channelName: string;
  channelDescription: string;
}

export default function AutoRequestChatArea({
  channelName,
  channelDescription,
}: AutoRequestChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
      content: `# AI Auto-Request Channel ⚡ [BETA]

## 🤖 Next-Gen Conversational Sourcing

**AI Auto-Request** uses advanced natural language processing to understand your sourcing needs and automatically take action - no forms, no templates, just conversation.

---

## 🎯 How It Works

### **Step 1: Describe in Natural Language**
Talk to the AI like you would to a sourcing agent:
• No rigid formats or templates
• Use everyday language
• Be as detailed or brief as you like

### **Step 2: AI Understanding**
Our AI analyzes your message and extracts:
• 📦 **Product type** & specifications
• 🔢 **Quantity** requirements
• 💰 **Budget** constraints
• ⏰ **Timeline** expectations
• 🌍 **Destination** & shipping preferences
• ✅ **Quality standards** & certifications

### **Step 3: Smart Decision**
AI automatically decides:

**🚀 Auto-Source (Instant)**
• Clear, straightforward requests
• Standard products with known specs
• AI matches suppliers immediately
• You get results in <2 minutes

**📝 Manual Ticket (Expert Review)**
• Complex or custom requirements
• High-value orders requiring negotiation
• Special certifications or compliance
• Sourcing team provides personalized service

---

## 💡 Example Conversations

### **Simple Request (Auto-Sourced)**
\`\`\`
👤 "Need 10,000 eco-friendly tote bags for a marketing campaign, budget around $2-3 each, delivery to NYC in 6 weeks"

🤖 "Got it! Searching for eco-friendly tote bags..."
   ✅ Found 8 verified suppliers
   💰 Price range: $1.80 - $3.20/unit
   🚚 Lead time: 25-35 days
   [View Matches]
\`\`\`

### **Complex Request (Manual Ticket)**
\`\`\`
👤 "Looking for a factory to manufacture custom IoT sensors with BLE 5.0, need FDA compliance for medical use, around 50K units over next year"

🤖 "This requires expert attention due to:"
   • Medical device compliance (FDA)
   • Custom IoT development
   • Long-term supply agreement
   
   📋 Created Ticket #TR-7834
   🧑‍💼 Assigned to: Senior Sourcing Manager
   ⏱️ Response time: Within 4 hours
\`\`\`

---

## 🌟 Key Advantages

✅ **No Learning Curve:** Just type naturally
✅ **Smart Routing:** AI knows when to auto-process vs. escalate
✅ **24/7 Available:** AI never sleeps
✅ **Context Aware:** Remembers your previous requests
✅ **Multi-Language:** English, Chinese, Spanish, and more

---

## 📊 Beta Performance Stats

• ⚡ **Auto-Source Rate:** 67% of requests
• 🎯 **Match Accuracy:** 91%
• ⏱️ **Average Response:** 1.8 minutes (auto), 3.2 hours (manual)
• ⭐ **User Satisfaction:** 4.6/5

---

## 🔧 Beta Limitations

⚠️ **Currently Learning:**
• Extremely niche or rare products may require manual review
• Complex multi-component BOMs need human verification
• Certain regulated industries (medical, aerospace) auto-route to experts

---

## 💬 What to Include in Your Message

**Recommended Info:**
• ✅ Product description (the more specific, the better)
• ✅ Quantity (even approximate)
• ✅ Budget range (helps filter suppliers)
• ✅ Timeline (urgent? flexible?)
• ✅ Destination (for shipping calculations)

**Nice to Have:**
• 🎨 Color/design preferences
• 📜 Certifications needed
• 🏷️ Branding/customization requirements
• 📦 Packaging preferences

---

**Ready to try?** Just type your sourcing need below! 🚀

_Note: This is a beta feature. We're constantly improving based on your feedback!_`,
      timestamp: getCurrentTimestamp(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<ChatStatus>("idle");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isProcessing) return;

    // 添加用户消息
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

    try {
      // 显示状态反馈
      setCurrentStatus("analyzing");
      await new Promise((resolve) => setTimeout(resolve, 800));

      setCurrentStatus("searching");

      // 调用 Auto Request API
      const response = await fetch("/api/chat/auto-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userInput,
          userId: "discord-user",
          userName: "Discord User",
        }),
      });

      const data: AutoRequestResponse = await response.json();

      setCurrentStatus("idle");
      setIsProcessing(false);

      // 根据响应类型生成不同的消息
      if (data.type === "product_match") {
        // 找到产品匹配
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
          content: generateProductMatchMessage(data.data.matches, data.data.query),
          timestamp: getCurrentTimestamp(),
          products: data.data.matches,
        };

        setMessages((prev) => [...prev, botMessage]);

        // Check if ticket was also created
        if ((data as any).meta?.ticket_created) {
          setTimeout(() => {
            const ticketNotice: Message = {
              id: `ticket-${Date.now()}`,
              user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
              content: `💼 ${(data as any).meta.message}`,
              timestamp: getCurrentTimestamp(),
              ticketId: (data as any).meta.ticket_id,
            };
            setMessages((prev) => [...prev, ticketNotice]);
          }, 1000);
        }
      } else if (data.type === "auto_request_triggered") {
        // 触发人工寻源
        setCurrentStatus("escalating");
        await new Promise((resolve) => setTimeout(resolve, 500));
        setCurrentStatus("idle");

        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
          content: data.data.message,
          timestamp: getCurrentTimestamp(),
          ticketId: data.data.ticket_id,
        };

        setMessages((prev) => [...prev, botMessage]);
      } else if (data.type === "parsing_error") {
        // 解析错误
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
          content: data.data.error,
          timestamp: getCurrentTimestamp(),
        };

        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Auto Request error:", error);
      setIsProcessing(false);
      setCurrentStatus("idle");

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        user: { name: "Demand-OS Bot", isBot: true, botTag: "APP" },
        content: "抱歉，系统暂时无法处理您的请求。请稍后重试。",
        timestamp: getCurrentTimestamp(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const generateProductMatchMessage = (matches: ProductMatch[], query: any): string => {
    if (matches.length === 0) {
      return "No matching products found, creating manual sourcing ticket for you...";
    }

    const topMatch = matches[0];
    let message = `✅ Great! Found **${matches.length}** matching product(s):\n\n`;

    message += `**🏆 Best Match (${topMatch.match_score} pts)**\n`;
    message += `📦 ${topMatch.name}\n`;
    message += `💰 FOB Price: **$${topMatch.price}**/unit\n`;
    message += `📊 MOQ: ${topMatch.moq} pcs\n`;
    message += `🏭 Supplier: ${topMatch.supplier.name} (⭐ ${topMatch.supplier.rating})\n`;

    if (topMatch.supports_dropshipping) {
      message += `✅ Dropshipping supported\n`;
    }

    message += `\n📝 Match Reasons:\n`;
    topMatch.match_reasons.slice(0, 3).forEach((reason) => {
      message += `• ${reason}\n`;
    });

    if (matches.length > 1) {
      message += `\n${matches.length - 1} more alternative(s) available.`;
    }

    return message;
  };

  return (
    <div className="flex-1 flex flex-col bg-discord-bg h-screen">
      {/* 顶部工具栏 */}
      <header className="h-12 border-b border-black/10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-discord-text-muted" />
          <h1 className="font-bold text-discord-text-header">{channelName}</h1>
          <div className="ml-2 px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs font-bold rounded">
            BETA
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-discord-text-muted hover:text-discord-text-normal cursor-pointer transition" />
          <Pin className="w-5 h-5 text-discord-text-muted hover:text-discord-text-normal cursor-pointer transition" />
          <Users className="w-5 h-5 text-discord-text-muted hover:text-discord-text-normal cursor-pointer transition" />
          <Search className="w-5 h-5 text-discord-text-muted hover:text-discord-text-normal cursor-pointer transition" />
        </div>
      </header>

      {/* 频道描述横幅 */}
      <div className="px-4 py-3 bg-blue-500/10 border-b border-blue-500/20">
        <p className="text-sm text-blue-300">
          <Sparkles className="w-4 h-4 inline mr-1" />
          {channelDescription}
        </p>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* 状态指示器 */}
        {currentStatus !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-3 bg-blue-500/10 border border-blue-500/30 rounded-lg"
          >
            {currentStatus === "analyzing" && (
              <>
                <Search className="w-4 h-4 text-blue-400 animate-pulse" />
                <span className="text-sm text-blue-300">🔍 Analyzing your sourcing requirements...</span>
              </>
            )}
            {currentStatus === "searching" && (
              <>
                <Package className="w-4 h-4 text-blue-400 animate-bounce" />
                <span className="text-sm text-blue-300">📦 Searching internal supplier database...</span>
              </>
            )}
            {currentStatus === "escalating" && (
              <>
                <Zap className="w-4 h-4 text-orange-400 animate-pulse" />
                <span className="text-sm text-orange-300">⚡ No match found, creating manual sourcing ticket...</span>
              </>
            )}
          </motion.div>
        )}

        {messages.map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* 输入框 */}
      <div className="px-4 pb-6">
        <div className="bg-discord-input rounded-lg">
          <div className="flex items-center gap-3 px-4 py-3">
            <PlusCircle className="w-6 h-6 text-discord-text-muted hover:text-discord-text-normal cursor-pointer transition" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type 'help me find...' to start auto-sourcing"
              className="flex-1 bg-transparent text-discord-text-normal placeholder:text-discord-text-muted outline-none"
              disabled={isProcessing}
            />
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-discord-text-muted hover:text-discord-text-normal cursor-pointer transition" />
              <Sticker className="w-5 h-5 text-discord-text-muted hover:text-discord-text-normal cursor-pointer transition" />
              <Smile className="w-5 h-5 text-discord-text-muted hover:text-discord-text-normal cursor-pointer transition" />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isProcessing}
                className="p-2 rounded-lg bg-discord-blurple hover:bg-discord-blurple/80 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
          AI-powered auto-sourcing system - Beta version
        </p>
      </div>
    </div>
  );
}

// ==================== 消息组件 ====================

function MessageRow({ message }: { message: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 hover:bg-white/[0.03] px-4 py-2 -mx-4 rounded group"
    >
      {/* 头像 */}
      <div className="flex-shrink-0">
        {message.user.isBot ? (
          <div className="w-10 h-10 rounded-full bg-discord-blurple flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* 消息内容 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-discord-text-header">
            {message.user.name}
          </span>
          {message.user.botTag && (
            <span className="px-1.5 py-0.5 bg-discord-blurple text-white text-[10px] font-bold rounded">
              {message.user.botTag}
            </span>
          )}
          <span className="text-xs text-discord-text-muted">{message.timestamp}</span>
        </div>

        {/* 文本内容 */}
        <div className="text-discord-text-normal text-[15px] leading-relaxed whitespace-pre-line">
          {message.content}
        </div>

        {/* 产品卡片 */}
        {message.products && message.products.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* 工单通知 */}
        {message.ticketId && (
          <TicketNotice ticketId={message.ticketId} />
        )}
      </div>
    </motion.div>
  );
}

// Product card component
function ProductCard({ product }: { product: ProductMatch }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-discord-text-header mb-2">
            {product.name}
          </h4>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <DollarSign className="w-3 h-3 text-green-400" />
              <span className="font-bold text-green-400">${product.price}</span>
              <span className="text-discord-text-muted">MOQ: {product.moq}</span>
            </div>
            <div className="text-xs text-discord-text-muted">
              🏭 {product.supplier.name} (⭐ {product.supplier.rating})
            </div>
            {product.supports_dropshipping && (
              <div className="flex items-center gap-1 text-xs text-blue-400">
                <CheckCircle2 className="w-3 h-3" />
                Dropshipping supported
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
            {product.match_score}分
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Ticket notice component
function TicketNotice({ ticketId }: { ticketId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-3 p-4 bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-orange-500/30 rounded-xl"
    >
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-4 h-4 text-orange-400" />
        <span className="font-bold text-sm text-orange-400">Auto Request Beta</span>
      </div>
      <div className="text-xs text-discord-text-muted space-y-1">
        <div className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          <span>
            Ticket:{" "}
            <code className="px-1.5 py-0.5 bg-discord-input rounded text-orange-400 font-mono">
              #{ticketId}
            </code>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Helper function
function getCurrentTimestamp(): string {
  const now = new Date();
  return now.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
