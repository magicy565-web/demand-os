'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { agentTemplates, getAllCategories } from '@/lib/agent-templates';
import { Search, Sparkles, TrendingUp, Clock, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AgentMarketplaceV3() {
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
    const template = agentTemplates.find((t) => t.id === templateId);
    if (template?.conversational) {
      router.push(`/agents/${templateId}/chat`);
    } else {
      router.push(`/agents/${templateId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto py-12 space-y-8">
        {/* 页面标题 */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Agent 智能市场
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            选择预置的 Agent 模板，开启智能化采购与生产协作之旅
          </p>
        </div>

        {/* 搜索和筛选 */}
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardContent className="pt-6 space-y-6">
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="搜索 Agent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg border-2 focus:border-primary"
              />
            </div>

            {/* 类别筛选 */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="lg"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                全部
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agent 模板列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <Card
              key={template.id}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-900"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* 背景渐变 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* 内容 */}
              <div className="relative z-10">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-4xl">{template.icon}</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{template.name}</CardTitle>
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-0"
                        >
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {template.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* 统计信息 */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                        <Clock className="w-3 h-3" />
                        <span>节点</span>
                      </div>
                      <div className="text-lg font-semibold">{template.nodes.length}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>连接</span>
                      </div>
                      <div className="text-lg font-semibold">{template.edges.length}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                        <Users className="w-3 h-3" />
                        <span>使用</span>
                      </div>
                      <div className="text-lg font-semibold">
                        {Math.floor(Math.random() * 100) + 10}
                      </div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      {template.conversational ? '开始对话' : '使用模板'}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-11 px-6 border-2"
                      onClick={() => router.push(`/agents/${template.id}/preview`)}
                    >
                      预览
                    </Button>
                  </div>

                  {/* 对话式标签 */}
                  {template.conversational && (
                    <div className="flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium">对话式 Agent</span>
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* 空状态 */}
        {filteredTemplates.length === 0 && (
          <Card className="border-0 shadow-xl">
            <CardContent className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-lg text-muted-foreground mb-2">没有找到匹配的 Agent 模板</p>
              <p className="text-sm text-muted-foreground">尝试调整搜索条件或筛选类别</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
