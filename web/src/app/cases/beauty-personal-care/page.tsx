"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Award, TrendingUp, Users, DollarSign, ArrowRight, CheckCircle2, Sparkles, BarChart3, ShoppingBag, Target } from "lucide-react"

const caseData = {
  id: "beauty-personal-care",
  title: "美妆个护行业",
  company: "某新锐美妆品牌",
  industry: "美妆个护",
  description: "利用 AI 选品和内容创作，实现 TikTok Shop 快速增长",
  challenge: "新品牌进入竞争激烈的美妆市场，需要快速建立品牌认知度并实现销售增长。面临选品困难、内容创作成本高、供应链不稳定等挑战。",
  solution: "通过 Demand-OS 的 AI 选品系统分析市场趋势，利用内容创作 Agent 生成高质量营销内容，精准匹配优质供应商，快速在 TikTok Shop 建立品牌影响力。",
  results: {
    revenue: "+350%",
    efficiency: "+55%",
    cost: "-28%",
    time: "4个月",
  },
  metrics: [
    { label: "月销售额", value: "$2.5M", change: "+350%" },
    { label: "转化率", value: "8.5%", change: "+180%" },
    { label: "客单价", value: "$85", change: "+45%" },
    { label: "复购率", value: "42%", change: "+120%" },
  ],
  highlights: [
    "TikTok 爆款打造：3款产品进入平台 Top 100",
    "AI 内容生成：每日产出 50+ 条优质内容，成本降低 70%",
    "精准供应商匹配：对接 15 家优质工厂，交付周期缩短 40%",
    "数据驱动决策：实时分析 100+ 数据指标，快速调整策略",
  ],
  timeline: [
    { phase: "第1个月", title: "市场调研与选品", description: "AI 分析市场趋势，确定 3 个核心产品线" },
    { phase: "第2个月", title: "供应链搭建", description: "匹配 15 家优质供应商，建立稳定供应链" },
    { phase: "第3个月", title: "内容营销启动", description: "AI 生成内容，TikTok 账号快速涨粉" },
    { phase: "第4个月", title: "爆款打造", description: "3款产品成为爆款，月销售额突破 $2.5M" },
  ],
  testimonial: {
    quote: "Demand-OS 的 AI 选品和内容创作能力让我们在短时间内建立了品牌影响力。供应链匹配也非常精准，帮助我们快速响应市场需求。",
    author: "品牌创始人",
    role: "CEO",
  },
}

const stats = [
  { label: "项目周期", value: "4个月", icon: Target },
  { label: "营收增长", value: "+350%", icon: TrendingUp },
  { label: "成本降低", value: "-28%", icon: DollarSign },
  { label: "客户满意度", value: "98%", icon: Users },
]

export default function BeautyPersonalCareCasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-pink-900 via-rose-900 to-pink-900 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(244,114,182,0.1),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-pink-200 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              {caseData.industry} 成功案例
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              {caseData.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl leading-relaxed">
              {caseData.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-sm text-pink-200">客户</div>
                <div className="font-bold">{caseData.company}</div>
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-sm text-pink-200">行业</div>
                <div className="font-bold">{caseData.industry}</div>
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-sm text-pink-200">周期</div>
                <div className="font-bold">{caseData.results.time}</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all"
                  >
                    <Icon className="w-8 h-8 text-pink-300 mx-auto mb-3" />
                    <div className="text-3xl font-black mb-1">{stat.value}</div>
                    <div className="text-sm text-pink-200">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-black text-gray-900 mb-6">面临的挑战</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {caseData.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-black text-gray-900 mb-6">解决方案</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {caseData.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              核心业务指标
            </h2>
            <p className="text-xl text-gray-600">
              可量化的业务成果
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseData.metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100"
              >
                <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                <div className="text-4xl font-black text-gray-900 mb-2">{metric.value}</div>
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  {metric.change}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              核心亮点
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {caseData.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white rounded-xl border border-pink-100 shadow-sm"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg text-gray-700">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              实施时间线
            </h2>
          </motion.div>

          <div className="space-y-8">
            {caseData.timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="inline-block px-3 py-1 bg-pink-600 text-white rounded-full text-sm font-bold">
                    {item.phase}
                  </div>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-pink-200 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-12 shadow-xl"
          >
            <div className="text-6xl text-pink-600 mb-6">"</div>
            <p className="text-2xl text-gray-800 mb-8 leading-relaxed">
              {caseData.testimonial.quote}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-rose-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {caseData.testimonial.author[0]}
              </div>
              <div>
                <div className="font-bold text-gray-900">{caseData.testimonial.author}</div>
                <div className="text-gray-600">{caseData.testimonial.role} · {caseData.company}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              准备好开始您的成功故事了吗？
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              联系我们，了解 Demand-OS 如何帮助您的业务增长
            </p>
            <Link
              href="/cases-intro"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <BarChart3 className="w-5 h-5" />
              查看更多案例
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
