"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight, ExternalLink } from "lucide-react";
import { ReactNode } from "react";

interface HeroPageProps {
  // 基础信息
  title: string;
  subtitle?: string;
  description: string;
  
  // 视觉元素
  backgroundImage: string;
  blurDataURL?: string;
  icon?: ReactNode;
  accentColor?: string;
  
  // 统计数据
  stats?: Array<{
    value: string;
    label: string;
  }>;
  
  // 特性列表
  features?: Array<{
    icon?: ReactNode;
    title: string;
    description: string;
  }>;
  
  // CTA
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  
  // 布局
  variant?: "light" | "dark";
  hideBackButton?: boolean; // 隐藏返回按钮
}

// 页面进入动画
const pageVariants = {
  initial: {
    opacity: 0,
    x: "100%",
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    x: "-30%",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// 内容淡入动画
const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function HeroPage({
  title,
  subtitle,
  description,
  backgroundImage,
  blurDataURL,
  icon,
  accentColor = "#00509d",
  stats,
  features,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  variant = "light",
  hideBackButton = false,
}: HeroPageProps) {
  const isDark = variant === "dark";

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="min-h-screen"
    >
      {/* Hero Section - 全屏背景图 */}
      <section className="relative h-screen overflow-hidden">
        {/* 背景图片 - 50% 透明度 */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            style={{ filter: "saturate(1.7)" }}
            priority
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
          />
          {/* 透明度叠加层 */}
          <div 
            className={`absolute inset-0 ${
              isDark 
                ? "bg-gradient-to-b from-black/70 via-black/50 to-black/80" 
                : "bg-gradient-to-b from-white/60 via-white/50 to-white/70"
            }`} 
          />
        </div>

        {/* 顶部导航 */}
        <nav className="relative z-50 px-6 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={120}
                height={40}
                className={`object-contain ${isDark ? "brightness-0 invert" : ""}`}
              />
            </Link>
          </div>
        </nav>

        {/* Hero 内容 */}
        <div className="relative z-40 h-[calc(100vh-100px)] flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl">
              {/* 副标题 */}
              {subtitle && (
                <motion.p
                  custom={0}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className={`text-sm uppercase tracking-[0.2em] font-medium mb-4 ${
                    isDark ? "text-white/60" : "text-slate-500"
                  }`}
                >
                  {subtitle}
                </motion.p>
              )}

              {/* 主标题 */}
              <motion.h1
                custom={1}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className={`text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {title}
              </motion.h1>

              {/* 描述 */}
              <motion.p
                custom={2}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className={`text-xl md:text-2xl leading-relaxed mb-8 ${
                  isDark ? "text-white/80" : "text-slate-600"
                }`}
              >
                {description}
              </motion.p>

              {/* 统计数据 */}
              {stats && stats.length > 0 && (
                <motion.div
                  custom={4}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-8 mb-10"
                >
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="text-4xl md:text-5xl font-bold mb-1"
                        style={{ color: accentColor }}
                      >
                        {stat.value}
                      </div>
                      <div className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* CTA 按钮 */}
              <motion.div
                custom={5}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-4"
              >
                {ctaText && ctaLink && (
                  <Link
                    href={ctaLink}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium text-white transition-all hover:scale-105"
                    style={{ backgroundColor: accentColor }}
                  >
                    {ctaText}
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                )}
                {secondaryCtaText && secondaryCtaLink && (
                  <Link
                    href={secondaryCtaLink}
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium transition-all hover:scale-105 ${
                      isDark
                        ? "bg-white/10 text-white hover:bg-white/20"
                        : "bg-black/5 text-slate-800 hover:bg-black/10"
                    }`}
                  >
                    {secondaryCtaText}
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* 底部滚动提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40"
        >
          <div className={`flex flex-col items-center gap-2 ${isDark ? "text-white/40" : "text-slate-400"}`}>
            <span className="text-xs uppercase tracking-widest">向下滚动</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight className="w-5 h-5 rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
