"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ChevronRight, Sparkles, Factory, TrendingUp, Zap, Users, BookOpen, Search as SearchIcon, Building2, Package, Rocket, BarChart, MessageSquare, Target, Award, Globe, ShoppingCart } from "lucide-react"

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
    image?: string;
  };
}

const demandOSMenu: MegaMenu = {
  title: "数智产业园 OS",
  groups: [
    {
      title: "智能代理",
      items: [
        { title: "Agent 市场", href: "/agents-v3", description: "浏览所有智能代理", icon: Sparkles, badge: "热门" },
        { title: "需求捕获 Agent", href: "/agent-list/demand-capture", description: "智能捕获全球采购需求", icon: Target },
        { title: "选品分析 Agent", href: "/agent-list/product-selection", description: "基于数据的智能选品", icon: BarChart },
        { title: "供应商匹配 Agent", href: "/agent-list/supplier-matching", description: "精准匹配优质供应商", icon: Users },
        { title: "内容创作 Agent", href: "/agent-list/content-creation", description: "AI 驱动内容生成", icon: Sparkles },
        { title: "数据分析 Agent", href: "/agent-list/data-analysis", description: "深度商业洞察", icon: BarChart },
        { title: "聊天转工作流", href: "/chat-to-workflow", description: "快速创建自定义 Agent", icon: MessageSquare, badge: "新功能" },
      ],
    },
    {
      title: "热门工具",
      items: [
        { title: "爆款追踪器", href: "/viral-tracker", description: "追踪热门产品趋势", icon: TrendingUp, highlight: true },
        { title: "Discord 工作区", href: "/discord", description: "团队协作与社区", icon: MessageSquare },
      ],
    },
    {
      title: "解决方案",
      items: [
        { title: "30天出海路径", href: "/solution/30-day-pathway", description: "快速启动跨境电商", icon: Rocket },
        { title: "数字资产全托管", href: "/solution/digital-asset-management", description: "一站式资产管理", icon: Package },
        { title: "TikTok Shop 启动", href: "/solution/tiktok-shop-launch", description: "TikTok 电商方案", icon: ShoppingCart },
        { title: "供应链优化", href: "/solution/supply-chain-optimization", description: "端到端优化", icon: BarChart },
        { title: "战略咨询", href: "/strategy-consulting", description: "专业战略咨询", icon: Target },
        { title: "TikTok 联盟", href: "/tiktok-alliance", description: "TikTok 生态合作", icon: Users },
      ],
    },
    {
      title: "成功案例",
      items: [
        { title: "案例总览", href: "/cases", description: "浏览所有案例", icon: Award },
        { title: "消费电子案例", href: "/cases/consumer-electronics", description: "消费电子成功案例", icon: Award },
        { title: "美妆个护案例", href: "/cases/beauty-personal-care", description: "美妆行业案例", icon: Award },
        { title: "家居生活案例", href: "/cases/home-living", description: "家居行业案例", icon: Award },
      ],
    },
  ],
  featured: {
    title: "开始使用数智产业园 OS",
    description: "AI 驱动的智能采购与供应链管理平台，帮助您快速连接全球供应商，优化业务流程。",
    href: "/home-v2",
  },
};

const industryOSMenu: MegaMenu = {
  title: "行业操作系统",
  groups: [
    {
      title: "行业分类",
      items: [
        { title: "行业总览", href: "/industry-os", description: "探索各行业机会", icon: Building2, badge: "总览" },
        { title: "消费电子", href: "/industry-os/consumer-electronics", description: "智能设备、可穿戴", icon: Zap },
        { title: "美妆个护", href: "/industry-os/beauty-personal-care", description: "护肤品、彩妆", icon: Sparkles },
        { title: "家居生活", href: "/industry-os/home-living", description: "家具、家纺、厨具", icon: Building2 },
        { title: "运动户外", href: "/industry-os/sports-outdoor", description: "运动装备、户外用品", icon: Target },
        { title: "母婴", href: "/industry-os/baby-maternity", description: "婴儿用品、儿童玩具", icon: Users },
        { title: "宠物经济", href: "/industry-os/pet-economy", description: "宠物食品、用品", icon: Users },
      ],
    },
    {
      title: "工厂网络",
      items: [
        { title: "工厂总览", href: "/factory-list", description: "浏览所有工厂", icon: Factory, badge: "总览" },
        { title: "认证工厂目录", href: "/factory-list/certified", description: "经过认证的优质工厂", icon: Award },
        { title: "产能匹配系统", href: "/factory-list/capacity-matching", description: "智能匹配工厂产能", icon: BarChart },
        { title: "工厂入驻申请", href: "/factory-list/apply", description: "申请加入工厂网络", icon: Rocket },
        { title: "展厅", href: "/showrooms", description: "工厂展示空间", icon: Building2 },
        { title: "全球信任工厂", href: "/global-trust", description: "高信誉工厂推荐", icon: Globe, highlight: true },
      ],
    },
  ],
  featured: {
    title: "连接全球优质工厂",
    description: "覆盖 7 大行业，认证工厂网络，智能产能匹配，助力您快速找到最合适的生产伙伴。",
    href: "/factory-list",
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

const allMenus = [demandOSMenu, industryOSMenu, learnMoreMenu];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<number | null>(null)

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/98 backdrop-blur-xl shadow-lg border-b border-gray-200" 
          : "bg-white/95 backdrop-blur-md border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Image 
                src="/images/logo.png" 
                alt="数智产业园 OS" 
                width={48}
                height={48}
                className="relative h-12 w-12 object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-gray-900">数智产业园 OS</div>
              <div className="text-xs text-gray-500">Demand-OS</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {allMenus.map((menu, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setActiveMenu(index)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button 
                  className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                    activeMenu === index
                      ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {menu.title}
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeMenu === index ? "rotate-90" : ""}`} />
                </button>

                {/* Mega Menu Dropdown */}
                {activeMenu === index && (
                  <div className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="flex">
                      {/* Main Content */}
                      <div className="flex-1 p-6">
                        <div className="grid grid-cols-2 gap-6">
                          {menu.groups.map((group, groupIndex) => (
                            <div key={groupIndex}>
                              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
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
                                          ? "bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100"
                                          : "hover:bg-gray-50"
                                      }`}
                                    >
                                      {Icon && (
                                        <div className={`mt-0.5 ${item.highlight ? "text-emerald-600" : "text-gray-400 group-hover/item:text-gray-600"}`}>
                                          <Icon className="w-5 h-5" />
                                        </div>
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className={`font-semibold text-sm ${item.highlight ? "text-emerald-900" : "text-gray-900"}`}>
                                            {item.title}
                                          </span>
                                          {item.badge && (
                                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
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
                        <div className="w-80 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 border-l border-emerald-100">
                          <div className="h-full flex flex-col justify-between">
                            <div>
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-bold text-emerald-700 mb-4">
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
                              className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold text-sm hover:shadow-xl transition-all hover:scale-105"
                            >
                              立即开始
                              <ChevronRight className="w-4 h-4" />
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
            href="/home-v2"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            开始使用
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
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
                  <div className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl">
                    <h3 className="font-bold text-base text-gray-900">{menu.title}</h3>
                  </div>
                  
                  {menu.groups.map((group, groupIndex) => (
                    <div key={groupIndex} className="space-y-2">
                      <h4 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
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
                                  ? "bg-gradient-to-r from-emerald-50 to-teal-50"
                                  : "hover:bg-gray-50"
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {Icon && (
                                <div className={`mt-0.5 ${item.highlight ? "text-emerald-600" : "text-gray-400"}`}>
                                  <Icon className="w-5 h-5" />
                                </div>
                              )}
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={`font-semibold text-sm ${item.highlight ? "text-emerald-900" : "text-gray-900"}`}>
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {item.description}
                                </p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-300 mt-0.5" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              
              <Link
                href="/home-v2"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles className="w-5 h-5" />
                开始使用
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
