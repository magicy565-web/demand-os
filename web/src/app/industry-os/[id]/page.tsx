'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { IndustrialBelt } from '@/types/industrial';
import { ArrowLeft, MapPin, Factory, TrendingUp, Package, Users, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function IndustrialBeltDetailPage() {
  const params = useParams();
  const router = useRouter();
  const beltId = params.id as string;
  
  const [belt, setBelt] = useState<IndustrialBelt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载产业带数据
    import('@/data/industrial_belts.json')
      .then(module => {
        const belts = module.default as IndustrialBelt[];
        const found = belts.find(b => b.id === parseInt(beltId));
        setBelt(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load industrial belts:', err);
        setLoading(false);
      });
  }, [beltId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
          className="text-cyan-400 text-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          加载产业带详情...
        </motion.div>
      </div>
    );
  }

  if (!belt) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">产业带不存在</h1>
          <Link
            href="/industry-os"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:border-cyan-400 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            返回产业带导航
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* 返回按钮 */}
      <motion.div
        className="relative z-10 pt-8 px-6 lg:px-12"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/industry-os"
          className="inline-flex items-center gap-2 px-4 py-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          返回产业带导航
        </Link>
      </motion.div>

      {/* 主内容 */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-12">
        {/* 标题区域 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {belt.name}
          </h1>
          <div className="flex items-center gap-3 text-lg text-slate-300">
            <MapPin className="w-6 h-6 text-cyan-400" />
            <span>{belt.province}</span>
          </div>
        </motion.div>

        {/* 核心数据卡片网格 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* 工厂数量 */}
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-6 hover:border-cyan-400/60 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Factory className="w-6 h-6 text-cyan-400" />
              <span className="text-sm font-semibold text-slate-300">工厂数量</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {(belt.factory_count / 1000).toFixed(1)}K+
            </div>
            <p className="text-xs text-slate-400 mt-2">已入驻企业</p>
          </div>

          {/* 核心产品数 */}
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 hover:border-purple-400/60 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Package className="w-6 h-6 text-purple-400" />
              <span className="text-sm font-semibold text-slate-300">产品类别</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {belt.core_products.length}
            </div>
            <p className="text-xs text-slate-400 mt-2">核心产品线</p>
          </div>

          {/* 增长率 */}
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl border border-emerald-500/30 p-6 hover:border-emerald-400/60 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              <span className="text-sm font-semibold text-slate-300">年增长率</span>
            </div>
            <div className="text-3xl font-bold text-white">
              +12%
            </div>
            <p className="text-xs text-slate-400 mt-2">同比增长</p>
          </div>

          {/* 全球影响力 */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-6 hover:border-orange-400/60 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-6 h-6 text-orange-400" />
              <span className="text-sm font-semibold text-slate-300">全球覆盖</span>
            </div>
            <div className="text-3xl font-bold text-white">
              150+
            </div>
            <p className="text-xs text-slate-400 mt-2">国家和地区</p>
          </div>
        </motion.div>

        {/* 产业优势 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-cyan-400" />
            产业优势
          </h2>
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
            <p className="text-lg text-slate-200 leading-relaxed">
              {belt.advantages}
            </p>
          </div>
        </motion.div>

        {/* 核心产品 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Package className="w-6 h-6 text-purple-400" />
            核心产品线
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {belt.core_products.map((product, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-4 hover:border-cyan-400/50 transition-all"
                whileHover={{ y: -4 }}
              >
                <p className="text-slate-200 font-medium">{product}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 合作机会 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-emerald-400" />
            合作机会
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-6">
              <h3 className="text-lg font-bold text-white mb-3">供应商入驻</h3>
              <p className="text-slate-300 mb-4">
                加入我们的产业带生态，获得全球采购商的直接接触机会。
              </p>
              <button className="w-full px-4 py-2 bg-cyan-500/30 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-500/50 transition-all">
                了解更多
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
              <h3 className="text-lg font-bold text-white mb-3">采购商合作</h3>
              <p className="text-slate-300 mb-4">
                直接对接优质供应商，获得最具竞争力的产品和价格。
              </p>
              <button className="w-full px-4 py-2 bg-purple-500/30 border border-purple-400/50 rounded-lg text-purple-400 hover:bg-purple-500/50 transition-all">
                开始采购
              </button>
            </div>
          </div>
        </motion.div>

        {/* 返回按钮 */}
        <motion.div
          className="flex justify-center pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/industry-os"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 rounded-lg text-cyan-400 hover:border-cyan-400 hover:from-cyan-500/50 hover:to-blue-500/50 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            返回产业带导航
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
