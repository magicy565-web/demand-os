"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ChevronRight } from "lucide-react"

const navItems = [
  { label: "能力", href: "#capabilities" },
  { label: "行业聚焦", href: "#industries" },
  { label: "30天路径", href: "#timeline" },
  { label: "线上展会", href: "/webinar", isExternal: true },
  { label: "Demand-OS", href: "/saas-home/demand-os", isExternal: true },
  { label: "成功案例", href: "#stories" },
  { label: "洞察", href: "#insights" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // 监听滚动，添加阴影效果
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 移动菜单打开时禁止页面滚动
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg transition-shadow duration-300 ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}>
      <div className="container-editorial safe-area-inset-left safe-area-inset-right">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with Badge */}
          <div className="flex items-center gap-3 lg:gap-4">
            <Link href="/" className="font-semibold text-lg lg:text-2xl text-navy tracking-tight hover:text-brand-blue transition-colors touch-feedback">
              鸿亿鸿
            </Link>
            <span className="hidden lg:inline-flex badge badge-gold">
              TikTok Shop Partner
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate hover:text-navy transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-blue hover:after:w-full after:transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Group */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="#diagnosis" className="btn-primary btn-sm">
              预约订单增长诊断
            </Link>
            <Link href="#login" className="btn-ghost btn-sm">
              客户登录
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2.5 -mr-2 text-charcoal touch-target touch-feedback"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Navigation Panel */}
          <nav className="relative bg-white h-full overflow-y-auto safe-area-inset-bottom">
            <div className="py-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="mobile-nav-item touch-feedback"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="flex-1 text-charcoal">{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-slate-light" />
                </Link>
              ))}
            </div>
            
            {/* Mobile CTA Buttons */}
            <div className="p-4 space-y-3 border-t border-gray-100 mt-2">
              <Link
                href="#diagnosis"
                className="btn-primary w-full touch-feedback"
                onClick={() => setMobileMenuOpen(false)}
              >
                预约订单增长诊断
              </Link>
              <Link
                href="#login"
                className="btn-ghost w-full touch-feedback"
                onClick={() => setMobileMenuOpen(false)}
              >
                客户登录
              </Link>
            </div>
            
            {/* Mobile Badge */}
            <div className="p-4 pt-0">
              <div className="flex items-center justify-center gap-2 py-3 bg-paper-warm">
                <span className="badge badge-gold text-xs">
                  TikTok Shop 官方战略合作伙伴
                </span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
