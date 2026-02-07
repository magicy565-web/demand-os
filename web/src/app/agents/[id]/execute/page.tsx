'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getTemplateById } from '@/lib/agent-templates';
import { AgentWorkflowEngine, ExecutionLog } from '@/lib/agent-workflow-engine';
import { ArrowLeft, Play, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type ExecutionStatus = 'idle' | 'running' | 'success' | 'error';

export default function AgentExecutePage() {
  const params = useParams();
  const router = useRouter();
  const agentId = params.id as string;

  const template = getTemplateById(agentId);

  const [status, setStatus] = useState<ExecutionStatus>('idle');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [outputs, setOutputs] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState(0);

  if (!template) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Agent 模板不存在</p>
            <Button className="mt-4" onClick={() => router.push('/agents')}>
              返回市场
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleExecute = async () => {
    setStatus('running');
    setLogs([]);
    setOutputs({});
    setProgress(0);

    try {
      const engine = new AgentWorkflowEngine(template);
      const result = await engine.execute(inputs);

      // 模拟进度更新
      const totalNodes = template.nodes.length;
      result.logs.forEach((log, index) => {
        setTimeout(() => {
          setLogs((prev) => [...prev, log]);
          setProgress(((index + 1) / totalNodes) * 100);
        }, index * 500);
      });

      // 等待所有日志显示完成
      setTimeout(() => {
        if (result.success) {
          setStatus('success');
          setOutputs(result.outputs || {});
        } else {
          setStatus('error');
        }
      }, totalNodes * 500);
    } catch (error: any) {
      setStatus('error');
      setLogs((prev) => [
        ...prev,
        {
          timestamp: new Date(),
          nodeId: 'error',
          level: 'error',
          message: error.message,
        },
      ]);
    }
  };

  const getInputFields = () => {
    const inputNodes = template.nodes.filter((node) => node.type === 'input');
    return inputNodes.map((node) => ({
      id: node.id,
      label: node.label,
      key: node.config.inputKey || 'default',
    }));
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* 返回按钮 */}
      <Button variant="ghost" onClick={() => router.push(`/agents/${agentId}`)}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        返回详情
      </Button>

      {/* Agent 信息 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{template.icon}</span>
            <div>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription className="mt-1">{template.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：参数配置 */}
        <Card>
          <CardHeader>
            <CardTitle>参数配置</CardTitle>
            <CardDescription>配置 Agent 执行所需的参数</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {getInputFields().map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                {field.key === 'tiktokUrl' ? (
                  <Input
                    id={field.key}
                    placeholder="https://www.tiktok.com/@user/video/..."
                    value={inputs[field.key] || ''}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, [field.key]: e.target.value }))
                    }
                  />
                ) : (
                  <Textarea
                    id={field.key}
                    placeholder="请输入..."
                    rows={4}
                    value={inputs[field.key] || ''}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, [field.key]: e.target.value }))
                    }
                  />
                )}
              </div>
            ))}

            <Button
              className="w-full"
              onClick={handleExecute}
              disabled={status === 'running'}
            >
              {status === 'running' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  执行中...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  开始执行
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* 右侧：执行状态 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>执行状态</CardTitle>
              {status === 'success' && (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  成功
                </Badge>
              )}
              {status === 'error' && (
                <Badge variant="destructive">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  失败
                </Badge>
              )}
              {status === 'running' && (
                <Badge variant="secondary">
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  运行中
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 进度条 */}
            {status === 'running' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>执行进度</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            {/* 执行日志 */}
            <div className="space-y-2">
              <Label>执行日志</Label>
              <ScrollArea className="h-[400px] border rounded-lg p-4 bg-muted/50">
                <div className="space-y-2">
                  {logs.length === 0 ? (
                    <p className="text-sm text-muted-foreground">等待执行...</p>
                  ) : (
                    logs.map((log, index) => (
                      <div
                        key={index}
                        className={`text-sm p-2 rounded ${
                          log.level === 'error'
                            ? 'bg-red-500/10 text-red-500'
                            : log.level === 'warn'
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-blue-500/10 text-blue-500'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-xs opacity-70">
                            {log.timestamp.toLocaleTimeString()}
                          </span>
                          <span className="flex-1">{log.message}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 执行结果 */}
      {status === 'success' && Object.keys(outputs).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>执行结果</CardTitle>
            <CardDescription>Agent 执行完成，以下是输出结果</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(outputs, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
