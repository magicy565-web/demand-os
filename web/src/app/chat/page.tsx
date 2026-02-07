'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Plus, Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { ViralTrackerAgentFlow, AgentStep, AgentResult } from '@/lib/agent-engine-v2';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  type: 'text' | 'progress' | 'result';
  content: string;
  timestamp: number;
  steps?: AgentStep[];
  result?: AgentResult;
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

  // 检测是否为 TikTok 链接
  const isTikTokUrl = (text: string): boolean => {
    return /tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com/.test(text);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      type: 'text',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      // 检测是否为 TikTok 链接
      if (isTikTokUrl(userInput)) {
        await handleTikTokAnalysis(userInput);
      } else {
        await handleNormalChat(userInput);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        type: 'text',
        content: '抱歉，处理您的请求时出现了错误。请稍后再试。',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTikTokAnalysis = async (tiktokUrl: string) => {
    // 添加确认消息
    const confirmMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      type: 'text',
      content: '收到！正在分析这个 TikTok 视频... 🔍',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, confirmMessage]);

    // 创建进度消息
    const progressMessageId = (Date.now() + 1).toString();
    const progressMessage: Message = {
      id: progressMessageId,
      role: 'assistant',
      type: 'progress',
      content: '',
      timestamp: Date.now(),
      steps: [],
    };
    setMessages((prev) => [...prev, progressMessage]);

    // 运行 Agent Flow
    const agentFlow = new ViralTrackerAgentFlow((steps) => {
      // 实时更新进度
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === progressMessageId
            ? { ...msg, steps }
            : msg
        )
      );
    });

    try {
      const result = await agentFlow.run(tiktokUrl);

      // 移除进度消息，添加结果消息
      setMessages((prev) => prev.filter((msg) => msg.id !== progressMessageId));

      const resultMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        type: 'result',
        content: '',
        timestamp: Date.now(),
        result,
      };
      setMessages((prev) => [...prev, resultMessage]);
    } catch (error) {
      console.error('Agent Flow Error:', error);
      setMessages((prev) => prev.filter((msg) => msg.id !== progressMessageId));
      
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        type: 'text',
        content: '抱歉，分析过程中出现了错误。请检查 TikTok 链接是否正确，或稍后再试。',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleNormalChat = async (userInput: string) => {
    // 调用 Nova AI API 进行普通对话
    try {
      const response = await fetch('/api/chat/auto-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error('Chat API error');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        type: 'text',
        content: data.reply || '你好！我是智能采购助手。请粘贴 TikTok 视频链接，我会帮你分析产品并提供报价方案。',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat API Error:', error);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        type: 'text',
        content: '你好！我是智能采购助手。请粘贴 TikTok 视频链接，我会帮你分析产品并提供报价方案。',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }
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
                <button 
                  onClick={() => setInput('https://www.tiktok.com/@example/video/123456789')}
                  className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-200/50 hover:-translate-y-0.5 text-slate-700 text-sm font-medium transition-all duration-200"
                >
                  📹 分析视频
                </button>
                <button 
                  onClick={() => setInput('帮我查找生产电子产品的工厂')}
                  className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-200/50 hover:-translate-y-0.5 text-slate-700 text-sm font-medium transition-all duration-200"
                >
                  🏭 查找工厂
                </button>
                <button 
                  onClick={() => setInput('如何计算产品报价？')}
                  className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-0.5 text-slate-700 text-sm font-medium transition-all duration-200"
                >
                  💰 计算报价
                </button>
              </div>
            </div>
          ) : (
            // 消息列表
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id}>
                  {message.role === 'user' ? (
                    // 用户消息
                    <div className="flex justify-end animate-fade-in">
                      <div className="max-w-[80%] rounded-2xl px-5 py-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ) : message.type === 'progress' ? (
                    // 进度消息
                    <div className="flex justify-start animate-fade-in">
                      <div className="max-w-[90%] rounded-2xl px-5 py-4 bg-white border border-slate-200 shadow-sm">
                        <div className="space-y-3">
                          {message.steps?.map((step) => (
                            <div key={step.id} className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-0.5">
                                {step.status === 'completed' && (
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                )}
                                {step.status === 'running' && (
                                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                                )}
                                {step.status === 'pending' && (
                                  <Clock className="w-5 h-5 text-slate-300" />
                                )}
                                {step.status === 'failed' && (
                                  <XCircle className="w-5 h-5 text-red-500" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900">
                                  {step.action}
                                </p>
                                {step.log.length > 0 && (
                                  <div className="mt-1 space-y-0.5">
                                    {step.log.slice(-2).map((log, idx) => (
                                      <p key={idx} className="text-xs text-slate-500">
                                        {log}
                                      </p>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : message.type === 'result' && message.result ? (
                    // 结果消息
                    <ResultCard result={message.result} />
                  ) : (
                    // 普通文本消息
                    <div className="flex justify-start animate-fade-in">
                      <div className="max-w-[80%] rounded-2xl px-5 py-3 bg-white text-slate-900 border border-slate-200 shadow-sm">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  )}
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

// 结果卡片组件
function ResultCard({ result }: { result: AgentResult }) {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="max-w-[90%] rounded-2xl p-6 bg-white border border-slate-200 shadow-lg">
        <div className="space-y-6">
          {/* 产品信息 */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">📦 产品分析</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500">产品名称</p>
                <p className="text-sm font-medium text-slate-900">{result.productName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">类别</p>
                <p className="text-sm font-medium text-slate-900">{result.category}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">趋势分数</p>
                <p className="text-sm font-medium text-blue-600">{result.trendScore}/100</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">生命周期</p>
                <p className="text-sm font-medium text-green-600">{result.lifecycle}</p>
              </div>
            </div>
          </div>

          {/* 工厂匹配 */}
          {result.matchedFactories.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">🏭 匹配工厂</h3>
              <div className="space-y-3">
                {result.matchedFactories.slice(0, 3).map((factory, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-900">{factory.factoryName}</p>
                      <span className="text-xs font-medium text-blue-600">{factory.matchScore}% 匹配</span>
                    </div>
                    <p className="text-xs text-slate-600">{factory.matchReasons.join(' • ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 报价方案 */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">💰 报价方案</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-xs text-blue-600 mb-1">Dropshipping</p>
                <p className="text-lg font-bold text-blue-900">${result.pricingTiers.dropshipping.price}</p>
                <p className="text-xs text-blue-600">MOQ: {result.pricingTiers.dropshipping.moq}</p>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                <p className="text-xs text-indigo-600 mb-1">Wholesale</p>
                <p className="text-lg font-bold text-indigo-900">${result.pricingTiers.wholesale.price}</p>
                <p className="text-xs text-indigo-600">MOQ: {result.pricingTiers.wholesale.moq}</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-100">
                <p className="text-xs text-purple-600 mb-1">Exclusive</p>
                <p className="text-lg font-bold text-purple-900">${result.pricingTiers.exclusive.price}</p>
                <p className="text-xs text-purple-600">MOQ: {result.pricingTiers.exclusive.moq}</p>
              </div>
            </div>
          </div>

          {/* ROI 预测 */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">📊 ROI 预测</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500">预估收入</p>
                <p className="text-sm font-medium text-green-600">${result.roiPrediction.estimatedRevenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">预估利润</p>
                <p className="text-sm font-medium text-green-600">${result.roiPrediction.estimatedProfit.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">利润率</p>
                <p className="text-sm font-medium text-blue-600">{result.roiPrediction.profitMargin}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">回本周期</p>
                <p className="text-sm font-medium text-orange-600">{result.roiPrediction.paybackDays} 天</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
