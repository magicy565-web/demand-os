'use client';

/**
 * MessageList - 消息列表容器
 */

import { useChatStore } from '@/lib/chat/chat-store';
import { UserMessage } from './UserMessage';
import { AgentMessage } from './AgentMessage';

interface MessageListProps {
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessageList({ messagesEndRef }: MessageListProps) {
  const messages = useChatStore((state) => state.getCurrentMessages());

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === 'user' ? (
            <UserMessage message={message} />
          ) : (
            <AgentMessage message={message} />
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
