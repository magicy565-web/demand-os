import { Factory, Globe, TrendingUp, Users } from "lucide-react"

const empowermentPoints = [
  {
    icon: Factory,
    title: "工厂专注生产，我们负责出海",
    description: "您不需要懂TikTok、不需要懂英国物流、不需要懂DTC营销。只需把产品做好，剩下的交给我们的'战略外贸部'。",
  },
  {
    icon: Globe,
    title: "从B2B代工到DTC品牌",
    description: "不再只是给海外品牌代工，而是直接触达英国消费者，掌握定价权与品牌溢价空间。",
  },
  {
    icon: TrendingUp,
    title: "小单快反，降低库存风险",
    description: "不用一次性压货几千件。通过TikTok Shop的快速测试机制，100单起步，验证市场后再规模化。",
  },
  {
    icon: Users,
    title: "英国本地化团队支撑",
    description: "我们在伦敦有本地运营团队，处理客服、退换货、合规问题，工厂无需担心跨境售后。",
  },
]

export function FactoryEmpowerment() {
  return (
    <section className="section-padding bg-paper">
      <div className="container-editorial">
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-5">
            赋能中国工厂
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-8 text-balance leading-tight">
            您的核心竞争力是生产，
            <br className="hidden md:block" />
            我们的核心竞争力是出海
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            中国工厂有世界级的制造能力，但缺少直达海外消费者的通道。
            <br className="hidden md:block" />
            鸿亿鸿就是这条通道 —— 让订单回归工厂，让利润回归制造者。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {empowermentPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <div
                key={index}
                className="border border-border/60 p-8 lg:p-10 hover:border-electric-blue/40 hover:shadow-xl hover:shadow-navy/5 transition-all duration-500 group bg-paper hover:-translate-y-1"
              >
                <div className="w-14 h-14 border border-navy/10 bg-navy/[0.03] flex items-center justify-center mb-7 group-hover:bg-navy group-hover:border-navy transition-all duration-500">
                  <Icon className="w-6 h-6 text-navy group-hover:text-paper transition-colors duration-500" />
                </div>
                
                <h3 className="text-xl lg:text-2xl font-serif text-navy mb-4 leading-tight">
                  {point.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 bg-navy/5 border border-navy/10 p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-serif text-navy mb-4">
              一个真实案例
            </h3>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                广东某家居工厂，年产值3000万，95%订单来自美国品牌商代工，利润率不到8%。
              </p>
              <p className="font-medium text-navy">
                通过鸿亿鸿，他们在30天内启动TikTok Shop英国站，首月GMV达到12万英镑，
                利润率提升至22%。
              </p>
              <p>
                现在，他们30%的产能用于DTC出海，不再完全依赖代工订单。
              </p>
            </div>
            
            <div className="mt-8">
              <a
                href="#stories"
                className="inline-block px-6 py-3 border border-navy text-navy text-sm font-medium hover:bg-navy hover:text-paper transition-all duration-300"
              >
                查看更多成功案例
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
