'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ExecutionPlanCard } from '@/components/agent/execution-plan-card';
import { StepRenderer } from '@/components/agent/step-renderer';
import { Send, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'system';
  content: string;
  timestamp: Date;
}

interface Step {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  type: 'user_input' | 'system_action';
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: string;
}

export default function AgentChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [plan, setPlan] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (type: 'user' | 'system', content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        type,
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    addMessage('user', userMessage);
    setIsLoading(true);

    try {
      // 调用 /api/agent/start
      const response = await fetch('/api/agent/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to start agent');
      }

      const data = await response.json();
      setTaskId(data.taskId);
      setPlan(data.plan);

      addMessage('system', '好的，我已经为您创建了执行计划。让我们开始吧！');

      // 监听进度更新（简化版，使用轮询）
      pollProgress(data.taskId);
    } catch (error: any) {
      addMessage('system', `抱歉，发生了错误: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const pollProgress = async (tid: string) => {
    // 简化版：轮询任务状态
    // 生产环境应使用 WebSocket
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/agent/status?taskId=${tid}`);
        if (response.ok) {
          const data = await response.json();
          setPlan(data.plan);

          // 检查是否有需要用户输入的步骤
          const runningStep = data.plan.find((s: Step) => s.status === 'running' && s.type === 'user_input');
          if (runningStep && runningStep.result) {
            setCurrentStep(runningStep);
            clearInterval(interval);
          }

          // 检查是否所有步骤都已完成
          const allCompleted = data.plan.every((s: Step) => s.status === 'completed');
          if (allCompleted) {
            addMessage('system', '所有步骤已完成！您的申请已成功提交。');
            clearInterval(interval);
          }
        }
      } catch (error) {
        console.error('Poll error:', error);
      }
    }, 2000);
  };

  const handleStepSubmit = async (data: any) => {
    if (!taskId || !currentStep) return;

    setIsLoading(true);
    addMessage('system', '收到您的信息，正在继续执行...');

    try {
      const response = await fetch('/api/agent/continue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId,
          stepId: currentStep.id,
          userInput: data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to continue execution');
      }

      setCurrentStep(null);
      pollProgress(taskId);
    } catch (error: any) {
      addMessage('system', `抱歉，发生了错误: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-green-400">工厂委托开发助手</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：聊天界面 */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-slate-900 border-slate-700 p-4 h-[500px] overflow-y-auto">
              {messages.length === 0 && (
                <div className="text-center text-slate-400 mt-20">
                  <p>您好！我是工厂委托开发助手。</p>
                  <p className="mt-2">请告诉我您想开发的产品，我会帮您匹配合适的工厂。</p>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-800 text-slate-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {currentStep && currentStep.result && (
                <div className="mt-4">
                  <StepRenderer
                    stepId={currentStep.id}
                    componentType={currentStep.result.componentType}
                    componentProps={currentStep.result.componentProps}
                    onSubmit={handleStepSubmit}
                  />
                </div>
              )}

              <div ref={messagesEndRef} />
            </Card>

            {/* 输入框 */}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                placeholder="输入您的需求..."
                disabled={isLoading || !!currentStep}
                className="bg-slate-900 border-slate-700 text-slate-100"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !!currentStep}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* 右侧：执行计划 */}
          <div className="lg:col-span-1">
            {plan.length > 0 && <ExecutionPlanCard steps={plan} />}
          </div>
        </div>
      </div>
    </div>
  );
}
