'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Filter, TrendingUp, BookOpen } from 'lucide-react';
import { CASE_STUDIES } from '@/data/case-studies';
import { CaseStudy } from '@/types/case-study';
import { CaseStudyCard } from './CaseStudyCard';
import { CaseStudyDetailPage } from './CaseStudyDetailPage';

interface CaseStudyLibraryProps {
  onViewFactory: (factoryId: string) => void;
}

export const CaseStudyLibrary: React.FC<CaseStudyLibraryProps> = ({ onViewFactory }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'dropshipping' | 'wholesale' | 'exclusive'>('all');

  const modes = [
    { value: 'all', label: '全部案例' },
    { value: 'dropshipping', label: '一件代发' },
    { value: 'wholesale', label: '批量批发' },
    { value: 'exclusive', label: '独家供应' }
  ];

  const filteredCaseStudies = CASE_STUDIES.filter(cs => 
    filterMode === 'all' || cs.cooperationMode === filterMode
  );

  const totalGMV = CASE_STUDIES.reduce((sum, cs) => sum + cs.metrics.gmv, 0);
  const avgProfitMargin = CASE_STUDIES.reduce((sum, cs) => sum + cs.metrics.profitMargin, 0) / CASE_STUDIES.length;

  if (selectedCaseStudy) {
    return (
      <CaseStudyDetailPage 
        caseStudy={selectedCaseStudy}
        onBack={() => setSelectedCaseStudy(null)}
        onViewFactory={onViewFactory}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">Verified Success Stories</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              成功案例库
            </h1>
            
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              这些都是通过我们平台完成的真实合作案例。每个案例都展示了红人、工厂和产品如何通过我们的认证体系和智能匹配，实现共赢。
            </p>

            {/* 统计数据 */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-1">{CASE_STUDIES.length}</div>
                <div className="text-sm text-white/70 uppercase font-mono">成功案例</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-black text-emerald-400 mb-1">${(totalGMV / 1000).toFixed(0)}K</div>
                <div className="text-sm text-white/70 uppercase font-mono">累计 GMV</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-black text-blue-400 mb-1">{avgProfitMargin.toFixed(0)}%</div>
                <div className="text-sm text-white/70 uppercase font-mono">平均利润率</div>
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
            <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">按合作模式筛选</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {modes.map(mode => (
              <button
                key={mode.value}
                onClick={() => setFilterMode(mode.value as any)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  filterMode === mode.value 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* 案例列表 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-slate-900">
              找到 <span className="text-emerald-600">{filteredCaseStudies.length}</span> 个案例
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Award className="w-3.5 h-3.5 text-emerald-500" />
              <span>所有案例均已验证</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCaseStudies.map((caseStudy) => (
              <CaseStudyCard 
                key={caseStudy.id} 
                caseStudy={caseStudy} 
                onViewDetails={(id) => {
                  const cs = CASE_STUDIES.find(c => c.id === id);
                  setSelectedCaseStudy(cs || null);
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* 空状态 */}
        {filteredCaseStudies.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">暂无匹配的案例</h3>
            <p className="text-slate-500 text-sm">尝试调整筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
};
