"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Hash, 
  Bell, 
  Pin, 
  Users, 
  Search, 
  Inbox,
  HelpCircle,
  PlusCircle,
  Gift,
  Sticker,
  Smile,
  Send,
  AtSign,
  MoreHorizontal,
  Reply,
  Pencil,
  Trash2,
  Copy,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Factory,
  DollarSign,
  Package
} from "lucide-react";

// 消息数据类型
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
  type: "quote" | "info" | "success" | "error";
  title: string;
  description?: string;
  fields?: { name: string; value: string; inline?: boolean }[];
  footer?: string;
  color?: string;
  thumbnail?: string;
}

// 示例消息数据
const sampleMessages: Message[] = [
  {
    id: "1",
    user: { name: "DropshipKing_99", avatar: "/avatars/user1.png" },
    content: "Hey everyone! Just found this amazing product on TikTok 🔥",
    timestamp: "Today at 10:41 AM",
  },
  {
    id: "2",
    user: { name: "DropshipKing_99", avatar: "/avatars/user1.png" },
    content: "https://www.tiktok.com/@gadgetshop/video/7281234567890123456",
    timestamp: "Today at 10:42 AM",
  },
  {
    id: "3",
    user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
    content: "🔄 正在分析 TikTok 视频...",
    timestamp: "Today at 10:42 AM",
  },
  {
    id: "4",
    user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
    content: "",
    timestamp: "Today at 10:43 AM",
    embed: {
      type: "quote",
      title: "⚡ 极速报价单 | Instant Quote",
      color: "#23A559",
      fields: [
        { name: "📦 识别产品", value: "**Anti-Gravity Water Drop Humidifier**\n反重力水滴加湿器", inline: false },
        { name: "💰 参考 FOB 价", value: "$4.85 / unit", inline: true },
        { name: "📊 起订量", value: "MOQ 1,000 pcs", inline: true },
        { name: "🚚 交期", value: "15-20 天", inline: true },
        { name: "🏭 匹配工厂", value: "3 家认证供应商", inline: true },
        { name: "🎯 AI 置信度", value: "🟢🟢🟢🟢🟢🟢🟢🟢🟢⚪ 92%", inline: false },
      ],
      footer: "询盘 ID: #SR-20240130-001 | Powered by Demand-OS",
    },
    reactions: [
      { emoji: "🔥", count: 5, reacted: true },
      { emoji: "💰", count: 3 },
      { emoji: "👍", count: 8 },
    ]
  },
  {
    id: "5",
    user: { name: "GlobalSourcer", avatar: "/avatars/user2.png" },
    content: "Wow, that's a great price! Can you share the factory details?",
    timestamp: "Today at 10:45 AM",
  },
];

interface ChatAreaProps {
  channelName?: string;
  channelDescription?: string;
}

export default function ChatArea({ 
  channelName = "tiktok-hunter",
  channelDescription = "Paste TikTok links here to get instant factory quotes."
}: ChatAreaProps) {
  const [messages, setMessages] = useState(sampleMessages);
  const [inputValue, setInputValue] = useState("");
  const [showMemberList, setShowMemberList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: { name: "You" },
      content: inputValue,
      timestamp: "Just now",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // 模拟 Bot 响应（如果是 TikTok 链接）
    if (inputValue.includes("tiktok.com")) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          user: { name: "Demand-OS Bot", avatar: "/images/logo.png", isBot: true, botTag: "APP" },
          content: "🔄 正在分析 TikTok 视频... 请稍候",
          timestamp: "Just now",
        }]);
      }, 500);
    }
  };

  return (
    <div className="flex-1 bg-discord-bg flex flex-col h-screen min-w-0">
      {/* 顶部栏 */}
      <header className="h-12 border-b border-black/20 px-4 flex items-center shrink-0">
        <Hash className="w-6 h-6 text-discord-text-muted mr-2" />
        <h3 className="font-bold text-discord-text-header">{channelName}</h3>
        <div className="w-[1px] h-6 bg-discord-text-muted/20 mx-4" />
        <span className="text-sm text-discord-text-muted truncate flex-1">
          {channelDescription}
        </span>
        
        {/* 工具栏 */}
        <div className="flex items-center gap-4 text-discord-text-muted">
          <button className="hover:text-discord-text-normal transition">
            <Bell className="w-5 h-5" />
          </button>
          <button className="hover:text-discord-text-normal transition">
            <Pin className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowMemberList(!showMemberList)}
            className={`hover:text-discord-text-normal transition ${showMemberList ? 'text-discord-text-normal' : ''}`}
          >
            <Users className="w-5 h-5" />
          </button>
          <div className="relative">
            <input 
              type="text"
              placeholder="搜索"
              className="w-36 h-6 bg-discord-server rounded text-sm px-2 text-discord-text-normal placeholder:text-discord-text-muted focus:outline-none focus:w-56 transition-all"
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4" />
          </div>
          <button className="hover:text-discord-text-normal transition">
            <Inbox className="w-5 h-5" />
          </button>
          <button className="hover:text-discord-text-normal transition">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 消息区域 */}
      <div className="flex flex-1 min-h-0">
        {/* 消息流 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-discord-server scrollbar-track-transparent">
          {/* 频道欢迎 */}
          <div className="mb-8 border-b border-discord-hover pb-4">
            <div className="w-16 h-16 rounded-full bg-discord-hover flex items-center justify-center mb-4">
              <Hash className="w-10 h-10 text-discord-text-normal" />
            </div>
            <h2 className="text-3xl font-bold text-discord-text-header mb-2">
              欢迎来到 #{channelName}！
            </h2>
            <p className="text-discord-text-muted">
              这是 #{channelName} 频道的开始。{channelDescription}
            </p>
          </div>

          {/* 消息列表 */}
          {messages.map((message, index) => (
            <MessageRow 
              key={message.id} 
              message={message}
              isCompact={index > 0 && messages[index - 1].user.name === message.user.name}
            />
          ))}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 成员列表 */}
        <AnimatePresence>
          {showMemberList && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-discord-sidebar border-l border-black/20 overflow-hidden"
            >
              <MemberList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 输入框 */}
      <div className="px-4 pb-6 pt-2 shrink-0">
        <div className="bg-discord-input rounded-lg px-4 py-2.5 flex items-center gap-3">
          <button className="text-discord-text-muted hover:text-discord-text-normal transition">
            <PlusCircle className="w-6 h-6" />
          </button>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={`给 #${channelName} 发消息`}
            className="bg-transparent flex-1 text-discord-text-normal outline-none placeholder:text-discord-text-muted/70"
          />
          <div className="flex gap-3 text-discord-text-muted">
            <button className="hover:text-discord-text-normal transition">
              <Gift className="w-6 h-6" />
            </button>
            <button className="hover:text-discord-text-normal transition">
              <Sticker className="w-6 h-6" />
            </button>
            <button className="hover:text-discord-text-normal transition">
              <Smile className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== 消息组件 ====================

interface MessageRowProps {
  message: Message;
  isCompact?: boolean;
}

function MessageRow({ message, isCompact }: MessageRowProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className="relative group flex gap-4 hover:bg-[#2e3035] -mx-4 px-4 py-1 rounded"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* 头像 */}
      {!isCompact ? (
        <div className="w-10 h-10 rounded-full bg-discord-blurple overflow-hidden shrink-0 mt-0.5 cursor-pointer hover:opacity-80">
          {message.user.avatar ? (
            <Image src={message.user.avatar} alt={message.user.name} width={40} height={40} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-bold">
              {message.user.name[0].toUpperCase()}
            </div>
          )}
        </div>
      ) : (
        <div className="w-10 shrink-0" />
      )}

      {/* 消息内容 */}
      <div className="flex-1 min-w-0">
        {/* 用户名和时间 */}
        {!isCompact && (
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-discord-text-header hover:underline cursor-pointer">
              {message.user.name}
            </span>
            {message.user.isBot && (
              <span className="bg-discord-blurple text-white text-[10px] px-1.5 rounded-[3px] py-[1px] flex items-center gap-0.5 font-medium">
                <CheckCircle2 className="w-2.5 h-2.5" />
                {message.user.botTag || "BOT"}
              </span>
            )}
            <span className="text-xs text-discord-text-muted">{message.timestamp}</span>
          </div>
        )}

        {/* 文本内容 */}
        {message.content && (
          <p className="text-discord-text-normal leading-relaxed break-words">
            {formatMessageContent(message.content)}
          </p>
        )}

        {/* Embed 卡片 */}
        {message.embed && (
          <div className="mt-2 max-w-lg">
            <EmbedCard embed={message.embed} />
          </div>
        )}

        {/* 表情反应 */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {message.reactions.map((reaction, i) => (
              <button 
                key={i}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-sm transition
                  ${reaction.reacted 
                    ? 'bg-discord-blurple/20 border border-discord-blurple text-discord-text-normal' 
                    : 'bg-discord-server border border-transparent hover:border-discord-hover text-discord-text-muted'
                  }
                `}
              >
                <span>{reaction.emoji}</span>
                <span className="text-xs">{reaction.count}</span>
              </button>
            ))}
            <button className="w-7 h-7 rounded-full bg-discord-server hover:bg-discord-hover flex items-center justify-center text-discord-text-muted hover:text-discord-text-normal transition">
              <Smile className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 悬停操作按钮 */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute right-4 -top-4 bg-discord-sidebar border border-discord-hover rounded-md shadow-lg flex"
          >
            <ActionButton icon={Smile} tooltip="添加表情" />
            <ActionButton icon={Reply} tooltip="回复" />
            <ActionButton icon={MoreHorizontal} tooltip="更多" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionButton({ icon: Icon, tooltip }: { icon: any; tooltip: string }) {
  return (
    <button className="p-2 text-discord-text-muted hover:text-discord-text-normal hover:bg-discord-hover transition" title={tooltip}>
      <Icon className="w-5 h-5" />
    </button>
  );
}

// ==================== Embed 卡片 ====================

function EmbedCard({ embed }: { embed: EmbedData }) {
  const borderColor = embed.color || "#5865F2";
  
  return (
    <div 
      className="bg-discord-server rounded border-l-4 overflow-hidden"
      style={{ borderLeftColor: borderColor }}
    >
      <div className="p-4">
        {/* 标题 */}
        <h4 className="text-discord-text-header font-bold mb-3">
          {embed.title}
        </h4>

        {/* 描述 */}
        {embed.description && (
          <p className="text-discord-text-normal text-sm mb-3">
            {embed.description}
          </p>
        )}

        {/* 字段 */}
        {embed.fields && (
          <div className="grid grid-cols-3 gap-2">
            {embed.fields.map((field, i) => (
              <div key={i} className={field.inline === false ? "col-span-3" : ""}>
                <div className="text-xs text-discord-text-muted font-semibold mb-1">
                  {field.name}
                </div>
                <div className="text-sm text-discord-text-normal whitespace-pre-wrap">
                  {formatFieldValue(field.value)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 页脚 */}
        {embed.footer && (
          <div className="mt-3 pt-3 border-t border-discord-hover text-xs text-discord-text-muted">
            {embed.footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== 成员列表 ====================

function MemberList() {
  const onlineMembers = [
    { name: "Demand-OS Bot", status: "online", isBot: true },
    { name: "Admin", status: "online", role: "Owner" },
    { name: "DropshipKing_99", status: "online" },
    { name: "GlobalSourcer", status: "idle" },
  ];
  
  const offlineMembers = [
    { name: "NewUser123", status: "offline" },
    { name: "Viewer_001", status: "offline" },
  ];

  return (
    <div className="p-4 overflow-y-auto h-full">
      {/* 在线 */}
      <div className="mb-4">
        <h4 className="text-xs font-bold text-discord-text-muted uppercase mb-2">
          在线 — {onlineMembers.length}
        </h4>
        {onlineMembers.map((member, i) => (
          <MemberItem key={i} {...member} />
        ))}
      </div>

      {/* 离线 */}
      <div>
        <h4 className="text-xs font-bold text-discord-text-muted uppercase mb-2">
          离线 — {offlineMembers.length}
        </h4>
        {offlineMembers.map((member, i) => (
          <MemberItem key={i} {...member} />
        ))}
      </div>
    </div>
  );
}

function MemberItem({ name, status, isBot, role }: { name: string; status: string; isBot?: boolean; role?: string }) {
  const statusColors: Record<string, string> = {
    online: "bg-discord-green",
    idle: "bg-discord-yellow",
    dnd: "bg-discord-red",
    offline: "bg-gray-500",
  };

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-discord-hover cursor-pointer mb-0.5">
      <div className="relative">
        <div className={`w-8 h-8 rounded-full ${isBot ? 'bg-discord-blurple' : 'bg-discord-active'} flex items-center justify-center text-white text-sm font-bold ${status === 'offline' ? 'opacity-50' : ''}`}>
          {name[0].toUpperCase()}
        </div>
        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusColors[status]} rounded-full border-2 border-discord-sidebar`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium truncate flex items-center gap-1 ${status === 'offline' ? 'text-discord-text-muted' : 'text-discord-text-normal'}`}>
          {name}
          {isBot && (
            <span className="bg-discord-blurple text-white text-[9px] px-1 rounded font-medium">BOT</span>
          )}
        </div>
        {role && <div className="text-[10px] text-discord-text-muted">{role}</div>}
      </div>
    </div>
  );
}

// ==================== 工具函数 ====================

function formatMessageContent(content: string): React.ReactNode {
  // 简单的链接高亮
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);
  
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      return (
        <a key={i} href={part} className="text-discord-text-link hover:underline" target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    }
    return part;
  });
}

function formatFieldValue(value: string): React.ReactNode {
  // 处理 Markdown 粗体
  return value.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('\n').map((line, i) => (
    <span key={i} dangerouslySetInnerHTML={{ __html: line }} />
  ));
}
