'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDemand } from '@/lib/directus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle2, XCircle, Sparkles, Building2, Palette, DollarSign, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function DemandForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
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
      setSuccess(true);
      
      // 延迟跳转以展示成功状态
      setTimeout(() => {
        router.push(`/industrial-os/breakdown/${demand.id}`);
      }, 800);
    } catch (err) {
      console.error('Failed to create demand:', err);
      setError('提交失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-none bg-transparent">
      <CardHeader className="pb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-2"
        >
          <div className="p-2 rounded-lg bg-gradient-to-br from-[#3B82F6]/10 to-[#3B82F6]/5">
            <Sparkles className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            场景化需求提交
          </CardTitle>
        </motion.div>
        <CardDescription className="text-sm text-gray-500">
          告诉我们您的项目需求，AI 将为您智能匹配最优产能方案
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 项目信息区块 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Building2 className="w-4 h-4 text-[#3B82F6]" />
              <span>项目基本信息</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="project_name" className="text-sm font-medium text-gray-700">
                  项目名称 <span className="text-[#EF4444]">*</span>
                </label>
                <Input
                  id="project_name"
                  placeholder="如：东南亚风情精品酒店"
                  value={formData.project_name}
                  onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] hover:border-gray-400"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="room_count" className="text-sm font-medium text-gray-700">
                  房间数量 <span className="text-[#EF4444]">*</span>
                </label>
                <Input
                  id="room_count"
                  type="number"
                  placeholder="200"
                  value={formData.room_count}
                  onChange={(e) => setFormData({ ...formData, room_count: parseInt(e.target.value) || 0 })}
                  required
                  min="1"
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] hover:border-gray-400"
                />
              </div>
            </div>
          </div>
          
          {/* 风格与预算区块 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Palette className="w-4 h-4 text-[#10B981]" />
              <span>风格与预算</span>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="style" className="text-sm font-medium text-gray-700">
                风格定位 <span className="text-[#EF4444]">*</span>
              </label>
              <Input
                id="style"
                placeholder="如：东南亚风格、北欧轻奢、现代简约"
                value={formData.style}
                onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] hover:border-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="budget" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#F59E0B]" />
                预算（美元）<span className="text-[#EF4444]">*</span>
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
                className="transition-all duration-200 focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] hover:border-gray-400"
              />
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981]"></span>
                约 ${(formData.budget / 1000).toFixed(0)}K
              </p>
            </div>
          </div>
          
          {/* 详细描述区块 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FileText className="w-4 h-4 text-[#8B5CF6]" />
              <span>补充说明</span>
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">
                详细描述
              </label>
              <Textarea
                id="description"
                placeholder="请描述您的具体需求，如：需要全套家具、软装及配套设施..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="resize-none transition-all duration-200 focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] hover:border-gray-400"
              />
            </div>
          </div>
          
          {/* 错误提示 */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#EF4444]/5 border border-[#EF4444]/20 text-[#EF4444] px-4 py-3 rounded-lg text-sm flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* 提交按钮 */}
          <motion.div
            whileHover={{ scale: loading || success ? 1 : 1.01 }}
            whileTap={{ scale: loading || success ? 1 : 0.99 }}
          >
            <Button 
              type="submit" 
              disabled={loading || success} 
              className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                success 
                  ? 'bg-[#10B981] hover:bg-[#10B981]' 
                  : 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] shadow-md hover:shadow-lg'
              }`}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  提交中...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  提交成功！
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  立即匹配产能 →
                </>
              )}
            </Button>
          </motion.div>
          
          <p className="text-xs text-center text-gray-400">
            提交后，AI 将在 <span className="text-[#3B82F6] font-medium">3 秒</span>内为您生成定制化采购方案
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
