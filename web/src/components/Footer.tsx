'use client'

import Link from "next/link"

export function Footer() {
  const footerLinks = {
    Capabilities: [
      { label: "战略咨询", href: "#strategy" },
      { label: "运营赋能", href: "#operations" },
    ],
    Industries: [
      { label: "消费电子", href: "#electronics" },
      { label: "美妆个护", href: "#beauty" },
    ],
    Insights: [
      { label: "全球贸易展望", href: "#outlook" },
      { label: "研究报告", href: "#reports" },
    ],
    Company: [
      { label: "关于我们", href: "#about" },
      { label: "联系方式", href: "#contact" },
    ],
  }

  return (
    <footer className="bg-navy text-paper border-t border-paper/10">
      <div className="container-editorial py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-12 lg:pb-16 border-b border-paper/10">
          <div>
            <Link href="/" className="inline-block mb-6">
              <h2 className="heading-serif text-2xl lg:text-3xl text-paper">
                鸿亿鸿
              </h2>
            </Link>
            <p className="text-paper/70 text-base">
              全球贸易操作系统。
            </p>
          </div>
          <div className="flex flex-col justify-end">
            <h3 className="heading-serif text-xl mb-4">
              订阅通讯
            </h3>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your.email@company.com"
                className="flex-1 px-4 py-3 bg-navy-light border border-paper/20 text-paper text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-cobalt text-navy font-bold uppercase text-sm"
              >
                订阅
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 lg:py-16 border-b border-paper/10">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold uppercase text-paper mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/70"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="py-8">
          <p className="text-xs text-paper/50">
            © 2024-2025 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
