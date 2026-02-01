"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "产品与服务",
    question: "什么是 Demand-OS？",
    answer:
      "Demand-OS 是全球领先的供需对接信息系统，利用 AI 技术帮助企业快速发现商机、精准匹配供应商。我们已服务超过 5000 家全球企业，年处理供需信息超过 60 万条。",
  },
  {
    category: "产品与服务",
    question: "如何开始使用？",
    answer:
      "只需简单三步：1. 注册账户 2. 创建团队 3. 导入数据或手动发布需求。15 分钟内即可开始使用完整功能。我们还提供一对一的新客户引导服务。",
  },
  {
    category: "技术支持",
    question: "支持多语言吗？",
    answer:
      "是的，我们支持中文、英文、日文、韩文、西班牙语等 10+ 种语言。系统会根据您的区域自动选择语言，您也可以随时在设置中切换。",
  },
  {
    category: "付费与试用",
    question: "可以免费试用吗？",
    answer:
      "当然可以！所有新注册用户可享受 14 天免费试用期，无需输入信用卡信息，即可体验商务版所有功能。试用期结束后可选择适合您的付费方案。",
  },
  {
    category: "技术支持",
    question: "如何获得技术支持？",
    answer:
      "创业版享受邮件支持（48小时内响应），商务版以上享受优先电话支持（24小时内响应）。企业版用户还可获得 7×24 专属技术团队支持与客户成功经理。",
  },
  {
    category: "安全与合规",
    question: "数据安全吗？",
    answer:
      "绝对安全。我们采用企业级 AES-256 加密技术、通过 ISO27001 认证、完全符合 GDPR 合规性要求、提供 99.9% 可用性 SLA、实施每日自动备份。您的数据安全是我们的最高优先级。",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="section-padding bg-paper-warm">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-5">
            常见问题
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-6">
            您可能想了解的问题
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            查看常见问题解答，如需更多帮助请联系我们的支持团队
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* FAQ Accordion */}
          <div className="divide-y divide-border border-t border-b border-border">
            {faqs.map((faq, idx) => (
              <div key={idx} className="group">
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full py-6 flex justify-between items-start text-left transition-colors hover:bg-paper-warm/50"
                >
                  <div className="pr-8">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                      {faq.category}
                    </span>
                    <span className="text-base font-medium text-navy group-hover:text-brand-blue transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`mt-1 p-1 transition-transform duration-300 ${openIdx === idx ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    openIdx === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-6 pr-12">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-8 bg-navy text-paper">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-electric-blue/30 bg-electric-blue/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-electric-blue" />
                </div>
                <div>
                  <h4 className="text-base font-medium text-paper mb-1">
                    没有找到您的问题？
                  </h4>
                  <p className="text-sm text-paper/60">
                    我们的专家团队随时为您解答
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="btn-secondary border-paper/30 text-paper hover:bg-paper hover:text-navy flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>联系我们</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
