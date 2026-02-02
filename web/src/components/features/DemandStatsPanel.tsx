"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Globe, 
  Package,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Sparkles,
  Zap
} from "lucide-react";

interface DemandStatsProps {
  totalDemands: number;
  activeMatches: number;
  totalValue: string;
  regions: { name: string; count: number; percent: number }[];
  categories: { name: string; count: number; percent: number }[];
  trends: { date: string; count: number }[];
}

export function DemandStatsPanel({ 
  totalDemands: initialTotalDemands = 1234,
  activeMatches: initialActiveMatches = 856,
  totalValue = "$12.5M",
  regions = [
    { name: "北美", count: 420, percent: 34 },
    { name: "欧洲", count: 310, percent: 25 },
    { name: "亚太", count: 285, percent: 23 },
    { name: "中国", count: 150, percent: 12 },
    { name: "其他", count: 69, percent: 6 },
  ],
  categories = [
    { name: "消费电子", count: 380, percent: 31 },
    { name: "服装纺织", count: 290, percent: 23 },
    { name: "工业制造", count: 210, percent: 17 },
    { name: "新能源", count: 180, percent: 15 },
    { name: "其他", count: 174, percent: 14 },
  ],
  trends = [
    { date: "Mon", count: 120 },
    { date: "Tue", count: 180 },
    { date: "Wed", count: 150 },
    { date: "Thu", count: 220 },
    { date: "Fri", count: 280 },
    { date: "Sat", count: 190 },
    { date: "Sun", count: 160 },
  ]
}: Partial<DemandStatsProps>) {
  // 实时数据更新
  const [totalDemands, setTotalDemands] = useState(initialTotalDemands);
  const [activeMatches, setActiveMatches] = useState(initialActiveMatches);
  const [displayTrends, setDisplayTrends] = useState(trends);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalDemands(prev => prev + Math.floor(Math.random() * 5));
      setActiveMatches(prev => prev + Math.floor(Math.random() * 3));
      setDisplayTrends(prev => {
        const newTrends = [...prev];
        newTrends[newTrends.length - 1].count += Math.floor(Math.random() * 10);
        return newTrends;
      });
      setLastUpdateTime(new Date());
    }, 8000); // 每8秒更新一次

    return () => clearInterval(interval);
  }, []);

  const maxTrend = Math.max(...displayTrends.map(t => t.count));

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 主要指标卡片 */}
      <motion.div 
        className="grid grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
      >
        <StatMetricCard
          icon={Package}
          label="总需求数"
          value={totalDemands.toLocaleString()}
          change="+12.5%"
          positive
          color="cyan"
          isRealtime
          index={0}
        />
        <StatMetricCard
          icon={TrendingUp}
          label="活跃匹配"
          value={activeMatches.toLocaleString()}
          change="+8.3%"
          positive
          color="purple"
          isRealtime
          index={1}
        />
        <StatMetricCard
          icon={DollarSign}
          label="总价值"
          value={totalValue}
          change="+23.1%"
          positive
          color="pink"
          index={2}
        />
        <StatMetricCard
          icon={Users}
          label="匹配成功率"
          value="94.2%"
          change="+2.1%"
          positive
          color="green"
          index={3}
        />
      </motion.div>

      {/* 图表区域 */}
      <motion.div 
        className="grid grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {/* 趋势图 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.01, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)" }}
          className="col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 hover:border-cyber-cyan/30 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <BarChart3 className="w-5 h-5 text-cyber-cyan" />
              </motion.div>
              需求趋势
            </h3>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-cyber-cyan rounded-full"
              />
              <span className="text-xs text-white/50">近7天</span>
            </div>
          </div>
          
          {/* 简单柱状图 */}
          <div className="flex items-end justify-between h-32 gap-2">
            {displayTrends.map((item, index) => (
              <motion.div
                key={item.date}
                className="flex-1 flex flex-col items-center gap-2 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.08 }}
              >
                <div className="relative w-full flex items-end justify-center">
                  {/* 数值标签 */}
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1, y: -5 }}
                    className="absolute -top-6 text-xs font-bold text-cyber-cyan"
                  >
                    {item.count}
                  </motion.span>
                  
                  <motion.div
                    className="w-full bg-gradient-to-t from-cyber-cyan via-cyber-purple to-cyber-pink rounded-t-lg relative overflow-hidden group-hover:shadow-lg group-hover:shadow-cyber-cyan/50 transition-all"
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.count / maxTrend) * 100}%` }}
                    transition={{ 
                      delay: 0.9 + index * 0.08, 
                      duration: 0.6,
                      type: "spring",
                      bounce: 0.4
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    style={{ minHeight: "20px" }}
                  >
                    {/* 闪光效果 */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"
                      initial={{ y: "100%" }}
                      animate={{ y: "-100%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        delay: index * 0.2
                      }}
                    />
                  </motion.div>
                </div>
                <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors">{item.date}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 区域分布 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.01, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)" }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 hover:border-cyber-purple/30 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="w-5 h-5 text-cyber-purple" />
              </motion.div>
              区域分布
            </h3>
          </div>
          
          <div className="space-y-3">
            {regions.map((region, index) => (
              <RegionBar 
                key={region.name} 
                name={region.name} 
                percent={region.percent} 
                count={region.count}
                delay={0.9 + index * 0.12}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* 品类分布 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        whileHover={{ scale: 1.005, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)" }}
        className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 hover:border-cyber-pink/30 transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <PieChart className="w-5 h-5 text-cyber-pink" />
            </motion.div>
            品类分布
          </h3>
        </div>
        
        <div className="flex items-center gap-6">
          {/* 简单饼图表示 */}
          <div className="relative w-32 h-32 group">
            {/* 中心装饰 */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-cyber-cyan/20 via-cyber-purple/20 to-cyber-pink/20 backdrop-blur-sm flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sparkles className="w-6 h-6 text-white/50" />
              </motion.div>
            </motion.div>

            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {categories.map((cat, index) => {
                const colors = ["#06b6d4", "#a855f7", "#ec4899", "#22c55e", "#eab308"];
                const offset = categories.slice(0, index).reduce((acc, c) => acc + c.percent, 0);
                return (
                  <motion.circle
                    key={cat.name}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={colors[index]}
                    strokeWidth="20"
                    strokeDasharray={`${cat.percent * 2.51} 251`}
                    strokeDashoffset={-offset * 2.51}
                    initial={{ 
                      strokeDasharray: "0 251",
                      opacity: 0 
                    }}
                    animate={{ 
                      strokeDasharray: `${cat.percent * 2.51} 251`,
                      opacity: 1 
                    }}
                    transition={{ 
                      delay: 1.2 + index * 0.15,
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                    whileHover={{
                      strokeWidth: 22,
                      filter: "brightness(1.2)",
                      transition: { duration: 0.2 }
                    }}
                    style={{ cursor: "pointer" }}
                  />
                );
              })}
            </svg>
          </div>
          
          {/* 图例 */}
          <div className="flex-1 grid grid-cols-3 gap-4">
            {categories.map((cat, index) => {
              const colors = ["bg-cyber-cyan", "bg-cyber-purple", "bg-cyber-pink", "bg-green-500", "bg-yellow-500"];
              const textColors = ["text-cyber-cyan", "text-cyber-purple", "text-cyber-pink", "text-green-500", "text-yellow-500"];
              return (
                <motion.div 
                  key={cat.name} 
                  className="flex items-center gap-2 group cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <motion.div 
                    className={`w-3 h-3 rounded-full ${colors[index]} relative`}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(255, 255, 255, 0)",
                        `0 0 10px 2px ${colors[index].replace('bg-', 'rgba(').replace('-', ', ').replace(/\d+$/, '0.5)')}`,
                        "0 0 0 0 rgba(255, 255, 255, 0)"
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/30"
                      animate={{ scale: [0, 2, 0], opacity: [1, 0, 0] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  </motion.div>
                  <div>
                    <motion.p 
                      className={`text-sm text-white group-hover:${textColors[index]} transition-colors font-medium`}
                      whileHover={{ x: 2 }}
                    >
                      {cat.name}
                    </motion.p>
                    <motion.p 
                      className="text-xs text-white/50 group-hover:text-white/80 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                    >
                      {cat.percent}%
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 指标卡片组件
function StatMetricCard({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  positive,
  color,
  isRealtime = false,
  index = 0
}: { 
  icon: any; 
  label: string; 
  value: string; 
  change: string;
  positive: boolean;
  color: "cyan" | "purple" | "pink" | "green";
  isRealtime?: boolean;
  index?: number;
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isRealtime) return;
    
    // 检测到值变化时显示更新动画
    const timeout = setTimeout(() => {
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 600);
    }, 100);

    return () => clearTimeout(timeout);
  }, [value, isRealtime]);

  const colorClasses = {
    cyan: "from-cyber-cyan/20 to-cyber-cyan/5 border-cyber-cyan/30",
    purple: "from-cyber-purple/20 to-cyber-purple/5 border-cyber-purple/30",
    pink: "from-cyber-pink/20 to-cyber-pink/5 border-cyber-pink/30",
    green: "from-green-500/20 to-green-500/5 border-green-500/30",
  };
  
  const iconColors = {
    cyan: "text-cyber-cyan",
    purple: "text-cyber-purple",
    pink: "text-cyber-pink",
    green: "text-green-500",
  };

  const glowColors = {
    cyan: "shadow-cyber-cyan/50",
    purple: "shadow-cyber-purple/50",
    pink: "shadow-cyber-pink/50",
    green: "shadow-green-500/50",
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            type: "spring",
            bounce: 0.5,
            duration: 0.8
          }
        }
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.2 }
      }}
      className={`p-4 rounded-2xl bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-sm relative overflow-hidden cursor-pointer`}
    >
      {/* 背景光晕效果 */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0`}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />

      {/* 实时更新闪烁效果 */}
      {isRealtime && isUpdating && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-white/20"
        />
      )}

      {/* 装饰性粒子 */}
      <motion.div
        className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl ${
          color === 'cyan' ? 'bg-cyber-cyan/20' :
          color === 'purple' ? 'bg-cyber-purple/20' :
          color === 'pink' ? 'bg-cyber-pink/20' :
          'bg-green-500/20'
        }`}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          delay: index * 0.3
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="relative">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className={`w-5 h-5 ${iconColors[color]}`} />
            </motion.div>
            {isRealtime && (
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                  color === 'cyan' ? 'bg-cyber-cyan' :
                  color === 'purple' ? 'bg-cyber-purple' :
                  color === 'pink' ? 'bg-cyber-pink' :
                  'bg-green-500'
                }`}
              />
            )}
          </div>
          <motion.div 
            className={`flex items-center gap-1 text-xs ${positive ? "text-green-400" : "text-red-400"}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <motion.div
              animate={{ y: positive ? [-2, 2, -2] : [2, -2, 2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            </motion.div>
            {change}
          </motion.div>
        </div>
        <motion.p
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="text-2xl font-bold text-white mb-1"
        >
          {value}
        </motion.p>
        <p className="text-xs text-white/50">{label}</p>
      </div>
    </motion.div>
  );
}

// 区域进度条
function RegionBar({ name, percent, count, delay }: { name: string; percent: number; count: number; delay: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="space-y-1 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between text-sm">
        <motion.span 
          className="text-white/80 group-hover:text-white transition-colors"
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.span>
        <motion.span 
          className="text-white/50 group-hover:text-cyber-purple font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          {count}
        </motion.span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden relative">
        {/* 背景闪光效果 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatDelay: 2,
            delay: delay 
          }}
        />
        
        {/* 进度条 */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ 
            delay: delay + 0.3, 
            duration: 0.8,
            type: "spring",
            bounce: 0.3
          }}
          className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink rounded-full relative overflow-hidden"
        >
          {/* 进度条光泽效果 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* 悬停时的脉动效果 */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>
      
      {/* 百分比标签 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        className="text-xs text-cyber-purple font-bold text-right"
      >
        {percent}%
      </motion.div>
    </motion.div>
  );
}
