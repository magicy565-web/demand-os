"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Sparkles, Clock, Zap, TrendingUp, Target } from "lucide-react"
import Image from "next/image"

const deliveryProcess = {
  id: "consumer-electronics",
  title: "消费电子行业案例",
  subtitle: "智能穿戴设备品牌的全球化之路",
  heroImage: "https://private-us-east-1.manuscdn.com/sessionFile/R0c9ZhwmUyT2pJaWYw3mso/sandbox/80juEtlhZLUETVPgJ7BIDN-img-2_1770536740000_na1fn_ZWxlY3Ryb25pY3MtY2FzZS1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUjBjOVpod21VeVQycEphV1l3M21zby9zYW5kYm94LzgwanVFdGxoWkxVRVRWUGdKN0JJRE4taW1nLTJfMTc3MDUzNjc0MDAwMF9uYTFmbl9aV3hsWTNSeWIyNXBZM010WTJGelpTMW9aWEp2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=mS3s4Edff9HQxJ1fHdGM2H8rAieVKZBciaFO1-~afAvxmVMyQzNvA61NffHT0~pxtnO4VH7G2hcwGxFn~bhoOkhnUZCD~xB8yAsmIH7iD44yWyEbS5PEk1he1ZfyvPcb7n4b4RdvCVnVBmsWpMpfxn6qUCaWarGtumsIeI391zujmFAsT2QiFE~0A0w8HEhF8zycDFjwI7aQr8lSwtFsiTDxNj37uTyvvj96v1jKECDVThgS8Hnntf5SoweXQet3RHC-rlp8bdxQs9RVNAvbpe2C2h8V6C~MWaYdlpGTIobUaf1MZJcIqQqQ-C5Mdr2M-wLPV2~cv9BCC-teDgcIcg__",
  description: "通过 Demand-OS 平台，帮助智能穿戴设备品牌拓展海外市场，建立全球供应链体系",
  
  phases: [
    {
      phase: "第一阶段",
      title: "市场调研与产品定位",
      duration: "3周",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      deliverables: [
        "完成北美、欧洲市场调研报告",
        "确定目标用户画像",
        "制定产品差异化策略",
        "完成价格体系设计"
      ]
    },
    {
      phase: "第二阶段",
      title: "供应链整合与质量管控",
      duration: "4周",
      icon: Zap,
      color: "from-cyan-500 to-blue-600",
      deliverables: [
        "对接20家电子制造工厂",
        "建立质量检测标准",
        "完成首批样品测试",
        "建立供应商评估体系"
      ]
    },
    {
      phase: "第三阶段",
      title: "渠道搭建与品牌推广",
      duration: "5周",
      icon: TrendingUp,
      color: "from-blue-600 to-cyan-600",
      deliverables: [
        "入驻亚马逊、eBay 等平台",
        "建立独立站",
        "制定社交媒体营销策略",
        "启动 KOL 合作计划"
      ]
    },
    {
      phase: "第四阶段",
      title: "数据驱动优化",
      duration: "持续进行",
      icon: Sparkles,
      color: "from-cyan-600 to-blue-700",
      deliverables: [
        "建立数据分析看板",
        "优化产品线组合",
        "提升客户服务体验",
        "持续市场拓展"
      ]
    }
  ],

  outcomes: [
    { title: "快速出海", description: "5个月内进入3个海外市场", icon: "🌍" },
    { title: "供应链稳定", description: "20家优质工厂，交付准时率98%", icon: "⚡" },
    { title: "品牌认知", description: "社交媒体粉丝突破50万", icon: "📱" },
    { title: "持续增长", description: "月环比增长保持30%以上", icon: "📈" }
  ]
}

export default function ConsumerElectronicsCasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image src={deliveryProcess.heroImage} alt="消费电子产品" fill className="object-cover opacity-20" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-blue-50/90 to-cyan-50"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-6 shadow-sm">
              <Zap className="w-4 h-4" />成功案例
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
            <p className="text-xl text-gray-600">从市场调研到持续优化的完整交付过程</p>
          </motion.div>
          <div className="space-y-12">
            {deliveryProcess.phases.map((phase, index) => {
              const Icon = phase.icon
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="relative">
                  {index < deliveryProcess.phases.length - 1 && <div className="absolute left-8 md:left-12 top-24 w-0.5 h-full bg-gradient-to-b from-blue-300 to-transparent"></div>}
                  <div className="flex gap-6 md:gap-12">
                    <div className="flex-shrink-0 relative z-10">
                      <div className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-xl`}>
                        <Icon className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-blue-100">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">{phase.phase}</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold flex items-center gap-2">
                          <Clock className="w-4 h-4" />{phase.duration}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">{phase.title}</h3>
                      <div className="space-y-3">
                        <div className="text-sm font-bold text-gray-700 mb-3">交付成果：</div>
                        {phase.deliverables.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                              <CheckCircle2 className="w-4 h-4 text-blue-600" />
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
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 text-center hover:shadow-xl transition-all hover:scale-105">
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-3xl p-12 shadow-2xl border border-blue-100">
            <h2 className="text-4xl font-black text-gray-900 mb-6">开启您的成功之旅</h2>
            <p className="text-xl text-gray-600 mb-8">让 Demand-OS 帮助您实现业务增长</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/cases" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
                查看更多案例<ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/accio" className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all">
                <Sparkles className="w-5 h-5" />开始咨询
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
