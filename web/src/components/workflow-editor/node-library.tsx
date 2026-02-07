'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LogIn, 
  Sparkles, 
  Database, 
  GitFork, 
  ArrowRightLeft, 
  LogOut,
  Search 
} from 'lucide-react';

interface NodeType {
  id: string;
  type: 'input' | 'ai' | 'datasource' | 'condition' | 'transform' | 'output';
  label: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  color: string;
}

const nodeTypes: NodeType[] = [
  {
    id: 'input',
    type: 'input',
    label: '输入节点',
    description: '工作流的起点，接收用户输入',
    icon: <LogIn className="w-4 h-4" />,
    category: '输入',
    color: 'hsl(217, 91%, 60%)', // primary
  },
  {
    id: 'ai',
    type: 'ai',
    label: 'AI 分析',
    description: '调用 AI 模型进行智能分析',
    icon: <Sparkles className="w-4 h-4" />,
    category: 'AI',
    color: 'hsl(199, 89%, 48%)', // info
  },
  {
    id: 'datasource',
    type: 'datasource',
    label: '数据源查询',
    description: '从数据库或 API 获取数据',
    icon: <Database className="w-4 h-4" />,
    category: '数据',
    color: 'hsl(142, 76%, 36%)', // success
  },
  {
    id: 'condition',
    type: 'condition',
    label: '条件判断',
    description: '根据条件进行分支处理',
    icon: <GitFork className="w-4 h-4" />,
    category: '逻辑',
    color: 'hsl(38, 92%, 50%)', // warning
  },
  {
    id: 'transform',
    type: 'transform',
    label: '数据转换',
    description: '对数据进行格式化或处理',
    icon: <ArrowRightLeft className="w-4 h-4" />,
    category: '转换',
    color: 'hsl(215, 20%, 65%)', // muted-foreground
  },
  {
    id: 'output',
    type: 'output',
    label: '输出节点',
    description: '工作流的终点，输出最终结果',
    icon: <LogOut className="w-4 h-4" />,
    category: '输出',
    color: 'hsl(0, 84%, 60%)', // destructive
  },
];

interface NodeLibraryProps {
  onNodeDragStart?: (event: React.DragEvent, nodeType: NodeType) => void;
}

export default function NodeLibrary({ onNodeDragStart }: NodeLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(nodeTypes.map((node) => node.category)));

  const filteredNodes = nodeTypes.filter((node) => {
    const matchesSearch =
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || node.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
    if (onNodeDragStart) {
      onNodeDragStart(event, nodeType);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">节点库</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="搜索节点..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-6 pb-6">
          {/* 类别筛选 */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant={selectedCategory === null ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              全部
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* 节点列表 */}
          <div className="space-y-2">
            {filteredNodes.map((node) => (
              <div
                key={node.id}
                draggable
                onDragStart={(e) => handleDragStart(e, node)}
                className="p-3 border rounded-lg cursor-move hover:bg-muted/50 transition-colors"
                style={{ borderLeftColor: node.color, borderLeftWidth: '4px' }}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: `${node.color}20`, color: node.color }}
                  >
                    {node.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{node.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {node.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 空状态 */}
          {filteredNodes.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <p>没有找到匹配的节点</p>
              <p className="text-sm mt-2">尝试调整搜索条件</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
