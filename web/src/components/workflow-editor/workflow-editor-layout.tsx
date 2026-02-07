'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Play, FileDown } from 'lucide-react';
import { AgentWorkflow, WorkflowNode } from '@/lib/agent-workflow-engine';
import NodeLibrary from './node-library';
import InteractiveCanvas from './interactive-canvas';
import ConfigPanel from './config-panel';

interface WorkflowEditorLayoutProps {
  workflow: AgentWorkflow;
  onSave?: (workflow: AgentWorkflow) => void;
  onExecute?: (workflow: AgentWorkflow) => void;
  onExport?: (workflow: AgentWorkflow) => void;
}

export default function WorkflowEditorLayout({
  workflow,
  onSave,
  onExecute,
  onExport,
}: WorkflowEditorLayoutProps) {
  const [currentWorkflow, setCurrentWorkflow] = useState<AgentWorkflow>(workflow);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [executionLogs, setExecutionLogs] = useState<any[]>([]);

  const handleNodesChange = (nodes: WorkflowNode[]) => {
    setCurrentWorkflow({
      ...currentWorkflow,
      nodes,
    });
  };

  const handleEdgesChange = (edges: any[]) => {
    setCurrentWorkflow({
      ...currentWorkflow,
      edges,
    });
  };

  const handleNodeUpdate = (node: WorkflowNode) => {
    const updatedNodes = currentWorkflow.nodes.map((n) =>
      n.id === node.id ? node : n
    );
    setCurrentWorkflow({
      ...currentWorkflow,
      nodes: updatedNodes,
    });
    setSelectedNode(node);
  };

  const handleNodeDelete = (nodeId: string) => {
    const updatedNodes = currentWorkflow.nodes.filter((n) => n.id !== nodeId);
    const updatedEdges = currentWorkflow.edges.filter(
      (e) => e.source !== nodeId && e.target !== nodeId
    );
    setCurrentWorkflow({
      ...currentWorkflow,
      nodes: updatedNodes,
      edges: updatedEdges,
    });
    setSelectedNode(null);
  };

  const handleGlobalVariablesUpdate = (variables: Record<string, any>) => {
    setCurrentWorkflow({
      ...currentWorkflow,
      variables,
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(currentWorkflow);
    }
  };

  const handleExecute = () => {
    if (onExecute) {
      onExecute(currentWorkflow);
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport(currentWorkflow);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* 页脚 - 操作栏 */}
      <div className="h-16 border-b bg-background flex items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold">{currentWorkflow.name}</h1>
          <p className="text-sm text-muted-foreground">{currentWorkflow.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <FileDown className="w-4 h-4 mr-2" />
            导出
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            保存
          </Button>
          <Button onClick={handleExecute}>
            <Play className="w-4 h-4 mr-2" />
            执行
          </Button>
        </div>
      </div>

      {/* 主内容区 - 三栏布局 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左栏 - 节点库 */}
        <div className="w-64 border-r bg-background p-4">
          <NodeLibrary />
        </div>

        {/* 中栏 - 画布 */}
        <div className="flex-1 bg-muted/20">
          <InteractiveCanvas
            initialNodes={currentWorkflow.nodes}
            initialEdges={currentWorkflow.edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onNodeSelect={setSelectedNode}
          />
        </div>

        {/* 右栏 - 配置面板 */}
        <div className="w-80 border-l bg-background p-4">
          <ConfigPanel
            selectedNode={selectedNode}
            globalVariables={currentWorkflow.variables}
            executionLogs={executionLogs}
            onNodeUpdate={handleNodeUpdate}
            onNodeDelete={handleNodeDelete}
            onGlobalVariablesUpdate={handleGlobalVariablesUpdate}
          />
        </div>
      </div>
    </div>
  );
}
