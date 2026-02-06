'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChinaIndustrialMap from '@/components/industrial-map/ChinaIndustrialMap';
import { IndustrialBelt } from '@/types/industrial';
import { TrendingUp, Users, DollarSign, Clock, Filter, X, Search, ZoomIn, ZoomOut } from 'lucide-react';

export function IndustrialMapHero() {
  const [industrialBelts, setIndustrialBelts] = useState<IndustrialBelt[]>([]);
  const [filteredBelts, setFilteredBelts] = useState<IndustrialBelt[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filterMode, setFilterMode] = useState<'province' | 'category'>('province');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapScale, setMapScale] = useState<number>(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

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

  // 返回值前重置地图状态
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

  // 处理鼠标按下
  const handleMouseDown = (e: React.MouseEvent) => {
    if (mapScale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y });
  };

  // 处理鼠标移动
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || mapScale <= 1) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // 限制拖动范围
    const maxX = (mapScale - 1) * (mapContainerRef.current?.offsetWidth || 0) / 2;
    const maxY = (mapScale - 1) * (mapContainerRef.current?.offsetHeight || 0) / 2;
    
    setMapPosition({
      x: Math.max(-maxX, Math.min(maxX, newX)),
      y: Math.max(-maxY, Math.min(maxY, newY))
    });
  };

  // 处理鼠标抬起
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 重置缩放和位置
  const resetMap = () => {
    setMapScale(1);
    setMapPosition({ x: 0, y: 0 });
  };

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
          <h1 className="text-5xl font-black text-cyan-300 mb-1 leading-tight">
            链智云
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-4" />
          <p className="text-cyan-100 text-lg mb-2 font-semibold">
            中国产业带智能导航
          </p>
          <p className="text-slate-300/80 text-sm leading-relaxed mb-6">
            点击产业带标注，探索智能采购解决方案
          </p>
          
          {/* 实时数据指标 */}
          <div className="hidden lg:flex flex-col gap-3">
            <StatCard icon={<Users className="w-5 h-5" />} label="入驻企业" value="142+" />
            <StatCard icon={<DollarSign className="w-5 h-5" />} label="撮合GMV" value="¥24.5亿" />
            <StatCard icon={<Clock className="w-5 h-5" />} label="周期缩短" value="60%" />
          </div>
        </div>
      </motion.div>

      {/* 中国产业带地图 - 占据全屏 */}
      <div 
        ref={mapContainerRef}
        className="absolute inset-0 overflow-hidden bg-slate-950 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          style={{ 
            transform: `scale(${mapScale}) translate(${mapPosition.x / mapScale}px, ${mapPosition.y / mapScale}px)`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.3s ease'
          }}
          className="w-full h-full origin-center"
        >
          <ChinaIndustrialMap
            industrialBelts={filteredBelts}
            onBeltClick={handleBeltClick}
          />
        </div>
      </div>

      {/* 右侧缩放控制 */}
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <button
          onClick={() => {
            setMapScale(Math.min(mapScale + 0.2, 2));
            setMapPosition({ x: 0, y: 0 });
          }}
          className="p-3 bg-cyan-500/20 backdrop-blur-md rounded-xl border border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-500/10 hover:bg-cyan-500/30"
          title="放大"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            setMapScale(Math.max(mapScale - 0.2, 0.8));
            setMapPosition({ x: 0, y: 0 });
          }}
          className="p-3 bg-cyan-500/20 backdrop-blur-md rounded-xl border border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-500/10 hover:bg-cyan-500/30"
          title="缩小"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        {mapScale !== 1 && (
          <button
            onClick={resetMap}
            className="p-3 bg-cyan-500/20 backdrop-blur-md rounded-xl border border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-500/10 hover:bg-cyan-500/30 text-xs font-medium"
            title="重置"
          >
            重置
          </button>
        )}
        <div className="text-xs text-slate-400 text-center mt-1">{Math.round(mapScale * 100)}%</div>
      </motion.div>

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
    <div className="flex items-center gap-3 px-4 py-3 bg-slate-900/60 backdrop-blur-xl rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-500/10">
      <div className="text-cyan-400 flex-shrink-0">{icon}</div>
      <div>
        <div className="text-xs text-slate-400/80 font-medium">{label}</div>
        <div className="text-lg font-bold text-white">{value}</div>
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
