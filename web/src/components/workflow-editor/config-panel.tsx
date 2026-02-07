'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WorkflowNode } from '@/lib/agent-workflow-engine';
import { Save, Trash2 } from 'lucide-react';

interface ConfigPanelProps {
  selectedNode: WorkflowNode | null;
  globalVariables?: Record<string, any>;
  executionLogs?: Array<{ timestamp: Date; nodeId: string; level: string; message: string }>;
  onNodeUpdate?: (node: WorkflowNode) => void;
  onNodeDelete?: (nodeId: string) => void;
  onGlobalVariablesUpdate?: (variables: Record<string, any>) => void;
}

export default function ConfigPanel({
  selectedNode,
  globalVariables = {},
  executionLogs = [],
  onNodeUpdate,
  onNodeDelete,
  onGlobalVariablesUpdate,
}: ConfigPanelProps) {
  const [nodeLabel, setNodeLabel] = useState(selectedNode?.label || '');
  const [nodeConfig, setNodeConfig] = useState(JSON.stringify(selectedNode?.config || {}, null, 2));
  const [variables, setVariables] = useState(JSON.stringify(globalVariables, null, 2));

  const handleSaveNode = () => {
    if (!selectedNode || !onNodeUpdate) return;

    try {
      const updatedNode = {
        ...selectedNode,
        label: nodeLabel,
        config: JSON.parse(nodeConfig),
      };
      onNodeUpdate(updatedNode);
    } catch (error) {
      console.error('Invalid JSON in config:', error);
    }
  };

  const handleDeleteNode = () => {
    if (!selectedNode || !onNodeDelete) return;
    onNodeDelete(selectedNode.id);
  };

  const handleSaveVariables = () => {
    if (!onGlobalVariablesUpdate) return;

    try {
      const parsedVariables = JSON.parse(variables);
      onGlobalVariablesUpdate(parsedVariables);
    } catch (error) {
      console.error('Invalid JSON in variables:', error);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">配置面板</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <Tabs defaultValue="node" className="h-full flex flex-col">
          <TabsList className="mx-6">
            <TabsTrigger value="node">节点配置</TabsTrigger>
            <TabsTrigger value="global">全局变量</TabsTrigger>
            <TabsTrigger value="log">执行日志</TabsTrigger>
          </TabsList>

          {/* 节点配置 */}
          <TabsContent value="node" className="flex-1 overflow-hidden px-6 pb-6 mt-4">
            {selectedNode ? (
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  {/* 节点类型 */}
                  <div>
                    <Label className="text-sm text-muted-foreground">节点类型</Label>
                    <Badge className="mt-1">{selectedNode.type}</Badge>
                  </div>

                  {/* 节点标签 */}
                  <div>
                    <Label htmlFor="node-label">节点名称</Label>
                    <Input
                      id="node-label"
                      value={nodeLabel}
                      onChange={(e) => setNodeLabel(e.target.value)}
                      placeholder="输入节点名称"
                      className="mt-1"
                    />
                  </div>

                  {/* 节点配置 (JSON) */}
                  <div>
                    <Label htmlFor="node-config">配置参数 (JSON)</Label>
                    <Textarea
                      id="node-config"
                      value={nodeConfig}
                      onChange={(e) => setNodeConfig(e.target.value)}
                      placeholder='{"key": "value"}'
                      className="mt-1 font-mono text-sm"
                      rows={10}
                    />
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleSaveNode} className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      保存
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteNode}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      删除
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>请选择一个节点进行配置</p>
              </div>
            )}
          </TabsContent>

          {/* 全局变量 */}
          <TabsContent value="global" className="flex-1 overflow-hidden px-6 pb-6 mt-4">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="global-variables">全局变量 (JSON)</Label>
                  <Textarea
                    id="global-variables"
                    value={variables}
                    onChange={(e) => setVariables(e.target.value)}
                    placeholder='{"apiKey": "xxx", "baseUrl": "https://..."}'
                    className="mt-1 font-mono text-sm"
                    rows={15}
                  />
                </div>
                <Button onClick={handleSaveVariables} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  保存变量
                </Button>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* 执行日志 */}
          <TabsContent value="log" className="flex-1 overflow-hidden px-6 pb-6 mt-4">
            <ScrollArea className="h-full">
              {executionLogs.length > 0 ? (
                <div className="space-y-2">
                  {executionLogs.map((log, index) => (
                    <div
                      key={index}
                      className="p-2 border rounded text-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge
                          variant={
                            log.level === 'error'
                              ? 'destructive'
                              : log.level === 'warn'
                              ? 'outline'
                              : 'default'
                          }
                        >
                          {log.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {log.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-muted-foreground text-xs mb-1">
                        节点: {log.nodeId}
                      </div>
                      <div>{log.message}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>暂无执行日志</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
