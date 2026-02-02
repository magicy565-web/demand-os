"use client";

import { useState } from "react";
import ChatArea from "@/components/discord/ChatArea";
import { demoScenarios } from "@/lib/liveDemoData";

export default function TikTokHunterPage() {
  const [isLiveDemoPlaying, setIsLiveDemoPlaying] = useState(true);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  const currentScenario = demoScenarios[currentScenarioIndex];

  return (
    <ChatArea
      channelName="tiktok-hunter"
      channelDescription="🔍 Paste TikTok links here to get instant factory quotes."
      liveDemoMessages={currentScenario?.messages || []}
      isLiveDemoPlaying={isLiveDemoPlaying}
      onDemoComplete={() => setIsLiveDemoPlaying(true)}
    />
  );
}
