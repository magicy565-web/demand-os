"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Globe, 
  Package,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart
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
  totalDemands = 1234,
  activeMatches = 856,
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
  const maxTrend = Math.max(...trends.map(t => t.count));

  return (
    <div className="space-y-6">
      {/* 主要指标卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <StatMetricCard
          icon={Package}
          label="总需求数"
          value={totalDemands.toLocaleString()}
          change="+12.5%"
          positive
          color="cyan"
        />
        <StatMetricCard
          icon={TrendingUp}
          label="活跃匹配"
          value={activeMatches.toLocaleString()}
          change="+8.3%"
          positive
          color="purple"
        />
        <StatMetricCard
          icon={DollarSign}
          label="总价值"
          value={totalValue}
          change="+23.1%"
          positive
          color="pink"
        />
        <StatMetricCard
          icon={Users}
          label="匹配成功率"
          value="94.2%"
          change="+2.1%"
          positive
          color="green"
        />
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-3 gap-6">
        {/* 趋势图 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyber-cyan" />
              需求趋势
            </h3>
            <span className="text-xs text-white/50">近7天</span>
          </div>
          
          {/* 简单柱状图 */}
          <div className="flex items-end justify-between h-32 gap-2">
            {trends.map((item, index) => (
              <motion.div
                key={item.date}
                className="flex-1 flex flex-col items-center gap-2"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.div
                  className="w-full bg-gradient-to-t from-cyber-cyan to-cyber-purple rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.count / maxTrend) * 100}%` }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                  style={{ minHeight: "20px" }}
                />
                <span className="text-xs text-white/50">{item.date}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 区域分布 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyber-purple" />
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
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* 品类分布 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium flex items-center gap-2">
            <PieChart className="w-5 h-5 text-cyber-pink" />
            品类分布
          </h3>
        </div>
        
        <div className="flex items-center gap-6">
          {/* 简单饼图表示 */}
          <div className="relative w-32 h-32">
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  />
                );
              })}
            </svg>
          </div>
          
          {/* 图例 */}
          <div className="flex-1 grid grid-cols-3 gap-4">
            {categories.map((cat, index) => {
              const colors = ["bg-cyber-cyan", "bg-cyber-purple", "bg-cyber-pink", "bg-green-500", "bg-yellow-500"];
              return (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                  <div>
                    <p className="text-sm text-white">{cat.name}</p>
                    <p className="text-xs text-white/50">{cat.percent}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// 指标卡片组件
function StatMetricCard({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  positive,
  color
}: { 
  icon: any; 
  label: string; 
  value: string; 
  change: string;
  positive: boolean;
  color: "cyan" | "purple" | "pink" | "green";
}) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-2xl bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-3">
        <Icon className={`w-5 h-5 ${iconColors[color]}`} />
        <div className={`flex items-center gap-1 text-xs ${positive ? "text-green-400" : "text-red-400"}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-white/50">{label}</p>
    </motion.div>
  );
}

// 区域进度条
function RegionBar({ name, percent, count, delay }: { name: string; percent: number; count: number; delay: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/80">{name}</span>
        <span className="text-white/50">{count}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ delay: 0.5 + delay, duration: 0.5 }}
          className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full"
        />
      </div>
    </div>
  );
}
