"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Factory, Award, Globe, Shield, Zap, Users, ArrowRight, CheckCircle2, Settings, Package, TrendingUp, MapPin } from "lucide-react"

const factoryTypes = [
  {
    id: "certified",
    title: "认证工厂目录",
    description: "经过严格认证的优质工厂，质量有保障",
    icon: Award,
    color: "from-slate-600 to-slate-800",
    count: "5,000+",
    features: ["ISO 认证", "质量检测", "产能验证", "信用评级"],
  },
  {
    id: "capacity-matching",
    title: "产能匹配系统",
    description: "智能匹配工厂产能，精准对接需求",
    icon: Settings,
    color: "from-zinc-600 to-zinc-800",
    count: "10,000+",
    features: ["实时产能", "智能推荐", "快速响应", "弹性调度"],
  },
  {
    id: "global-trust",
    title: "全球信任工厂",
    description: "高信誉工厂推荐，合作更放心",
    icon: Globe,
    color: "from-stone-600 to-stone-800",
    count: "2,000+",
    features: ["信誉保证", "交易保障", "质量追溯", "售后支持"],
  },
]

const stats = [
  { label: "合作工厂", value: "10K+", icon: Factory },
  { label: "覆盖行业", value: "50+", icon: Package },
  { label: "日均产能", value: "5M", icon: TrendingUp },
  { label: "全球分布", value: "30+", icon: MapPin },
]

const capabilities = [
  { title: "消费电子", capacity: "日产 50K 台", quality: "ISO 9001" },
  { title: "美妆个护", capacity: "日产 100K 件", quality: "GMP 认证" },
  { title: "家居生活", capacity: "日产 30K 件", quality: "FSC 认证" },
  { title: "运动户外", capacity: "日产 40K 件", quality: "BSCI 认证" },
  { title: "母婴用品", capacity: "日产 60K 件", quality: "CE 认证" },
  { title: "宠物用品", capacity: "日产 80K 件", quality: "FDA 认证" },
]

const certifications = [
  "ISO 9001 质量管理",
  "ISO 14001 环境管理",
  "BSCI 社会责任",
  "FSC 森林认证",
  "GMP 生产规范",
  "CE 欧盟认证",
  "FDA 美国认证",
  "SGS 检测认证",
]

export default function FactoryIntroPage() {
  const [hoveredType, setHoveredType] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-900">
      {/* Industrial Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(100,116,139,0.05)_2px,transparent_2px)] bg-[size:100px_100px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(71,85,105,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-slate-300 text-sm font-semibold mb-6">
                <Factory className="w-4 h-4" />
                全球工厂网络
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
                <span className="bg-gradient-to-r from-slate-200 via-zinc-200 to-slate-300 bg-clip-text text-transparent">
                  工厂网络
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                连接全球优质制造商，构建可靠供应链<br />
                认证工厂，智能匹配，质量保障
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
                      className="relative group"
                    >
                      {/* Metal plate effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl transform group-hover:scale-105 transition-transform"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-600/50 to-transparent rounded-2xl"></div>
                      
                      <div className="relative p-6 border border-slate-600 rounded-2xl backdrop-blur-sm">
                        <Icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                        <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-400">{stat.label}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Factory Types */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {factoryTypes.map((type, index) => {
                const Icon = type.icon
                const isHovered = hoveredType === type.id
                
                return (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredType(type.id)}
                    onMouseLeave={() => setHoveredType(null)}
                  >
                    <Link href={`/factory-list/${type.id}`}>
                      <div className={`group relative h-full transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}>
                        {/* Metal plate background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-600/30 to-transparent rounded-2xl"></div>
                        
                        {/* Rivets effect */}
                        <div className="absolute top-4 left-4 w-2 h-2 bg-slate-600 rounded-full shadow-inner"></div>
                        <div className="absolute top-4 right-4 w-2 h-2 bg-slate-600 rounded-full shadow-inner"></div>
                        <div className="absolute bottom-4 left-4 w-2 h-2 bg-slate-600 rounded-full shadow-inner"></div>
                        <div className="absolute bottom-4 right-4 w-2 h-2 bg-slate-600 rounded-full shadow-inner"></div>

                        <div className="relative p-6 border border-slate-600 rounded-2xl">
                          {/* Icon */}
                          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} mb-4 shadow-lg`}>
                            <Icon className="w-7 h-7 text-amber-400" />
                          </div>

                          {/* Count Badge */}
                          <div className="absolute top-6 right-6 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold">
                            {type.count}
                          </div>

                          {/* Content */}
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                            {type.title}
                          </h3>
                          
                          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            {type.description}
                          </p>

                          {/* Features */}
                          <div className="space-y-2 mb-6">
                            {type.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm group-hover:gap-3 transition-all">
                            查看详情
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

        {/* Capabilities Section */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                产能覆盖
              </h2>
              <p className="text-xl text-slate-400">
                全行业覆盖，强大产能支撑
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl"></div>
                  <div className="relative p-4 border border-slate-600 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white">{cap.title}</h3>
                      <Shield className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="text-sm text-slate-400 mb-1">{cap.capacity}</div>
                    <div className="text-xs text-amber-400">{cap.quality}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="pb-32 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                认证体系
              </h2>
              <p className="text-xl text-slate-400">
                国际标准认证，质量全程保障
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl"></div>
                  <div className="relative flex items-center gap-3 p-4 border border-slate-600 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-white">{cert}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <Link
                href="/factory-list"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all hover:scale-105"
              >
                <Factory className="w-5 h-5" />
                浏览工厂目录
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
