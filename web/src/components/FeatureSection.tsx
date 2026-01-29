"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const features = [
  {
    icon: "📊",
    title: "实时数据大屏",
    description: "全球需求信息流实时展示，数据可视化分析",
  },
  {
    icon: "🔄",
    title: "智能匹配",
    description: "AI 驱动的需求匹配，精准对接供应商",
  },
  {
    icon: "📱",
    title: "多端适配",
    description: "桌面端、平板、手机完美适配，随时随地掌握商机",
  },
  {
    icon: "🔐",
    title: "安全可靠",
    description: "企业级加密，数据安全可控，合规性完全",
  },
  {
    icon: "⚡",
    title: "高性能",
    description: "秒级响应，支持大并发，稳定可靠",
  },
  {
    icon: "🌍",
    title: "全球覆盖",
    description: "对接全球供应商，拓展国际商机",
  },
];

export default function FeatureSection() {
  return (
    <motion.section
      className="py-20 px-4 bg-slate-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-4 text-white"
          variants={fadeInUp}
        >
          核心特性
        </motion.h2>
        <motion.p
          className="text-center text-slate-300 mb-16"
          variants={fadeInUp}
        >
          为全球企业提供完整的供需对接解决方案
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-700 p-8 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              variants={fadeInUp}
            >
              <p className="text-4xl mb-4">{feature.icon}</p>
              <h3 className="text-xl font-bold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
