'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { 
  LogIn, 
  Sparkles, 
  Database, 
  GitFork, 
  ArrowRightLeft, 
  LogOut 
} from 'lucide-react';

const nodeColors: Record<string, string> = {
  input: 'hsl(217, 91%, 60%)', // primary
  ai: 'hsl(199, 89%, 48%)', // info
  datasource: 'hsl(142, 76%, 36%)', // success
  condition: 'hsl(38, 92%, 50%)', // warning
  transform: 'hsl(215, 20%, 65%)', // muted-foreground
  output: 'hsl(0, 84%, 60%)', // destructive
};

const nodeIcons: Record<string, React.ReactNode> = {
  input: <LogIn className="w-4 h-4" />,
  ai: <Sparkles className="w-4 h-4" />,
  datasource: <Database className="w-4 h-4" />,
  condition: <GitFork className="w-4 h-4" />,
  transform: <ArrowRightLeft className="w-4 h-4" />,
  output: <LogOut className="w-4 h-4" />,
};

function CustomNode({ data, selected }: NodeProps) {
  const nodeType = data.nodeType || 'default';
  const color = nodeColors[nodeType] || 'hsl(215, 20%, 65%)';
  const icon = nodeIcons[nodeType];

  return (
    <div
      className="px-4 py-2 shadow-md rounded-lg border-2 bg-card transition-all"
      style={{
        borderColor: selected ? color : 'hsl(217, 33%, 20%)',
        minWidth: '150px',
      }}
    >
      {/* 输入 Handle */}
      {nodeType !== 'input' && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: color }}
        />
      )}

      {/* 节点内容 */}
      <div className="flex items-center gap-2">
        <div
          className="p-1.5 rounded"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">{data.label}</div>
        </div>
      </div>

      {/* 输出 Handle */}
      {nodeType !== 'output' && (
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: color }}
        />
      )}
    </div>
  );
}

export default memo(CustomNode);
