'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDemand } from '@/lib/directus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function DemandForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    project_name: '',
    room_count: 200,
    style: '东南亚风格',
    budget: 800000,
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const demand = await createDemand(formData);
      console.log('Demand created:', demand);
      
      // 跳转到 AI 拆单页面
      router.push(`/industrial-os/breakdown/${demand.id}`);
    } catch (err) {
      console.error('Failed to create demand:', err);
      setError('提交失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">场景化需求提交</CardTitle>
        <CardDescription>
          告诉我们您的项目需求，AI 将为您智能匹配最优产能方案
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="project_name" className="text-sm font-medium">
                项目名称 <span className="text-red-500">*</span>
              </label>
              <Input
                id="project_name"
                placeholder="如：东南亚风情精品酒店"
                value={formData.project_name}
                onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="room_count" className="text-sm font-medium">
                房间数量 <span className="text-red-500">*</span>
              </label>
              <Input
                id="room_count"
                type="number"
                placeholder="200"
                value={formData.room_count}
                onChange={(e) => setFormData({ ...formData, room_count: parseInt(e.target.value) || 0 })}
                required
                min="1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="style" className="text-sm font-medium">
              风格定位 <span className="text-red-500">*</span>
            </label>
            <Input
              id="style"
              placeholder="如：东南亚风格、北欧轻奢、现代简约"
              value={formData.style}
              onChange={(e) => setFormData({ ...formData, style: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="budget" className="text-sm font-medium">
              预算（美元）<span className="text-red-500">*</span>
            </label>
            <Input
              id="budget"
              type="number"
              placeholder="800000"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) || 0 })}
              required
              min="0"
              step="1000"
            />
            <p className="text-xs text-muted-foreground">
              约 ${(formData.budget / 1000).toFixed(0)}K
            </p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              详细描述
            </label>
            <Textarea
              id="description"
              placeholder="请描述您的具体需求，如：需要全套家具、软装及配套设施..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="resize-none"
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                提交中...
              </>
            ) : (
              '立即匹配产能 →'
            )}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            提交后，AI 将在 3 秒内为您生成定制化采购方案
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
