'use client';

import { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { AgentWorkflow } from '@/lib/agent-workflow-engine';

interface WorkflowVisualizerProps {
  workflow: AgentWorkflow;
  interactive?: boolean;
}

export default function WorkflowVisualizer({ workflow, interactive = false }: WorkflowVisualizerProps) {
  // 转换节点格式
  const initialNodes: Node[] = workflow.nodes.map((node) => ({
    id: node.id,
    type: getNodeType(node.type),
    position: node.position,
    data: {
      label: node.label,
      type: node.type,
      config: node.config,
    },
  }));

  // 转换边格式
  const initialEdges: Edge[] = workflow.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    animated: true,
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[600px] border rounded-lg bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={interactive ? onNodesChange : undefined}
        onEdgesChange={interactive ? onEdgesChange : undefined}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

/**
 * 根据节点类型返回 React Flow 节点类型
 */
function getNodeType(type: string): string {
  const typeMap: Record<string, string> = {
    input: 'input',
    output: 'output',
    datasource: 'default',
    ai: 'default',
    condition: 'default',
    transform: 'default',
  };
  return typeMap[type] || 'default';
}
