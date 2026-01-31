'use client'

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: "能力", href: "#capabilities" },
    { label: "行业", href: "#industries" },
    { label: "方法论", href: "#framework" },
    { label: "洞察", href: "#knowledge" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-paper/95 backdrop-blur-sm">
      <nav className="container-editorial flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <h1 className="heading-serif text-xl lg:text-2xl text-navy hover:text-cobalt transition-colors duration-300">
            鸿亿鸿
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-sm font-medium text-charcoal hover:text-navy transition-colors duration-300 uppercase tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link
            href="#login"
            className="text-xs lg:text-sm font-bold uppercase tracking-wider text-navy hover:text-cobalt transition-colors duration-300 hidden sm:inline-block"
          >
            客户登录
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-paper-warm transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-navy" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5 text-navy" strokeWidth={2} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-paper">
          <div className="container-editorial py-4 space-y-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block text-sm font-medium text-charcoal hover:text-navy transition-colors duration-300 uppercase tracking-wide py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <Link
                href="#login"
                className="block text-xs font-bold uppercase tracking-wider text-navy hover:text-cobalt transition-colors duration-300 py-2"
              >
                客户登录
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
