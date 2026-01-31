import Image from "next/image"
import Link from "next/link"
import { Quote } from "lucide-react"

export function Leadership() {
  const partners = [
    {
      name: "张明远",
      title: "CEO & 创始人",
      description: "前McKinsey合伙人，15年全球贸易行业经验",
      image: "/images/partner-1.jpg",
      quote: "我们致力于用科技和洞察赋能中国企业的全球化。",
    },
    {
      name: "林思雨",
      title: "首席战略官",
      description: "前CapitalG投资经理，擅长企业增长战略",
      image: "/images/partner-2.jpg",
      quote: "数据驱动的决策是跨境成功的关键。",
    },
    {
      name: "王建国",
      title: "首席产品官",
      description: "前字节跳动产品总监，10年+产品创新经验",
      image: "/images/partner-3.jpg",
      quote: "用户体验和数据融合，打造最佳的操作系统。",
    },
  ]

  return (
    <section id="leadership" className="section-padding bg-paper">
      <div className="container-editorial">
        {/* Header */}
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Leadership Team</p>
          <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-navy mb-4">
            由全球专家领导
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            我们的团队汇集了来自咨询、技术和商业领域的顶级人才。
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {partners.map((partner, index) => (
            <Link
              key={index}
              href={`#partner-${index}`}
              className="group/partner"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-paper-warm">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  className="object-cover img-bw transition-editorial group-hover/partner:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover/partner:bg-navy/10 transition-colors duration-300" />
              </div>

              {/* Info Section */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Team Member
                </p>
                <h3 className="heading-serif text-xl lg:text-2xl text-navy mb-1">
                  {partner.name}
                </h3>
                <p className="text-sm font-medium text-cobalt mb-3">
                  {partner.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {partner.description}
                </p>

                {/* Quote */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-start gap-3">
                    <Quote className="w-4 h-4 text-cobalt/30 shrink-0 mt-1" strokeWidth={1.5} />
                    <p className="text-sm text-charcoal italic leading-relaxed">
                      "{partner.quote}"
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Team Expanded Info */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              label: "团队规模",
              value: "45+",
              description: "全职专业人士来自全球",
            },
            {
              label: "平均经验",
              value: "12年",
              description: "国际商务、战略与技术领域",
            },
            {
              label: "覆盖地区",
              value: "15个",
              description: "亚太、欧美主要市场",
            },
          ].map((stat, index) => (
            <div key={index} className="p-6 lg:p-8 border border-border bg-paper-warm text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                {stat.label}
              </p>
              <div className="heading-serif text-4xl lg:text-5xl text-navy mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Leadership
