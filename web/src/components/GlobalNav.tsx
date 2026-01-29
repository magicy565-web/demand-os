"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function GlobalNav() {
  const pathname = usePathname();

  const isDemandsPage = pathname === "/" || pathname === "/console" || pathname.startsWith("/demand");
  const isSaaSHome = pathname === "/saas-home";

  // 演示模式或工作台模式页面显示导航
  if (isSaaSHome) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex gap-2 items-center">
        <Link
          href="/saas-home"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-700 hover:bg-slate-600 transition border border-slate-600"
        >
          ← 返回主页
        </Link>
        <div className="text-xs text-gray-400 px-3 py-2">
          {pathname === "/" ? "📊 演示模式" : "💼 工作台模式"}
        </div>
      </div>
    </div>
  );
}
