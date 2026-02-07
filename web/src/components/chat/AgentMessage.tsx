'use client';

/**
 * AgentMessage - AI Agent 消息气泡
 * 根据消息类型渲染不同的内容卡片
 */

import { Message } from '@/types/chat';
import { Bot } from 'lucide-react';
import { ProcessingIndicator } from './ProcessingIndicator';
import { ProductCard } from './ProductCard';
import { QuickActionButtons } from './QuickActionButtons';
import ReactMarkdown from 'react-markdown';

interface AgentMessageProps {
  message: Message;
}

export function AgentMessage({ message }: AgentMessageProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>

      <div className="flex-1 max-w-3xl space-y-3">
        {/* 文本内容 */}
        {message.content && (
          <div className="bg-white rounded-2xl rounded-tl-sm px-5 py-3 shadow-sm border border-slate-200">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="text-sm leading-relaxed text-slate-700 mb-2 last:mb-0">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">{children}</ul>,
                  li: ({ children }) => <li className="text-sm">{children}</li>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        )}

        {/* 处理中状态 */}
        {message.type === 'processing' && message.data?.steps && (
          <ProcessingIndicator steps={message.data.steps} />
        )}

        {/* 产品分析结果卡片 */}
        {message.type === 'product' && message.data && (
          <ProductCard data={message.data} />
        )}

        {/* 快捷操作按钮 */}
        {message.data?.quickActions && message.data.quickActions.length > 0 && (
          <QuickActionButtons actions={message.data.quickActions} />
        )}
      </div>
    </div>
  );
}
