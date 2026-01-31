import { TrendingUp, Shield, Zap } from "lucide-react"

const pricingFeatures = [
  {
    icon: TrendingUp,
    title: "按订单/GMV驱动",
    description: "只有在您获得真实订单后，我们才收取服务费。没有订单=没有费用。",
    highlight: "利益深度绑定",
  },
  {
    icon: Shield,
    title: "0前期投入",
    description: "无需支付高昂的咨询费、开店费、广告预付款。所有成本在订单产生后结算。",
    highlight: "零风险启动",
  },
  {
    icon: Zap,
    title: "TikTok Shop Partner保障",
    description: "享受官方绿色通道、优先审核、流量扶持等Partner专属权益。",
    highlight: "Partner级服务",
  },
]

export function PricingModel() {
  return (
    <section className="section-padding bg-navy text-paper">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-electric-blue mb-4">
              利益共担计费模型
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-paper mb-6 leading-tight">
              我们赚钱，
              <br />
              当且仅当您赚到钱
            </h2>
            <p className="text-lg text-paper/70 mb-8 leading-relaxed">
              传统咨询公司收取高额固定费用，无论结果如何。
              <br />
              我们不同 —— 只有在您的订单真实发生、GMV真实增长时，我们才收取服务费。
            </p>
            
            <div className="space-y-6">
              {pricingFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 border border-electric-blue/30 bg-electric-blue/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-electric-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-paper mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-paper/60 leading-relaxed mb-2">
                        {feature.description}
                      </p>
                      <span className="inline-block px-2 py-1 bg-gold/20 text-gold text-xs font-medium uppercase tracking-wider">
                        {feature.highlight}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Right: Pricing Card */}
          <div className="glass-dark p-8 lg:p-10">
            <div className="text-center mb-8">
              <div className="inline-block px-3 py-1 border border-electric-blue/30 bg-electric-blue/10 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-electric-blue">
                  标准合作模式
                </span>
              </div>
              <div className="text-5xl font-serif text-paper mb-2">
                5-8%
              </div>
              <div className="text-sm text-paper/60 uppercase tracking-wider">
                GMV 佣金率
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 text-sm text-paper/70">
                <div className="w-4 h-4 border border-electric-blue bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-electric-blue rounded-full" />
                </div>
                <p>包含需求捕获、选品建议、渠道搭建、内容策划的全链路服务</p>
              </div>
              <div className="flex items-start gap-3 text-sm text-paper/70">
                <div className="w-4 h-4 border border-electric-blue bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-electric-blue rounded-full" />
                </div>
                <p>TikTok Shop Partner绿色通道与官方技术支持</p>
              </div>
              <div className="flex items-start gap-3 text-sm text-paper/70">
                <div className="w-4 h-4 border border-electric-blue bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-electric-blue rounded-full" />
                </div>
                <p>实时数据仪表盘与每月优化报告</p>
              </div>
              <div className="flex items-start gap-3 text-sm text-paper/70">
                <div className="w-4 h-4 border border-electric-blue bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-electric-blue rounded-full" />
                </div>
                <p>专属专家委员会支持(税务、合规、物流)</p>
              </div>
            </div>
            
            <div className="border-t border-paper/10 pt-6">
              <p className="text-xs text-paper/50 text-center mb-4">
                具体费率根据品类、订单规模浮动
              </p>
              <a
                href="#diagnosis"
                className="block w-full py-3 bg-electric-blue text-navy text-center text-sm font-medium hover:bg-electric-blue/90 transition-colors duration-300"
              >
                获取定制报价
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
