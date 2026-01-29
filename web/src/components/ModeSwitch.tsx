"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ModeSwitch() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isConsolePage = pathname === "/console" || pathname.startsWith("/console");

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex gap-1 p-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg">
        {/* 大屏模式按钮 */}
        <Link
          href="/"
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${isHomePage 
              ? "bg-neon-primary/10 text-neon-primary shadow-neon" 
              : "text-white/60 hover:text-white hover:bg-white/5"
            }
          `}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
            大屏模式
          </span>
        </Link>

        {/* 分隔符 */}
        <div className="w-px bg-white/10 my-1" />

        {/* 工作台按钮 */}
        <Link
          href="/console"
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${isConsolePage 
              ? "bg-white text-black shadow-md" 
              : "text-white/60 hover:text-white hover:bg-white/5"
            }
          `}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" 
              />
            </svg>
            工作台
          </span>
        </Link>
      </div>
    </nav>
  );
}
