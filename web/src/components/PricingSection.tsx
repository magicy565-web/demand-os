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

const pricing = [
  {
    id: "starter",
    name: "创业版",
    monthlyPrice: 999,
    annualPrice: 9990,
    description: "适合初创企业",
    features: [
      "最多 5 个团队成员",
      "基础数据大屏",
      "月浏览 10,000+ 需求",
      "邮件支持",
      "基础报表",
    ],
  },
  {
    id: "business",
    name: "商务版",
    monthlyPrice: 4999,
    annualPrice: 49990,
    description: "适合中型企业",
    recommended: true,
    features: [
      "最多 50 个团队成员",
      "高级数据大屏",
      "月浏览无限需求",
      "优先电话支持",
      "高级报表 & 分析",
      "自定义工作流",
      "API 接口",
    ],
  },
  {
    id: "enterprise",
    name: "企业版",
    monthlyPrice: 9999,
    annualPrice: 99990,
    description: "适合大型企业",
    features: [
      "无限团队成员",
      "企业级数据大屏",
      "实时数据接入",
      "7×24 专属支持",
      "自定义功能开发",
      "SLA 保障",
      "优先级技术支持",
    ],
  },
];

export default function PricingSection() {
  const [activePlan, setActivePlan] = useState("annual");

  return (
    <motion.section
      className="py-20 px-4 bg-slate-900"
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
          灵活定价
        </motion.h2>
        <motion.p
          className="text-center text-slate-300 mb-12"
          variants={fadeInUp}
        >
          选择适合您业务的方案，年付优惠 15%
        </motion.p>

        <motion.div
          className="flex justify-center gap-4 mb-16"
          variants={fadeInUp}
        >
          <button
            onClick={() => setActivePlan("monthly")}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              activePlan === "monthly"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            月付
          </button>
          <button
            onClick={() => setActivePlan("annual")}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              activePlan === "annual"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            年付 (省 15%)
          </button>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {pricing.map((plan) => (
            <motion.div
              key={plan.id}
              className={`p-8 rounded-lg transition ${
                plan.recommended
                  ? "bg-gradient-to-br from-blue-600 to-blue-700 ring-2 ring-blue-400"
                  : "bg-slate-800 border border-slate-700"
              }`}
              variants={fadeInUp}
            >
              {plan.recommended && (
                <p className="text-center text-sm font-bold mb-2 bg-yellow-400 text-slate-900 rounded px-3 py-1 inline-block">
                  推荐
                </p>
              )}
              <h3 className="text-2xl font-bold mb-2 text-white">
                {plan.name}
              </h3>
              <p
                className={`text-sm mb-4 ${
                  plan.recommended ? "text-blue-100" : "text-slate-400"
                }`}
              >
                {plan.description}
              </p>

              <p className="text-3xl font-bold mb-2 text-white">
                ¥{activePlan === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                <span className="text-lg text-slate-400">
                  /{activePlan === "monthly" ? "月" : "年"}
                </span>
              </p>

              <button
                className={`w-full py-2 rounded font-bold mb-8 transition ${
                  plan.recommended
                    ? "bg-white text-blue-600 hover:bg-slate-100"
                    : "border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                }`}
              >
                立即购买
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`flex items-center ${
                      plan.recommended ? "text-blue-50" : "text-slate-300"
                    }`}
                  >
                    <span className="mr-3">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
