'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChinaIndustrialMap from '@/components/industrial-map/ChinaIndustrialMap';
import { IndustrialBelt } from '@/types/industrial';
import { TrendingUp, Users, DollarSign, Clock, Filter, X, Search } from 'lucide-react';

export function IndustrialMapHero() {
  const [industrialBelts, setIndustrialBelts] = useState<IndustrialBelt[]>([]);
  const [filteredBelts, setFilteredBelts] = useState<IndustrialBelt[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filterMode, setFilterMode] = useState<'province' | 'category'>('province');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
    
    if (filterMode === 'province' && selectedProvince !== 'all') {
      filtered = filtered.filter(belt => belt.province === selectedProvince);
    } else if (filterMode === 'category' && selectedCategory !== 'all') {
      filtered = filtered.filter(belt => 
        belt.core_products.some(product => 
          product.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }

    // 搜索过滤
    if (searchQuery.trim()) {
      filtered = filtered.filter(belt =>
        belt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        belt.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
        belt.core_products.some(product => product.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredBelts(filtered);
  }, [selectedProvince, selectedCategory, filterMode, industrialBelts, searchQuery]);

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
      {/* 左侧信息面板 */}
      <motion.div
        className="absolute left-6 top-8 z-20 pointer-events-none"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-sm">
          <h1 className="text-4xl font-black text-cyan-300 mb-1 leading-tight">
            链智云
          </h1>
          <div className="h-0.5 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-3" />
          <p className="text-cyan-100 text-base mb-2 font-semibold">
            中国产业带智能导航
          </p>
          <p className="text-cyan-200/90 text-xs leading-relaxed mb-5">
            点击产业带标注，探索智能采购解决方案
          </p>
          
          {/* 实时数据指标 */}
          <div className="hidden lg:flex flex-col gap-2.5">
            <StatCard icon={<Users className="w-4 h-4" />} label="入驻企业" value="142+" />
            <StatCard icon={<DollarSign className="w-4 h-4" />} label="撮合GMV" value="¥24.5亿" />
            <StatCard icon={<Clock className="w-4 h-4" />} label="周期缩短" value="60%" />
          </div>
        </div>
      </motion.div>

      {/* 中国产业带地图 - 占据全屏 */}
      <div className="absolute inset-0 bg-slate-950 overflow-hidden flex items-center justify-center">
        <ChinaIndustrialMap
          industrialBelts={filteredBelts}
          onBeltClick={handleBeltClick}
        />
      </div>

      {/* 左侧筛选面板 */}
      <motion.div
        className="absolute left-6 bottom-20 z-30"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* 搜索框 */}
        <motion.div
          className="mb-4 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input
              type="text"
              placeholder="搜索产业带..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-cyan-500/30 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all shadow-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* 筛选按钮 */}
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-xl border border-cyan-400/30 text-white hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-500/10"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter className="w-5 h-5 text-cyan-300" />
          <span className="text-sm font-semibold text-cyan-50">筛选产业带</span>
          {((filterMode === 'province' && selectedProvince !== 'all') || 
            (filterMode === 'category' && selectedCategory !== 'all')) && (
            <span className="ml-1 px-2.5 py-0.5 bg-cyan-400 text-slate-900 text-xs font-bold rounded-full">
              {filteredBelts.length}
            </span>
          )}
        </motion.button>

        {/* 筛选面板 */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="mt-3 p-5 bg-white backdrop-blur-xl rounded-xl border border-slate-200 shadow-2xl min-w-[320px]"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* 筛选模式切换 */}
              <div className="mb-4">
                <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                  <button
                    onClick={() => {
                      setFilterMode('province');
                      setSelectedCategory('all');
                    }}
                    className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                      filterMode === 'province'
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    按省份
                  </button>
                  <button
                    onClick={() => {
                      setFilterMode('category');
                      setSelectedProvince('all');
                    }}
                    className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                      filterMode === 'category'
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    按类别
                  </button>
                </div>
              </div>

              {/* 省份筛选 */}
              {filterMode === 'province' && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-xs font-medium text-slate-700 mb-2">选择省份</label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    <option value="all">全部省份</option>
                    <option value="Guangdong">广东省</option>
                    <option value="Zhejiang">浙江省</option>
                    <option value="Jiangsu">江苏省</option>
                  </select>
                </motion.div>
              )}

              {/* 产品类别筛选 */}
              {filterMode === 'category' && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-xs font-medium text-slate-700 mb-2">选择产品类别</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    <option value="all">全部类别</option>
                    <option value="电子">电子信息</option>
                    <option value="模具">模具制造</option>
                    <option value="家具">家居家具</option>
                    <option value="小商品">小商品</option>
                    <option value="纺织">纺织丝绸</option>
                    <option value="服装">服装</option>
                    <option value="五金">五金工具</option>
                    <option value="玩具">玩具</option>
                  </select>
                </motion.div>
              )}

              {/* 重置按钮 */}
              {((filterMode === 'province' && selectedProvince !== 'all') || 
                (filterMode === 'category' && selectedCategory !== 'all')) && (
                <button
                  onClick={() => {
                    setSelectedProvince('all');
                    setSelectedCategory('all');
                  }}
                  className="w-full mt-4 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs text-slate-700 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-3 h-3" />
                  重置筛选
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// 统计卡片组件 - 优化深色主题
function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-900/60 backdrop-blur-xl rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-500/10">
      <div className="text-cyan-400 flex-shrink-0">{icon}</div>
      <div>
        <div className="text-[10px] text-cyan-200/70 font-medium">{label}</div>
        <div className="text-base font-bold text-cyan-50">{value}</div>
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
