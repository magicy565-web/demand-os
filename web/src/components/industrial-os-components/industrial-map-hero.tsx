'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChinaIndustrialMap from '@/components/industrial-map/ChinaIndustrialMap';
import { IndustrialBelt } from '@/types/industrial';
import { TrendingUp, Users, DollarSign, Clock, Filter, X } from 'lucide-react';

export function IndustrialMapHero() {
  const [industrialBelts, setIndustrialBelts] = useState<IndustrialBelt[]>([]);
  const [filteredBelts, setFilteredBelts] = useState<IndustrialBelt[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(belt => 
        belt.core_products.some(product => 
          product.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }
    
    setFilteredBelts(filtered);
  }, [selectedProvince, selectedCategory, industrialBelts]);

  const handleBeltClick = (belt: IndustrialBelt) => {
    // 平滑滚动到下一个区域
    const nextSection = document.getElementById('hero-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="relative w-full h-screen flex items-center justify-center bg-slate-950">
        <motion.div
          className="text-cyan-400 text-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          加载中国产业带数据...
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* 顶部标题栏 - 半透明，不遮挡地图 */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-slate-950/70 to-transparent backdrop-blur-sm pointer-events-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                <span className="text-cyan-400">链智云</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-300">中国产业带智能导航</span>
              </h1>
              <p className="text-slate-400 text-xs">
                点击产业带标注，探索智能采购解决方案
              </p>
            </div>
            
            {/* 实时数据指标 */}
            <div className="hidden lg:flex gap-4">
              <StatCard icon={<Users className="w-4 h-4" />} label="入驻企业" value="142+" />
              <StatCard icon={<DollarSign className="w-4 h-4" />} label="撮合GMV" value="¥24.5亿" />
              <StatCard icon={<Clock className="w-4 h-4" />} label="周期缩短" value="60%" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 中国产业带地图 - 占据全屏 */}
      <div className="absolute inset-0">
        <ChinaIndustrialMap
          industrialBelts={filteredBelts}
          onBeltClick={handleBeltClick}
        />
      </div>

      {/* 左侧筛选面板 */}
      <motion.div
        className="absolute left-6 top-32 z-30"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* 筛选按钮 */}
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-700/50 text-white hover:bg-slate-800/80 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Filter className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium">筛选产业带</span>
          {(selectedProvince !== 'all' || selectedCategory !== 'all') && (
            <span className="ml-1 px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
              {filteredBelts.length}
            </span>
          )}
        </motion.button>

        {/* 筛选面板 */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="mt-3 p-4 bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-700/50 min-w-[280px]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* 省份筛选 */}
              <div className="mb-4">
                <label className="block text-xs text-slate-400 mb-2">按省份</label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                >
                  <option value="all">全部省份</option>
                  <option value="Guangdong">广东省</option>
                  <option value="Zhejiang">浙江省</option>
                  <option value="Jiangsu">江苏省</option>
                 <option value="家具">家居家具</option>
                  <option value="小商品">小商品</option>
                  <option value="纺织">纺织丝绸</option>
                  <option value="服装">服装</option>
                  <option value="五金">五金工具</option>
                  <option value="玩具">玩具</option>
                </select>
              </div>

              {/* 重置按钮 */}
              {(selectedProvince !== 'all' || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedProvince('all');
                    setSelectedCategory('all');
                  }}
                  className="w-full px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-3 h-3" />
                  重置筛选
                </button>
              )}

              {/* 结果统计 */}
              <div className="mt-3 pt-3 border-t border-slate-700/50">
                <div className="text-xs text-slate-400">
                  显示 <span className="text-cyan-400 font-semibold">{filteredBelts.length}</span> 个产业带
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// 统计卡片组件 - 更紧凑
function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/30">
      <div className="text-cyan-400">{icon}</div>
      <div>
        <div className="text-[10px] text-slate-400">{label}</div>
        <div className="text-sm font-bold text-white">{value}</div>
      </div>
    </div>
  );
}

// 数据滚动条组件
function DataTicker({ label, value, trend }: { label: string; value: string; trend: 'up' | 'down' | 'neutral' }) {
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-slate-400';
  
  return (
    <motion.div
      className="px-4 py-3 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-700/50 min-w-[240px]"
      animate={{ x: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
    >
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className={`text-sm font-semibold ${trendColor}`}>{value}</div>
    </motion.div>
  );
}
