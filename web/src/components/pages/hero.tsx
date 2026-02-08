"use client"

import { ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { VideoPlayer } from "@/components/ui/video-player"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 overflow-hidden">
      {/* 背景图片 - 麦肯锡风格科学逻辑感 */}
      <div className="absolute inset-0">
        <Image
          src="/images/kexue.jpg"
          alt="Scientific logic background"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        {/* 渐变叠加层 - 优化内容对比度 */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />
      </div>
      
      <div className="container-editorial relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24 items-stretch">
          {/* Left Content */}
          <motion.div 
            className="lg:pr-4 flex flex-col justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Headline - 优化排版，增强对比度 */}
            <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] sm:leading-[1.1] mb-5 sm:mb-8 font-[family-name:var(--font-noto-serif-sc)] font-semibold tracking-tight text-navy drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]">
              数字资产全托管
            </h1>
            
            {/* Subtitle - 增强对比度和可读性 */}
            <p className="text-lg sm:text-xl md:text-2xl text-charcoal mb-3 sm:mb-4 leading-relaxed font-semibold drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]">
              鸿亿鸿："不是产品托管，而是产能托管"
            </p>
            
            <p className="text-sm sm:text-base md:text-lg text-charcoal mb-8 sm:mb-10 leading-relaxed max-w-2xl chinese-text font-medium drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]">
              Ai时代下传统制造业出海的解决方案
            </p>
            
            {/* CTA Buttons - 增强视觉效果 */}
            <motion.div 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/demo" className="btn-primary btn-lg group touch-feedback shadow-lg hover:shadow-xl transition-shadow">
                <span>进入 Demand-OS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="#timeline" className="btn-link justify-center sm:justify-start py-3 sm:py-0 group font-semibold">
                <span>了解企业数字资产全托管业务</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right: Demand-OS Preview */}
          <motion.div 
            className="relative lg:pl-4 order-first lg:order-last"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <VideoPlayer
              src="https://demand-os-discord.oss-cn-hangzhou.aliyuncs.com/2%E6%9C%882%E6%97%A5%281%29.mp4"
              title="Demand-OS 控制中心"
              subtitle="智能需求匹配系统"
              loop={true}
              autoPlay={false}
              controls={true}
              theme="dark"
              showInfo={true}
              className="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
            />
            
            {/* Decorative */}
            <div className="hidden lg:block absolute -z-10 top-1/2 -translate-y-1/2 right-0 w-80 h-80 bg-emerald-500/15 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
