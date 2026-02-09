'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { IndustrialBelt } from '@/types/industrial';
import { ArrowLeft, MapPin, Factory, TrendingUp, Package, Award, Users, Zap, Globe, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function IndustrialBeltDetailPage() {
  const params = useParams();
  const router = useRouter();
  const beltId = params.id as string;
  
  const [belt, setBelt] = useState<IndustrialBelt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-4">未找到该产业带</p>
          <Link href="/industrial-os">
            <button className="px-6 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-all">
              返回产业带导航
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // 根据产业带 ID 选择颜色
  const colorSchemes = [
    { accent: 'cyan', gradient: 'from-cyan-500 to-blue-500' },
    { accent: 'purple', gradient: 'from-purple-500 to-pink-500' },
    { accent: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
    { accent: 'orange', gradient: 'from-orange-500 to-red-500' },
    { accent: 'indigo', gradient: 'from-indigo-500 to-violet-500' },
  ];
  const colorScheme = colorSchemes[belt.id % colorSchemes.length];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* 返回按钮 */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/industrial-os">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-700/50 rounded-lg text-slate-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-all">
            <ArrowLeft className="w-4 h-4" />
            返回导航
          </button>
        </Link>
      </motion.div>

      {/* 英雄区域 */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20 pb-12 px-6">
        {/* 背景装饰 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute top-1/4 right-1/4 w-96 h-96 bg-${colorScheme.accent}-500/10 rounded-full blur-3xl`} />
          <div className={`absolute bottom-1/4 left-1/4 w-96 h-96 bg-${colorScheme.accent}-500/5 rounded-full blur-3xl`} />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 标题 */}
          <h1 className={`text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}>
            {belt.name}
          </h1>

          {/* 位置信息 */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <MapPin className="w-6 h-6 text-slate-400" />
            <p className="text-xl text-slate-300">{belt.province}</p>
          </div>

          {/* 核心数据卡片 - 4列 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* 工厂数量 */}
            <motion.div
              className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:border-cyan-400/50 transition-all"
              whileHover={{ y: -4 }}
            >
              <Factory className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-sm text-slate-400">工厂数量</div>
              <div className="text-2xl font-bold text-cyan-400">
                {belt.factory_count > 1000 ? `${(belt.factory_count / 1000).toFixed(1)}K` : belt.factory_count}
              </div>
            </motion.div>

            {/* 产品类别 */}
            <motion.div
              className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:border-purple-400/50 transition-all"
              whileHover={{ y: -4 }}
            >
              <Package className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-sm text-slate-400">产品类别</div>
              <div className="text-2xl font-bold text-purple-400">{belt.core_products.length}</div>
            </motion.div>

            {/* 年增长率 */}
            <motion.div
              className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:border-emerald-400/50 transition-all"
              whileHover={{ y: -4 }}
            >
              <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-sm text-slate-400">年增长率</div>
              <div className="text-2xl font-bold text-emerald-400">+12%</div>
            </motion.div>

            {/* 全球覆盖 */}
            <motion.div
              className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:border-orange-400/50 transition-all"
              whileHover={{ y: -4 }}
            >
              <Globe className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <div className="text-sm text-slate-400">全球覆盖</div>
              <div className="text-2xl font-bold text-orange-400">150+</div>
            </motion.div>
          </div>

          {/* CTA 按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className={`px-8 py-3 bg-gradient-to-r ${colorScheme.gradient} text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-5 h-5" />
              立即采购
            </motion.button>
            <motion.button
              className="px-8 py-3 bg-slate-900/50 border border-slate-700/50 text-white font-semibold rounded-lg hover:border-slate-600 transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              联系我们
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* 产业优势 */}
      <section className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-400" />
              产业优势
            </h2>
            <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-xl">
              <p className="text-lg text-slate-300 leading-relaxed">{belt.advantages}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 核心产品线 */}
      <section className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <Package className="w-8 h-8 text-purple-400" />
              核心产品线
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {belt.core_products.map((product, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-lg hover:border-purple-400/50 transition-all text-center"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <p className="text-slate-300 font-medium">{product}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 合作机会 */}
      <section className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-emerald-400" />
              合作机会
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* 供应商入驻 */}
              <motion.div
                className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl hover:border-emerald-400/60 transition-all"
                whileHover={{ y: -4 }}
              >
                <h3 className="text-xl font-bold text-emerald-400 mb-3">供应商入驻</h3>
                <p className="text-slate-300 mb-4">
                  加入我们的供应商网络，获得更多采购商机会。
                </p>
                <button className="px-4 py-2 bg-emerald-500/20 border border-emerald-400/50 rounded-lg text-emerald-400 hover:bg-emerald-500/30 transition-all">
                  了解详情
                </button>
              </motion.div>

              {/* 采购商合作 */}
              <motion.div
                className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl hover:border-cyan-400/60 transition-all"
                whileHover={{ y: -4 }}
              >
                <h3 className="text-xl font-bold text-cyan-400 mb-3">采购商合作</h3>
                <p className="text-slate-300 mb-4">
                  直接对接优质供应商，获得最优采购方案。
                </p>
                <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-all">
                  立即采购
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 联系方式 */}
      <section className="relative py-16 px-6 border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <Mail className="w-8 h-8 text-orange-400" />
              联系我们
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-xl">
                <p className="text-slate-400 mb-2">电话</p>
                <p className="text-xl text-white font-semibold">400-800-8888</p>
              </div>
              <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-xl">
                <p className="text-slate-400 mb-2">邮箱</p>
                <p className="text-xl text-white font-semibold">info@cnsubscribe.xyz</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
