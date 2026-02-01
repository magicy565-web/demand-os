"use client"

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
    // TODO: Implement newsletter subscription API
    setEmail("")
  }

  return (
    <footer className="bg-navy text-white safe-area-inset-bottom">
      <div className="container-editorial">
        {/* Main Footer Content */}
        <div className="py-10 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <Link
                href="/"
                className="inline-block text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6 hover:text-white/90 transition-colors touch-feedback"
              >
                鸿亿鸿
              </Link>
              <p className="text-sm sm:text-base text-white/70 mb-6 sm:mb-8 max-w-md leading-relaxed chinese-text">
                全球贸易操作系统。连接东方供应链与西方需求，为跨境电商企业提供战略级咨询服务。
              </p>

              {/* Newsletter Signup - 移动端优化 */}
              <div className="max-w-md">
                <h3 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4 uppercase tracking-wider">
                  Subscribe to Updates
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all text-sm min-h-[48px]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-navy font-semibold hover:bg-white/90 active:bg-white/80 transition-colors text-sm min-h-[48px] touch-feedback"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Links Grid - 移动端优化布局 */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {Object.entries(footerLinks).map(([key, section]) => (
                <div key={key}>
                  <h3 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4 uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/60 hover:text-white active:text-white/80 transition-colors block py-1 touch-feedback"
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
        </div>

        {/* Bottom Bar - 移动端优化 */}
        <div className="border-t border-white/10 py-6 sm:py-8">
          <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
            {/* Copyright & Links */}
            <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:gap-8">
              <p className="text-xs sm:text-sm text-white/50">
                © {new Date().getFullYear()} 鸿亿鸿 Demand-OS
              </p>
              <div className="flex items-center gap-4 sm:gap-6">
                <Link
                  href="#privacy"
                  className="text-xs sm:text-sm text-white/50 hover:text-white/80 active:text-white/60 transition-colors touch-feedback"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#terms"
                  className="text-xs sm:text-sm text-white/50 hover:text-white/80 active:text-white/60 transition-colors touch-feedback"
                >
                  Terms of Use
                </Link>
              </div>
            </div>
            
            {/* Social Links - 移动端优化触摸目标 */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center border border-white/20 hover:border-white/40 hover:bg-white/10 active:bg-white/20 transition-all touch-feedback"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center border border-white/20 hover:border-white/40 hover:bg-white/10 active:bg-white/20 transition-all touch-feedback"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center border border-white/20 hover:border-white/40 hover:bg-white/10 active:bg-white/20 transition-all touch-feedback"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
