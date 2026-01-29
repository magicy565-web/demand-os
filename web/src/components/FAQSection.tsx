"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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

const faqs = [
  {
    question: "什么是 Demand-OS？",
    answer:
      "Demand-OS 是全球领先的供需对接信息系统，利用 AI 技术帮助企业快速发现商机、精准匹配供应商。我们已服务超过 5000 家全球企业。",
  },
  {
    question: "如何开始使用？",
    answer:
      "只需简单三步：1. 注册账户 2. 创建团队 3. 导入数据或手动发布需求。15 分钟内即可开始使用完整功能。",
  },
  {
    question: "支持多语言吗？",
    answer:
      "是的，我们支持中文、英文、日文、韩文等 10+ 种语言。系统会根据您的区域自动选择语言。",
  },
  {
    question: "可以免费试用吗？",
    answer:
      "当然可以！所有新注册用户可享受 14 天免费试用期，无需输入信用卡信息，享受商务版所有功能。",
  },
  {
    question: "如何获得技术支持？",
    answer:
      "创业版享受邮件支持，商务版以上享受优先电话支持。企业版用户还可获得 7×24 专属技术团队支持。",
  },
  {
    question: "数据安全吗？",
    answer:
      "我们采用企业级加密技术、ISO27001 认证、GDPR 合规性、99.9% 可用性 SLA、每日自动备份。您的数据是我们最高优先级。",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <motion.section
      className="py-20 px-4 bg-slate-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-4 text-white"
          variants={fadeInUp}
        >
          常见问题
        </motion.h2>
        <motion.p
          className="text-center text-slate-300 mb-16"
          variants={fadeInUp}
        >
          查看常见问题解答，如需帮助请联系我们的支持团队
        </motion.p>

        <motion.div className="space-y-4" variants={staggerContainer}>
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="border border-slate-600 rounded-lg overflow-hidden"
              variants={fadeInUp}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 bg-slate-700 hover:bg-slate-600 transition flex justify-between items-center text-white font-bold text-left"
              >
                <span>{faq.question}</span>
                <span
                  className={`transition transform ${
                    openIdx === idx ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {openIdx === idx && (
                <motion.div
                  className="p-6 bg-slate-900 text-slate-300"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
