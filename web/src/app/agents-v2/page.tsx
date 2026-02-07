'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { agentTemplates, getAllCategories } from '@/lib/agent-templates';
import { Search, Sparkles, Grid3x3, List, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import WorkflowVisualizer from '@/components/workflow-visualizer';

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'updated' | 'usage';

export default function AgentsV2Marketplace() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);

  const categories = getAllCategories();

  const filteredTemplates = agentTemplates
    .filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // 其他排序逻辑可以后续添加
      return 0;
    });

  const handleCloneTemplate = (templateId: string) => {
    router.push(`/workflow-editor/${templateId}`);
  };

  const handleCreateBlank = () => {
    router.push('/workflow-editor/new');
  };

  const handlePreview = (template: any) => {
    setPreviewTemplate(template);
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
            选择预置的 Agent 模板，或创建全新的工作流
          </p>
        </div>
        <Button onClick={handleCreateBlank} size="lg">
          <Plus className="w-4 h-4 mr-2" />
          创建空白工作流
        </Button>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* 搜索框 */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="搜索 Agent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
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
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
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
                    onClick={() => handleCloneTemplate(template.id)}
                  >
                    克隆模板
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handlePreview(template)}
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

      {/* 预览模态框 */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{previewTemplate?.icon}</span>
              {previewTemplate?.name}
            </DialogTitle>
            <DialogDescription>{previewTemplate?.description}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {previewTemplate && (
              <WorkflowVisualizer workflow={previewTemplate} interactive={false} />
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
              关闭
            </Button>
            <Button onClick={() => handleCloneTemplate(previewTemplate?.id)}>
              使用此模板
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
