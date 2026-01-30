import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ============================================
        // 🎮 Cyber Theme (用于首页大屏模式)
        // ============================================
        "cyber-bg": "#020617",                    // 深渊黑背景
        "cyber-glass": "rgba(2, 6, 23, 0.6)",    // 磨砂玻璃背景
        "neon-primary": "#00ff9d",               // 主色-黑客绿
        "neon-secondary": "#00f3ff",             // 辅色-赛博蓝
        "neon-alert": "#ff0055",                 // 警示-故障红
        "neon-purple": "#a855f7",                // 紫色装饰
        "neon-yellow": "#fbbf24",                // 黄色警告

        // ============================================
        // 💼 Corp Theme (用于控制台业务模式)
        // ============================================
        "corp-bg": "#f8fafc",                    // Slate-50, 极浅灰背景
        "corp-surface": "#ffffff",               // 纯白卡片背景
        "corp-border": "#e2e8f0",                // Slate-200, 极细边框
        "corp-text-main": "#0f172a",             // Slate-900, 主要文字
        "corp-text-sub": "#64748b",              // Slate-500, 次要文字
        "corp-accent": "#2563eb",                // Royal Blue, 强调色
        "corp-success": "#16a34a",               // 成功绿
        "corp-warning": "#d97706",               // 警告橙
        "corp-danger": "#dc2626",                // 危险红

        // ============================================
        // 🎯 通用功能色
        // ============================================
        profit: "#22c55e",                       // 利润正
        loss: "#ef4444",                         // 利润负
        neutral: "#6b7280",                      // 中性灰

        // ============================================
        // 💬 Discord Theme (用于社区频道模式)
        // ============================================
        discord: {
          bg: "#313338",                         // 主聊天区背景
          sidebar: "#2B2D31",                    // 频道列表背景
          server: "#1E1F22",                     // 服务器列表背景
          hover: "#3F4147",                      // 悬停高亮
          active: "#404249",                     // 选中状态
          blurple: "#5865F2",                    // Discord 品牌蓝
          green: "#23A559",                      // 在线/成功
          red: "#DA373C",                        // 消息提醒/错误
          yellow: "#F0B232",                     // 警告/空闲
          input: "#383A40",                      // 输入框背景
          mention: "rgba(88, 101, 242, 0.3)",    // @提及高亮
          text: {
            normal: "#DBDEE1",                   // 正常文字
            muted: "#949BA4",                    // 次要文字
            header: "#F2F3F5",                   // 标题文字
            link: "#00AFF4",                     // 链接颜色
          }
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
        display: ["Orbitron", "Inter", "system-ui", "sans-serif"],
        cyber: ["Orbitron", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "scan-line": "scan-line 4s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(0, 255, 157, 0.3)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 40px rgba(0, 255, 157, 0.5)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow": {
          "from": { textShadow: "0 0 10px #00ff9d, 0 0 20px #00ff9d" },
          "to": { textShadow: "0 0 20px #00ff9d, 0 0 40px #00ff9d" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      boxShadow: {
        "card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "card-hover": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "panel": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        "neon": "0 0 20px rgba(0, 255, 157, 0.4)",
        "neon-strong": "0 0 30px rgba(0, 255, 157, 0.6), 0 0 60px rgba(0, 255, 157, 0.3)",
        "cyber": "0 0 40px rgba(0, 243, 255, 0.3)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
