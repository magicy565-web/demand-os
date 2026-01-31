import { ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-paper via-paper-warm to-paper pt-24 overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,33,71,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,33,71,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="container-editorial relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-gold/30 bg-gold/5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                TikTok Shop Official Strategic Partner
              </span>
              <TrendingUp className="w-3 h-3 text-gold" />
            </div>
            
            {/* Main Headline - Chinese Serif */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-navy leading-[1.05] mb-6 font-[family-name:var(--font-noto-serif-sc)]">
              把国际订单交给我们，
              <br />
              把生产留在您的工厂
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-charcoal/80 mb-4 leading-relaxed">
              鸿亿鸿：最懂 DTC 的英国 TikTok Shop 头部伙伴
            </p>
            
            <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed">
              我们是您的<span className="text-navy font-medium">"战略外贸部"</span>
              —— 从原始需求捕获到订单交付的全链路赋能系统
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
              <Link
                href="#dashboard"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-navy text-paper text-sm font-medium hover:bg-navy-light transition-all duration-300"
              >
                查看指挥舱演示
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="#timeline"
                className="text-sm font-medium text-navy border-b border-navy/30 hover:border-navy pb-1 transition-all duration-300"
              >
                了解30天出海路径 →
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-serif text-navy mb-1">300+</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">成功订单</div>
              </div>
              <div>
                <div className="text-2xl font-serif text-navy mb-1">85%</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">TikTok转化率</div>
              </div>
              <div>
                <div className="text-2xl font-serif text-navy mb-1">15天</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">平均首单周期</div>
              </div>
            </div>
          </div>
          
          {/* Right: Dashboard Preview with Glassmorphism */}
          <div className="relative">
            <div className="glass-dark p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" />
                <span className="text-xs font-medium text-paper/70 uppercase tracking-wider">
                  实时数据透明度
                </span>
              </div>
              
              <div className="aspect-[4/3] relative border border-electric-blue/20 overflow-hidden bg-navy/40">
                <Image
                  src="/images/dashboard-preview.jpg"
                  alt="Demand-OS Dashboard Preview"
                  fill
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="metric-card p-4">
                  <div className="text-xl font-serif text-electric-blue mb-1">127</div>
                  <div className="text-[10px] uppercase tracking-wider text-paper/60">原始需求热度</div>
                </div>
                <div className="metric-card p-4">
                  <div className="text-xl font-serif text-electric-blue mb-1">92%</div>
                  <div className="text-[10px] uppercase tracking-wider text-paper/60">订单转化率</div>
                </div>
                <div className="metric-card p-4">
                  <div className="text-xl font-serif text-electric-blue mb-1">12天</div>
                  <div className="text-[10px] uppercase tracking-wider text-paper/60">库存周转</div>
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -z-10 top-1/2 right-0 w-72 h-72 bg-electric-blue/10 blur-[100px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
