"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Sparkles, Clock, Users, Package } from "lucide-react"
import Image from "next/image"

const deliveryProcess = {
  id: "beauty-personal-care",
  title: "美妆个护行业案例",
  subtitle: "新锐美妆品牌的 TikTok Shop 增长之路",
  heroImage: "https://private-us-east-1.manuscdn.com/sessionFile/R0c9ZhwmUyT2pJaWYw3mso/sandbox/80juEtlhZLUETVPgJ7BIDN-img-1_1770536742000_na1fn_YmVhdXR5LWNhc2UtaGVybw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUjBjOVpod21VeVQycEphV1l3M21zby9zYW5kYm94LzgwanVFdGxoWkxVRVRWUGdKN0JJRE4taW1nLTFfMTc3MDUzNjc0MjAwMF9uYTFmbl9ZbVZoZFhSNUxXTmhjMlV0YUdWeWJ3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=tNHmGzHtn-rN7Vh4AC2tde83QPaQIyPQI6zu8LIdES88nJ6SRlGvzHqon11xFUKTrqfaBMRXUTJK53j81IOW4Vrh~pYG4EvCbg1cZvLW9ELRFKDeKEAV6gd3Td9umNLHK-F3t3jFTj-UEIjbNo4jjSNPFspsuUe6KW8xYLf3m4Rsr73TZNHEHT~Wkv2~gal6Zwx737b59IhQq-ZinsvuKUaaVRbUSncHefv~o-VXceuVktSqb8Mo8E6Uw2rwgK4HZS8JtPgG2P-CDvLPYkN59gIOAcY5XME54H0gRpZ9Dzldi01OGnwSVXUHYmE8E0b4nQrHF2pWWxjH5xJKccJSfA__",
  description: "通过 Demand-OS 平台，帮助新锐美妆品牌从0到1建立 TikTok Shop 业务，实现快速增长",
  
  phases: [
    {
      phase: "第一阶段",
      title: "需求分析与市场调研",
      duration: "2周",
      icon: Sparkles,
      color: "from-pink-500 to-rose-500",
      deliverables: [
        "完成目标市场分析报告",
        "确定3个核心产品线方向",
        "制定品牌定位策略",
        "完成竞品分析文档"
      ]
    },
    {
      phase: "第二阶段",
      title: "供应链搭建与选品",
      duration: "3周",
      icon: Package,
      color: "from-rose-500 to-pink-600",
      deliverables: [
        "对接15家优质供应商",
        "完成产品质量检测",
        "建立供应链管理系统",
        "确定首批上架产品清单"
      ]
    },
    {
      phase: "第三阶段",
      title: "内容创作与账号启动",
      duration: "4周",
      icon: Users,
      color: "from-pink-600 to-rose-600",
      deliverables: [
        "创建 TikTok Shop 账号",
        "制作50+条营销内容",
        "建立内容发布日历",
        "启动首轮推广活动"
      ]
    },
    {
      phase: "第四阶段",
      title: "运营优化与增长",
      duration: "持续进行",
      icon: Clock,
      color: "from-rose-600 to-pink-700",
      deliverables: [
        "数据分析与策略调整",
        "爆款产品打造",
        "客户服务体系建立",
        "持续内容优化"
      ]
    }
  ],

  outcomes: [
    {
      title: "快速启动",
      description: "4个月内完成从0到1的完整搭建",
      icon: "🚀"
    },
    {
      title: "爆款打造",
      description: "3款产品进入平台 Top 100",
      icon: "⭐"
    },
    {
      title: "内容高效",
      description: "AI 驱动内容创作，成本降低70%",
      icon: "✨"
    },
    {
      title: "供应链稳定",
      description: "15家优质供应商，交付周期缩短40%",
      icon: "📦"
    }
  ]
}

export default function BeautyPersonalCareCasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50">
      {/* Hero Section with Image */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        {/* Hero Image Background */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src={deliveryProcess.heroImage}
              alt="美妆个护产品"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-pink-50/90 to-rose-50"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-pink-200 rounded-full text-pink-700 text-sm font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              成功案例
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
              {deliveryProcess.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              {deliveryProcess.subtitle}
            </p>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {deliveryProcess.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Delivery Process Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              项目交付流程
            </h2>
            <p className="text-xl text-gray-600">
              从需求分析到持续运营的完整交付过程
            </p>
          </motion.div>

          <div className="space-y-12">
            {deliveryProcess.phases.map((phase, index) => {
              const Icon = phase.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connecting Line */}
                  {index < deliveryProcess.phases.length - 1 && (
                    <div className="absolute left-8 md:left-12 top-24 w-0.5 h-full bg-gradient-to-b from-pink-300 to-transparent"></div>
                  )}

                  <div className="flex gap-6 md:gap-12">
                    {/* Phase Number & Icon */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-xl`}>
                        <Icon className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>

                    {/* Phase Content */}
                    <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-pink-100">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-bold">
                          {phase.phase}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {phase.duration}
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">
                        {phase.title}
                      </h3>

                      <div className="space-y-3">
                        <div className="text-sm font-bold text-gray-700 mb-3">交付成果：</div>
                        {phase.deliverables.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-pink-100 rounded-lg flex items-center justify-center mt-0.5">
                              <CheckCircle2 className="w-4 h-4 text-pink-600" />
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

      {/* Project Outcomes */}
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
              项目成果
            </h2>
            <p className="text-xl text-gray-600">
              可见的业务成果与价值
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryProcess.outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-100 text-center hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="text-5xl mb-4">{outcome.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{outcome.title}</h3>
                <p className="text-gray-600">{outcome.description}</p>
              </motion.div>
            ))}
          </div>
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
            className="bg-white rounded-3xl p-12 shadow-2xl border border-pink-100"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              开启您的成功之旅
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              让 Demand-OS 帮助您实现业务增长
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/cases"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                查看更多案例
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/accio"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-pink-600 text-pink-600 rounded-xl font-bold text-lg hover:bg-pink-50 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                开始咨询
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
