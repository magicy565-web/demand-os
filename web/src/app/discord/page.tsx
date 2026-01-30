"use client";

import { useState } from "react";
import ServerSidebar from "@/components/discord/ServerSidebar";
import ChannelSidebar from "@/components/discord/ChannelSidebar";
import ChatArea from "@/components/discord/ChatArea";

/**
 * Discord Clone - Demand-OS 社区频道
 * 
 * 这是一个独立的路由，与主站完全隔离
 * 用于展示 AI 采购助手的交互界面
 */
export default function DiscordDemoPage() {
  const [activeServerId, setActiveServerId] = useState("demand-os");
  const [activeChannelId, setActiveChannelId] = useState("tiktok-hunter");

  // 频道描述映射
  const channelDescriptions: Record<string, string> = {
    "tiktok-hunter": "🔍 Paste TikTok links here to get instant factory quotes.",
    "quick-rfq": "📝 Submit RFQ requests for quick supplier matching.",
    "market-trends": "📈 Discuss market trends and product opportunities.",
    "general-chat": "💬 General discussion for the community.",
    "introductions": "👋 Introduce yourself to the community!",
    "success-stories": "🏆 Share your sourcing success stories.",
    "announcements": "📢 Important announcements and updates.",
    "tutorials": "📚 Guides and tutorials for using Demand-OS.",
    "faq": "❓ Frequently asked questions.",
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-discord-bg font-sans selection:bg-discord-blurple selection:text-white">
      {/* 服务器侧边栏 (最左侧) */}
      <ServerSidebar 
        activeServerId={activeServerId}
        onServerChange={setActiveServerId}
      />
      
      {/* 频道侧边栏 (中间) */}
      <ChannelSidebar 
        serverName="Demand OS Official"
        activeChannelId={activeChannelId}
        onChannelChange={setActiveChannelId}
      />
      
      {/* 聊天区域 (主内容) */}
      <ChatArea 
        channelName={activeChannelId}
        channelDescription={channelDescriptions[activeChannelId] || "Welcome to this channel!"}
      />
    </div>
  );
}
