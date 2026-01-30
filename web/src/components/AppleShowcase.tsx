"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Zap, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI 智能匹配",
    description: "毫秒级精准匹配全球供应商",
  },
  {
    icon: Zap,
    title: "实时响应",
    description: "需求即刻捕捉，订单快速流转",
  },
  {
    icon: Globe,
    title: "全球覆盖",
    description: "120+ 国家无缝对接",
  },
  {
    icon: Shield,
    title: "安全保障",
    description: "中国信保全程护航",
  },
];

export default function AppleShowcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-white py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-5xl font-bold tracking-tight text-black lg:text-6xl">
            强大功能
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              尽在掌握
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-black/60 lg:text-2xl">
            为全球贸易而生，让跨境业务变得简单高效
          </p>
        </motion.div>

        {/* 特性网格 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-12 transition-all duration-500 hover:shadow-2xl">
                {/* 图标 */}
                <div className="mb-6 inline-flex rounded-2xl bg-black p-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                {/* 文字 */}
                <h3 className="mb-4 text-3xl font-bold text-black">
                  {feature.title}
                </h3>
                <p className="text-lg text-black/60">{feature.description}</p>

                {/* hover 光晕 */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/0 blur-3xl transition-all duration-500 group-hover:bg-blue-500/10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 中央大卡片 */}
        <motion.div
          style={{ y }}
          className="relative mt-20 overflow-hidden rounded-[2.5rem] bg-black p-16 shadow-2xl"
        >
          <div className="relative z-10 text-center">
            <h3 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
              开启全球贸易新篇章
            </h3>
            <p className="mb-10 text-xl text-white/60">
              加入数千家领先企业，体验 Demand-OS 的强大能力
            </p>
            <button className="rounded-full bg-white px-10 py-5 text-lg font-semibold text-black transition-transform duration-300 hover:scale-105">
              立即开始
            </button>
          </div>

          {/* 背景装饰 */}
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-[100px]" />
        </motion.div>
      </div>
    </section>
  );
}
