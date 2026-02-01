import { Check } from "lucide-react"

const phases = [
  {
    days: "Day 1-7",
    phase: "01",
    title: "原始需求捕获与选品建模",
    description: "基于TikTok Shop英国市场数据，识别高潜力品类与消费者真实需求痛点",
    deliverables: [
      "《需求热度报告》- 基于TikTok搜索、话题、达人内容的量化分析",
      "《选品建议书》- 3-5个高转化潜力SKU，含定价策略",
      "《竞品对标地图》- 英国市场同类产品的价格带与差异化机会",
    ],
    highlight: "TikTok Shop官方数据接口",
  },
  {
    days: "Day 8-15",
    phase: "02",
    title: "英国TikTok Shop渠道搭建",
    description: "利用我们的Partner绿色通道，快速完成店铺认证、物流对接、支付体系配置",
    deliverables: [
      "TikTok Shop店铺开通 - 跳过常规审核流程，48小时内完成",
      "英国物流网络接入 - 与当地3PL签约，实现2日达配送",
      "内容创意脚本 - 5条TikTok短视频脚本 + 达人对接清单",
    ],
    highlight: "Partner专属绿色通道",
  },
  {
    days: "Day 16-30",
    phase: "03",
    title: "订单首发与数据反馈闭环",
    description: "小批量测试订单，实时监控转化数据，快速迭代优化直至规模化复制",
    deliverables: [
      "首批订单启动 - 100-500单小规模测试",
      "《实时数据仪表盘》- 每日更新的流量、转化、库存看板",
      "《优化建议报告》- 基于真实订单数据的迭代方案",
    ],
    highlight: "15天平均首单周期",
  },
]

export function Timeline30Days() {
  return (
    <section id="timeline" className="section-padding bg-gradient-to-b from-paper-warm to-paper">
      <div className="container-editorial">
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-5">
            30天出海成功路径
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-8 text-balance leading-tight">
            从工厂到英国消费者，
            <br className="hidden md:block" />
            一个月内实现订单闭环
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            不是"试试看"，而是经过300+订单验证的确定性路径。
            <br className="hidden md:block" />
            每个阶段都有明确交付物，进度透明可控。
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 md:left-14 top-0 bottom-0 w-px bg-gradient-to-b from-navy/20 via-electric-blue/30 to-navy/20" />
          
          <div className="space-y-14 lg:space-y-20">
            {phases.map((phase, index) => (
              <div key={index} className="relative">
                {/* Phase number indicator */}
                <div className="absolute left-0 top-0 flex items-center justify-center w-16 h-16 md:w-28 md:h-28 border-2 border-navy/80 bg-paper shadow-lg shadow-navy/5">
                  <span className="text-3xl md:text-5xl font-serif text-navy">
                    {phase.phase}
                  </span>
                </div>

                {/* Content */}
                <div className="ml-20 md:ml-32 pl-8 border-l-2 border-transparent hover:border-electric-blue transition-colors duration-500">
                  {/* Days badge */}
                  <div className="inline-block px-3 py-1 bg-navy text-paper text-xs font-medium uppercase tracking-wider mb-4">
                    {phase.days}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif text-navy mb-3 leading-tight">
                    {phase.title}
                  </h3>
                  
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed max-w-2xl">
                    {phase.description}
                  </p>
                  
                  {/* Deliverables */}
                  <div className="space-y-3 mb-4">
                    {phase.deliverables.map((deliverable, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 border border-electric-blue bg-electric-blue/10 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-electric-blue" />
                        </div>
                        <p className="text-sm text-charcoal leading-relaxed">
                          {deliverable}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Highlight */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/30 bg-gold/5">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                    <span className="text-xs font-medium text-gold uppercase tracking-wider">
                      {phase.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 border border-border bg-paper">
            <p className="text-sm text-muted-foreground mb-4">
              想了解您的产品适合哪个阶段？
            </p>
            <a
              href="#diagnosis"
              className="inline-block px-6 py-3 bg-navy text-paper text-sm font-medium hover:bg-navy-light transition-colors duration-300"
            >
              预约免费诊断
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
