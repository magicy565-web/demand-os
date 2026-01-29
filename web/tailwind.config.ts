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
        // 工业科技配色方案 - 参考阿里云/华为云/Wind终端
        industrial: {
          // 深色主题
          dark: {
            bg: "#0d1117",        // 深蓝黑背景
            surface: "#161b22",   // 卡片背景
            border: "#30363d",    // 边框色
            hover: "#21262d",     // 悬停背景
          },
          // 浅色主题
          light: {
            bg: "#f6f8fa",        // 浅灰背景
            surface: "#ffffff",   // 卡片背景
            border: "#d0d7de",    // 边框色
            hover: "#f3f4f6",     // 悬停背景
          },
          // 功能色
          blue: "#2563eb",        // 主蓝色 - 专业稳重
          navy: "#1e40af",        // 深蓝 - 头部/强调
          slate: "#64748b",       // 灰蓝 - 次要文字
          steel: "#475569",       // 钢灰 - 图标/边框
          // 状态色
          success: "#16a34a",     // 绿色 - 成功/盈利
          warning: "#d97706",     // 橙色 - 警告/中等
          danger: "#dc2626",      // 红色 - 紧急/亏损
          info: "#0891b2",        // 青色 - 信息
          // 数据可视化
          profit: "#22c55e",      // 利润正
          loss: "#ef4444",        // 利润负
          neutral: "#6b7280",     // 中性
        },
        // 保留部分cyber色用于兼容（将逐步移除）
        cyber: {
          black: "#0d1117",
          dark: "#161b22",
          cyan: "#2563eb",
          blue: "#2563eb",
          green: "#16a34a",
          red: "#dc2626",
          yellow: "#d97706",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
      keyframes: {
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
      },
      boxShadow: {
        "card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "card-hover": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "panel": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
