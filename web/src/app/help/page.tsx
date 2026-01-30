"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Search,
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  PlayCircle,
  Download,
} from "lucide-react";

const categories = [
  {
    id: "getting-started",
    name: "快速开始",
    icon: Rocket,
    articles: [
      { title: "账户注册指南", time: "5分钟", views: "12.5K" },
      { title: "完善企业资料", time: "3分钟", views: "8.2K" },
      { title: "首次发布需求", time: "8分钟", views: "15.3K" },
    ],
  },
  {
    id: "features",
    name: "功能使用",
    icon: BookOpen,
    articles: [
      { title: "如何使用AI智能推荐", time: "10分钟", views: "18.7K" },
      { title: "需求管理最佳实践", time: "12分钟", views: "9.4K" },
      { title: "数据分析仪表盘详解", time: "15分钟", views: "6.8K" },
      { title: "供应商管理技巧", time: "8分钟", views: "7.2K" },
    ],
  },
  {
    id: "account",
    name: "账户管理",
    icon: User,
    articles: [
      { title: "修改账户信息", time: "2分钟", views: "5.1K" },
      { title: "密码找回流程", time: "3分钟", views: "11.2K" },
      { title: "团队成员管理", time: "6分钟", views: "4.3K" },
    ],
  },
  {
    id: "billing",
    name: "订阅与账单",
    icon: CreditCard,
    articles: [
      { title: "升级订阅计划", time: "4分钟", views: "8.9K" },
      { title: "发票开具说明", time: "5分钟", views: "6.7K" },
      { title: "退款政策", time: "3分钟", views: "3.2K" },
    ],
  },
];

const videos = [
  {
    title: "Demand OS 5分钟快速上手",
    duration: "5:23",
    thumbnail: "🎬",
    views: "25.3K",
  },
  {
    title: "AI推荐引擎使用教程",
    duration: "8:15",
    thumbnail: "🤖",
    views: "18.7K",
  },
  {
    title: "数据分析功能深度讲解",
    duration: "12:40",
    thumbnail: "📊",
    views: "12.1K",
  },
  {
    title: "供应商管理完整流程",
    duration: "15:30",
    thumbnail: "🏭",
    views: "9.8K",
  },
];

const faqs = [
  {
    q: "如何开始使用Demand OS？",
    a: "注册账户后，完善企业资料，即可开始发布需求或浏览供应商信息。我们提供14天免费试用，无需信用卡。",
  },
  {
    q: "支持哪些支付方式？",
    a: "支持支付宝、微信支付、银行转账、对公账户等多种支付方式。企业客户可申请月结或季结。",
  },
  {
    q: "数据安全如何保障？",
    a: "我们采用企业级加密技术，符合ISO27001和SOC2标准。所有数据存储在阿里云，支持私有化部署。",
  },
  {
    q: "可以随时取消订阅吗？",
    a: "可以。您可以随时取消订阅，已付费用按剩余天数比例退款。无任何额外费用。",
  },
  {
    q: "技术支持响应时间是多久？",
    a: "基础版邮件支持24小时内回复，商务版电话支持4小时内回复，企业版提供7×24专属客户经理。",
  },
];

import { Rocket, User, CreditCard } from "lucide-react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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

      {/* Hero + Search */}
      <section className="bg-gradient-to-br from-[#051c2c] to-[#00509d] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-6"
          >
            帮助中心
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 mb-8"
          >
            搜索您需要的帮助，或浏览下方分类文档
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索帮助文档..."
              className="w-full pl-14 pr-4 py-4 rounded-xl text-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8">文档分类</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {category.name}
                  </h3>
                </div>
                <div className="space-y-3">
                  {category.articles.map((article, i) => (
                    <Link
                      key={i}
                      href="#"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700 group-hover:text-blue-600 transition">
                          {article.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span>{article.time}</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Video Tutorials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Video className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900">视频教程</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition group cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-6xl relative">
                  {video.thumbnail}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-900 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{video.duration}</span>
                    <span>{video.views} 观看</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900">常见问题</h2>
          </div>
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition"
                >
                  <span className="font-medium text-slate-900 pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition ${
                      expandedFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-6 text-slate-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-500 to-purple-500 p-12 rounded-2xl text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">没找到答案？</h2>
          <p className="text-xl mb-8 opacity-90">
            联系我们的技术支持团队，我们随时为您服务
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-blue-600 rounded-xl font-medium hover:shadow-xl transition"
            >
              联系支持
            </Link>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/30 transition">
              在线客服
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
