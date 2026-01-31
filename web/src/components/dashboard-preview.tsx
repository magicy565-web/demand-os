"use client"

import { BarChart3, TrendingUp, Package, Globe } from "lucide-react"

const metrics = [
  {
    icon: TrendingUp,
    label: "原始需求热度指数",
    value: "127",
    change: "+18%",
    description: "基于TikTok搜索量、话题热度的实时算法",
  },
  {
    icon: BarChart3,
    label: "TikTok Shop 订单转化率",
    value: "92%",
    change: "+12%",
    description: "从流量到订单的完整转化漏斗追踪",
  },
  {
    icon: Package,
    label: "库存周转天数",
    value: "12天",
    change: "-5天",
    description: "从工厂出库到英国消费者手中的平均周期",
  },
  {
    icon: Globe,
    label: "英国市场覆盖",
    value: "85%",
    change: "+23%",
    description: "TikTok Shop 主要消费城市的物流覆盖率",
  },
]

export function DashboardPreview() {
  return (
    <section className="section-padding bg-navy text-paper">
      <div className="container-editorial">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-electric-blue mb-4">
            战略外贸部指挥舱
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-paper mb-6 text-balance">
            实时透明度，CEO级确定性控制
          </h2>
          <p className="text-lg text-paper/70 max-w-2xl mx-auto leading-relaxed">
            不再是"盲盒出海"。每一个订单、每一笔库存、每一次需求波动，
            <br className="hidden md:block" />
            都在您的数字指挥舱中实时可见、可控、可预测。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div
                key={index}
                className="glass p-6 hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-electric-blue/10 border border-electric-blue/20">
                    <Icon className="w-5 h-5 text-electric-blue" />
                  </div>
                  <span className="text-xs font-medium text-electric-blue">
                    {metric.change}
                  </span>
                </div>
                
                <div className="text-3xl font-serif text-paper mb-2 group-hover:text-electric-blue transition-colors duration-300">
                  {metric.value}
                </div>
                
                <div className="text-xs font-medium uppercase tracking-wider text-paper/60 mb-3">
                  {metric.label}
                </div>
                
                <p className="text-xs text-paper/50 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-electric-blue/30 bg-electric-blue/5">
            <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" />
            <span className="text-xs text-paper/70">
              数据每15分钟更新 · 接入英国TikTok Shop官方API
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
