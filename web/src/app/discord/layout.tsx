"use client";

import { useState } from "react";
import ServerSidebar from "@/components/discord/ServerSidebar";
import ChannelSidebar from "@/components/discord/ChannelSidebar";
import ChatArea from "@/components/discord/ChatArea";

export default function DiscordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeServerId, setActiveServerId] = useState("demand-os");
  const [activeChannelId, setActiveChannelId] = useState("tiktok-hunter");

  // 频道描述映射
  const channelDescriptions: Record<string, string> = {
    "tiktok-hunter": "Paste TikTok links here to get instant factory quotes.",
    "quick-rfq": "Submit RFQ requests for quick supplier matching.",
    "market-trends": "Discuss market trends and product opportunities.",
    "general": "General discussion for the community.",
    "announcements": "Important announcements and updates.",
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-discord-bg font-sans selection:bg-discord-blurple selection:text-white">
      {/* 服务器侧边栏 */}
      <ServerSidebar 
        activeServerId={activeServerId}
        onServerChange={setActiveServerId}
      />
      
      {/* 频道侧边栏 */}
      <ChannelSidebar 
        serverName="Demand OS Official"
        activeChannelId={activeChannelId}
        onChannelChange={setActiveChannelId}
      />
      
      {/* 聊天区域 */}
      <ChatArea 
        channelName={activeChannelId}
        channelDescription={channelDescriptions[activeChannelId] || ""}
      />
    </div>
  );
}
