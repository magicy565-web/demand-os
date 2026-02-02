"use client";

import { useState } from "react";
import ServerSidebar from "@/components/discord/ServerSidebar";
import ChannelSidebar from "@/components/discord/ChannelSidebar";
import LiveDemoController from "@/components/discord/LiveDemoController";
import { demoScenarios } from "@/lib/liveDemoData";

export default function DiscordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeServerId, setActiveServerId] = useState("demand-os");
  const [isLiveDemoPlaying, setIsLiveDemoPlaying] = useState(true);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  const currentScenario = demoScenarios[currentScenarioIndex];

  // 获取当前频道（这里默认为tiktok-hunter，子页面会自动更新）
  const [activeChannelId, setActiveChannelId] = useState("tiktok-hunter");

  return (
    <>
      <div className="flex h-screen w-full overflow-hidden bg-discord-bg font-sans selection:bg-discord-blurple selection:text-white">
        <ServerSidebar 
          activeServerId={activeServerId}
          onServerChange={setActiveServerId}
        />
        
        <ChannelSidebar 
          serverName="Demand OS Official"
          activeChannelId={activeChannelId}
        />
        
        {children}
      </div>

      {/* 实时演示控制器已隐藏（如需恢复，解除下方注释并调整条件） */}
    </>
  );
}
