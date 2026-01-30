"use client";

import Link from "next/link";

export function ModeIndicator() {
  return (
    <div className="fixed top-4 left-4 z-40 flex items-center gap-3">
      <div className="px-4 py-2 bg-cyber-glass backdrop-blur-xl border border-neon-primary/30 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-neon-primary font-mono text-sm">📊 DEMO MODE</span>
          <span className="w-2 h-2 rounded-full bg-neon-primary animate-pulse" />
        </div>
      </div>
      <Link
        href="/"
        className="px-3 py-2 text-xs font-mono text-neon-secondary border border-neon-secondary/30 rounded-lg hover:border-neon-secondary/60 hover:bg-neon-secondary/5 transition"
      >
        ← 返回主页
      </Link>
    </div>
  );
}
