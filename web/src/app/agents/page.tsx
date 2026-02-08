'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { agentTemplates, getAllCategories } from '@/lib/agent-templates';
import { Search, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AgentMarketplace() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getAllCategories();

  const filteredTemplates = agentTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (templateId: string) => {
    const template = agentTemplates.find(t => t.id === templateId);
    if (template?.conversational) {
      router.push(`/agents/${templateId}/chat`);
    } else {
      router.push(`/agents/${templateId}`);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            Agent 市场
          </h1>
          <p className="text-muted-foreground mt-2">
            选择预置的 Agent 模板，快速开始您的智能采购之旅
          </p>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="搜索 Agent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* 类别筛选 */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              全部
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent 模板列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{template.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {template.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="mt-2">{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* 工作流信息 */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{template.nodes.length} 个节点</span>
                  <span>{template.edges.length} 个连接</span>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    使用模板
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/agents/${template.id}/preview`)}
                  >
                    预览
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 空状态 */}
      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p>没有找到匹配的 Agent 模板</p>
            <p className="text-sm mt-2">尝试调整搜索条件或筛选类别</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
