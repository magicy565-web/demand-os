"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import ChatArea from "./ChatArea";
import AutoRequestChatArea from "./AutoRequestChatArea";
import QuickRFQChatArea from "./QuickRFQChatArea";
import MarketTrendsChatArea from "./MarketTrendsChatArea";
import FactoryDiscoverChatArea from "./FactoryDiscoverChatArea";
import { DemoMessage } from "@/lib/liveDemoData";

interface ChatAreaWrapperProps {
  activeChannelId: string;
  isLiveDemoPlaying: boolean;
  liveDemoMessages: DemoMessage[];
  onDemoComplete: () => void;
}

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

export default function ChatAreaWrapper({
  activeChannelId,
  isLiveDemoPlaying,
  liveDemoMessages,
  onDemoComplete,
}: ChatAreaWrapperProps): ReactNode {
  const description = channelDescriptions[activeChannelId] || "Welcome to this channel!";

  const component = (() => {
    switch (activeChannelId) {
      case "ai-auto-request":
        return (
          <AutoRequestChatArea
            key="ai-auto-request-component"
            channelName="ai-auto-request"
            channelDescription={description}
          />
        );

      case "quick-rfq":
        return (
          <QuickRFQChatArea
            key="quick-rfq-component"
            channelName="quick-rfq"
            channelDescription={description}
          />
        );

      case "market-trends":
        return (
          <MarketTrendsChatArea
            key="market-trends-component"
            channelName="market-trends"
            channelDescription={description}
          />
        );

      case "factory-discover":
        return (
          <FactoryDiscoverChatArea
            key="factory-discover-component"
            channelName="factory-discover"
            channelDescription={description}
          />
        );

      default:
        return (
          <ChatArea
            key="tiktok-hunter-component"
            channelName={activeChannelId}
            channelDescription={description}
            liveDemoMessages={liveDemoMessages}
            isLiveDemoPlaying={isLiveDemoPlaying}
            onDemoComplete={onDemoComplete}
          />
        );
    }
  })();

  return (
    <motion.div
      key={`wrapper-${activeChannelId}`}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
    >
      {component}
    </motion.div>
  );
}
