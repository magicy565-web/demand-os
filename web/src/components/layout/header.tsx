"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

interface NavItem {
  title: string;
  href: string;
  description: string;
}

interface NavMenu {
  title: string;
  items: NavItem[];
}

const navigationMenus: NavMenu[] = [
  {
    title: "数智产业园 OS",
    items: [
      { title: "Agent 市场", href: "/agents-v3", description: "浏览所有智能代理" },
      { title: "需求捕获 Agent", href: "/agent-list/demand-capture", description: "智能捕获采购需求" },
      { title: "选品分析 Agent", href: "/agent-list/product-selection", description: "智能选品分析" },
      { title: "供应商匹配 Agent", href: "/agent-list/supplier-matching", description: "精准匹配供应商" },
      { title: "内容创作 Agent", href: "/agent-list/content-creation", description: "AI 内容生成" },
      { title: "数据分析 Agent", href: "/agent-list/data-analysis", description: "数据洞察分析" },
      { title: "聊天转工作流", href: "/chat-to-workflow", description: "创建自定义 Agent" },
      { title: "爆款追踪器", href: "/viral-tracker", description: "追踪热门产品" },
      { title: "Discord 工作区", href: "/discord", description: "Discord 集成" },
      { title: "30天出海路径", href: "/solution/30-day-pathway", description: "快速启动跨境电商" },
      { title: "数字资产全托管", href: "/solution/digital-asset-management", description: "数字资产管理" },
      { title: "TikTok Shop 启动", href: "/solution/tiktok-shop-launch", description: "TikTok 电商方案" },
      { title: "供应链优化", href: "/solution/supply-chain-optimization", description: "供应链优化服务" },
      { title: "战略咨询", href: "/strategy-consulting", description: "专业战略咨询" },
      { title: "TikTok 联盟", href: "/tiktok-alliance", description: "TikTok 生态合作" },
      { title: "成功案例", href: "/cases", description: "浏览成功案例" },
    ],
  },
  {
    title: "行业操作系统",
    items: [
      { title: "行业总览", href: "/industry-os", description: "探索各行业机会" },
      { title: "消费电子", href: "/industry-os/consumer-electronics", description: "智能设备等" },
      { title: "美妆个护", href: "/industry-os/beauty-personal-care", description: "护肤品、彩妆" },
      { title: "家居生活", href: "/industry-os/home-living", description: "家具、家纺" },
      { title: "运动户外", href: "/industry-os/sports-outdoor", description: "运动装备" },
      { title: "母婴", href: "/industry-os/baby-maternity", description: "婴儿用品" },
      { title: "宠物经济", href: "/industry-os/pet-economy", description: "宠物用品" },
      { title: "工厂总览", href: "/factory-list", description: "浏览所有工厂" },
      { title: "认证工厂目录", href: "/factory-list/certified", description: "优质工厂名录" },
      { title: "产能匹配系统", href: "/factory-list/capacity-matching", description: "智能匹配产能" },
      { title: "工厂入驻申请", href: "/factory-list/apply", description: "申请加入网络" },
      { title: "展厅", href: "/showrooms", description: "工厂展示空间" },
      { title: "全球信任工厂", href: "/global-trust", description: "高信誉工厂" },
    ],
  },
  {
    title: "了解更多",
    items: [
      { title: "搜索", href: "/search", description: "全站搜索" },
      { title: "资源中心", href: "/resources", description: "学习资源与文档" },
      { title: "线上展会", href: "/webinar", description: "在线展会活动" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDesktopMenu, setOpenDesktopMenu] = useState<number | null>(null)

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "shadow-md border-b border-gray-200" : "border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <Image 
              src="/images/logo.png" 
              alt="数智产业园 OS" 
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
              priority
            />
            <span className="text-lg font-bold text-gray-900 hidden sm:block">数智产业园 OS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navigationMenus.map((menu, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setOpenDesktopMenu(index)}
                onMouseLeave={() => setOpenDesktopMenu(null)}
              >
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all flex items-center gap-1.5">
                  {menu.title}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Desktop Dropdown */}
                {openDesktopMenu === index && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 max-h-[70vh] overflow-y-auto">
                    {menu.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                      >
                        <div className="font-medium text-sm text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="/home-v2"
            className="hidden lg:inline-flex px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all hover:scale-105"
          >
            开始使用
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
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
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          <nav className="relative bg-white h-full overflow-y-auto shadow-2xl">
            <div className="p-4 space-y-4">
              {navigationMenus.map((menu, menuIndex) => (
                <div key={menuIndex} className="space-y-2">
                  <div className="px-3 py-2 bg-gray-100 rounded-lg">
                    <h3 className="font-bold text-sm text-gray-900">{menu.title}</h3>
                  </div>
                  <div className="space-y-1 pl-2">
                    {menu.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className="block px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="font-medium text-sm text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <Link
                href="/home-v2"
                className="block w-full px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-sm font-medium text-center hover:shadow-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                开始使用
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
