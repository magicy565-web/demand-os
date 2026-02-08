"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Target, BarChart, Users, MessageSquare, Zap, ArrowRight, Code2, Cpu, Network, TrendingUp } from "lucide-react"

const agents = [
  {
    id: "demand-capture",
    title: "需求捕获 Agent",
    description: "智能捕获全球采购需求，实时分析市场动态",
    icon: Target,
    color: "from-cyan-500 to-blue-600",
    stats: { accuracy: "98%", speed: "0.3s", coverage: "全球" },
    features: ["实时监控", "智能过滤", "需求预测", "多源整合"],
  },
  {
    id: "product-selection",
    title: "选品分析 Agent",
    description: "基于大数据的智能选品，精准把握市场趋势",
    icon: BarChart,
    color: "from-blue-500 to-indigo-600",
    stats: { accuracy: "95%", speed: "1.2s", coverage: "100K+ 产品" },
    features: ["趋势分析", "竞品对比", "利润预测", "风险评估"],
  },
  {
    id: "supplier-matching",
    title: "供应商匹配 Agent",
    description: "精准匹配优质供应商，构建可靠供应链",
    icon: Users,
    color: "from-indigo-500 to-purple-600",
    stats: { accuracy: "97%", speed: "0.8s", coverage: "50K+ 供应商" },
    features: ["智能匹配", "信用评估", "价格对比", "质量认证"],
  },
  {
    id: "content-creation",
    title: "内容创作 Agent",
    description: "AI 驱动的内容生成，提升营销效率",
    icon: Sparkles,
    color: "from-purple-500 to-pink-600",
    stats: { accuracy: "92%", speed: "2.5s", coverage: "多语言" },
    features: ["文案生成", "图片优化", "SEO 优化", "多语言翻译"],
  },
  {
    id: "data-analysis",
    title: "数据分析 Agent",
    description: "深度商业洞察，数据驱动决策",
    icon: TrendingUp,
    color: "from-pink-500 to-rose-600",
    stats: { accuracy: "99%", speed: "1.5s", coverage: "TB级数据" },
    features: ["趋势预测", "异常检测", "报告生成", "可视化"],
  },
  {
    id: "chat-to-workflow",
    title: "聊天转工作流",
    description: "自然语言创建自定义 Agent，快速部署",
    icon: MessageSquare,
    color: "from-rose-500 to-orange-600",
    stats: { accuracy: "90%", speed: "5s", coverage: "无限可能" },
    features: ["对话式创建", "可视化编辑", "一键部署", "持续优化"],
  },
]

const stats = [
  { label: "活跃 Agent", value: "50+", icon: Cpu },
  { label: "日均处理", value: "100K+", icon: Zap },
  { label: "准确率", value: "96%", icon: Target },
  { label: "响应时间", value: "<1s", icon: Network },
]

export default function AgentsIntroPage() {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-6 backdrop-blur-sm">
                <Code2 className="w-4 h-4" />
                AI 智能代理系统
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Agent 市场
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                下一代 AI 智能代理，自动化您的业务流程，<br />
                提升效率，降低成本，释放无限可能
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
                    >
                      <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                      <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="pb-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent, index) => {
                const Icon = agent.icon
                const isHovered = hoveredAgent === agent.id
                
                return (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredAgent(agent.id)}
                    onMouseLeave={() => setHoveredAgent(null)}
                  >
                    <Link href={`/agent-list/${agent.id}`}>
                      <div className={`group relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 ${isHovered ? 'scale-105 shadow-2xl shadow-cyan-500/20' : ''}`}>
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                        
                        {/* Icon */}
                        <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} mb-4`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {agent.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                          {agent.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-white/10">
                          {Object.entries(agent.stats).map(([key, value]) => (
                            <div key={key}>
                              <div className="text-xs text-gray-500 mb-1 capitalize">{key}</div>
                              <div className="text-sm font-bold text-cyan-400">{value}</div>
                            </div>
                          ))}
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {agent.features.map((feature, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm group-hover:gap-3 transition-all">
                          了解详情
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 text-center"
            >
              <Link
                href="/agents-v3"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                浏览完整 Agent 市场
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
