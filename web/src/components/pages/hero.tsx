import { ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center bg-gradient-to-b from-paper via-paper-warm to-paper-cream pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 overflow-hidden">
      {/* 精致网格背景 - 移动端简化 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,41,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,41,0.03)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px]" />
      
      {/* 装饰性渐变光晕 - 移动端减少数量和尺寸 */}
      <div className="absolute top-20 right-0 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-gradient-to-bl from-brand-blue/10 via-electric-blue/5 to-transparent blur-[80px] sm:blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] lg:w-[500px] h-[250px] sm:h-[400px] lg:h-[500px] bg-gradient-to-tr from-gold/10 via-amber/5 to-transparent blur-[60px] sm:blur-[100px] rounded-full" />
      <div className="hidden lg:block absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-gradient-to-br from-accent-indigo/8 to-transparent blur-[80px] rounded-full" />
      
      <div className="container-editorial relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="lg:pr-4">
            {/* Partner Badge */}
            <div className="inline-flex items-center gap-3 mb-6 sm:mb-10">
              <span className="badge badge-gold">
                <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">TikTok Shop 官方战略合作伙伴</span>
                <span className="sm:hidden">TikTok Shop 合作伙伴</span>
              </span>
            </div>
            
            {/* Main Headline - 移动端优化字号 */}
            <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[4rem] leading-[1.15] sm:leading-[1.1] mb-5 sm:mb-8 font-[family-name:var(--font-noto-serif-sc)] font-medium tracking-tight text-navy">
              把国际订单交给我们，
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              <span className="text-brand-blue">把生产留在您的工厂</span>
            </h1>
            
            {/* Subtitle - 移动端优化 */}
            <p className="text-lg sm:text-xl md:text-2xl text-charcoal mb-3 sm:mb-4 leading-relaxed font-medium">
              鸿亿鸿：最懂 DTC 的英国 TikTok Shop 头部伙伴
            </p>
            
            <p className="text-sm sm:text-base md:text-lg text-slate mb-8 sm:mb-10 leading-relaxed max-w-xl chinese-text">
              我们是您的<span className="text-navy font-semibold mx-1">"战略外贸部"</span>
              —— 从原始需求捕获到订单交付的全链路赋能系统
            </p>
            
            {/* CTA Buttons - 移动端全宽 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
              <Link href="#dashboard" className="btn-primary btn-lg group touch-feedback">
                <span>查看指挥舱演示</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="#timeline" className="btn-link justify-center sm:justify-start py-3 sm:py-0 group">
                <span>了解30天出海路径</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            
            {/* Social Proof - 移动端优化布局 */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-12 pt-8 sm:pt-10 border-t border-gray-200">
              <div className="min-w-[80px]">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-navy mb-1 sm:mb-2 tracking-tight">300+</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate font-medium">成功订单</div>
              </div>
              <div className="w-px h-10 sm:h-14 bg-gray-200 hidden sm:block" />
              <div className="min-w-[80px]">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-navy mb-1 sm:mb-2 tracking-tight">85%</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate font-medium">TikTok转化率</div>
              </div>
              <div className="w-px h-10 sm:h-14 bg-gray-200 hidden sm:block" />
              <div className="min-w-[80px]">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-navy mb-1 sm:mb-2 tracking-tight">15天</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate font-medium">平均首单周期</div>
              </div>
            </div>
          </div>
          
          {/* Right: Dashboard Preview Card */}
          <div className="relative lg:pl-4 order-first lg:order-last">
            <div className="card-dark p-5 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-success rounded-full animate-pulse shadow-lg shadow-success/50" />
                  <span className="text-[10px] sm:text-xs font-semibold text-white/80 uppercase tracking-widest">
                    实时数据透明度
                  </span>
                </div>
                <span className="badge badge-success text-[9px] sm:text-[10px]">LIVE</span>
              </div>
              
              <div className="aspect-[4/3] relative border border-white/10 overflow-hidden bg-navy-light/50 mb-4 sm:mb-6">
                <Image
                  src="/images/demand-dashboard.jpg"
                  alt="Demand-OS Dashboard Preview"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 600px"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              </div>
              
              {/* Metrics Grid - 移动端优化 */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="p-3 sm:p-4 bg-white/5 border border-white/10">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-1 sm:mb-1.5">127</div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50">需求热度</div>
                </div>
                <div className="p-3 sm:p-4 bg-white/5 border border-white/10">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-1 sm:mb-1.5">92%</div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50">转化率</div>
                </div>
                <div className="p-3 sm:p-4 bg-white/5 border border-white/10">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-1 sm:mb-1.5">12天</div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50">周转期</div>
                </div>
              </div>
            </div>
            
            {/* Decorative - 移动端隐藏 */}
            <div className="hidden lg:block absolute -z-10 top-1/2 -translate-y-1/2 right-0 w-80 h-80 bg-brand-blue/15 blur-[100px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
