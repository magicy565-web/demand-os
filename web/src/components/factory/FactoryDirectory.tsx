'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Award, TrendingUp, Shield } from 'lucide-react';
import { VERIFIED_FACTORIES } from '@/data/factories';
import { FactoryCard } from './FactoryCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FactoryDirectoryProps {
  onViewFactoryDetails: (id: string) => void;
}

export const FactoryDirectory: React.FC<FactoryDirectoryProps> = ({ onViewFactoryDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const categories = ['全部', '便携电子产品', '家居纺织品', '智能穿戴设备', '消费电子配件'];

  const filteredFactories = VERIFIED_FACTORIES.filter(factory => {
    const matchesSearch = factory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         factory.mainCategories.some(cat => cat.includes(searchQuery));
    const matchesCategory = selectedCategory === '全部' || 
                           factory.mainCategories.some(cat => cat.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">Verified Supply Chain Network</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              认证工厂名录
            </h1>
            
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              我们为每一家工厂进行严格的<span className="text-emerald-400 font-bold">合规审核、产能验证和履约追踪</span>。这些工厂久经市场考验，值得你的信任。
            </p>

            {/* 统计数据 */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-1">{VERIFIED_FACTORIES.length}</div>
                <div className="text-sm text-slate-400 uppercase font-mono">认证工厂</div>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div className="text-center">
                <div className="text-4xl font-black text-emerald-400 mb-1">98.2%</div>
                <div className="text-sm text-slate-400 uppercase font-mono">平均质量合格率</div>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div className="text-center">
                <div className="text-4xl font-black text-blue-400 mb-1">2,140+</div>
                <div className="text-sm text-slate-400 uppercase font-mono">历史成功订单</div>
              </div>
            </div>

            {/* 搜索栏 */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input 
                  placeholder="搜索工厂名称或产品类别..." 
                  className="pl-12 h-14 text-base bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-slate-400 focus-visible:ring-emerald-500/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 主体内容 */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        {/* 筛选标签 */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">按品类筛选</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 工厂列表 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-slate-900">
              找到 <span className="text-blue-600">{filteredFactories.length}</span> 家认证工厂
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Award className="w-3.5 h-3.5 text-emerald-500" />
              <span>所有工厂均已通过平台认证</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredFactories.map((factory) => (
              <FactoryCard 
                key={factory.id} 
                factory={factory} 
                onViewDetails={onViewFactoryDetails}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* 空状态 */}
        {filteredFactories.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">未找到匹配的工厂</h3>
            <p className="text-slate-500 text-sm">尝试调整搜索关键词或筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
};
