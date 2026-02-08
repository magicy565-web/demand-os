"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Award, TrendingUp, Users, DollarSign, ArrowRight, CheckCircle2, Zap, Building2, Sparkles, BarChart3 } from "lucide-react"

const cases = [
  {
    id: "consumer-electronics",
    title: "消费电子行业",
    company: "某智能设备品牌",
    description: "通过 Demand-OS 实现全球供应链整合，产品上市周期缩短 40%",
    icon: Zap,
    color: "from-blue-600 to-indigo-700",
    results: {
      revenue: "+280%",
      efficiency: "+40%",
      cost: "-35%",
      time: "6个月",
    },
    highlights: ["全球供应商整合", "智能选品系统", "快速响应市场", "质量管控优化"],
  },
  {
    id: "beauty-personal-care",
    title: "美妆个护行业",
    company: "某新锐美妆品牌",
    description: "利用 AI 选品和内容创作，实现 TikTok Shop 快速增长",
    icon: Sparkles,
    color: "from-pink-600 to-rose-700",
    results: {
      revenue: "+350%",
      efficiency: "+55%",
      cost: "-28%",
      time: "4个月",
    },
    highlights: ["TikTok 爆款打造", "AI 内容生成", "精准供应商匹配", "数据驱动决策"],
  },
  {
    id: "home-living",
    title: "家居生活行业",
    company: "某家居品牌",
    description: "通过产业带直连和智能匹配，降低采购成本，提升利润率",
    icon: Building2,
    color: "from-amber-600 to-orange-700",
    results: {
      revenue: "+180%",
      efficiency: "+45%",
      cost: "-42%",
      time: "8个月",
    },
    highlights: ["产业带直连", "成本优化", "质量认证体系", "供应链可视化"],
  },
]

const stats = [
  { label: "成功案例", value: "500+", icon: Award },
  { label: "平均增长", value: "270%", icon: TrendingUp },
  { label: "客户满意度", value: "98%", icon: Users },
  { label: "累计GMV", value: "$2.5B", icon: DollarSign },
]

const benefits = [
  "降低采购成本 30-40%",
  "缩短产品上市周期 40-50%",
  "提升供应链效率 50%+",
  "增加营收 200-350%",
  "优化库存周转率",
  "提升产品质量稳定性",
]

export default function CasesIntroPage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-blue-200 text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              客户成功案例
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              成功案例
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              真实的客户故事，可量化的业务成果<br />
              见证 Demand-OS 如何助力企业实现跨越式增长
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
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
                    <Icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                    <div className="text-4xl font-black mb-1">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {cases.map((caseItem, index) => {
              const Icon = caseItem.icon
              const isSelected = selectedCase === caseItem.id
              
              return (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setSelectedCase(caseItem.id)}
                  onMouseLeave={() => setSelectedCase(null)}
                >
                  <Link href={`/cases/${caseItem.id}`}>
                    <div className={`group relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${isSelected ? 'scale-105' : ''}`}>
                      {/* Header with gradient */}
                      <div className={`relative p-6 bg-gradient-to-br ${caseItem.color} text-white`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-black">{caseItem.results.revenue}</div>
                            <div className="text-xs text-white/80">营收增长</div>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-2">
                          {caseItem.title}
                        </h3>
                        <p className="text-sm text-white/90">{caseItem.company}</p>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {caseItem.description}
                        </p>

                        {/* Results Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-slate-50 rounded-xl">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">效率提升</div>
                            <div className="text-lg font-bold text-blue-600">{caseItem.results.efficiency}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">成本降低</div>
                            <div className="text-lg font-bold text-green-600">{caseItem.results.cost}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-xs text-gray-500 mb-1">实施周期</div>
                            <div className="text-lg font-bold text-indigo-600">{caseItem.results.time}</div>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-2 mb-6">
                          {caseItem.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                          查看完整案例
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              客户获得的核心价值
            </h2>
            <p className="text-xl text-gray-600">
              可量化的业务成果，真实的投资回报
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-gray-900">{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <Link
              href="/cases"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <BarChart3 className="w-5 h-5" />
              浏览更多成功案例
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
