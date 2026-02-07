'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Plus } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 自动调整 textarea 高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // 模拟 AI 响应
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '你好！我是智能采购助手。请粘贴 TikTok 视频链接，我会帮你分析产品并提供报价方案。',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* 顶部导航栏 */}
      <header className="flex-shrink-0 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">智能采购助手</h1>
              <p className="text-xs text-slate-500">AI-Powered Sourcing Agent</p>
            </div>
          </div>
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-all duration-200 hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            新对话
          </button>
        </div>
      </header>

      {/* 消息区域 */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {messages.length === 0 ? (
            // 欢迎界面
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/30 mb-6 hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                你好！我是智能采购助手 👋
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mb-8">
                粘贴 TikTok 视频链接，我会帮你分析产品趋势、匹配工厂、计算报价和 ROI。
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-200/50 hover:-translate-y-0.5 text-slate-700 text-sm font-medium transition-all duration-200">
                  📹 分析视频
                </button>
                <button className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-200/50 hover:-translate-y-0.5 text-slate-700 text-sm font-medium transition-all duration-200">
                  🏭 查找工厂
                </button>
                <button className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-0.5 text-slate-700 text-sm font-medium transition-all duration-200">
                  💰 计算报价
                </button>
              </div>
            </div>
          ) : (
            // 消息列表
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                        : 'bg-white text-slate-900 border border-slate-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="max-w-[80%] rounded-2xl px-5 py-3 bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-sm text-slate-500">正在思考...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* 底部输入栏 */}
      <footer className="flex-shrink-0 border-t border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="粘贴 TikTok 链接或输入消息..."
                rows={1}
                className="w-full px-5 py-3 pr-12 rounded-2xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none resize-none text-sm text-slate-900 placeholder:text-slate-400 bg-white shadow-sm transition-all duration-200 max-h-32 overflow-y-auto"
                style={{ minHeight: '48px' }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:shadow-none transition-all duration-200 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            按 Enter 发送，Shift + Enter 换行
          </p>
        </div>
      </footer>

      {/* 添加动画样式 */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        /* 自定义滚动条 */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* 平滑滚动 */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
