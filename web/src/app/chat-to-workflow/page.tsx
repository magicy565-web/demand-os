'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, Send } from 'lucide-react';
import { AgentWorkflow } from '@/lib/agent-workflow-engine';
import WorkflowVisualizer from '@/components/workflow-visualizer';
import { toast } from 'sonner';

export default function ChatToWorkflowPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorkflow, setGeneratedWorkflow] = useState<AgentWorkflow | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('请输入您的需求描述');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedWorkflow(null);

    try {
      const response = await fetch('/api/agent/generate-from-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '生成失败，请重试');
      }

      setGeneratedWorkflow(data);
      toast.success('工作流生成成功！');
    } catch (err: any) {
      console.error('Generation error:', err);
      setError(err.message || '生成失败，请检查网络连接');
      toast.error(err.message || '生成失败');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl/Cmd + Enter 触发生成
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6 max-w-7xl">
      {/* 页面标题 */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10 text-primary" />
          对话式工作流生成
        </h1>
        <p className="text-muted-foreground text-lg">
          用自然语言描述您的需求，AI 将自动为您生成专业的工作流
        </p>
      </div>

      {/* 输入区域 */}
      <Card>
        <CardHeader>
          <CardTitle>描述您的需求</CardTitle>
          <CardDescription>
            例如："分析这个 TikTok 视频的爆款潜力，并匹配合适的工厂"
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="请输入您的需求..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={6}
            className="resize-none text-base"
            disabled={isGenerating}
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              提示：按 <kbd className="px-2 py-1 bg-muted rounded">Ctrl</kbd> +{' '}
              <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> 快速生成
            </p>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  生成工作流
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 错误提示 */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* 生成结果 */}
      {generatedWorkflow && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {generatedWorkflow.icon && <span className="text-2xl">{generatedWorkflow.icon}</span>}
                  {generatedWorkflow.name}
                </CardTitle>
                <CardDescription className="mt-2">
                  {generatedWorkflow.description}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  // TODO: 保存工作流
                  toast.info('保存功能开发中');
                }}>
                  保存
                </Button>
                <Button onClick={() => {
                  // TODO: 跳转到执行页面
                  toast.info('执行功能开发中');
                }}>
                  执行
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 工作流信息 */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>类别: {generatedWorkflow.category}</span>
                <span>节点数: {generatedWorkflow.nodes.length}</span>
                <span>连接数: {generatedWorkflow.edges.length}</span>
              </div>

              {/* 可视化展示 */}
              <div className="border rounded-lg overflow-hidden">
                <WorkflowVisualizer workflow={generatedWorkflow} interactive={false} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 示例提示 */}
      {!generatedWorkflow && !isGenerating && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">💡 示例需求</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                '分析这个 TikTok 视频的爆款潜力，并匹配合适的工厂',
                '根据产品需求，评估工厂的开发能力和成本',
                '分析工厂的产能利用率，预测未来可用产能',
                '根据订单需求，智能分配最合适的工厂',
                '分析市场趋势，预测下一个爆款产品',
                '从海关数据中提取热门出口产品，并匹配国内工厂',
              ].map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto py-3 px-4 text-left"
                  onClick={() => setPrompt(example)}
                >
                  {example}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
