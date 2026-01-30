"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Play, ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface HeroScreenProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  icon?: ReactNode;
  features?: Array<{
    icon: ReactNode;
    title: string;
    description: string;
  }>;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  videoUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function HeroScreen({
  title,
  subtitle,
  description,
  backgroundImage,
  icon,
  features = [],
  stats = [],
  videoUrl,
  ctaText = "开始使用",
  ctaLink = "/console",
  secondaryCtaText,
  secondaryCtaLink,
}: HeroScreenProps) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
    >
      {/* 返回按钮 */}
      <Link
        href="/saas-home"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full hover:bg-slate-50 transition group"
      >
        <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:text-slate-900 transition" />
        <span className="text-sm text-slate-600 group-hover:text-slate-900">返回</span>
      </Link>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        {/* 背景图片 (50% opacity) */}
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}

        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-slate-50/80 to-white/90" />

        {/* 内容 */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：文字内容 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* 图标 */}
            {icon && (
              <div className="mb-6 text-[#00509d]">
                {icon}
              </div>
            )}

            {/* 副标题 */}
            <p className="text-sm font-medium text-[#00509d] uppercase tracking-wider mb-4">
              {subtitle}
            </p>

            {/* 主标题 */}
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              {title}
            </h1>

            {/* 描述 */}
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {description}
            </p>

            {/* CTA 按钮 */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={ctaLink}
                className="px-8 py-4 bg-[#00509d] text-white rounded-lg hover:bg-[#003d7a] transition flex items-center gap-2 font-medium"
              >
                {ctaText}
                <ChevronRight className="w-5 h-5" />
              </Link>

              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition font-medium"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>

            {/* 统计数据 */}
            {stats.length > 0 && (
              <div className="mt-12 grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* 右侧：视频/图片/交互演示 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            {videoUrl ? (
              <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                {/* 视频播放器占位 */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                  <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition group">
                    <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition" />
                  </button>
                </div>
                {/* 未来可以替换为真实视频 */}
                {/* <video src={videoUrl} /> */}
              </div>
            ) : (
              <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden shadow-2xl">
                {/* 占位内容 - 可替换为产品截图 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">
                    {icon}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* 功能列表 */}
      {features.length > 0 && (
        <section className="relative py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-12 text-center">
              核心功能
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition"
                >
                  <div className="text-[#00509d] mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}
