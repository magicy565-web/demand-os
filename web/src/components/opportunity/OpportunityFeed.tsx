'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Filter, TrendingUp, Sparkles } from 'lucide-react';
import { OPPORTUNITIES } from '@/data/opportunities';
import { Opportunity } from '@/types/opportunity';
import { OpportunityCard } from './OpportunityCard';
import { OpportunityDetailDialog } from './OpportunityDetailDialog';
import { Button } from '@/components/ui/button';

interface OpportunityFeedProps {
  onViewFactory: (factoryId: string) => void;
}

export const OpportunityFeed: React.FC<OpportunityFeedProps> = ({ onViewFactory }) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [filterStage, setFilterStage] = useState<'all' | 'emerging' | 'explosive' | 'mature'>('all');

  const stages = [
    { value: 'all', label: '全部商机' },
    { value: 'emerging', label: '萌芽期' },
    { value: 'explosive', label: '爆发期' },
    { value: 'mature', label: '成熟期' }
  ];

  const filteredOpportunities = OPPORTUNITIES.filter(opp => 
    filterStage === 'all' || opp.lifecycleStage === filterStage
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-white font-mono text-xs uppercase tracking-widest font-bold">AI-Powered Opportunity Discovery</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              爆款商机推荐
            </h1>
            
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              我们的 Agent 实时监测 TikTok 趋势，自动匹配已认证的工厂，为你生成完整的供应链方案。每个商机都包含流量分析、工厂匹配和 ROI 预测。
            </p>

            {/* 统计数据 */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-1">{OPPORTUNITIES.length}</div>
                <div className="text-sm text-white/70 uppercase font-mono">活跃商机</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-black text-amber-300 mb-1">
                  {OPPORTUNITIES.filter(o => o.lifecycleStage === 'explosive').length}
                </div>
                <div className="text-sm text-white/70 uppercase font-mono">爆发期商机</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-black text-emerald-300 mb-1">
                  {OPPORTUNITIES.reduce((sum, o) => sum + o.matchedFactories.length, 0)}
                </div>
                <div className="text-sm text-white/70 uppercase font-mono">工厂匹配数</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 主体内容 */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        {/* 筛选栏 */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">按生命周期筛选</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {stages.map(stage => (
              <button
                key={stage.value}
                onClick={() => setFilterStage(stage.value as any)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  filterStage === stage.value 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {stage.label}
              </button>
            ))}
          </div>
        </div>

        {/* 商机列表 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-slate-900">
              找到 <span className="text-blue-600">{filteredOpportunities.length}</span> 个商机
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>实时更新中</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard 
                key={opportunity.id} 
                opportunity={opportunity} 
                onViewDetails={(id) => {
                  const opp = OPPORTUNITIES.find(o => o.id === id);
                  setSelectedOpportunity(opp || null);
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* 空状态 */}
        {filteredOpportunities.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">暂无匹配的商机</h3>
            <p className="text-slate-500 text-sm">尝试调整筛选条件</p>
          </div>
        )}
      </div>

      {/* 详情对话框 */}
      <OpportunityDetailDialog 
        opportunity={selectedOpportunity}
        isOpen={!!selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        onViewFactory={onViewFactory}
      />
    </div>
  );
};
