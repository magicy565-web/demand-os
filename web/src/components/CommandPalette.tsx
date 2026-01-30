"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, Command, TrendingUp, Package, Warehouse, Award, Calendar, Newspaper, Users, Globe } from "lucide-react";

const commands = [
  { id: 1, name: "战略咨询全案", icon: TrendingUp, path: "/strategy-consulting", category: "服务" },
  { id: 2, name: "TikTok产业带联盟", icon: Globe, path: "/tiktok-alliance", category: "服务" },
  { id: 3, name: "海外展厅", icon: Package, path: "/showrooms", category: "服务" },
  { id: 4, name: "全球物流", icon: Warehouse, path: "/logistics", category: "服务" },
  { id: 5, name: "会员俱乐部", icon: Award, path: "/membership", category: "会员" },
  { id: 6, name: "活动日志", icon: Calendar, path: "/events", category: "资讯" },
  { id: 7, name: "新闻动态", icon: Newspaper, path: "/news", category: "资讯" },
  { id: 8, name: "人才招聘", icon: Users, path: "/careers", category: "关于" },
  { id: 9, name: "SaaS平台", icon: Command, path: "/console", category: "平台" },
  { id: 10, name: "控制台", icon: Command, path: "/console", category: "平台" },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      setSearch("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSelect = (path: string) => {
    router.push(path);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={() => setIsOpen(false)}
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[201] px-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索功能或页面..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 text-lg outline-none text-slate-900 placeholder:text-slate-400"
                  autoFocus
                />
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 font-mono">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {filteredCommands.length > 0 ? (
                  <div className="py-2">
                    {filteredCommands.map((cmd) => (
                      <button
                        key={cmd.id}
                        onClick={() => handleSelect(cmd.path)}
                        className="w-full flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#051c2c]/5 flex items-center justify-center group-hover:bg-[#051c2c]/10 transition-colors">
                          <cmd.icon className="w-5 h-5 text-[#00509d]" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">{cmd.name}</div>
                          <div className="text-sm text-slate-500">{cmd.category}</div>
                        </div>
                        <div className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          Enter ↵
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-6 py-12 text-center text-slate-400">
                    没有找到相关结果
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono">↓</kbd>
                    <span>导航</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono">↵</kbd>
                    <span>选择</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono">K</kbd>
                  <span>打开/关闭</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
