'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import IndustrialParkMap from '@/components/industrial-map/IndustrialParkMap';
import { TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

export function IndustrialMapHero() {
  const [loading, setLoading] = useState(false);

  const handleParkClick = (parkId: number) => {
    // 平滑滚动到下一个区域
    const nextSection = document.getElementById('hero-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };





  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* 左侧信息面板 */}
      <motion.div
        className="absolute left-6 top-8 z-20 pointer-events-auto"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-sm">
          <h1 className="text-4xl font-black text-cyan-300 mb-1 leading-tight">
            产业园区
          </h1>
          <div className="h-0.5 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-3" />
          <p className="text-cyan-100 text-base mb-2 font-semibold">
            中国主要产业园区智能导航
          </p>
          <p className="text-cyan-200/90 text-xs leading-relaxed mb-5">
            点击产业园区标注，探索智能采购解决方案
          </p>
          
          {/* 实时数据指指 */}
          <div className="hidden lg:flex flex-col gap-2.5">
            <StatCard icon={<Users className="w-4 h-4" />} label="入驻企业" value="142+" />
            <StatCard icon={<DollarSign className="w-4 h-4" />} label="撮合GMV" value="¥24.5亏" />
            <StatCard icon={<Clock className="w-4 h-4" />} label="周期缩短" value="60%" />
          </div>
        </div>
      </motion.div>

      {/* 中国产业园区地图 - 占据全屏 */}
      <div className="absolute inset-0 bg-slate-950 overflow-hidden flex items-center justify-center pointer-events-auto">
        <IndustrialParkMap onParkClick={handleParkClick} />
      </div>
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
