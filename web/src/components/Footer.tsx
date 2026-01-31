"use client"

import React from "react"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"

const footerLinks = {
  capabilities: {
    title: "能力",
    titleEn: "Capabilities",
    links: [
      { label: "战略咨询", href: "#strategy" },
      { label: "市场进入", href: "#market-entry" },
      { label: "品牌孵化", href: "#brand-incubation" },
      { label: "供应链优化", href: "#supply-chain" },
    ],
  },
  industries: {
    title: "行业",
    titleEn: "Industries",
    links: [
      { label: "消费电子", href: "#electronics" },
      { label: "美妆个护", href: "#beauty" },
      { label: "家居生活", href: "#home" },
      { label: "运动户外", href: "#sports" },
    ],
  },
  insights: {
    title: "洞察",
    titleEn: "Insights",
    links: [
      { label: "白皮书", href: "#whitepapers" },
      { label: "行业报告", href: "#reports" },
      { label: "案例研究", href: "#cases" },
      { label: "观点文章", href: "#articles" },
    ],
  },
  company: {
    title: "关于",
    titleEn: "About",
    links: [
      { label: "关于我们", href: "#about" },
      { label: "合伙人团队", href: "#leadership" },
      { label: "加入我们", href: "#careers" },
      { label: "联系我们", href: "#contact" },
    ],
  },
}

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribe:", email)
    setEmail("")
  }

  return (
    <footer className="bg-navy py-16 lg:py-24">
      <div className="container-editorial">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 lg:pb-16 border-b border-paper/10">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="font-serif text-2xl text-paper tracking-tight block mb-6"
            >
              鸿亿鸿
            </Link>
            <p className="text-sm text-paper/60 mb-8 max-w-sm leading-relaxed">
              全球贸易操作系统。连接东方供应链与西方需求，为跨境电商企业提供战略级咨询服务。
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-paper/40 mb-4">Subscribe to Insights</p>
              <form onSubmit={handleSubmit} className="flex items-center gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="您的邮箱"
                  className="flex-1 bg-transparent border-b border-paper/20 py-3 text-sm text-paper placeholder:text-paper/30 focus:outline-none focus:border-paper/50 transition-colors duration-300"
                  required
                />
                <button
                  type="submit"
                  className="p-3 text-paper/50 hover:text-paper transition-colors duration-300"
                  aria-label="订阅"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <p className="text-sm text-paper mb-1">{section.title}</p>
                <p className="text-xs text-paper/40 uppercase tracking-wider mb-4">
                  {section.titleEn}
                </p>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-paper/60 hover:text-paper transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-paper/40">
            &copy; {new Date().getFullYear()} 鸿亿鸿 Demand-OS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#privacy"
              className="text-xs text-paper/40 hover:text-paper/60 transition-colors duration-300"
            >
              隐私政策
            </Link>
            <Link
              href="#terms"
              className="text-xs text-paper/40 hover:text-paper/60 transition-colors duration-300"
            >
              使用条款
            </Link>
            <Link
              href="#sitemap"
              className="text-xs text-paper/40 hover:text-paper/60 transition-colors duration-300"
            >
              网站地图
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
