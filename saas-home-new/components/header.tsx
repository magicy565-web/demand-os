"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"

const navItems = [
  { label: "能力", href: "#capabilities" },
  { label: "行业聚焦", href: "#industries" },
  { label: "30天路径", href: "#timeline" },
  { label: "成功案例", href: "#stories" },
  { label: "洞察", href: "#insights" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper-warm border-b border-navy/10 backdrop-blur-sm">
      <div className="container-editorial">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo with Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="font-serif text-2xl lg:text-3xl text-navy tracking-tight">
              鸿亿鸿
            </Link>
            <span className="hidden lg:block text-[9px] font-bold uppercase tracking-widest text-gold border border-gold px-2 py-1">
              TikTok Shop Partner
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[11px] font-medium uppercase tracking-[0.15em] text-charcoal hover:text-electric-blue transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Group */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="#diagnosis"
              className="text-xs font-medium px-4 py-2 bg-electric-blue text-navy hover:bg-electric-blue/90 transition-colors duration-300"
            >
              预约订单增长诊断
            </Link>
            <Link
              href="#login"
              className="text-xs font-medium uppercase tracking-wider text-charcoal border border-charcoal px-4 py-2 hover:bg-navy hover:text-paper hover:border-navy transition-all duration-300"
            >
              客户登录
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[11px] font-medium uppercase tracking-[0.15em] text-charcoal hover:text-electric-blue transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#diagnosis"
                className="text-xs font-medium px-4 py-2 bg-electric-blue text-navy text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                预约订单增长诊断
              </Link>
              <Link
                href="#login"
                className="text-xs font-medium uppercase tracking-wider text-charcoal border border-charcoal px-4 py-2 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                客户登录
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
