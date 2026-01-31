import { CheckCircle2 } from "lucide-react"

export function Framework() {
  const pillars = [
    {
      number: "01",
      title: "市场洞察",
      description: "深度的市场研究与消费者洞察",
      capabilities: [
        "市场规模评估",
        "竞争格局分析",
        "消费者行为研究",
        "进入机会识别",
      ],
    },
    {
      number: "02",
      title: "战略规划",
      description: "定制化的市场进入与增长策略",
      capabilities: [
        "渠道选择优化",
        "品牌定位制定",
        "营销策略设计",
        "合作伙伴评估",
      ],
    },
    {
      number: "03",
      title: "执行赋能",
      description: "端到端的运营支持与增长加速",
      capabilities: [
        "供应链优化",
        "运营体系建设",
        "团队建设指导",
        "增长监测与优化",
      ],
    },
  ]

  return (
    <section id="framework" className="section-padding bg-paper-warm">
      <div className="container-editorial">
        {/* Header */}
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Our Methodology</p>
          <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-navy mb-4">
            三位一体的方法论
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            从市场分析到执行落地，我们提供企业所需的每一步。
          </p>
        </div>

        {/* Framework Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {pillars.map((pillar, index) => (
            <div key={index} className="relative">
              {/* Background Number */}
              <div className="absolute top-0 right-0 text-7xl lg:text-8xl font-bold text-navy/5 pointer-events-none">
                {pillar.number}
              </div>

              {/* Card Content */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Title Section */}
                <div className="mb-8">
                  <p className="text-sm font-bold uppercase tracking-widest text-cobalt mb-4">
                    Phase {index + 1}
                  </p>
                  <h3 className="heading-serif text-2xl lg:text-3xl text-navy mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Capabilities List */}
                <div className="space-y-3 pt-8 border-t border-border">
                  {pillar.capabilities.map((capability, capIndex) => (
                    <div key={capIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cobalt shrink-0 mt-0.5" strokeWidth={2} />
                      <span className="text-sm text-charcoal">{capability}</span>
                    </div>
                  ))}
                </div>

                {/* Connector Line - Only show between pillars */}
                {index < pillars.length - 1 && (
                  <div className="hidden lg:block absolute -right-16 top-1/2 w-32 h-0.5 bg-gradient-to-r from-cobalt/30 to-transparent transform -translate-y-1/2" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 lg:mt-16 p-6 lg:p-10 bg-navy">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="heading-serif text-xl lg:text-2xl text-paper mb-2">
                准备开始您的跨境增长之旅？
              </h3>
              <p className="text-paper/70 text-base">
                与我们的专家团队讨论您的市场进入战略。
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center px-6 lg:px-8 py-3 bg-cobalt text-paper font-bold uppercase tracking-wider text-sm hover:bg-cobalt/90 transition-editorial whitespace-nowrap"
            >
              预约咨询
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Framework
