"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DemandWaterfallEnhanced } from "@/components/features/DemandWaterfallEnhanced";
// import { ParticleBackground } from "@/components/ParticleBackground"; // 暂时禁用，缺少tsparticles依赖
import { 
  Activity, 
  TrendingUp, 
  Globe, 
  Zap,
  Filter,
  Search,
  X
} from "lucide-react";

export default function DemandOSDemoPage() {
  const [demandCount, setDemandCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const regions = ["北美", "欧洲", "亚洲", "其他"];
  const categories = ["消费电子", "服装纺织", "工业制造", "家居生活", "其他"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#16213e] to-[#0f1419] relative overflow-hidden">
      {/* 粒子背景 - 已禁用 */}
      {/* <ParticleBackground /> */}

      {/* 顶部悬浮状态栏 */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-r from-cyber-purple/10 via-cyber-cyan/5 to-cyber-pink/10 border-b border-cyber-cyan/20"
      >
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo 和标题 */}
            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(6, 182, 212, 0.3)",
                    "0 0 40px rgba(168, 85, 247, 0.3)",
                    "0 0 20px rgba(6, 182, 212, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center"
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple">
                  DEMAND INTELLIGENCE
                </h1>
                <p className="text-xs text-cyber-cyan/60 font-mono">
                  全球需求实时监控中心
                </p>
              </div>
            </div>

            {/* 实时统计 */}
            <div className="flex items-center gap-6">
              <StatCard 
                icon={Activity} 
                label="实时需求" 
                value={demandCount.toString()} 
                color="cyan"
              />
              <StatCard 
                icon={TrendingUp} 
                label="匹配成功率" 
                value="98.5%" 
                color="purple"
              />
              <StatCard 
                icon={Globe} 
                label="覆盖区域" 
                value="50+" 
                color="pink"
              />
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                  showFilters
                    ? "bg-cyber-purple text-white"
                    : "bg-white/5 text-cyber-cyan hover:bg-white/10 border border-cyber-cyan/30"
                }`}
              >
                <Filter className="w-4 h-4" />
                筛选
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-white/5 text-cyber-cyan hover:bg-white/10 border border-cyber-cyan/30 font-medium text-sm flex items-center gap-2 transition-all"
              >
                <Search className="w-4 h-4" />
                搜索
              </motion.button>
            </div>
          </div>

          {/* 筛选面板 */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 border-t border-cyber-cyan/10 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* 区域筛选 */}
                    <div>
                      <label className="text-xs text-cyber-cyan/60 font-mono mb-2 block">
                        目标区域
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {regions.map((region) => (
                          <motion.button
                            key={region}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              setSelectedRegion(
                                selectedRegion === region ? null : region
                              )
                            }
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                              selectedRegion === region
                                ? "bg-cyber-cyan text-black"
                                : "bg-white/5 text-cyber-cyan/80 hover:bg-white/10 border border-cyber-cyan/20"
                            }`}
                          >
                            {region}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* 品类筛选 */}
                    <div>
                      <label className="text-xs text-cyber-cyan/60 font-mono mb-2 block">
                        需求品类
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              setSelectedCategory(
                                selectedCategory === category ? null : category
                              )
                            }
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                              selectedCategory === category
                                ? "bg-cyber-purple text-white"
                                : "bg-white/5 text-cyber-purple/80 hover:bg-white/10 border border-cyber-purple/20"
                            }`}
                          >
                            {category}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 瀑布流内容区 */}
      <div className="pt-32 pb-12 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <DemandWaterfallEnhanced 
            mode="cyber" 
            onDemandCountChange={setDemandCount}
          />
        </div>
      </div>

      {/* 浮动退出按钮 */}
      <motion.a
        href="/saas-home/demand-os"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center shadow-2xl shadow-cyber-purple/50"
      >
        <X className="w-6 h-6 text-white" />
      </motion.a>
    </div>
  );
}

// 统计卡片组件
function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: any; 
  label: string; 
  value: string; 
  color: "cyan" | "purple" | "pink";
}) {
  const colorClasses = {
    cyan: "text-cyber-cyan",
    purple: "text-cyber-purple",
    pink: "text-cyber-pink",
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${colorClasses[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs text-gray-400 font-mono">{label}</div>
        <div className={`text-lg font-cyber font-bold ${colorClasses[color]}`}>
          {value}
        </div>
      </div>
    </div>
  );
}
