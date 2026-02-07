'use client';

/**
 * ChatHeader - 聊天界面顶部标题栏
 */

import { Button } from '@/components/ui/button';
import { History, Sparkles } from 'lucide-react';

interface ChatHeaderProps {
  onToggleHistory: () => void;
}

export function ChatHeader({ onToggleHistory }: ChatHeaderProps) {
  return (
    <div className="border-b bg-white/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-slate-900">智能采购助手</h1>
          <p className="text-xs text-slate-500">AI-Powered Sourcing Agent</p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleHistory}
        className="gap-2"
      >
        <History className="w-4 h-4" />
        历史记录
      </Button>
    </div>
  );
}
