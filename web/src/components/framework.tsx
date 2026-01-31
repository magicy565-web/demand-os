const pillars = [
  {
    number: "01",
    title: "洞察",
    titleEn: "Insight",
    description:
      "深度数据挖掘与市场分析，识别跨境机会与风险。我们运用专有算法与行业数据库，为您呈现真实的市场全景。",
    capabilities: ["市场规模测算", "竞争格局分析", "消费者画像", "趋势预测"],
  },
  {
    number: "02",
    title: "策略",
    titleEn: "Strategy",
    description:
      "基于洞察制定可执行的战略路径，包括品牌定位、渠道选择与定价策略。我们不提供模板方案，每份策略都是定制的。",
    capabilities: ["品牌国际化定位", "渠道矩阵规划", "本地化策略", "风险管控"],
  },
  {
    number: "03",
    title: "执行",
    titleEn: "Execution",
    description:
      "从战略到落地的全程陪伴。我们与您的团队并肩作战，确保每一步执行都符合战略意图，并持续优化迭代。",
    capabilities: ["供应链搭建", "营销落地", "运营优化", "绩效追踪"],
  },
]

export function Framework() {
  return (
    <section id="framework" className="section-padding bg-paper-warm">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">The Framework</p>
          <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-navy mb-6">
            核心方法论
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Demand-OS 建立在三大核心支柱之上：洞察、策略、执行。这是一个严谨的逻辑闭环，
            确保每一个战略决策都有数据支撑，每一次执行都能追溯到战略意图。
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.number}
              className="bg-paper p-8 lg:p-10 flex flex-col"
            >
              {/* Large Number */}
              <span className="heading-serif text-7xl lg:text-8xl xl:text-9xl text-navy/10 leading-none mb-6">
                {pillar.number}
              </span>

              {/* Title */}
              <div className="mb-6">
                <h3 className="heading-serif text-2xl lg:text-3xl text-navy mb-1">
                  {pillar.title}
                </h3>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {pillar.titleEn}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                {pillar.description}
              </p>

              {/* Capabilities List */}
              <div className="mt-auto pt-6 border-t border-border">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Key Capabilities</p>
                <ul className="space-y-2">
                  {pillar.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="text-sm text-charcoal flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-cobalt shrink-0" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connection Arrow (between pillars) */}
              {index < pillars.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                  <div className="w-4 h-px bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 lg:mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            三大支柱形成<span className="text-navy font-medium">闭环系统</span>，
            持续迭代优化，驱动可持续增长。
          </p>
        </div>
      </div>
    </section>
  )
}
