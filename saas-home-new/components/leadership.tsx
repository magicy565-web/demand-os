import Image from "next/image"
import { Briefcase, Scale, Truck } from "lucide-react"

const partners = [
  {
    name: "张明远",
    nameEn: "Michael Zhang",
    title: "战略合伙人",
    titleEn: "Strategy Partner",
    image: "/images/partner-1.jpg",
    quote:
      "跨境贸易的本质不是卖货，而是价值的跨文化传递。理解这一点，才能真正做到品牌出海。",
    expertise: "15年跨境电商经验，前阿里国际站总监",
  },
  {
    name: "林思雨",
    nameEn: "Sarah Lin",
    title: "数据与增长合伙人",
    titleEn: "Data & Growth Partner",
    image: "/images/partner-2.jpg",
    quote:
      "数据只是起点，洞察才是终点。我们的工作是在海量数据中找到那条通往增长的路径。",
    expertise: "TikTok Shop英国早期认证服务商",
  },
  {
    name: "王建国",
    nameEn: "James Wang",
    title: "供应链合伙人",
    titleEn: "Supply Chain Partner",
    image: "/images/partner-3.jpg",
    quote:
      "战略的价值在于执行。一个无法落地的战略，不过是一份精美的PPT。",
    expertise: "曾服务100+制造企业转型DTC",
  },
]

const expertSupport = [
  {
    icon: Scale,
    title: "税务与合规专家",
    description: "英国VAT、进口关税、商标注册等法律问题的专业咨询",
  },
  {
    icon: Truck,
    title: "跨境物流专家",
    description: "海运、空运、本地配送的成本优化与时效保障",
  },
  {
    icon: Briefcase,
    title: "内容创意团队",
    description: "TikTok原生内容创作、达人对接、爆款脚本策划",
  },
]

export function Leadership() {
  return (
    <section className="section-padding bg-paper-warm">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
            专属专家委员会
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-6 text-balance">
            咨询卖的是"人"和"脑力"
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            我们的合伙人团队不仅有战略高度，更有实战经验。
            <br className="hidden md:block" />
            每个项目都由合伙人亲自参与，确保服务质量与结果交付。
          </p>
        </div>

        {/* Partner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border mb-16">
          {partners.map((partner) => (
            <div key={partner.name} className="bg-paper group hover:bg-paper-warm transition-colors duration-500">
              {/* Portrait */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={partner.image || "/placeholder.svg"}
                  alt={partner.name}
                  fill
                  className="object-cover img-bw group-hover:filter-none transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                {/* Quote */}
                <blockquote className="mb-6">
                  <span className="text-4xl font-serif text-navy/20 leading-none block mb-2">
                    {'"'}
                  </span>
                  <p className="text-sm text-charcoal leading-relaxed italic">
                    {partner.quote}
                  </p>
                </blockquote>

                {/* Name & Title */}
                <div className="pt-6 border-t border-border">
                  <h3 className="text-xl font-serif text-navy mb-1">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                    {partner.nameEn}
                  </p>
                  <p className="text-sm text-electric-blue font-medium mb-2">
                    {partner.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {partner.expertise}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expert Support Section */}
        <div className="bg-navy text-paper p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif text-paper mb-8 text-center">
              除合伙人外，您还将获得
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {expertSupport.map((expert, index) => {
                const Icon = expert.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 border border-electric-blue/30 bg-electric-blue/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-5 h-5 text-electric-blue" />
                    </div>
                    <h4 className="text-base font-medium text-paper mb-2">
                      {expert.title}
                    </h4>
                    <p className="text-sm text-paper/60 leading-relaxed">
                      {expert.description}
                    </p>
                  </div>
                )
              })}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-xs text-paper/50 uppercase tracking-wider">
                全方位专业支持 · 确保您的出海路径无障碍
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
