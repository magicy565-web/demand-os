"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  FileText,
  Download,
  Book,
  Video,
  Code,
  TrendingUp,
  Globe,
  Package,
} from "lucide-react";

const resources = {
  whitepapers: [
    {
      title: "2025全球跨境电商趋势报告",
      desc: "深度分析全球电商市场趋势与机遇",
      pages: "68页",
      format: "PDF",
      size: "8.5MB",
      downloads: "12.5K",
      icon: TrendingUp,
    },
    {
      title: "AI驱动的供应链优化白皮书",
      desc: "如何用人工智能提升供应链效率",
      pages: "45页",
      format: "PDF",
      size: "5.2MB",
      downloads: "8.3K",
      icon: Code,
    },
    {
      title: "跨境物流成本优化指南",
      desc: "降低物流成本的10大实战策略",
      pages: "32页",
      format: "PDF",
      size: "3.8MB",
      downloads: "15.7K",
      icon: Package,
    },
    {
      title: "全球市场准入法规手册",
      desc: "80+国家进口认证要求全览",
      pages: "120页",
      format: "PDF",
      size: "12.4MB",
      downloads: "9.1K",
      icon: Globe,
    },
  ],
  templates: [
    {
      title: "需求发布标准模板",
      desc: "提高匹配精度的需求描述模板",
      format: "Excel",
    },
    {
      title: "供应商评估表",
      desc: "全面评估供应商能力的打分表",
      format: "Excel",
    },
    {
      title: "采购合同范本",
      desc: "标准化采购合同，可自定义条款",
      format: "Word",
    },
    {
      title: "成本核算工具",
      desc: "自动计算到岸价、利润率等",
      format: "Excel",
    },
  ],
  api: [
    {
      title: "API 开发文档",
      desc: "完整的API接口说明与代码示例",
      link: "/docs/api",
    },
    {
      title: "SDK 下载",
      desc: "Python、Node.js、Java SDK",
      link: "/docs/sdk",
    },
    {
      title: "Webhook 集成指南",
      desc: "实时接收需求更新通知",
      link: "/docs/webhook",
    },
  ],
  webinars: [
    {
      title: "如何用AI提升供应链效率",
      date: "2025-02-15",
      duration: "60分钟",
      speaker: "张伟 - Demand OS CEO",
    },
    {
      title: "跨境电商2025趋势解读",
      date: "2025-02-22",
      duration: "45分钟",
      speaker: "李娜 - CTO",
    },
    {
      title: "物流成本优化实战分享",
      date: "2025-03-01",
      duration: "50分钟",
      speaker: "王强 - COO",
    },
  ],
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#051c2c] to-[#00509d] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-6"
          >
            资源中心
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100"
          >
            免费下载行业报告、操作手册、开发文档
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Whitepapers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Book className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900">行业白皮书</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.whitepapers.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-600 flex-shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 mb-4">{item.desc}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <span>{item.pages}</span>
                      <span>•</span>
                      <span>{item.format}</span>
                      <span>•</span>
                      <span>{item.size}</span>
                      <span>•</span>
                      <span>{item.downloads} 下载</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                      <Download className="w-4 h-4" />
                      免费下载
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900">实用模板</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.templates.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl transition group cursor-pointer"
              >
                <div className="text-4xl mb-4">
                  {item.format === "Excel" ? "📊" : "📄"}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4">{item.desc}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{item.format}</span>
                  <Download className="w-4 h-4 text-blue-500" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* API Documentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Code className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900">开发者资源</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.api.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl text-white hover:shadow-2xl transition group"
              >
                <Code className="w-8 h-8 mb-4 text-green-400" />
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Webinars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Video className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900">在线研讨会</h2>
          </div>
          <div className="space-y-4">
            {resources.webinars.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl transition"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>📅 {item.date}</span>
                      <span>⏱️ {item.duration}</span>
                      <span>👤 {item.speaker}</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    预约参加
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-500 to-purple-500 p-12 rounded-2xl text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">订阅资源更新</h2>
          <p className="text-xl mb-8 opacity-90">
            第一时间获取最新行业报告与研讨会通知
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="您的邮箱地址"
              className="flex-1 px-4 py-3 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-medium hover:shadow-xl transition whitespace-nowrap">
              订阅
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
