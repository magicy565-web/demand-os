'use client';

/**
 * UserMessage - 用户消息气泡
 */

import { Message } from '@/types/chat';
import { User } from 'lucide-react';

interface UserMessageProps {
  message: Message;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex items-start gap-3 justify-end">
      <div className="max-w-2xl bg-blue-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-sm">
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <p className="text-xs text-blue-100 mt-2">
          {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
        <User className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}
