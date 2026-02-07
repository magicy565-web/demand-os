'use client';

import { useCallback, useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeTypes,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { WorkflowNode as WorkflowNodeType } from '@/lib/agent-workflow-engine';
import CustomNode from './custom-node';

interface InteractiveCanvasProps {
  initialNodes?: WorkflowNodeType[];
  initialEdges?: any[];
  onNodesChange?: (nodes: WorkflowNodeType[]) => void;
  onEdgesChange?: (edges: any[]) => void;
  onNodeSelect?: (node: WorkflowNodeType | null) => void;
}

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

function InteractiveCanvasInner({
  initialNodes = [],
  initialEdges = [],
  onNodesChange,
  onEdgesChange,
  onNodeSelect,
}: InteractiveCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // 转换为 React Flow 格式
  const convertedNodes: Node[] = initialNodes.map((node) => ({
    id: node.id,
    type: 'custom',
    position: node.position,
    data: {
      label: node.label,
      nodeType: node.type,
      config: node.config,
    },
  }));

  const convertedEdges: Edge[] = initialEdges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    animated: true,
    style: { stroke: 'hsl(217, 91%, 60%)', strokeWidth: 2 },
  }));

  const [nodes, setNodes, onNodesChangeInternal] = useNodesState(convertedNodes);
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState(convertedEdges);

  // 连接节点
  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        animated: true,
        style: { stroke: 'hsl(217, 91%, 60%)', strokeWidth: 2 },
      };
      setEdges((eds) => addEdge(newEdge, eds));
      if (onEdgesChange) {
        onEdgesChange([...edges, newEdge]);
      }
    },
    [edges, onEdgesChange, setEdges]
  );

  // 节点选择
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (onNodeSelect) {
        const workflowNode: WorkflowNodeType = {
          id: node.id,
          type: node.data.nodeType,
          label: node.data.label,
          config: node.data.config,
          position: node.position,
        };
        onNodeSelect(workflowNode);
      }
    },
    [onNodeSelect]
  );

  // 画布点击（取消选择）
  const onPaneClick = useCallback(() => {
    if (onNodeSelect) {
      onNodeSelect(null);
    }
  }, [onNodeSelect]);

  // 拖拽添加节点
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const nodeData = event.dataTransfer.getData('application/reactflow');

      if (nodeData && reactFlowBounds) {
        const nodeType = JSON.parse(nodeData);
        const position = {
          x: event.clientX - reactFlowBounds.left - 75,
          y: event.clientY - reactFlowBounds.top - 25,
        };

        const newNode: Node = {
          id: `${nodeType.type}-${Date.now()}`,
          type: 'custom',
          position,
          data: {
            label: nodeType.label,
            nodeType: nodeType.type,
            config: {},
          },
        };

        setNodes((nds) => nds.concat(newNode));

        if (onNodesChange) {
          const workflowNode: WorkflowNodeType = {
            id: newNode.id,
            type: nodeType.type,
            label: nodeType.label,
            config: {},
            position,
          };
          onNodesChange([...initialNodes, workflowNode]);
        }
      }
    },
    [initialNodes, onNodesChange, setNodes]
  );

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeInternal}
        onEdgesChange={onEdgesChangeInternal}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
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

export default function InteractiveCanvas(props: InteractiveCanvasProps) {
  return (
    <ReactFlowProvider>
      <InteractiveCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
