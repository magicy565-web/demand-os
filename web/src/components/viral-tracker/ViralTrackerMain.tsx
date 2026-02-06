'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Zap, Cpu, Activity, RefreshCcw, ArrowDownCircle, Factory } from 'lucide-react';
import { VIRAL_PRODUCTS } from '@/data/viral-products';
import { ProductTrendCard } from './ProductTrendCard';
import { ProductDetailDialog } from './ProductDetailDialog';
import { AgentWorkboard } from './AgentWorkboard';
import { ViralProduct } from '@/types/viral-tracker';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ViralTrackerMainProps {
  onSwitchToDirectory?: () => void;
  onSwitchToOpportunities?: () => void;
}

export const ViralTrackerMain: React.FC<ViralTrackerMainProps> = ({ onSwitchToDirectory, onSwitchToOpportunities }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ViralProduct | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = ['All', 'Summer Gadgets', 'Home & Bedding', 'Tech', 'Fashion'];

  const filteredProducts = VIRAL_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 头部装饰 */}
      <div className="bg-slate-900 pt-24 pb-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <Cpu className="w-5 h-5 text-slate-950" />
                </div>
                <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">Autonomous Supply Chain Agent</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Viral Trend <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Capacity Agent
                </span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                不仅是监测，更是**自动化的爆款生命周期管理**。我们的 Agent 实时捕捉 TikTok 流量，自动匹配最优工厂产能，并锁定独家供应权，完成从发现到变现的闭环。
              </p>
              {onSwitchToDirectory && (
                <Button 
                  onClick={onSwitchToDirectory}
                  className="bg-white hover:bg-slate-100 text-slate-900 font-bold h-12 px-8 rounded-xl gap-2"
                >
                  <Factory className="w-5 h-5" />
                  浏览认证工厂名录
                </Button>
              )}
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-1 rounded-2xl border border-white/10">
                <div className="px-6 py-4 text-center">
                  <div className="text-3xl font-black text-white">1,284</div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Tasks Processed</div>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="px-6 py-4 text-center">
                  <div className="text-3xl font-black text-emerald-400">$2.4M</div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">GMV Fulfilled</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 主体内容 */}
      <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20">
        
        {/* Agent Workboard Section */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-widest">Live Agent Workspace / 实时 Agent 处理流</h2>
          </div>
          <AgentWorkboard />
        </div>

        {/* Showcase Section */}
        <div className="pt-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Verified Trend Cases / 爆款案例库</h2>
              </div>
              <p className="text-slate-500 text-sm">这些爆款已由我们的 Agent 完成全链路追踪与产能锁定。</p>
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Filter cases..." 
                  className="pl-10 w-64 border-slate-200 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="border-slate-200 gap-2"
                onClick={handleRefresh}
              >
                <RefreshCcw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* 筛选标签 */}
          <div className="flex gap-2 overflow-x-auto pb-6 mb-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 产品列表 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductTrendCard 
                  key={product.id} 
                  product={product} 
                  onViewDetails={(id) => setSelectedProduct(product)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 详情弹窗 */}
      <ProductDetailDialog 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* 底部浮动通知 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-slate-900/90 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-2xl">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-mono font-bold tracking-widest">Agent Status</span>
            <span className="text-xs font-medium">Monitoring 142 new signals from TikTok Creator Marketplace...</span>
          </div>
          <Zap className="w-4 h-4 text-amber-400" />
        </div>
      </div>
    </div>
  );
};
