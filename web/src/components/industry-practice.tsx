import Link from "next/link"
import { Smartphone, Heart, Home, Zap, Baby, PawPrint } from "lucide-react"

interface Industry {
  icon: typeof Smartphone
  name: string
  growth: string
}

export function IndustryPractice() {
  const industries: Industry[] = [
    { icon: Smartphone, name: "消费电子", growth: "+24%" },
    { icon: Heart, name: "美妆个护", growth: "+31%" },
    { icon: Home, name: "家居生活", growth: "+18%" },
    { icon: Zap, name: "运动户外", growth: "+27%" },
    { icon: Baby, name: "母婴产品", growth: "+22%" },
    { icon: PawPrint, name: "宠物经济", growth: "+35%" },
  ]

  return (
    <section id="industries" className="section-padding bg-paper">
      <div className="container-editorial">
        {/* Header */}
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Industry Focus</p>
          <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-navy mb-4">
            我们关注的行业
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            专注于高增长的细分市场，提供定制化的市场进入策略与运营支持。
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <Link
                key={index}
                href={`#industry-${index}`}
                className="group/industry p-6 lg:p-8 border border-border hover:border-navy transition-editorial bg-paper"
              >
                <div className="flex items-start justify-between mb-6">
                  <Icon className="w-8 h-8 text-navy/30 transition-editorial group-hover/industry:text-navy group-hover/industry:scale-110" strokeWidth={1} />
                  <span className="heading-serif text-2xl lg:text-3xl text-cobalt transition-editorial group-hover/industry:text-navy">
                    {industry.growth}
                  </span>
                </div>
                <h3 className="heading-serif text-xl text-navy mb-2">
                  {industry.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  引领跨境增长的新力量
                </p>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover/industry:text-navy transition-editorial">
                  了解更多 →
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 lg:mt-16 p-6 lg:p-8 border border-cobalt/20 bg-cobalt/5">
          <p className="text-sm text-muted-foreground mb-4">
            没有看到您的行业？
          </p>
          <div className="flex items-center gap-4">
            <p className="text-navy font-medium">
              我们也在探索更多垂直市场
            </p>
            <Link href="#contact" className="text-sm font-bold uppercase tracking-wider text-cobalt hover:text-navy transition-colors duration-300">
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IndustryPractice
