'use client';

/**
 * Phase 2 Features Demo Page
 * Showcases conversation history, image upload, and dark mode
 */

import { useState } from 'react';
import { ConversationSidebar } from '@/components/conversation-sidebar';
import { ImageUploadZone } from '@/components/image-upload-zone';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Image, Palette } from 'lucide-react';

export default function Phase2DemoPage() {
  const [token, setToken] = useState<string>('');
  const [userId] = useState<string>('demo-user-123');

  // Get token from Directus on mount
  useState(() => {
    fetch('https://admin.cnsubscribe.xyz/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'magic@gmail.com',
        password: 'wysk1214'
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.data?.access_token) {
          setToken(data.data.access_token);
        }
      })
      .catch(console.error);
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Phase 2 功能演示</h1>
              <p className="text-sm text-muted-foreground mt-1">
                对话历史、图片分析、深色模式
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="conversations">对话历史</TabsTrigger>
            <TabsTrigger value="image">图片分析</TabsTrigger>
            <TabsTrigger value="theme">主题切换</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <MessageSquare className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>对话历史记录</CardTitle>
                  <CardDescription>
                    保存和管理所有分析记录
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>✓ 自动保存分析结果</li>
                    <li>✓ 快速搜索和筛选</li>
                    <li>✓ 添加个人备注</li>
                    <li>✓ 删除和存档功能</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Image className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>图片上传分析</CardTitle>
                  <CardDescription>
                    AI 驱动的产品识别
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>✓ 拖拽上传图片</li>
                    <li>✓ 自动识别类别</li>
                    <li>✓ 置信度评分</li>
                    <li>✓ 工厂推荐匹配</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Palette className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>深色模式</CardTitle>
                  <CardDescription>
                    舒适的视觉体验
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>✓ 浅色/深色切换</li>
                    <li>✓ 跟随系统主题</li>
                    <li>✓ 保存用户偏好</li>
                    <li>✓ 平滑过渡动画</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>技术栈</CardTitle>
                <CardDescription>Phase 2 使用的核心技术</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js 15</Badge>
                  <Badge variant="secondary">Directus SDK</Badge>
                  <Badge variant="secondary">Zustand</Badge>
                  <Badge variant="secondary">next-themes</Badge>
                  <Badge variant="secondary">react-dropzone</Badge>
                  <Badge variant="secondary">Nova AI Vision</Badge>
                  <Badge variant="secondary">shadcn/ui</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conversations Tab */}
          <TabsContent value="conversations">
            <div className="grid md:grid-cols-[300px_1fr] gap-6">
              <Card className="h-[600px]">
                <ConversationSidebar
                  token={token}
                  userId={userId}
                  onSelectConversation={(conv) => {
                    console.log('Selected:', conv);
                  }}
                />
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>对话详情</CardTitle>
                  <CardDescription>
                    选择左侧的对话记录查看详情
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>请从左侧选择一个对话</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Image Analysis Tab */}
          <TabsContent value="image">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>上传产品图片</CardTitle>
                  <CardDescription>
                    拖拽或点击选择图片进行分析
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUploadZone
                    token={token}
                    userId={userId}
                    onAnalysisComplete={(result) => {
                      console.log('Analysis result:', result);
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>分析结果</CardTitle>
                  <CardDescription>
                    AI 识别的产品信息
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>上传图片后显示分析结果</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Theme Tab */}
          <TabsContent value="theme">
            <Card>
              <CardHeader>
                <CardTitle>主题设置</CardTitle>
                <CardDescription>
                  自定义您的视觉体验
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">当前主题</h3>
                    <p className="text-sm text-muted-foreground">
                      点击右上角的图标切换主题
                    </p>
                  </div>
                  <ThemeToggle />
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">主题预览</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-border bg-background">
                      <div className="space-y-2">
                        <div className="h-4 bg-foreground/10 rounded" />
                        <div className="h-4 bg-foreground/10 rounded w-3/4" />
                        <div className="h-8 bg-primary rounded" />
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="space-y-2">
                        <div className="h-4 bg-card-foreground/10 rounded" />
                        <div className="h-4 bg-card-foreground/10 rounded w-3/4" />
                        <div className="h-8 bg-primary rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
