"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function SaaSHero() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
          variants={fadeInUp}
        >
          全球需求对接<br />信息系统
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed"
          variants={fadeInUp}
        >
          实时、智能、可靠的全球供需匹配平台<br />
          连接全球 5000+ 企业，日均处理 50,000+ 需求
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center mb-12 flex-wrap"
          variants={fadeInUp}
        >
          <Link
            href="/"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
          >
            立即体验
          </Link>
          <button className="px-8 py-4 border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-bold rounded-lg transition">
            观看演示
          </button>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-700"
          variants={fadeInUp}
        >
          {[
            { label: "全球企业", value: "5000+" },
            { label: "日均需求", value: "50000+" },
            { label: "成功匹配", value: "100000+" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl font-bold text-blue-400">{stat.value}</p>
              <p className="text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
