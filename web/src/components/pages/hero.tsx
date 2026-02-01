import { ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="lg:pr-4">
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
              <Link href="/console" className="btn-primary btn-lg group touch-feedback shadow-lg hover:shadow-xl transition-shadow">
                <span>申请系统演示</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="#timeline" className="btn-link justify-center sm:justify-start py-3 sm:py-0 group font-semibold">
                <span>了解企业数字资产全托管业务</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          {/* Right: Demand-OS Preview */}
          <div className="relative lg:pl-4 order-first lg:order-last">
            <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              {/* 静态图片预览 */}
              <Image
                src="/images/demand-dashboard.jpg"
                alt="Demand-OS Dashboard"
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
                priority
                quality={95}
              />
              
              {/* 渐变叠加 */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
              {/* 底部信息条 */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950/95 via-slate-900/80 to-transparent backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-lg mb-1">Demand-OS 控制中心</p>
                    <p className="text-white/70 text-sm">智能需求匹配系统</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </div>
              
              {/* 动效光晕 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-emerald-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-3xl" />
              </div>
            </div>
            
            {/* Decorative */}
            <div className="hidden lg:block absolute -z-10 top-1/2 -translate-y-1/2 right-0 w-80 h-80 bg-emerald-500/15 blur-[100px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
