"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
  产品: ["Demand-OS", "AI 匹配", "供应链管理", "数据分析"],
  服务: ["战略咨询", "市场进入", "物流方案", "金融服务"],
  资源: ["客户案例", "行业报告", "开发文档", "API 接口"],
  公司: ["关于我们", "新闻中心", "加入我们", "联系方式"],
};

export default function AppleFooter() {
  return (
    <footer className="relative bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* 顶部链接 */}
        <div className="grid grid-cols-2 gap-8 pb-16 md:grid-cols-4 lg:gap-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-6 text-sm font-semibold text-white/60">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 分隔线 */}
        <div className="border-t border-white/10" />

        {/* 底部信息 */}
        <div className="flex flex-col items-center justify-between gap-6 pt-12 md:flex-row">
          <div className="flex items-center gap-8">
            <Link
              href="#"
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              隐私政策
            </Link>
            <Link
              href="#"
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              使用条款
            </Link>
            <Link
              href="#"
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              Cookie 设置
            </Link>
          </div>

          <div className="text-sm text-white/40">
            © {new Date().getFullYear()} HONGYIHONG. 保留所有权利。
          </div>
        </div>
      </div>
    </footer>
  );
}
