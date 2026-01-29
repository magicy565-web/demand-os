"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

function StatItem({ value, suffix, label }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="text-center">
      <motion.p className="text-5xl font-serif font-bold text-slate-900 mb-2">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </motion.p>
      <p className="text-slate-600">{label}</p>
    </div>
  );
}

export default function ImpactStats() {
  const stats = [
    { value: 52, suffix: "亿美元", label: "促成交易额" },
    { value: 120, suffix: "+", label: "覆盖国家" },
    { value: 850, suffix: "+", label: "工业合作伙伴" },
    { value: 30, suffix: "%", label: "平均利润增长" },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
