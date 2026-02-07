'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, Home, TrendingUp, Factory, Zap, BookOpen, Shield, User } from "lucide-react"

interface HeaderProps {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

export function Header({ onNavigate, currentView = 'opportunities' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // 判断是否在爆款追踪器页面
  const isViralTrackerPage = pathname === '/viral-tracker'

  const navItems = isViralTrackerPage ? [
    { label: "爆款商机", value: "opportunities", icon: <Zap className="w-4 h-4" /> },
    { label: "认证工厂", value: "directory", icon: <Factory className="w-4 h-4" /> },
    { label: "案例库", value: "case-studies", icon: <BookOpen className="w-4 h-4" /> },
    { label: "认证体系", value: "certification", icon: <Shield className="w-4 h-4" /> },
    { label: "工作台", value: "workspace", icon: <User className="w-4 h-4" /> },
  ] : []

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className={`font-black text-lg transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                Demand OS
              </div>
              <div className={`text-[10px] font-mono uppercase tracking-widest ${scrolled ? 'text-slate-500' : 'text-white/70'}`}>
                Supply Chain Intelligence
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {/* 首页链接 */}
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                pathname === '/'
                  ? 'bg-slate-900 text-white shadow-lg'
                  : scrolled
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>首页</span>
            </Link>

            {/* 爆款追踪器链接 */}
            <Link
              href="/viral-tracker"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                pathname === '/viral-tracker'
                  ? 'bg-slate-900 text-white shadow-lg'
                  : scrolled
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>爆款追踪器</span>
            </Link>

            {/* 爆款追踪器页面内的子导航 */}
            {isViralTrackerPage && navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate?.(item.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  currentView === item.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : scrolled
                    ? 'text-slate-700 hover:bg-slate-100'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-white z-30 overflow-y-auto">
          <nav className="flex flex-col p-6 gap-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                pathname === '/' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>首页</span>
            </Link>

            <Link
              href="/viral-tracker"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                pathname === '/viral-tracker' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>爆款追踪器</span>
            </Link>

            {isViralTrackerPage && navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onNavigate?.(item.value)
                  setMobileMenuOpen(false)
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-left transition-all ${
                  currentView === item.value ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
