import Link from "next/link"

export function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 px-4 md:px-0 min-h-[90vh] flex items-center justify-center bg-paper">
      <div className="container-editorial text-center max-w-4xl mx-auto">
        {/* Headline */}
        <h1 className="heading-serif text-4xl md:text-5xl lg:text-7xl text-navy mb-6 lg:mb-8 leading-tight">
          全球贸易操作系统
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 lg:mb-12 leading-relaxed">
          帮助中国企业通过数据驱动的洞察和战略执行，在全球市场中实现跨越式增长。
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
          <Link
            href="#capabilities"
            className="px-6 lg:px-8 py-3 lg:py-4 bg-navy text-paper font-bold uppercase tracking-wider text-sm lg:text-base hover:bg-navy/90 transition-editorial"
          >
            探索我们的能力
          </Link>
          <Link
            href="#knowledge"
            className="px-6 lg:px-8 py-3 lg:py-4 border-2 border-navy text-navy font-bold uppercase tracking-wider text-sm lg:text-base hover:bg-navy/5 transition-editorial"
          >
            阅读最新洞察
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 lg:mt-20 pt-12 lg:pt-16 border-t border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            被全球公司信赖
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-center justify-center">
            {[
              { name: "Company A", value: "500+" },
              { name: "Company B", value: "1M+" },
              { name: "Company C", value: "48h" },
              { name: "Company D", value: "99%" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="heading-serif text-2xl lg:text-3xl text-navy mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
