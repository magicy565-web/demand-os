'use client';

import { use, useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ExecutionPlanCard } from '@/components/agent/execution-plan-card';
import { StepRenderer } from '@/components/agent/step-renderer';
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

export default function AgentChatPage({ params }: { params: Promise<{ id: string }> }) {
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
    <div className="container mx-auto py-8 h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">{template?.icon}</span>
            {template?.name}
          </h1>
          <p className="text-sm text-muted-foreground">{template?.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-5rem)]">
        {/* 聊天区域 */}
        <div className="lg:col-span-2 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardContent className="flex-1 flex flex-col p-6 space-y-4 overflow-hidden">
              {/* 消息列表 */}
              <div className="flex-1 overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-3">
                      <p className="text-muted-foreground">正在处理...</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* 输入框 */}
              <div className="flex gap-2">
                <Input
                  placeholder="输入您的需求..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 执行计划区域 */}
        <div className="lg:col-span-1">
          {taskStatus && <ExecutionPlanCard plan={taskStatus.plan} />}
        </div>
      </div>
    </div>
  );
}
