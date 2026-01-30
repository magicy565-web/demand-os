"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 mt-16 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & 描述 */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="Demand OS"
                width={140}
                height={40}
                className="object-contain"
              />
            </Link>
            <p className="text-slate-600 text-sm mb-4">
              全球贸易操作系统 · 连接全球采购商与中国优质工厂
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              系统正常运行中
            </div>
          </div>

          {/* 产品 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">产品</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/console" className="text-slate-600 hover:text-[#00509d] transition-colors">
                  控制台
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-600 hover:text-[#00509d] transition-colors">
                  定价方案
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-slate-600 hover:text-[#00509d] transition-colors">
                  企业俱乐部
                </Link>
              </li>
              <li>
                <Link href="/logistics" className="text-slate-600 hover:text-[#00509d] transition-colors">
                  物流网络
                </Link>
              </li>
            </ul>
          </div>

          {/* 服务 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">服务</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/careers" className="text-slate-600 hover:text-[#00509d] transition-colors">
                  招聘
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-slate-600 hover:text-[#00509d] transition-colors">
                  帮助中心
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-[#00509d] transition-colors">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-[#00509d] transition-colors">
                  关于我们
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200">
          <p className="text-xs text-slate-600">
            © {currentYear} Demand OS. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="/contact" className="text-xs text-slate-600 hover:text-[#00509d] transition-colors">
              隐私政策
            </Link>
            <span className="text-xs text-slate-400">·</span>
            <Link href="/contact" className="text-xs text-slate-600 hover:text-[#00509d] transition-colors">
              服务条款
            </Link>
            <span className="text-xs text-slate-400">·</span>
            <Link href="/contact" className="text-xs text-slate-600 hover:text-[#00509d] transition-colors">
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
