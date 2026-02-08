'use client';

import { useState } from 'react';
import { AccioSidebar } from '@/components/accio/sidebar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Globe, Coins, Zap, Paperclip, Send, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AccioPage() {
  const [query, setQuery] = useState('');

  const quickActions = [
    { icon: '🔥', label: '探索新功能' },
    { icon: '🎨', label: 'AI产品设计' },
    { icon: '', label: '全球商品搜索' },
    { icon: '', label: '全球供应商搜索' },
    { icon: '', label: '分析热卖品' },
    { icon: '', label: '评估市场潜力' },
    { icon: '', label: '洞察趋势' },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* 左侧导航栏 */}
      <AccioSidebar />

      {/* 主区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部栏 */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
          <div className="flex-1" />
          <div className="flex items-center gap-6">
            {/* 语言和货币选择器 */}
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <Globe className="w-4 h-4 mr-2" />
              简体中文 - USD
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>

            {/* 积分 */}
            <div className="flex items-center gap-2 text-gray-600">
              <Coins className="w-4 h-4" />
              <span>3</span>
            </div>

            {/* 免费试用按钮 */}
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Zap className="w-4 h-4 mr-2" />
              免费试用
            </Button>

            {/* 用户头像 */}
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold">
              YM
            </div>
          </div>
        </header>

        {/* 主内容区域 */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {/* 专属福利横幅 */}
            <div className="mb-8 bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200 rounded-xl px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">专属福利 — 30天免费试用！</span>
              </div>
              <Button variant="ghost" size="sm" className="text-emerald-700 hover:text-emerald-800">
                &gt;
              </Button>
            </div>

            {/* 标题 */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4">Accio</h1>
              <p className="text-2xl text-gray-700">AI智能采购，一问搞定</p>
            </div>

            {/* 搜索框 */}
            <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <Textarea
                placeholder="描述您的需求..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[120px] border-0 focus:ring-0 resize-none text-lg"
              />
              <div className="flex items-center justify-between mt-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    快速
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    size="icon"
                    className="rounded-full bg-gray-300 hover:bg-gray-400 text-white"
                    disabled={!query.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 快捷按钮 */}
            <div className="flex flex-wrap gap-3 justify-center">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="rounded-full px-6 py-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                >
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
