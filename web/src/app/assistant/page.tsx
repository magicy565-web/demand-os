'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import ChatMessage from '@/components/chat-message';
import { allWorkflowTemplates } from '@/lib/workflow-templates';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'system';
  content: string;
}

export default function AssistantPage() {
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 发送消息到后端
  const sendMessage = async (input: string, workflowId?: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/converse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          userInput: input,
          workflowId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '请求失败');
      }

      // 添加系统消息
      setMessages((prev) => [...prev, { role: 'system', content: data.systemMessage }]);
      setIsWaitingForInput(data.isWaitingForInput);
      setIsCompleted(data.isCompleted);
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(error.message || '发送失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 选择工作流
  const handleSelectWorkflow = async (workflowId: string) => {
    setSelectedWorkflow(workflowId);
    await sendMessage('', workflowId);
  };

  // 发送用户输入
  const handleSendInput = async () => {
    if (!userInput.trim() || isLoading) return;

    // 添加用户消息
    setMessages((prev) => [...prev, { role: 'user', content: userInput }]);
    const input = userInput;
    setUserInput('');

    // 发送到后端
    await sendMessage(input);
  };

  // 按 Enter 发送
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendInput();
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl h-screen flex flex-col">
      {/* 页面标题 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          Demand-OS 智能助手
        </h1>
        <p className="text-muted-foreground mt-2">
          选择一个服务开始对话，我将引导您完成整个流程
        </p>
      </div>

      {/* 工作流选择（仅在未选择时显示） */}
      {!selectedWorkflow && (
        <Card>
          <CardHeader>
            <CardTitle>选择服务</CardTitle>
            <CardDescription>请选择您需要的服务类型</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allWorkflowTemplates.map((workflow) => (
                <Button
                  key={workflow.id}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-start gap-2"
                  onClick={() => handleSelectWorkflow(workflow.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{workflow.icon}</span>
                    <span className="font-semibold">{workflow.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-left">
                    {workflow.description}
                  </p>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 聊天区域 */}
      {selectedWorkflow && (
        <>
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, index) => (
                <ChatMessage key={index} role={msg.role} content={msg.content} />
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-3">
                    <p className="text-sm text-muted-foreground">正在处理...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>
          </Card>

          {/* 输入区域 */}
          {isWaitingForInput && !isCompleted && (
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="输入您的回复..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSendInput} disabled={isLoading || !userInput.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* 完成提示 */}
          {isCompleted && (
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedWorkflow(null);
                  setMessages([]);
                  setIsCompleted(false);
                }}
              >
                开始新对话
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
