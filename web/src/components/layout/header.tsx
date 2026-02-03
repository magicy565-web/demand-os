"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ChevronRight } from "lucide-react"

const navItems = [
  { label: "线上展会", href: "/webinar", isExternal: true },
  { label: "数智产业园 OS", href: "/industrial-os", isExternal: true },
  { label: "全球布局", href: "/global-trust", isExternal: true },
  { label: "全球展会", href: "/showrooms", isExternal: true },
  { label: "Demand-OS", href: "/saas-home/demand-os", isExternal: true },
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
    <header className={`fixed top-0 left-0 right-0 z-[999] bg-white/95 backdrop-blur-xl transition-all duration-300 ${scrolled ? "shadow-elevated border-b border-gray-200/50" : "border-b border-gray-100/50"}`}>
      <div className="container-editorial safe-area-inset-left safe-area-inset-right">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with Badge */}
          <div className="flex items-center gap-3 lg:gap-4">
            <Link href="/" className="inline-flex items-center justify-center hover:opacity-80 transition-opacity">
              <Image 
                src="/images/logo.png" 
                alt="Demand-OS Logo" 
                width={56}
                height={56}
                className="h-14 w-14 lg:h-20 lg:w-20 object-contain"
                priority
              />
            </Link>
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
        <div className="lg:hidden fixed inset-0 top-16 z-[100]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Navigation Panel */}
          <nav 
            className="relative bg-white h-full overflow-y-auto safe-area-inset-bottom shadow-2xl animate-slide-in-from-top"
            role="navigation"
            aria-label="移动端主导航"
          >
            <div className="py-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="mobile-nav-item touch-feedback"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="flex-1 text-charcoal font-medium">{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-slate-light" />
                </Link>
              ))}
            </div>
            
          </nav>
        </div>
      )}
    </header>
  )
}
