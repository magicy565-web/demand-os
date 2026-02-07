'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getTemplateById } from '@/lib/agent-templates';
import WorkflowVisualizer from '@/components/workflow-visualizer';
import { ArrowLeft, Play, Settings } from 'lucide-react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = params.id as string;

  const template = getTemplateById(agentId);

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

  const [jsonCode, setJsonCode] = useState(JSON.stringify(template, null, 2));

  const handleExecute = () => {
    router.push(`/agents/${agentId}/execute`);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* 返回按钮 */}
      <Button variant="ghost" onClick={() => router.push('/agents')}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        返回市场
      </Button>

      {/* Agent 信息 */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{template.icon}</span>
              <div>
                <CardTitle className="text-2xl">{template.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge>{template.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {template.nodes.length} 个节点 · {template.edges.length} 个连接
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                配置
              </Button>
              <Button onClick={handleExecute}>
                <Play className="w-4 h-4 mr-2" />
                执行
              </Button>
            </div>
          </div>
          <CardDescription className="mt-4">{template.description}</CardDescription>
        </CardHeader>
      </Card>

      {/* 工作流详情 */}
      <Tabs defaultValue="visual" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visual">可视化</TabsTrigger>
          <TabsTrigger value="code">代码</TabsTrigger>
          <TabsTrigger value="nodes">节点详情</TabsTrigger>
        </TabsList>

        {/* 可视化视图 */}
        <TabsContent value="visual">
          <Card>
            <CardHeader>
              <CardTitle>工作流可视化</CardTitle>
              <CardDescription>查看 Agent 的执行流程</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkflowVisualizer workflow={template} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* 代码视图 */}
        <TabsContent value="code">
          <Card>
            <CardHeader>
              <CardTitle>工作流 JSON</CardTitle>
              <CardDescription>查看和编辑工作流的 JSON 配置</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <MonacoEditor
                  height="500px"
                  language="json"
                  theme="vs-dark"
                  value={jsonCode}
                  onChange={(value) => setJsonCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 节点详情 */}
        <TabsContent value="nodes">
          <Card>
            <CardHeader>
              <CardTitle>节点详情</CardTitle>
              <CardDescription>查看每个节点的配置信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {template.nodes.map((node, index) => (
                  <Card key={node.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          {index + 1}. {node.label}
                        </CardTitle>
                        <Badge variant="outline">{node.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-sm bg-muted p-3 rounded-lg overflow-x-auto">
                        {JSON.stringify(node.config, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
