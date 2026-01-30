"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 520, suffix: "亿", label: "年度交易额", color: "text-[#00509d]" },
  { value: 120, suffix: "+", label: "服务国家", color: "text-[#00509d]" },
  { value: 850, suffix: "+", label: "合作伙伴", color: "text-[#00509d]" },
  { value: 30, suffix: "%", label: "年增长率", color: "text-[#00509d]" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function HybridStats() {
  return (
    <section className="relative w-full bg-[#051c2c] py-32">
      {/* 微妙网格背景 - Apple风格 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* 渐变光晕 - Apple风格 */}
      <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#00509d]/20 blur-[120px]" />
      <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-[#00509d]/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* 标题 - 麦肯锡风格内容 + Apple动画 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-4 text-5xl font-serif font-bold text-white lg:text-6xl">
            全球企业的信赖之选
          </h2>
          <p className="text-xl text-white/60">
            数据驱动决策，助力企业全球化增长
          </p>
        </motion.div>

        {/* 统计卡片 - Apple动画 + 麦肯锡配色 */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-105"
            >
              {/* 卡片光晕 */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00509d]/0 blur-2xl transition-all duration-500 group-hover:bg-[#00509d]/20" />

              <div className="relative">
                <div className={`mb-6 text-7xl font-bold ${stat.color} lg:text-8xl tracking-tight`}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xl font-medium text-white/90 lg:text-2xl">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
