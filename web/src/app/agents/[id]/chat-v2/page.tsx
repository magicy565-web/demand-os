'use client';

import { use, useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft, Bot, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ExecutionPlanCardV2 } from '@/components/agent/execution-plan-card-v2';
import { getTemplateById } from '@/lib/agent-templates';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ExecutionPlan {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'user_input' | 'system_action';
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: string;
}

interface TaskStatus {
  taskId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  plan: ExecutionPlan[];
  results: Record<string, any>;
  error?: string;
}

export default function AgentChatV2Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const template = getTemplateById(resolvedParams.id);

  useEffect(() => {
    // 添加欢迎消息
    setMessages([
      {
        role: 'assistant',
        content: `您好！我是${template?.name || 'Agent'}。\n\n请告诉我您想开发的产品，我会帮您匹配合适的工厂。`,
        timestamp: new Date(),
      },
    ]);
  }, [template]);

  useEffect(() => {
    // 自动滚动到底部
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // 轮询任务状态
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/agent/status?taskId=${taskId}`);
        if (response.ok) {
          const data = await response.json();
          setTaskStatus(data);

          // 如果任务完成或失败，停止轮询
          if (data.status === 'completed' || data.status === 'failed') {
            clearInterval(interval);
          }
        }
      } catch (error) {
        console.error('Failed to fetch task status:', error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [taskId]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 如果还没有任务，创建新任务
      if (!taskId) {
        const response = await fetch('/api/agent/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: input,
            agentId: resolvedParams.id,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to start agent');
        }

        const data = await response.json();
        setTaskId(data.taskId);
        setTaskStatus(data);

        // 添加系统响应
        const assistantMessage: Message = {
          role: 'assistant',
          content: '好的，我已经为您创建了执行计划。让我们开始吧！',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // 继续现有任务
        const response = await fetch('/api/agent/continue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            taskId,
            userInput: input,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to continue agent');
        }

        const data = await response.json();
        setTaskStatus(data);

        // 添加系统响应
        if (data.message) {
          const assistantMessage: Message = {
            role: 'assistant',
            content: data.message,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
        }
      }
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: `抱歉，发生了错误：${error.message}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto py-8 h-[calc(100vh-4rem)]">
        {/* 页面标题 */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <span className="text-3xl">{template?.icon}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{template?.name}</h1>
              <p className="text-sm text-muted-foreground">{template?.description}</p>
            </div>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-5rem)]">
          {/* 聊天区域 */}
          <div className="lg:col-span-2 flex flex-col">
            <Card className="flex-1 flex flex-col border-0 shadow-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
              <CardContent className="flex-1 flex flex-col p-6 space-y-4 overflow-hidden">
                {/* 消息列表 */}
                <div className="flex-1 overflow-y-auto space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${
                        message.role === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      {/* 头像 */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                            : 'bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        )}
                      </div>

                      {/* 消息内容 */}
                      <div
                        className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-md ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </p>
                        <p
                          className={`text-xs mt-2 ${
                            message.role === 'user'
                              ? 'text-blue-100'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                      </div>
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3 shadow-md">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* 输入框 */}
                <div className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-200 dark:border-slate-700">
                  <Input
                    placeholder="输入您的需求..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="rounded-full w-12 h-12 p-0 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 执行计划区域 */}
          <div className="lg:col-span-1">
            {taskStatus && <ExecutionPlanCardV2 plan={taskStatus.plan} />}
          </div>
        </div>
      </div>
    </div>
  );
}
