"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CTASection() {
  return (
    <motion.section
      className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-700"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-4 text-white"
          variants={fadeInUp}
        >
          准备好开始了吗？
        </motion.h2>

        <motion.p
          className="text-xl text-blue-100 mb-8"
          variants={fadeInUp}
        >
          14 天免费试用，无需信用卡，体验完整功能
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          variants={fadeInUp}
        >
          <Link
            href="/"
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition"
          >
            立即开始体验
          </Link>
          <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold rounded-lg transition">
            预约演示
          </button>
        </motion.div>

        <motion.p
          className="text-blue-100 mt-8 text-sm"
          variants={fadeInUp}
        >
          已有 5000+ 企业选择 Demand-OS • 年均处理 600,000+ 供需信息
        </motion.p>
      </div>
    </motion.section>
  );
}
