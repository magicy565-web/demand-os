"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  Zap,
  Users,
  Building2,
  Rocket,
  Shield,
  Headphones,
} from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "基础版",
    price: { monthly: 999, annual: 9990 },
    description: "适合初创企业和小团队",
    icon: Rocket,
    features: [
      "最多 5 个团队成员",
      "每月 100 条需求查看",
      "基础数据分析",
      "邮件支持",
      "7天历史数据",
      "标准API调用",
    ],
    limitations: [
      "不支持自定义报表",
      "无优先技术支持",
    ],
  },
  {
    id: "business",
    name: "商务版",
    price: { monthly: 4999, annual: 49990 },
    description: "适合成长型企业",
    icon: Building2,
    popular: true,
    features: [
      "最多 50 个团队成员",
      "无限需求查看",
      "高级数据分析",
      "优先邮件+电话支持",
      "90天历史数据",
      "高级API调用",
      "自定义报表",
      "多账户管理",
      "数据导出功能",
    ],
  },
  {
    id: "enterprise",
    name: "企业版",
    price: { monthly: 9999, annual: 99990 },
    description: "适合大型企业",
    icon: Users,
    features: [
      "无限团队成员",
      "无限需求查看",
      "企业级数据分析",
      "7×24 专属客户经理",
      "无限历史数据",
      "无限API调用",
      "自定义功能开发",
      "私有化部署选项",
      "SLA 99.9%保障",
      "专属培训服务",
      "白标定制",
    ],
  },
];

const addons = [
  {
    name: "AI 智能推荐增强包",
    price: 1999,
    description: "深度学习算法，匹配精度提升50%",
    icon: Zap,
  },
  {
    name: "数据安全加密包",
    price: 2999,
    description: "企业级加密，符合SOC2和ISO27001标准",
    icon: Shield,
  },
  {
    name: "专属客户成功服务",
    price: 4999,
    description: "1对1客户经理，定期业务回顾",
    icon: Headphones,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-slate-900 transition" />
            <span className="text-slate-600 group-hover:text-slate-900 transition">返回首页</span>
          </Link>
          <Link href="/saas-home">
            <Image
              src="/logo.png"
              alt="Demand OS"
              width={140}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            灵活的定价方案
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            选择适合您业务规模的方案，随时可升级或降级
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white rounded-full p-2 shadow-lg border border-slate-200">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full font-medium transition ${
                billingCycle === "monthly"
                  ? "bg-blue-500 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              月付
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-full font-medium transition ${
                billingCycle === "annual"
                  ? "bg-blue-500 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              年付
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                省17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl border-2 p-8 ${
                plan.popular
                  ? "border-blue-500 shadow-2xl shadow-blue-500/20 scale-105"
                  : "border-slate-200 hover:border-blue-300 hover:shadow-xl"
              } transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  最受欢迎
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl ${
                  plan.popular ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600"
                }`}>
                  <plan.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
              </div>

              <p className="text-slate-600 mb-6">{plan.description}</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-slate-900">
                    ¥{billingCycle === "monthly" ? plan.price.monthly : (plan.price.annual / 12).toFixed(0)}
                  </span>
                  <span className="text-slate-600">/月</span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-sm text-green-600 mt-2">
                    年付 ¥{plan.price.annual}，节省 ¥{plan.price.monthly * 12 - plan.price.annual}
                  </p>
                )}
              </div>

              <button
                className={`w-full py-3 rounded-xl font-medium transition mb-6 ${
                  plan.popular
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                立即开始
              </button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
                {plan.limitations?.map((limit) => (
                  <div key={limit} className="flex items-start gap-3 opacity-50">
                    <div className="w-5 h-5 flex-shrink-0 mt-0.5">×</div>
                    <span className="text-slate-600 line-through">{limit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            增值服务
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                    <addon.icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    +¥{addon.price}/月
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{addon.name}</h3>
                <p className="text-sm text-slate-600">{addon.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            常见问题
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "可以随时升级或降级吗？",
                a: "可以。您可以随时调整订阅计划，升级立即生效，降级在下个计费周期生效。",
              },
              {
                q: "是否提供免费试用？",
                a: "提供14天免费试用，无需信用卡，试用期内可使用商务版全部功能。",
              },
              {
                q: "支付方式有哪些？",
                a: "支持支付宝、微信支付、银行转账、对公账户等多种支付方式。",
              },
              {
                q: "如何获取发票？",
                a: "登录后台即可自助开具增值税专用发票或普通发票。",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 p-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white"
        >
          <h2 className="text-3xl font-bold mb-4">还有疑问？</h2>
          <p className="text-xl mb-8 opacity-90">
            联系我们的销售团队，获取定制化解决方案
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-xl font-medium hover:shadow-xl transition"
          >
            联系销售
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
