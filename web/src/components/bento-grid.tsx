import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Compass, Users, Globe } from "lucide-react"

export function BentoGrid() {
  return (
    <section id="capabilities" className="section-padding bg-paper-warm">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Executive Briefing</p>
          <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-navy">
            高管简报
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-border">
          {/* Left Hero Card - Featured Insight */}
          <div className="lg:col-span-7 lg:row-span-2 bg-paper group">
            <Link href="#insight" className="block h-full">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[480px] overflow-hidden">
                <Image
                  src="/images/port.jpg"
                  alt="Global shipping port"
                  fill
                  className="object-cover img-bw transition-editorial group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-paper/70 mb-3">Featured Insight</p>
                  <h3 className="heading-serif text-2xl lg:text-3xl text-paper mb-4 leading-tight">
                    全球贸易的操作系统：
                    <br />
                    重塑跨境供应链的未来
                  </h3>
                  <span className="inline-flex items-center gap-2 text-sm text-paper/80 group-hover:text-paper transition-colors duration-300">
                    阅读完整报告
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Top Right - Strategy Card */}
          <div className="lg:col-span-5 bg-paper p-6 lg:p-8 flex flex-col justify-between min-h-[240px]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Capabilities</p>
              <h3 className="heading-serif text-xl lg:text-2xl text-navy mb-4">
                战略咨询
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                帮助企业以数据驱动的框架进行市场进入决策，构建可持续的跨境增长引擎。
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
              <Compass className="w-8 h-8 text-navy/30" strokeWidth={1} />
              <Link
                href="#strategy"
                className="text-xs font-medium uppercase tracking-wider text-cobalt hover:text-navy transition-colors duration-300"
              >
                了解更多
              </Link>
            </div>
          </div>

          {/* Middle Right - Impact/Metrics Card */}
          <div className="lg:col-span-5 bg-paper p-6 lg:p-8 flex flex-col justify-center min-h-[240px]">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Case Study</p>
            <h3 className="heading-serif text-lg text-navy mb-6">
              TikTok 爆品孵化器
            </h3>
            <div className="text-center py-4">
              <span className="heading-serif text-6xl lg:text-7xl text-navy">300%</span>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Q4 孵化品牌平均投资回报率
            </p>
          </div>

          {/* Bottom Left - Member Network Card (Dark) */}
          <div className="lg:col-span-4 bg-navy p-6 lg:p-8 flex flex-col justify-between min-h-[200px]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-paper/50 mb-4">The Network</p>
              <h3 className="heading-serif text-xl lg:text-2xl text-paper mb-3">
                会员俱乐部
              </h3>
              <p className="text-sm text-paper/70 leading-relaxed">
                独家接触全球决策者与行业领袖。
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-paper/10 flex items-center justify-between">
              <Users className="w-6 h-6 text-paper/30" strokeWidth={1} />
              <Link
                href="#network"
                className="text-xs font-medium uppercase tracking-wider text-paper/70 hover:text-paper transition-colors duration-300"
              >
                申请加入
              </Link>
            </div>
          </div>

          {/* Bottom Middle - Showroom Card */}
          <div className="lg:col-span-4 bg-paper group">
            <Link href="#showroom" className="block h-full">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[200px] overflow-hidden">
                <Image
                  src="/images/showroom.jpg"
                  alt="Global showroom"
                  fill
                  className="object-cover img-editorial transition-editorial group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/30 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-paper/70 mb-2">Global Presence</p>
                  <h3 className="heading-serif text-lg text-paper">
                    全球展厅
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom Right - News Card */}
          <div className="lg:col-span-4 bg-paper p-6 lg:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Latest News</p>
            <div className="space-y-4">
              <Link href="#news-1" className="block group/item">
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-navy/30 mt-1 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm text-charcoal group-hover/item:text-cobalt transition-colors duration-300 leading-snug">
                      2026年贸易政策更新：东南亚市场新机遇
                    </p>
                    <span className="text-xs text-muted-foreground mt-1 block">Jan 2026</span>
                  </div>
                </div>
              </Link>
              <Link href="#news-2" className="block group/item">
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-navy/30 mt-1 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm text-charcoal group-hover/item:text-cobalt transition-colors duration-300 leading-snug">
                      欧盟数字市场法案对跨境电商的影响
                    </p>
                    <span className="text-xs text-muted-foreground mt-1 block">Dec 2025</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BentoGrid
