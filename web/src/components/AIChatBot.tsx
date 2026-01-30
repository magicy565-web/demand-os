"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Sparkles,
  Search,
  Zap,
  Package,
  DollarSign,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { AutoRequestResponse, ChatStatus, ProductMatch } from "@/types/auto-request";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: ChatStatus;
  products?: ProductMatch[];
  ticketId?: string;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "你好！我是 Demand OS AI 采购助手 🚀\n\n我现在支持 **Beta 功能：Auto Request**！\n\n💡 **试试这样提问**：\n• \"帮我找一款 TWS 蓝牙耳机，带降噪，10 刀以内，支持一件代发\"\n• \"想要类似 Apple Watch 的智能手表，15 刀左右，500 件起订\"\n• \"找充电宝，支持无线充电，价格 $8-12\"\n\n我会：\n✅ 智能搜索产品库\n✅ 如果没有匹配，**自动创建人工寻源工单**\n✅ 2 小时内获得专业报价\n\n开始试试吧！",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<ChatStatus>("idle");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsTyping(true);

    try {
      // 显示状态反馈
      setCurrentStatus("analyzing");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCurrentStatus("searching");

      // 调用 Auto Request API
      const response = await fetch("/api/chat/auto-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userInput,
          userId: "demo-user",
          userName: "访客",
        }),
      });

      const data: AutoRequestResponse = await response.json();

      setCurrentStatus("idle");
      setIsTyping(false);

      // 根据响应类型生成不同的消息
      if (data.type === "product_match") {
        // 找到产品匹配
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: generateProductMatchMessage(data.data.matches, data.data.query),
          timestamp: new Date(),
          products: data.data.matches,
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // 如果同时创建了工单（中等匹配情况）
        if ((data as any).meta?.ticket_created) {
          setTimeout(() => {
            const ticketNotice: Message = {
              id: (Date.now() + 2).toString(),
              role: "assistant",
              content: `💼 ${(data as any).meta.message}`,
              timestamp: new Date(),
              ticketId: (data as any).meta.ticket_id,
            };
            setMessages((prev) => [...prev, ticketNotice]);
          }, 1000);
        }

      } else if (data.type === "auto_request_triggered") {
        // 触发人工寻源
        setCurrentStatus("escalating");
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentStatus("idle");

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.data.message,
          timestamp: new Date(),
          ticketId: data.data.ticket_id,
        };

        setMessages((prev) => [...prev, assistantMessage]);

      } else if (data.type === "parsing_error") {
        // 解析错误
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.data.error,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }

    } catch (error) {
      console.error("Auto Request error:", error);
      setIsTyping(false);
      setCurrentStatus("idle");

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "抱歉，系统暂时无法处理您的请求。请稍后重试。",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // 生成产品匹配消息
  const generateProductMatchMessage = (matches: ProductMatch[], query: any): string => {
    if (matches.length === 0) {
      return "未找到匹配的产品，正在为您创建人工寻源工单...";
    }

    const topMatch = matches[0];
    let message = `✅ 太好了！为您找到 **${matches.length}** 款匹配产品：\n\n`;
    
    message += `**🏆 最佳匹配 (${topMatch.match_score}分)**\n`;
    message += `📦 ${topMatch.name}\n`;
    message += `💰 FOB 价格: **$${topMatch.price}**/件\n`;
    message += `📊 起订量: ${topMatch.moq} 件\n`;
    message += `🏭 供应商: ${topMatch.supplier.name} (⭐ ${topMatch.supplier.rating})\n`;
    
    if (topMatch.supports_dropshipping) {
      message += `✅ 支持一件代发\n`;
    }
    
    message += `\n📝 匹配理由:\n`;
    topMatch.match_reasons.slice(0, 3).forEach(reason => {
      message += `• ${reason}\n`;
    });

    if (matches.length > 1) {
      message += `\n还有 ${matches.length - 1} 个备选方案可供选择。`;
    }

    return message;
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-2xl hover:shadow-purple-500/50 transition-shadow"
          >
            <MessageCircle className="w-6 h-6" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">AI 助手</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    在线
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {/* Status Indicator */}
              {currentStatus !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  {currentStatus === "analyzing" && (
                    <>
                      <Search className="w-4 h-4 text-blue-600 animate-pulse" />
                      <span className="text-sm text-blue-700">正在解析您的采购需求...</span>
                    </>
                  )}
                  {currentStatus === "searching" && (
                    <>
                      <Package className="w-4 h-4 text-blue-600 animate-bounce" />
                      <span className="text-sm text-blue-700">正在检索内部供应商库...</span>
                    </>
                  )}
                  {currentStatus === "escalating" && (
                    <>
                      <Zap className="w-4 h-4 text-orange-600 animate-pulse" />
                      <span className="text-sm text-orange-700">库内未匹配，正在创建人工寻源工单...</span>
                    </>
                  )}
                </motion.div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-full flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] ${
                      message.role === "user" ? "items-end" : "items-start"
                    } flex flex-col gap-1`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-slate-900 border border-slate-200"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                    
                    {/* 产品卡片 */}
                    {message.products && message.products.length > 0 && (
                      <div className="mt-2 space-y-2 w-full">
                        {message.products.slice(0, 3).map((product) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-3 bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm text-slate-900">
                                  {product.name}
                                </h4>
                                <div className="mt-1 space-y-1">
                                  <div className="flex items-center gap-2 text-xs">
                                    <DollarSign className="w-3 h-3 text-green-600" />
                                    <span className="font-bold text-green-600">
                                      ${product.price}
                                    </span>
                                    <span className="text-slate-500">MOQ: {product.moq}</span>
                                  </div>
                                  <div className="text-xs text-slate-600">
                                    🏭 {product.supplier.name}
                                  </div>
                                  {product.supports_dropshipping && (
                                    <div className="flex items-center gap-1 text-xs text-blue-600">
                                      <CheckCircle2 className="w-3 h-3" />
                                      支持一件代发
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                  {product.match_score}分
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* 工单通知 */}
                    {message.ticketId && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-2 p-3 bg-gradient-to-br from-orange-50 to-purple-50 border border-orange-200 rounded-xl"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-orange-600" />
                          <span className="font-bold text-sm text-orange-900">
                            Auto Request Beta
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 space-y-1">
                          <div className="flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>工单: <code className="px-1 py-0.5 bg-white rounded text-orange-600 font-mono">#{message.ticketId}</code></span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <span className="text-xs text-slate-500 px-2">
                      {message.timestamp.toLocaleTimeString("zh-CN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-slate-400"
                          animate={{ y: [0, -6, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="输入 '帮我找...' 开启自动寻源"
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI 驱动 + Auto Request Beta
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
