"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  color: string;
  icon: string;
}

const MOCK_STATS: StatItem[] = [
  { label: "活跃需求", value: 1247, suffix: "", color: "cyber-cyan", icon: "📊" },
  { label: "覆盖地区", value: 42, suffix: "+", color: "cyber-purple", icon: "🌍" },
  { label: "行业分类", value: 18, suffix: "", color: "cyber-pink", icon: "🏭" },
  { label: "今日新增", value: 89, suffix: "", color: "cyber-green", icon: "⚡" },
];

function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // 使用 easeOutExpo 缓动
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(easeOutExpo * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
}

export function StatsPanel() {
  const [stats] = useState<StatItem[]>(MOCK_STATS);

  return (
    <section className="py-12 relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-purple/5 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative bg-cyber-dark/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 overflow-hidden transition-all hover:border-cyber-cyan/50">
                {/* 图标 */}
                <div className="text-3xl mb-3">{stat.icon}</div>

                {/* 数值 */}
                <div className={`text-3xl md:text-4xl font-bold font-cyber text-${stat.color} mb-2`}>
                  <AnimatedNumber value={stat.value} />
                  {stat.suffix}
                </div>

                {/* 标签 */}
                <div className="text-sm text-gray-400 font-mono">{stat.label}</div>

                {/* 发光效果 */}
                <div
                  className={`absolute -bottom-10 -right-10 w-32 h-32 bg-${stat.color}/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`}
                />

                {/* 顶部装饰线 */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-${stat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
