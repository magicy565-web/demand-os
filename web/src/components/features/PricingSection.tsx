"use client";

import { useState } from "react";
import { Check, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const pricing = [
  {
    id: "starter",
    name: "创业版",
    nameEn: "Starter",
    monthlyPrice: 999,
    annualPrice: 9990,
    description: "适合初创企业，快速验证商业模式",
    features: [
      "最多 5 个团队成员",
      "基础数据大屏",
      "月浏览 10,000+ 需求",
      "邮件支持（48小时响应）",
      "基础报表导出",
    ],
  },
  {
    id: "business",
    name: "商务版",
    nameEn: "Business",
    monthlyPrice: 4999,
    annualPrice: 49990,
    description: "适合成长型企业，规模化拓展业务",
    recommended: true,
    features: [
      "最多 50 个团队成员",
      "高级数据大屏",
      "月浏览无限需求",
      "优先电话支持（24小时响应）",
      "高级报表 & BI分析",
      "自定义工作流",
      "API 接口",
    ],
  },
  {
    id: "enterprise",
    name: "企业版",
    nameEn: "Enterprise",
    monthlyPrice: 9999,
    annualPrice: 99990,
    description: "适合大型企业，定制化解决方案",
    features: [
      "无限团队成员",
      "企业级数据大屏",
      "实时数据接入",
      "7×24 专属客户成功经理",
      "自定义功能开发",
      "SLA 99.9% 保障",
      "私有化部署可选",
    ],
  },
];

export default function PricingSection() {
  const [activePlan, setActivePlan] = useState("annual");

  return (
    <section className="section-padding bg-paper-warm">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-5">
            灵活定价
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-6">
            选择适合您的方案
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            无论您是初创企业还是全球化集团，我们都有适合您的解决方案
          </p>
        </div>

        {/* Plan Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-paper-cream border border-border">
            <button
              onClick={() => setActivePlan("monthly")}
              className={`px-6 py-2.5 text-sm font-medium transition-all ${
                activePlan === "monthly"
                  ? "bg-navy text-paper"
                  : "text-muted-foreground hover:text-navy"
              }`}
            >
              月付
            </button>
            <button
              onClick={() => setActivePlan("annual")}
              className={`px-6 py-2.5 text-sm font-medium transition-all flex items-center gap-2 ${
                activePlan === "annual"
                  ? "bg-navy text-paper"
                  : "text-muted-foreground hover:text-navy"
              }`}
            >
              年付
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-gold text-white">
                省15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-border max-w-5xl mx-auto">
          {pricing.map((plan) => (
            <div
              key={plan.id}
              className={`bg-paper p-8 lg:p-10 relative ${
                plan.recommended ? "ring-2 ring-brand-blue ring-inset" : ""
              }`}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-blue" />
              )}
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge badge-blue flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    推荐
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <div className="mb-6">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                  {plan.nameEn}
                </p>
                <h3 className="text-xl font-serif text-navy">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-border">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-serif text-navy">
                    ¥{(activePlan === "monthly" ? plan.monthlyPrice : plan.annualPrice).toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    /{activePlan === "monthly" ? "月" : "年"}
                  </span>
                </div>
                {activePlan === "annual" && (
                  <p className="text-xs text-muted-foreground mt-1">
                    相当于 ¥{Math.round(plan.annualPrice / 12).toLocaleString()}/月
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span className="text-charcoal">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/contact"
                className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all ${
                  plan.recommended
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
              >
                <span>开始使用</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            需要更大规模的解决方案？
          </p>
          <Link
            href="/contact"
            className="btn-link text-brand-blue"
          >
            联系我们获取定制报价
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
