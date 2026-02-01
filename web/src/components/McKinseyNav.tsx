"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function McKinseyNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      label: "解决方案",
      items: ["企业规划", "Demand-OS", "TikTok孵化器"],
    },
    {
      label: "服务",
      items: ["展览", "仓库", "会员俱乐部"],
    },
    {
      label: "资讯",
      items: ["活动", "新闻", "招聘"],
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-50/95 via-white/95 to-slate-50/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10">
              <Image
                src="/images/logo.png"
                alt="HONGYIHONG Logo"
                width={120}
                height={40}
                className="object-contain h-full w-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((menu) => (
              <div
                key={menu.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(menu.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-slate-700 hover:text-[#00509d] transition font-medium">
                  {menu.label}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown */}
                {activeDropdown === menu.label && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-sm shadow-lg">
                    {menu.items.map((item) => (
                      <Link
                        key={item}
                        href="#"
                        className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#00509d] transition"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Link
              href="/console"
              className="px-6 py-2 bg-[#00D9FF] text-[#002147] rounded-sm hover:bg-[#00B8D4] transition font-medium"
            >
              控制台登录
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            {menuItems.map((menu) => (
              <div key={menu.label} className="mb-4">
                <p className="px-4 py-2 text-sm font-bold text-slate-900">
                  {menu.label}
                </p>
                {menu.items.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block px-6 py-2 text-sm text-slate-600 hover:text-[#00509d]"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href="/console"
              className="block mx-4 px-6 py-2 bg-[#00D9FF] text-[#002147] text-center rounded-sm hover:bg-[#00B8D4] transition font-medium"
            >
              控制台登录
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
