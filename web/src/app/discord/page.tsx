"use client";

import { useState, useEffect } from "react";
import ServerSidebar from "@/components/discord/ServerSidebar";
import ChannelSidebar from "@/components/discord/ChannelSidebar";
import ChatArea from "@/components/discord/ChatArea";
import AutoRequestChatArea from "@/components/discord/AutoRequestChatArea";
import QuickRFQChatArea from "@/components/discord/QuickRFQChatArea";
import MarketTrendsChatArea from "@/components/discord/MarketTrendsChatArea";
import FactoryDiscoverChatArea from "@/components/discord/FactoryDiscoverChatArea";
import LiveDemoController from "@/components/discord/LiveDemoController";
import { demoScenarios } from "@/lib/liveDemoData";

/**
 * Discord Clone - Demand-OS 社区频道
 * 
 * 这是一个独立的路由，与主站完全隔离
 * 用于展示 AI 采购助手的交互界面
 */
export default function DiscordDemoPage() {
  const [activeServerId, setActiveServerId] = useState("demand-os");
  const [activeChannelId, setActiveChannelId] = useState("tiktok-hunter");
  const [isLiveDemoPlaying, setIsLiveDemoPlaying] = useState(true); // 默认开始演示
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  // Debug: Log channel changes
  useEffect(() => {
    console.log("Active Channel Changed:", activeChannelId);
  }, [activeChannelId]);

  // 当前演示场景
  const currentScenario = demoScenarios[currentScenarioIndex];

  // 频道描述映射
  const channelDescriptions: Record<string, string> = {
    "tiktok-hunter": "🔍 Paste TikTok links here to get instant factory quotes.",
    "quick-rfq": "📝 Submit RFQ requests for quick supplier matching.",
    "ai-auto-request": "⚡ Beta: Describe your needs in natural language, AI auto-sources or creates manual tickets",
    "market-trends": "📈 Real-time market insights and product trend analysis.",
    "factory-discover": "🏭 Discover and explore verified factories worldwide.",
    "general-chat": "💬 General discussion for the community.",
    "introductions": "👋 Introduce yourself to the community!",
    "success-stories": "🏆 Share your sourcing success stories.",
    "announcements": "📢 Important announcements and updates.",
    "tutorials": "📚 Guides and tutorials for using Demand-OS.",
    "faq": "❓ Frequently asked questions.",
  };

  const handleDemoStart = () => {
    setIsLiveDemoPlaying(true);
  };

  const handleDemoPause = () => {
    setIsLiveDemoPlaying(false);
  };

  const handleDemoReset = () => {
    // 切换到下一个场景
    setCurrentScenarioIndex((prev) => (prev + 1) % demoScenarios.length);
    // 立即重新开始演示
    setTimeout(() => {
      setIsLiveDemoPlaying(true);
    }, 100);
  };

  const handleDemoComplete = () => {
    // 演示完成后自动重放
    setIsLiveDemoPlaying(true);
  };

  return (
    <>
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
        
        {/* 聊天区域 (主内容) - 根据频道类型渲染不同组件 */}
        {activeChannelId === "ai-auto-request" ? (
          <AutoRequestChatArea
            key="ai-auto-request"
            channelName={activeChannelId}
            channelDescription={channelDescriptions[activeChannelId] || "Welcome to this channel!"}
          />
        ) : activeChannelId === "quick-rfq" ? (
          <QuickRFQChatArea
            key="quick-rfq"
            channelName={activeChannelId}
            channelDescription={channelDescriptions[activeChannelId] || "Welcome to this channel!"}
          />
        ) : activeChannelId === "market-trends" ? (
          <MarketTrendsChatArea
            key="market-trends"
            channelName={activeChannelId}
            channelDescription={channelDescriptions[activeChannelId] || "Welcome to this channel!"}
          />
        ) : activeChannelId === "factory-discover" ? (
          <FactoryDiscoverChatArea
            key="factory-discover"
            channelName={activeChannelId}
            channelDescription={channelDescriptions[activeChannelId] || "Welcome to this channel!"}
          />
        ) : (
          <ChatArea 
            key={currentScenarioIndex}
            channelName={activeChannelId}
            channelDescription={channelDescriptions[activeChannelId] || "Welcome to this channel!"}
            liveDemoMessages={currentScenario?.messages || []}
            isLiveDemoPlaying={isLiveDemoPlaying}
            onDemoComplete={handleDemoComplete}
          />
        )}
      </div>

      {/* 实时演示控制器 (只在通用频道显示) */}
      {!["ai-auto-request", "quick-rfq", "market-trends", "factory-discover"].includes(activeChannelId) && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
          <LiveDemoController
            onStart={handleDemoStart}
            onPause={handleDemoPause}
            onReset={handleDemoReset}
            isPlaying={isLiveDemoPlaying}
            currentStep={0}
            totalSteps={currentScenario?.messages?.length || 0}
          />
        </div>
      )}
    </>
  );
}
