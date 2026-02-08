"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Sparkles, Clock, Home, Package, TrendingUp, Users } from "lucide-react"
import Image from "next/image"

const deliveryProcess = {
  id: "home-living",
  title: "家居生活行业案例",
  subtitle: "北欧风家居品牌的线上化转型",
  heroImage: "https://private-us-east-1.manuscdn.com/sessionFile/R0c9ZhwmUyT2pJaWYw3mso/sandbox/80juEtlhZLUETVPgJ7BIDN-img-3_1770536735000_na1fn_aG9tZS1saXZpbmctY2FzZS1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUjBjOVpod21VeVQycEphV1l3M21zby9zYW5kYm94LzgwanVFdGxoWkxVRVRWUGdKN0JJRE4taW1nLTNfMTc3MDUzNjczNTAwMF9uYTFmbl9hRzl0WlMxc2FYWnBibWN0WTJGelpTMW9aWEp2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ZQQwaJmxChYiBwpx-0tG-t~8pembUXedsfSwzc8GWhR0Yg6KFSqo4uHAEHZW5iHmIIvqbhfEec9ePI6EOysCk44IVthWLKuxLV-8qcVoxsLh4V12SQdq-ejtjNu9b7sWlEHC~04H6WLYlqSyY~WlRjti3f6kBYxWnlJfi6P2ORXMCjnI9Oi8QzlCUyMssRfvMdGOGpo5ywGmQIcfuE665fFHEmWcBnJW~t9leGOdGBE-FJw9D0wyDjXxTAHeQ-oyqCUwW6Y6GxXgpTpntxn92zPHRZsxfJsWiNyqlEaY1dmP00thVDiMdrbukjPDY6KQkkiNzXhzZKqzT~zydQGO0A__",
  description: "通过 Demand-OS 平台，帮助传统家居品牌完成线上化转型，建立 DTC 业务模式",
  
  phases: [
    {
      phase: "第一阶段",
      title: "品牌重塑与产品规划",
      duration: "4周",
      icon: Home,
      color: "from-green-500 to-emerald-500",
      deliverables: [
        "完成品牌视觉系统升级",
        "制定产品线规划",
        "完成目标客户画像",
        "建立品牌故事体系"
      ]
    },
    {
      phase: "第二阶段",
      title: "供应链数字化改造",
      duration: "5周",
      icon: Package,
      color: "from-emerald-500 to-green-600",
      deliverables: [
        "对接12家家居制造工厂",
        "建立数字化订单系统",
        "完成库存管理系统搭建",
        "建立物流配送网络"
      ]
    },
    {
      phase: "第三阶段",
      title: "电商平台搭建",
      duration: "6周",
      icon: TrendingUp,
      color: "from-green-600 to-emerald-600",
      deliverables: [
        "建立独立站商城",
        "入驻主流电商平台",
        "完成支付系统对接",
        "建立客服体系"
      ]
    },
    {
      phase: "第四阶段",
      title: "内容营销与社群运营",
      duration: "持续进行",
      icon: Users,
      color: "from-emerald-600 to-green-700",
      deliverables: [
        "建立内容创作团队",
        "启动社交媒体运营",
        "建立用户社群",
        "持续优化用户体验"
      ]
    }
  ],

  outcomes: [
    { title: "线上转型", description: "6个月完成全渠道数字化", icon: "🏠" },
    { title: "供应链升级", description: "12家工厂数字化对接", icon: "📦" },
    { title: "用户增长", description: "社群用户突破10万", icon: "👥" },
    { title: "业绩提升", description: "线上销售占比达60%", icon: "📈" }
  ]
}

export default function HomeLivingCasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image src={deliveryProcess.heroImage} alt="家居生活产品" fill className="object-cover opacity-20" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-green-50/90 to-emerald-50"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full text-green-700 text-sm font-semibold mb-6 shadow-sm">
              <Home className="w-4 h-4" />成功案例
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">{deliveryProcess.title}</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">{deliveryProcess.subtitle}</p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{deliveryProcess.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">项目交付流程</h2>
            <p className="text-xl text-gray-600">从品牌重塑到持续运营的完整交付过程</p>
          </motion.div>
          <div className="space-y-12">
            {deliveryProcess.phases.map((phase, index) => {
              const Icon = phase.icon
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="relative">
                  {index < deliveryProcess.phases.length - 1 && <div className="absolute left-8 md:left-12 top-24 w-0.5 h-full bg-gradient-to-b from-green-300 to-transparent"></div>}
                  <div className="flex gap-6 md:gap-12">
                    <div className="flex-shrink-0 relative z-10">
                      <div className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-xl`}>
                        <Icon className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-green-100">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">{phase.phase}</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold flex items-center gap-2">
                          <Clock className="w-4 h-4" />{phase.duration}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">{phase.title}</h3>
                      <div className="space-y-3">
                        <div className="text-sm font-bold text-gray-700 mb-3">交付成果：</div>
                        {phase.deliverables.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mt-0.5">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-gray-700 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">项目成果</h2>
            <p className="text-xl text-gray-600">可见的业务成果与价值</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryProcess.outcomes.map((outcome, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 text-center hover:shadow-xl transition-all hover:scale-105">
                <div className="text-5xl mb-4">{outcome.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{outcome.title}</h3>
                <p className="text-gray-600">{outcome.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-3xl p-12 shadow-2xl border border-green-100">
            <h2 className="text-4xl font-black text-gray-900 mb-6">开启您的成功之旅</h2>
            <p className="text-xl text-gray-600 mb-8">让 Demand-OS 帮助您实现业务增长</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/cases" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
                查看更多案例<ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/accio" className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-green-600 text-green-600 rounded-xl font-bold text-lg hover:bg-green-50 transition-all">
                <Sparkles className="w-5 h-5" />开始咨询
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
