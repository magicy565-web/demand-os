'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChinaIndustrialMap from '@/components/industrial-map/ChinaIndustrialMap';
import { IndustrialBelt } from '@/types/industrial';
import { TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

export function IndustrialMapHero() {
  const [industrialBelts, setIndustrialBelts] = useState<IndustrialBelt[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载产业带数据
  useEffect(() => {
    import('@/data/industrial_belts.json')
      .then(module => {
        setIndustrialBelts(module.default as IndustrialBelt[]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load industrial belts:', err);
        setLoading(false);
      });
  }, []);

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
          industrialBelts={industrialBelts}
          onBeltClick={handleBeltClick}
        />
      </div>

      {/* 右侧动态数据滚动条 */}
      <motion.div
        className="hidden xl:block absolute right-6 top-32 z-30 space-y-3"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <DataTicker
          label="深圳电子产业带"
          value="今日询盘量 +12%"
          trend="up"
        />
        <DataTicker
          label="佛山家居产业带"
          value="平均交期 15 天"
          trend="neutral"
        />
        <DataTicker
          label="义乌小商品产业带"
          value="MOQ 低至 50 件"
          trend="up"
        />
        <DataTicker
          label="宁波模具产业带"
          value="精度 ±0.01mm"
          trend="neutral"
        />
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
