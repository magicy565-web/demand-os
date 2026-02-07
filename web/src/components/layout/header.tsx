"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ChevronRight, TrendingUp, Factory, Zap, BookOpen, Shield, User } from "lucide-react"
import { usePathname } from "next/navigation"

interface HeaderProps {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

const mainNavItems = [
  { label: "线上展会", href: "/webinar" },
  { label: "数智产业园 OS", href: "/industrial-os" },
  { label: "全球布局", href: "/global-trust" },
  { label: "全球展会", href: "/showrooms" },
  { label: "爆款追踪器", href: "/viral-tracker" },
  { label: "Demand-OS", href: "/saas-home/demand-os" },
]

export function Header({ onNavigate, currentView = 'opportunities' }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isNearFooter, setIsNearFooter] = useState(false)
  const [isImmersiveMode, setIsImmersiveMode] = useState(false)

  const isIndustrialOSPage = pathname === '/industrial-os'
  const isViralTrackerPage = pathname === '/viral-tracker'

  // 爆款追踪器页面的子导航
  const viralTrackerSubNav = [
    { label: "爆款商机", value: "opportunities", icon: <Zap className="w-4 h-4" /> },
    { label: "认证工厂", value: "directory", icon: <Factory className="w-4 h-4" /> },
    { label: "案例库", value: "case-studies", icon: <BookOpen className="w-4 h-4" /> },
    { label: "认证体系", value: "certification", icon: <Shield className="w-4 h-4" /> },
    { label: "工作台", value: "workspace", icon: <User className="w-4 h-4" /> },
  ]

  // 监听滚动，判断是否接近footer和是否在沉浸式模式中显示
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      setScrolled(scrollTop > 10)

      // 检查是否接近footer（最后500px）
      const distanceToBottom = documentHeight - (scrollTop + windowHeight)
      setIsNearFooter(distanceToBottom < 500)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 在industrial-os页面启用沉浸式模式
  useEffect(() => {
    setIsImmersiveMode(isIndustrialOSPage && !isNearFooter)
  }, [isIndustrialOSPage, isNearFooter])

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
    <header 
      className={`fixed top-0 left-0 right-0 z-[999] bg-white/95 backdrop-blur-xl transition-all duration-500 ${
        scrolled ? "shadow-elevated border-b border-gray-200/50" : "border-b border-gray-100/50"
      } ${
        isImmersiveMode ? "hidden" : ""
      }`}
    >
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
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-blue hover:after:w-full after:transition-all ${
                  pathname === item.href ? 'text-brand-blue' : 'text-slate hover:text-navy'
                }`}
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

        {/* 爆款追踪器子导航（仅在爆款追踪器页面显示） */}
        {isViralTrackerPage && (
          <div className="hidden lg:flex items-center gap-2 pb-3 border-t border-gray-100 pt-3 mt-2">
            {viralTrackerSubNav.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate?.(item.value)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                  currentView === item.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
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
              {mainNavItems.map((item, index) => (
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

              {/* 爆款追踪器子导航（移动端） */}
              {isViralTrackerPage && (
                <>
                  <div className="h-px bg-gray-200 my-2" />
                  {viralTrackerSubNav.map((item, index) => (
                    <button
                      key={item.value}
                      onClick={() => {
                        onNavigate?.(item.value)
                        setMobileMenuOpen(false)
                      }}
                      className={`mobile-nav-item touch-feedback w-full text-left ${
                        currentView === item.value ? 'bg-blue-50' : ''
                      }`}
                      style={{ animationDelay: `${(mainNavItems.length + index) * 50}ms` }}
                    >
                      <span className="flex items-center gap-2 flex-1">
                        {item.icon}
                        <span className={`font-medium ${currentView === item.value ? 'text-blue-600' : 'text-charcoal'}`}>
                          {item.label}
                        </span>
                      </span>
                    </button>
                  ))}
                </>
              )}
            </div>
            
          </nav>
        </div>
      )}
    </header>
  )
}
