'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, CheckCircle2, Loader2, Circle, ChevronDown, ChevronUp } from 'lucide-react';

interface ExecutionStep {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: string;
  logs?: string[];
}

interface TaskStatus {
  taskId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  plan: ExecutionStep[];
  results: Record<string, any>;
  error?: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

  useEffect(() => {
    // 轮询任务状态
    if (!taskStatus || taskStatus.status === 'completed' || taskStatus.status === 'failed') return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/agent/status?taskId=${taskStatus.taskId}`);
        if (response.ok) {
          const data = await response.json();
          setTaskStatus(data);
        }
      } catch (error) {
        console.error('Failed to fetch task status:', error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [taskStatus]);

  const handleSearch = async () => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/agent/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          agentId: 'factory-odm',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start agent');
      }

      const data = await response.json();
      setTaskStatus(data);
    } catch (error: any) {
      console.error('Error:', error);
      alert(`发生错误：${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const toggleStepExpansion = (stepId: string) => {
    setExpandedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const getStatusIcon = (status: ExecutionStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-emerald-400" />;
      case 'running':
        return <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />;
      case 'failed':
        return <Circle className="w-6 h-6 text-red-400" />;
      default:
        return <Circle className="w-6 h-6 text-slate-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        {/* 顶部标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-emerald-400" />
            <h1 className="text-4xl font-bold">Demand-OS</h1>
          </div>
          <p className="text-slate-400 text-lg">一句话完成复杂任务</p>
        </div>

        {/* 搜索框 */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
            <Input
              placeholder="告诉我您想做什么，例如：我想开发一款智能蓝牙音箱"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="pl-16 pr-32 h-16 text-lg bg-slate-900 border-2 border-slate-700 focus:border-emerald-400 rounded-2xl text-white placeholder:text-slate-500"
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading || !query.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 px-8 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-xl font-semibold"
            >
              {isLoading ? '处理中...' : '搜索'}
            </Button>
          </div>
        </div>

        {/* 执行计划和结果 */}
        {taskStatus && (
          <div className="space-y-8">
            {/* 执行计划卡片 */}
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  执行计划
                </h2>
                <div className="space-y-3">
                  {taskStatus.plan.map((step, index) => (
                    <div key={step.id}>
                      <div
                        className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          step.status === 'completed'
                            ? 'bg-emerald-950/20 border-emerald-900'
                            : step.status === 'running'
                            ? 'bg-cyan-950/20 border-cyan-900 shadow-lg shadow-cyan-900/20'
                            : step.status === 'failed'
                            ? 'bg-red-950/20 border-red-900'
                            : 'bg-slate-800/50 border-slate-700'
                        }`}
                        onClick={() => toggleStepExpansion(step.id)}
                      >
                        {/* 连接线 */}
                        {index < taskStatus.plan.length - 1 && (
                          <div className="absolute left-9 top-full w-0.5 h-3 bg-slate-700" />
                        )}

                        <div className="flex items-center gap-4">
                          {/* 状态图标 */}
                          <div className="flex-shrink-0">{getStatusIcon(step.status)}</div>

                          {/* 步骤信息 */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-2xl">{step.icon}</span>
                              <h3 className="font-semibold text-lg">{step.name}</h3>
                            </div>
                            <p className="text-sm text-slate-400">{step.description}</p>
                          </div>

                          {/* 展开按钮 */}
                          {(step.logs || step.result) && (
                            <div className="flex-shrink-0">
                              {expandedSteps.has(step.id) ? (
                                <ChevronUp className="w-5 h-5 text-slate-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-slate-400" />
                              )}
                            </div>
                          )}
                        </div>

                        {/* 展开的详细信息 */}
                        {expandedSteps.has(step.id) && (
                          <div className="mt-4 pt-4 border-t border-slate-700">
                            {step.logs && step.logs.length > 0 && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-slate-300">执行日志</h4>
                                <div className="bg-slate-950 rounded-lg p-3 space-y-1">
                                  {step.logs.map((log, i) => (
                                    <p key={i} className="text-xs text-slate-400 font-mono">
                                      {log}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}
                            {step.result && (
                              <div className="mt-3">
                                <h4 className="text-sm font-semibold text-slate-300 mb-2">结果</h4>
                                <div className="bg-slate-950 rounded-lg p-3">
                                  <pre className="text-xs text-slate-400 whitespace-pre-wrap">
                                    {JSON.stringify(step.result, null, 2)}
                                  </pre>
                                </div>
                              </div>
                            )}
                            {step.error && (
                              <div className="mt-3 p-3 bg-red-950/20 border border-red-900 rounded-lg">
                                <p className="text-sm text-red-400">{step.error}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 最终结果 */}
            {taskStatus.status === 'completed' && taskStatus.results && (
              <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    最终结果
                  </h2>
                  <div className="bg-slate-950 rounded-lg p-4">
                    <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                      {JSON.stringify(taskStatus.results, null, 2)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
