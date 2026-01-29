"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BentoGrid, BentoGridItem } from "./BentoGrid";
import {
  RadarCard,
  AIMatchingCard,
  MetricsCard,
  FinanceCard,
  LogisticsCard,
  ManufacturingCard,
} from "./BentoCards";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function SaaSHero() {
  return (
    <div className="min-h-[150vh] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
      {/* 顶部标题 */}
      <motion.div
        className="max-w-7xl mx-auto px-4 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
          Demand-OS
        </h1>
        <p className="text-xl text-slate-300 mb-4 max-w-2xl">
          工业园区操作系统 • 数字孪生 × 全球供需网络
        </p>
        <p className="text-sm text-slate-400 font-mono">
          实时监控 • 智能匹配 • 全球物流 • 产能协作
        </p>

        <div className="flex gap-4 mt-8 flex-wrap">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
          >
            进入演示 →
          </Link>
          <button className="px-6 py-3 border border-blue-400/50 text-blue-300 hover:border-blue-400 font-bold rounded-lg transition">
            联系我们
          </button>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        className="max-w-7xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <BentoGrid>
          {/* 左上：2x2 大卡 - 需求雷达 */}
          <BentoGridItem colSpan="col-span-2" rowSpan="row-span-2">
            <RadarCard />
          </BentoGridItem>

          {/* 右上：1x2 竖长卡 - AI 匹配 */}
          <BentoGridItem colSpan="col-span-1" rowSpan="row-span-2">
            <AIMatchingCard />
          </BentoGridItem>

          {/* 右上角：1x1 小卡 - 指标 */}
          <BentoGridItem colSpan="col-span-1" rowSpan="row-span-1">
            <MetricsCard />
          </BentoGridItem>

          {/* 右下：1x1 小卡 - 财务 */}
          <BentoGridItem colSpan="col-span-1" rowSpan="row-span-1">
            <FinanceCard />
          </BentoGridItem>

          {/* 底部：2x1 宽卡 - 物流 */}
          <BentoGridItem colSpan="col-span-2" rowSpan="row-span-1">
            <LogisticsCard />
          </BentoGridItem>

          {/* 底部：2x1 宽卡 - 共享制造 */}
          <BentoGridItem colSpan="col-span-2" rowSpan="row-span-1">
            <ManufacturingCard />
          </BentoGridItem>
        </BentoGrid>
      </motion.div>

      {/* 统计区域 */}
      <motion.div
        className="max-w-7xl mx-auto px-4 mt-20 py-12 border-t border-slate-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "全球企业", value: "5,000+", icon: "🌍" },
            { label: "日均需求", value: "50,000+", icon: "📊" },
            { label: "成功匹配", value: "100,000+", icon: "✅" },
            { label: "运营年份", value: "5+", icon: "⏳" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="text-2xl font-bold text-blue-400">{stat.value}</p>
              <p className="text-xs text-slate-400 font-mono mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
