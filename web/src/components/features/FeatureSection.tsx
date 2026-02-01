"use client";

import { BarChart3, Cpu, Monitor, Shield, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "实时数据大屏",
    description: "全球需求信息流实时展示，数据可视化分析，助力科学决策",
    metric: "实时更新",
  },
  {
    icon: Cpu,
    title: "智能匹配",
    description: "AI驱动的需求匹配算法，精准对接优质供应商资源",
    metric: "95%匹配率",
  },
  {
    icon: Monitor,
    title: "多端适配",
    description: "桌面端、平板、手机完美适配，随时随地掌握商机",
    metric: "全终端覆盖",
  },
  {
    icon: Shield,
    title: "安全可靠",
    description: "企业级加密技术，ISO27001认证，数据安全合规",
    metric: "99.9% SLA",
  },
  {
    icon: Zap,
    title: "高性能",
    description: "秒级响应，支持高并发访问，稳定可靠的系统架构",
    metric: "<100ms延迟",
  },
  {
    icon: Globe,
    title: "全球覆盖",
    description: "对接全球供应商网络，拓展国际商机，打通出海通路",
    metric: "50+国家",
  },
];

export default function FeatureSection() {
  return (
    <section className="section-padding bg-navy">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-5">
            核心能力
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-paper mb-6">
            为全球企业提供完整的
            <br className="hidden md:block" />
            供需对接解决方案
          </h2>
          <p className="text-base lg:text-lg text-paper/60 max-w-2xl mx-auto">
            基于AI技术与全球化网络，构建高效、智能、安全的供需匹配平台
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-navy p-8 lg:p-10 group hover:bg-navy-light transition-colors duration-500"
              >
                {/* Icon */}
                <div className="w-12 h-12 border border-electric-blue/30 bg-electric-blue/10 flex items-center justify-center mb-6 group-hover:bg-electric-blue/20 transition-colors">
                  <Icon className="w-5 h-5 text-electric-blue" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-medium text-paper mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-paper/60 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Metric */}
                <div className="pt-4 border-t border-white/10">
                  <span className="text-xs font-medium text-electric-blue uppercase tracking-wider">
                    {feature.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "5,000+", label: "企业客户" },
              { value: "600K+", label: "年处理需求" },
              { value: "50+", label: "覆盖国家" },
              { value: "99.9%", label: "系统可用性" },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-2xl md:text-3xl font-serif text-gold mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-paper/50 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
