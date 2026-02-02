"use client";

import AutoRequestChatArea from "@/components/discord/AutoRequestChatArea";

export default function AutoRequestPage() {
  return (
    <AutoRequestChatArea
      channelName="ai-auto-request"
      channelDescription="⚡ Beta: Describe your needs in natural language, AI auto-sources or creates manual tickets"
    />
  );
}
