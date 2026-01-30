"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Hash, 
  Volume2, 
  ChevronDown, 
  Plus, 
  Settings, 
  Mic, 
  Headphones,
  Sparkles,
  Video,
  Bell,
  Pin,
  Users,
  Search,
  Inbox
} from "lucide-react";
import Image from "next/image";

interface Channel {
  id: string;
  name: string;
  type: "text" | "voice" | "announcement";
  unread?: boolean;
  mentions?: number;
}

interface ChannelGroup {
  id: string;
  name: string;
  channels: Channel[];
  collapsed?: boolean;
}

const channelGroups: ChannelGroup[] = [
  {
    id: "ai-tools",
    name: "AI TOOLS",
    channels: [
      { id: "tiktok-hunter", name: "tiktok-hunter", type: "text", unread: true, mentions: 2 },
      { id: "quick-rfq", name: "quick-rfq", type: "text" },
      { id: "market-trends", name: "market-trends", type: "text" },
      { id: "ai-voice", name: "AI Voice Chat", type: "voice" },
    ]
  },
  {
    id: "community",
    name: "COMMUNITY",
    channels: [
      { id: "general", name: "general-chat", type: "text", unread: true },
      { id: "introductions", name: "introductions", type: "text" },
      { id: "success-stories", name: "success-stories", type: "text" },
      { id: "voice-lounge", name: "voice-lounge", type: "voice" },
    ]
  },
  {
    id: "resources",
    name: "RESOURCES",
    channels: [
      { id: "announcements", name: "announcements", type: "announcement" },
      { id: "tutorials", name: "tutorials", type: "text" },
      { id: "faq", name: "faq", type: "text" },
    ]
  }
];

interface ChannelSidebarProps {
  serverName?: string;
  activeChannelId?: string;
  onChannelChange?: (channelId: string) => void;
}

export default function ChannelSidebar({ 
  serverName = "Demand OS Official",
  activeChannelId = "tiktok-hunter",
  onChannelChange 
}: ChannelSidebarProps) {
  const [groups, setGroups] = useState(channelGroups);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const toggleGroup = (groupId: string) => {
    setGroups(groups.map(g => 
      g.id === groupId ? { ...g, collapsed: !g.collapsed } : g
    ));
  };

  return (
    <div className="w-60 bg-discord-sidebar flex flex-col h-screen">
      {/* 顶部服务器名称 */}
      <header className="h-12 border-b border-black/20 px-4 flex items-center justify-between hover:bg-white/5 transition cursor-pointer shadow-sm group">
        <h1 className="font-bold text-discord-text-header truncate">{serverName}</h1>
        <ChevronDown className="w-4 h-4 text-discord-text-muted group-hover:text-discord-text-normal transition" />
      </header>

      {/* 频道列表 */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 scrollbar-thin scrollbar-thumb-discord-bg scrollbar-track-transparent">
        
        {/* 快捷功能 */}
        <div className="space-y-[2px]">
          <QuickAction icon={Sparkles} label="Nitro 订阅" />
          <QuickAction icon={Bell} label="通知设置" />
          <QuickAction icon={Pin} label="已固定消息" />
        </div>

        {/* 频道分组 */}
        {groups.map((group) => (
          <ChannelGroupComponent
            key={group.id}
            group={group}
            activeChannelId={activeChannelId}
            onToggle={() => toggleGroup(group.id)}
            onChannelClick={onChannelChange}
          />
        ))}
        
      </div>
      
      {/* 底部用户信息栏 */}
      <UserBar 
        isMuted={isMuted}
        isDeafened={isDeafened}
        onMuteToggle={() => setIsMuted(!isMuted)}
        onDeafenToggle={() => setIsDeafened(!isDeafened)}
      />
    </div>
  );
}

// ==================== 子组件 ====================

function QuickAction({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="px-2 py-[6px] rounded flex items-center gap-2 cursor-pointer text-discord-text-muted hover:bg-discord-hover hover:text-discord-text-normal transition">
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

interface ChannelGroupComponentProps {
  group: ChannelGroup;
  activeChannelId?: string;
  onToggle: () => void;
  onChannelClick?: (channelId: string) => void;
}

function ChannelGroupComponent({ group, activeChannelId, onToggle, onChannelClick }: ChannelGroupComponentProps) {
  return (
    <div>
      {/* 分组标题 */}
      <button 
        onClick={onToggle}
        className="w-full px-0.5 flex items-center gap-1 text-[11px] font-bold text-discord-text-muted hover:text-discord-text-normal transition uppercase tracking-wide"
      >
        <ChevronDown className={`w-3 h-3 transition-transform ${group.collapsed ? '-rotate-90' : ''}`} />
        {group.name}
      </button>

      {/* 频道列表 */}
      <AnimatePresence>
        {!group.collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 space-y-[2px] overflow-hidden"
          >
            {group.channels.map((channel) => (
              <ChannelItem 
                key={channel.id}
                channel={channel}
                active={activeChannelId === channel.id}
                onClick={() => onChannelClick?.(channel.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ChannelItemProps {
  channel: Channel;
  active?: boolean;
  onClick?: () => void;
}

function ChannelItem({ channel, active, onClick }: ChannelItemProps) {
  const Icon = channel.type === "text" ? Hash : channel.type === "voice" ? Volume2 : Bell;
  
  return (
    <div 
      onClick={onClick}
      className={`group px-2 py-[6px] rounded flex items-center gap-1.5 cursor-pointer
        ${active 
          ? 'bg-discord-active text-discord-text-header' 
          : channel.unread 
            ? 'text-discord-text-header hover:bg-discord-hover' 
            : 'text-discord-text-muted hover:bg-discord-hover hover:text-discord-text-normal'
        }
      `}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-discord-text-normal' : 'text-discord-text-muted'}`} />
      <span className={`font-medium truncate flex-1 ${channel.unread && !active ? 'font-semibold' : ''}`}>
        {channel.name}
      </span>
      
      {/* 提及数量 */}
      {channel.mentions && channel.mentions > 0 && (
        <span className="px-1.5 py-0.5 bg-discord-red text-white text-xs font-bold rounded-full min-w-[18px] text-center">
          {channel.mentions}
        </span>
      )}

      {/* 悬停操作按钮 */}
      <div className="hidden group-hover:flex items-center gap-1">
        <button className="p-0.5 hover:text-discord-text-header">
          <Users className="w-4 h-4" />
        </button>
        <button className="p-0.5 hover:text-discord-text-header">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface UserBarProps {
  isMuted: boolean;
  isDeafened: boolean;
  onMuteToggle: () => void;
  onDeafenToggle: () => void;
}

function UserBar({ isMuted, isDeafened, onMuteToggle, onDeafenToggle }: UserBarProps) {
  return (
    <div className="h-[52px] bg-[#232428] px-2 flex items-center gap-2">
      {/* 用户头像和信息 */}
      <div className="flex items-center gap-2 flex-1 min-w-0 px-1 py-1 rounded hover:bg-discord-hover cursor-pointer">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-discord-blurple flex items-center justify-center text-white font-bold text-sm">
            U
          </div>
          {/* 在线状态 */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-discord-green rounded-full border-[3px] border-[#232428]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-discord-text-header truncate">User</div>
          <div className="text-[11px] text-discord-text-muted truncate">在线</div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center">
        <button 
          onClick={onMuteToggle}
          className={`p-2 rounded hover:bg-discord-hover ${isMuted ? 'text-discord-red' : 'text-discord-text-muted hover:text-discord-text-normal'}`}
        >
          <Mic className="w-5 h-5" />
          {isMuted && <div className="absolute w-5 h-0.5 bg-discord-red rotate-45 -translate-x-0.5" />}
        </button>
        <button 
          onClick={onDeafenToggle}
          className={`p-2 rounded hover:bg-discord-hover ${isDeafened ? 'text-discord-red' : 'text-discord-text-muted hover:text-discord-text-normal'}`}
        >
          <Headphones className="w-5 h-5" />
        </button>
        <button className="p-2 rounded hover:bg-discord-hover text-discord-text-muted hover:text-discord-text-normal">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
