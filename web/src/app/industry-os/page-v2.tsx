'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChinaIndustrialMap from '@/components/industrial-map/ChinaIndustrialMap';
import { IndustrialBeltCardEnhanced } from '@/components/industrial-belt-card-enhanced';
import { IndustrialBelt } from '@/types/industrial';
import { Search, Filter, X } from 'lucide-react';

export default function IndustrialOSPage() {
  const [industrialBelts, setIndustrialBelts] = useState<IndustrialBelt[]>([]);
  const [filteredBelts, setFilteredBelts] = useState<IndustrialBelt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');

  // 加载产业带数据
  useEffect(() => {
    import('@/data/industrial_belts.json')
      .then(module => {
        const belts = module.default as IndustrialBelt[];
        setIndustrialBelts(belts);
        setFilteredBelts(belts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load industrial belts:', err);
        setLoading(false);
      });
  }, []);

  // 应用筛选
  useEffect(() => {
    let filtered = industrialBelts;
    
    if (selectedProvince !== 'all') {
      filtered = filtered.filter(belt => belt.province === selectedProvince);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(belt =>
        belt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        belt.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
        belt.core_products.some(product => product.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredBelts(filtered);
  }, [selectedProvince, industrialBelts, searchQuery]);

  // 获取所有省份
  const provinces = Array.from(new Set(industrialBelts.map(b => b.province)));

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
          className="text-cyan-400 text-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          加载中国产业带数据...
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* 地图部分 */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <ChinaIndustrialMap
          industrialBelts={industrialBelts}
          onBeltClick={() => {}}
        />
      </section>

      {/* 产业带卡片网格部分 */}
      <section className="relative bg-slate-950 py-16 px-6 lg:px-12">
        {/* 背景装饰 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* 标题 */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              中国产业带智能导航
            </h2>
            <p className="text-lg text-slate-300">
              探索142+个产业带，连接全球采购商与优质供应商
            </p>
          </motion.div>

          {/* 搜索和筛选 */}
          <motion.div
            className="mb-12 flex flex-col md:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="搜索产业带..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* 省份筛选 */}
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            >
              <option value="all">全部省份</option>
              {provinces.map(province => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </motion.div>

          {/* 结果统计 */}
          <motion.div
            className="mb-8 text-sm text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            共找到 <span className="text-cyan-400 font-semibold">{filteredBelts.length}</span> 个产业带
          </motion.div>

          {/* 卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBelts.map((belt, idx) => (
              <IndustrialBeltCardEnhanced
                key={belt.id}
                belt={belt}
                index={idx}
              />
            ))}
          </div>

          {/* 空状态 */}
          {filteredBelts.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-slate-400 text-lg mb-4">未找到匹配的产业带</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedProvince('all');
                }}
                className="px-6 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-all"
              >
                清除筛选
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
