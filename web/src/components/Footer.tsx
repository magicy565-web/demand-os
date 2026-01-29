"use client";

import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 mt-20 border-t border-gray-800">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & 描述 */}
          <div className="md:col-span-2">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-cyber text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple mb-4"
            >
              DEMAND OS
            </motion.h3>
            <p className="text-gray-400 text-sm mb-4">
              AI 驱动的全球需求实时对接系统，连接供应链与全球市场需求。
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
              <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
              System Status: Online
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="font-cyber text-sm text-cyber-cyan mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-cyber-cyan transition-colors">
                  探索需求
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyber-cyan transition-colors">
                  发布需求
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyber-cyan transition-colors">
                  API 文档
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyber-cyan transition-colors">
                  关于我们
                </a>
              </li>
            </ul>
          </div>

          {/* 技术栈 */}
          <div>
            <h4 className="font-cyber text-sm text-cyber-purple mb-4">技术栈</h4>
            <ul className="space-y-2 text-sm text-gray-500 font-mono">
              <li>Next.js 15</li>
              <li>Directus CMS</li>
              <li>PostgreSQL</li>
              <li>OpenAI API</li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 font-mono">
            © {currentYear} Demand OS. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 font-mono mt-2 md:mt-0">
            Powered by <span className="text-cyber-cyan">Industrial Oasis</span> · 工业绿洲
          </p>
        </div>

        {/* 装饰性代码 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <code className="text-xs text-gray-700 font-mono">
            {"/* "} connecting global supply chains since 2024 {" */"}
          </code>
        </motion.div>
      </div>
    </footer>
  );
}
