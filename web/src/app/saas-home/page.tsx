"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function SaaSHome() {
  const [activePlan, setActivePlan] = useState("annual");

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
        "企业报表 & BI",
        "完全自定义",
        "私有部署选项",
        "SLA 保障",
      ],
    },
  ];

  const faqs = [
    {
      q: "Demand-OS 是什么？",
      a: "Demand-OS 是一个智能需求对接信息系统，帮助供应商和采购方高效对接全球商机。",
    },
    {
      q: "如何开始使用？",
      a: "注册账户后，可以立即进入演示模式查看数据大屏，或升级为工作台模式进行完整操作。",
    },
    {
      q: "支持多语言吗？",
      a: "目前支持中文和英文，更多语言版本正在开发中。",
    },
    {
      q: "可以免费试用吗？",
      a: "支持 14 天免费试用，无需信用卡，即可体验所有功能。",
    },
    {
      q: "如何获得技术支持？",
      a: "根据套餐等级，提供邮件、电话或专属客成功经理支持。",
    },
    {
      q: "数据安全吗？",
      a: "使用企业级加密、定期安全审计、GDPR 合规，数据 100% 安全可控。",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* 导航栏 */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-blue-400">⚡</span>
            <span>Demand-OS</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-blue-400 transition">
              产品特性
            </a>
            <a href="#pricing" className="hover:text-blue-400 transition">
              定价方案
            </a>
            <a href="#faq" className="hover:text-blue-400 transition">
              常见问题
            </a>
            <Link
              href="/"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            >
              进入系统
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="pt-32 pb-20 px-4"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            全球需求对接
            <br />
            信息系统
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            实时、智能、可靠的全球供需匹配平台
            <br />
            帮助企业高效对接商机，拓展国际市场
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            variants={fadeInUp}
          >
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-105"
            >
              立即体验 →
            </Link>
            <button className="px-8 py-4 border-2 border-blue-400 rounded-lg font-bold text-lg hover:bg-blue-400/10 transition">
              观看演示
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* 统计数据 */}
      <motion.section
        className="py-16 px-4 bg-slate-800/50"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "全球企业", value: "5,000+" },
            { label: "日均需求", value: "50,000+" },
            { label: "成功匹配", value: "100,000+" },
            { label: "运营年份", value: "5+" },
          ].map((stat) => (
            <motion.div key={stat.label} className="text-center" variants={fadeInUp}>
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 产品特性 */}
      <motion.section
        id="features"
        className="py-20 px-4"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={fadeInUp}
          >
            核心产品特性
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 hover:border-blue-400 transition"
                variants={fadeInUp}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 工作模式展示 */}
      <motion.section
        className="py-20 px-4 bg-slate-800/50"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={fadeInUp}
          >
            两种工作模式
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 演示模式 */}
            <motion.div
              className="p-8 rounded-xl border-2 border-slate-600 hover:border-blue-400 transition"
              variants={fadeInUp}
            >
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-4">演示模式</h3>
              <p className="text-gray-300 mb-6">
                无需登录，即可查看实时数据大屏，了解全球需求信息流动态
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>✓ 实时数据可视化</li>
                <li>✓ 需求信息浏览</li>
                <li>✓ 行业趋势分析</li>
                <li>✓ 供应商信息展示</li>
              </ul>
            </motion.div>

            {/* 工作台模式 */}
            <motion.div
              className="p-8 rounded-xl border-2 border-blue-400 bg-blue-400/5 hover:bg-blue-400/10 transition"
              variants={fadeInUp}
            >
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-2xl font-bold mb-4">工作台模式</h3>
              <p className="text-gray-300 mb-6">
                登录工作台，完整功能，专业工具，高效对接全球商机
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>✓ 需求发布与管理</li>
                <li>✓ 智能供应商匹配</li>
                <li>✓ 完整数据分析</li>
                <li>✓ 团队协作工具</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 定价方案 */}
      <motion.section
        id="pricing"
        className="py-20 px-4"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              灵活的定价方案
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActivePlan("monthly")}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  activePlan === "monthly"
                    ? "bg-blue-600"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                月付
              </button>
              <button
                onClick={() => setActivePlan("annual")}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  activePlan === "annual"
                    ? "bg-blue-600"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                年付 (省 15%)
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan) => (
              <motion.div
                key={plan.id}
                className={`p-8 rounded-xl border transition ${
                  plan.recommended
                    ? "border-blue-400 bg-blue-400/5 lg:scale-105"
                    : "border-slate-600 hover:border-blue-400"
                }`}
                variants={fadeInUp}
              >
                {plan.recommended && (
                  <div className="mb-4 inline-block px-3 py-1 bg-blue-600 rounded-full text-sm font-bold">
                    推荐
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ¥{activePlan === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                  </span>
                  <span className="text-gray-400">
                    /{activePlan === "monthly" ? "月" : "年"}
                  </span>
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-bold mb-8 transition ${
                    plan.recommended
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border border-blue-400 text-blue-400 hover:bg-blue-400/10"
                  }`}
                >
                  立即开始
                </button>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-gray-400 flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 常见问题 */}
      <motion.section
        id="faq"
        className="py-20 px-4 bg-slate-800/50"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={fadeInUp}
          >
            常见问题
          </motion.h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                className="p-6 rounded-xl bg-slate-700 cursor-pointer group"
                variants={fadeInUp}
              >
                <summary className="font-bold text-lg flex justify-between items-center">
                  <span>{faq.q}</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-gray-400">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA 区域 */}
      <motion.section
        className="py-20 px-4"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
      >
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-12 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" variants={fadeInUp}>
            准备好开始了吗？
          </motion.h2>
          <motion.p className="text-lg mb-8 text-blue-100" variants={fadeInUp}>
            14 天免费试用，无需信用卡，即可体验完整功能
          </motion.p>
          <motion.div className="flex gap-4 justify-center flex-wrap" variants={fadeInUp}>
            <Link
              href="/"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              立即开始体验
            </Link>
            <button className="px-8 py-4 border-2 border-white rounded-lg font-bold hover:bg-white/10 transition">
              预约演示
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">产品</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">特性</a></li>
                <li><a href="#" className="hover:text-white transition">定价</a></li>
                <li><a href="#" className="hover:text-white transition">安全</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">公司</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition">博客</a></li>
                <li><a href="#" className="hover:text-white transition">招聘</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">法律</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">隐私政策</a></li>
                <li><a href="#" className="hover:text-white transition">服务条款</a></li>
                <li><a href="#" className="hover:text-white transition">联系我们</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">社交媒体</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition">WeChat</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Demand-OS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
