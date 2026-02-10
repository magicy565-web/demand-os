"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, Sparkles, Factory, TrendingUp, Zap, Users, BookOpen, Search as SearchIcon, Building2, Package, Rocket, BarChart, MessageSquare, Target, Award, Globe, ShoppingCart, Wand2, MapPin } from "lucide-react"

interface NavItem {
  title: string;
  href: string;
  description: string;
  icon?: any;
  badge?: string;
  highlight?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface MegaMenu {
  title: string;
  groups: NavGroup[];
  featured?: {
    title: string;
    description: string;
    href: string;
  };
}

const demandOSMenu: MegaMenu = {
  title: "需求操作系统",
  groups: [
    {
      title: "AI 智能助手",
      items: [
        { title: "Accio 智能采购", href: "/accio", description: "AI智能采购，一问搞定", icon: Wand2, highlight: true, badge: "推荐" },
        { title: "Agent 市场", href: "/agents-intro", description: "浏览所有智能代理", icon: Sparkles },
        { title: "聊天转工作流", href: "/chat-to-workflow", description: "快速创建自定义 Agent", icon: MessageSquare, badge: "新功能" },
      ],
    },

    {
      title: "热门工具",
      items: [
        { title: "爆款追踪器", href: "/viral-tracker", description: "追踪热门产品趋势", icon: TrendingUp },
        { title: "Discord 工作区", href: "/discord", description: "团队协作与社区", icon: MessageSquare },
      ],
    },
  ],
  featured: {
    title: "开始使用需求操作系统",
    description: "AI 驱动的智能采购与供应链管理平台，帮助您快速连接全球供应商。",
    href: "/home-v2",
  },
};

const solutionMenu: MegaMenu = {
  title: "解决方案",
  groups: [

    {
      title: "增值服务",
      items: [
        { title: "战略咨询", href: "/strategy-consulting", description: "专业战略咨询", icon: Target },
        { title: "TikTok 联盟", href: "/tiktok-alliance", description: "30天出海成功路径", icon: Users },
        { title: "解决方案总览", href: "/solutions-intro", description: "浏览所有解决方案", icon: Sparkles },
      ],
    },
  ],
  featured: {
    title: "完整解决方案",
    description: "从需求分析到交付执行，为您提供一站式的商业解决方案。",
    href: "/solution",
  },
};

const casesMenu: MegaMenu = {
  title: "成功案例",
  groups: [
    {
      title: "行业案例",
      items: [
        { title: "消费电子案例", href: "/cases/consumer-electronics", description: "消费电子成功案例", icon: Zap },
        { title: "美妆个护案例", href: "/cases/beauty-personal-care", description: "美妆行业案例", icon: Sparkles },
        { title: "家居生活案例", href: "/cases/home-living", description: "家居行业案例", icon: Building2 },
      ],
    },
    {
      title: "更多内容",
      items: [
        { title: "成功故事集", href: "/cases/success-stories", description: "客户成功故事", icon: Award },
        { title: "案例总览", href: "/cases-intro", description: "浏览所有案例", icon: Award },
      ],
    },
  ],
  featured: {
    title: "成功案例库",
    description: "探索我们的客户如何通过 Demand-OS 实现业务增长。",
    href: "/cases",
  },
};

const industryOSMenu: MegaMenu = {
  title: "行业操作系统",
  groups: [
    {
      title: "产业地图",
      items: [
        { title: "中国产业带地图", href: "/industrial-os", description: "可视化产业带分布", icon: MapPin, highlight: true, badge: "地图" },
      ],
    },

    {
      title: "工厂网络",
      items: [
        { title: "工厂总览", href: "/factory-intro", description: "浏览所有工厂", icon: Factory },
        { title: "认证工厂目录", href: "/factory-list/certified", description: "经过认证的优质工厂", icon: Award },
        { title: "产能匹配系统", href: "/factory-list/capacity-matching", description: "智能匹配工厂产能", icon: BarChart },
        { title: "工厂入驻申请", href: "/factory-list/apply", description: "申请加入工厂网络", icon: Rocket },
        { title: "展厅", href: "/showrooms", description: "工厂展示空间", icon: Building2 },
        { title: "全球优质工厂", href: "/global-trust", description: "赋能中国工厂出海", icon: Globe },
      ],
    },
  ],
  featured: {
    title: "连接全球优质工厂",
    description: "覆盖 7 大行业，认证工厂网络，智能产能匹配，可视化产业带地图。",
    href: "/industrial-os",
  },
};

const learnMoreMenu: MegaMenu = {
  title: "了解更多",
  groups: [
    {
      title: "资源中心",
      items: [
        { title: "搜索", href: "/search", description: "全站搜索功能", icon: SearchIcon },
        { title: "资源中心", href: "/resources", description: "学习资源与文档", icon: BookOpen },
        { title: "线上展会", href: "/webinar", description: "在线展会活动", icon: Globe },
      ],
    },
  ],
};

const allMenus = [demandOSMenu, solutionMenu, casesMenu, industryOSMenu, learnMoreMenu];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const handleMenuEnter = (index: number) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current)
    }
    setActiveMenu(index)
  }

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 200)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-lg border-b border-blue-100" 
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Modern Blue Design */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
            {/* SVG Logo */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-105">
              <rect width="40" height="40" rx="8" fill="url(#logo-gradient)"/>
              <path d="M12 14C12 12.8954 12.8954 12 14 12H18C20.2091 12 22 13.7909 22 16C22 18.2091 20.2091 20 18 20H14C12.8954 20 12 19.1046 12 18V14Z" fill="white"/>
              <path d="M22 22C22 20.8954 22.8954 20 24 20H26C27.1046 20 28 20.8954 28 22V26C28 27.1046 27.1046 28 26 28H24C22.8954 28 22 27.1046 22 26V22Z" fill="white" fillOpacity="0.8"/>
              <circle cx="16" cy="26" r="2" fill="white" fillOpacity="0.6"/>
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563EB"/>
                  <stop offset="1" stopColor="#1D4ED8"/>
                </linearGradient>
              </defs>
            </svg>
            
            <div className="hidden sm:block">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Demand-OS
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {allMenus.map((menu, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMenuEnter(index)}
                onMouseLeave={handleMenuLeave}
              >
                <button 
                  className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                    activeMenu === index
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  {menu.title}
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === index ? "rotate-180" : ""}`} />
                </button>

                {/* Mega Menu Dropdown */}
                {activeMenu === index && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
                    onMouseEnter={() => handleMenuEnter(index)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <div className="flex">
                      {/* Main Content */}
                      <div className="flex-1 p-6">
                        <div className="grid grid-cols-2 gap-6">
                          {menu.groups.map((group, groupIndex) => (
                            <div key={groupIndex}>
                              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">
                                {group.title}
                              </h3>
                              <div className="space-y-1">
                                {group.items.map((item, itemIndex) => {
                                  const Icon = item.icon;
                                  return (
                                    <Link
                                      key={itemIndex}
                                      href={item.href}
                                      className={`group/item flex items-start gap-3 p-3 rounded-lg transition-all ${
                                        item.highlight
                                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200"
                                          : "hover:bg-gray-50"
                                      }`}
                                    >
                                      {Icon && (
                                        <div className={`mt-0.5 ${item.highlight ? "text-blue-600" : "text-gray-400 group-hover/item:text-blue-600"}`}>
                                          <Icon className="w-5 h-5" />
                                        </div>
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className={`font-semibold text-sm ${item.highlight ? "text-blue-900" : "text-gray-900"}`}>
                                            {item.title}
                                          </span>
                                          {item.badge && (
                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                                              {item.badge}
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                          {item.description}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Featured Section */}
                      {menu.featured && (
                        <div className="w-80 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 border-l border-blue-100">
                          <div className="h-full flex flex-col justify-between">
                            <div>
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-bold text-blue-700 mb-4">
                                <Sparkles className="w-3.5 h-3.5" />
                                推荐
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {menu.featured.title}
                              </h3>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {menu.featured.description}
                              </p>
                            </div>
                            <Link
                              href={menu.featured.href}
                              className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:shadow-xl transition-all hover:scale-105"
                            >
                              立即开始
                              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="/accio"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            <Wand2 className="w-4 h-4" />
            Accio
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2.5 text-gray-700 hover:bg-blue-50 rounded-xl transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          <nav className="relative bg-white h-full overflow-y-auto">
            <div className="p-4 space-y-6">
              {allMenus.map((menu, menuIndex) => (
                <div key={menuIndex} className="space-y-3">
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                    <h3 className="font-bold text-base text-blue-900">{menu.title}</h3>
                  </div>
                  
                  {menu.groups.map((group, groupIndex) => (
                    <div key={groupIndex} className="space-y-2">
                      <h4 className="px-4 text-xs font-bold text-blue-600 uppercase tracking-wider">
                        {group.title}
                      </h4>
                      <div className="space-y-1">
                        {group.items.map((item, itemIndex) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={itemIndex}
                              href={item.href}
                              className={`flex items-start gap-3 px-4 py-3 rounded-xl transition-all ${
                                item.highlight
                                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
                                  : "hover:bg-gray-50"
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {Icon && (
                                <div className={`mt-0.5 ${item.highlight ? "text-blue-600" : "text-gray-400"}`}>
                                  <Icon className="w-5 h-5" />
                                </div>
                              )}
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={`font-semibold text-sm ${item.highlight ? "text-blue-900" : "text-gray-900"}`}>
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {item.description}
                                </p>
                              </div>
                              <ChevronDown className="w-5 h-5 text-gray-300 mt-0.5 rotate-[-90deg]" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              
              <Link
                href="/accio"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Wand2 className="w-5 h-5" />
                Accio - 智能采购
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
