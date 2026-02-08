"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Rocket, Package, ShoppingCart, BarChart, Target, Users, Sparkles, ArrowRight, Zap } from "lucide-react"

const solutions = [
  {
    id: "30-day-pathway",
    title: "30天出海路径",
    subtitle: "快速启动跨境电商",
    description: "从零到一，30天完成跨境电商全流程搭建，快速进入全球市场",
    icon: Rocket,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    features: ["市场调研", "选品策略", "供应链搭建", "渠道开通"],
    timeline: "30天",
  },
  {
    id: "digital-asset-management",
    title: "数字资产全托管",
    subtitle: "一站式资产管理",
    description: "从产品到内容，从数据到运营，全方位数字资产托管服务",
    icon: Package,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    features: ["产品管理", "内容创作", "数据分析", "运营优化"],
    timeline: "持续服务",
  },
  {
    id: "tiktok-shop-launch",
    title: "TikTok Shop 启动",
    subtitle: "TikTok 电商方案",
    description: "快速开通 TikTok Shop，打造爆款产品，实现流量变现",
    icon: ShoppingCart,
    gradient: "from-pink-500 via-rose-500 to-red-500",
    features: ["账号开通", "内容策划", "爆款打造", "流量运营"],
    timeline: "14天启动",
  },
  {
    id: "supply-chain-optimization",
    title: "供应链优化",
    subtitle: "端到端优化",
    description: "全链路供应链优化，降低成本，提升效率，增强竞争力",
    icon: BarChart,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    features: ["成本分析", "流程优化", "质量管控", "风险管理"],
    timeline: "持续优化",
  },
]

const benefits = [
  { icon: Zap, title: "快速启动", description: "最快14天完成启动" },
  { icon: Target, title: "精准定位", description: "数据驱动决策" },
  { icon: Users, title: "专家团队", description: "10年+行业经验" },
  { icon: Sparkles, title: "AI 赋能", description: "智能化工具支持" },
]

export default function SolutionsIntroPage() {
  const [hoveredSolution, setHoveredSolution] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-cyan-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 max-w-6xl mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-violet-200 rounded-full text-violet-600 text-sm font-semibold mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" />
              完整解决方案
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              从需求到执行<br />
              一站式解决方案
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                href="/solution"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-violet-500/50 transition-all hover:scale-105"
              >
                探索方案
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-violet-300 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-violet-600 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Solutions Grid - REMOVED */}
      {/* <section className="py-32 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {solutions.map((solution, index) => {
              const Icon = solution.icon
              const isHovered = hoveredSolution === solution.id
              
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredSolution(solution.id)}
                  onMouseLeave={() => setHoveredSolution(null)}
                >
                  <Link href={`/solution/${solution.id}`}>
                    <div className={`group relative h-full transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}>
                      {/* Card */}
                      <div className="relative h-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                        {/* Gradient Header */}
                        <div className={`relative h-48 bg-gradient-to-br ${solution.gradient} p-8 flex items-center justify-between`}>
                          <div>
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-white/80 text-sm font-semibold mb-1">{solution.subtitle}</div>
                            <h3 className="text-3xl font-black text-white">
                              {solution.title}
                            </h3>
                          </div>
                          
                          {/* Timeline Badge */}
                          <div className="absolute top-8 right-8 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold">
                            {solution.timeline}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            {solution.description}
                          </p>

                          {/* Features */}
                          <div className="grid grid-cols-2 gap-3 mb-8">
                            {solution.features.map((feature, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-sm text-gray-700"
                              >
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${solution.gradient}`}></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className={`flex items-center gap-2 font-semibold bg-gradient-to-r ${solution.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                            了解详情
                            <ArrowRight className="w-4 h-4 text-violet-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section> */}

      {/* Benefits Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              为什么选择我们
            </h2>
            <p className="text-xl text-gray-600 font-light">
              专业、高效、可靠
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-6">
                    <Icon className="w-10 h-10 text-violet-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Link
              href="/solution"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-violet-500/50 transition-all hover:scale-105"
            >
              <Sparkles className="w-6 h-6" />
              查看完整方案
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
