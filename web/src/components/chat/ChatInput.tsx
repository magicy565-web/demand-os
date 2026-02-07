'use client';

/**
 * ChatInput - 聊天输入框
 */

import { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white px-6 py-4">
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="粘贴 TikTok 链接或输入消息..."
          disabled={disabled}
          className="min-h-[60px] max-h-[200px] resize-none"
          rows={2}
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          size="lg"
          className="px-6 h-[60px]"
        >
          {disabled ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              发送
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-slate-400 text-center mt-2">
        按 Enter 发送，Shift + Enter 换行
      </p>
    </div>
  );
}
