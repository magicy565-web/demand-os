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
    <section id="dashboard" className="section-padding bg-navy text-white overflow-hidden relative">
      {/* Background patterns - 移动端简化 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/4 w-[250px] sm:w-[400px] lg:w-[500px] h-[250px] sm:h-[400px] lg:h-[500px] bg-brand-blue/10 blur-[100px] sm:blur-[150px] rounded-full" />
      <div className="hidden sm:block absolute bottom-0 right-1/4 w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-gold/8 blur-[120px] rounded-full" />
      
      <div className="container-editorial relative z-10">
        <div className="text-center mb-10 sm:mb-16 lg:mb-20">
          <span className="badge badge-blue mb-4 sm:mb-6">
            <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Real-Time Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-noto-serif-sc)] font-medium mb-4 sm:mb-6 text-white leading-tight">
            实时透明度，CEO级确定性控制
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed chinese-text px-4 sm:px-0">
            不再是"盲盒出海"。每一个订单、每一笔库存、每一次需求波动，
            都在您的数字指挥舱中实时可见、可控、可预测。
          </p>
        </div>

        {/* 移动端横向滚动，桌面端网格 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            const colors = [
              { accent: 'bg-brand-blue', text: 'text-brand-blue-light' },
              { accent: 'bg-gold', text: 'text-gold-light' },
              { accent: 'bg-accent-teal', text: 'text-accent-teal' },
              { accent: 'bg-amber', text: 'text-amber' }
            ][index]
            
            return (
              <div
                key={index}
                className="group p-5 sm:p-6 bg-white/5 border border-white/10 sm:hover:bg-white/10 sm:hover:border-white/20 transition-all duration-300 sm:hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div className={`p-2 sm:p-2.5 ${colors.accent}/20`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.text}`} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-success bg-success/20 px-2 py-1">
                    {metric.change}
                  </span>
                </div>
                
                <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-1 sm:mb-2">
                  {metric.value}
                </div>
                
                <div className="text-xs sm:text-sm text-white/80 mb-2 sm:mb-3 font-medium">
                  {metric.label}
                </div>
                
                <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed chinese-text">
                  {metric.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 border border-white/20 bg-white/5">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-white/70">
              数据每15分钟更新 · 接入英国TikTok Shop官方API
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
