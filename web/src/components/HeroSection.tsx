"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// 打字机效果文字
const typewriterTexts = [
  "正在扫描全球电商平台...",
  "已捕获 24,891 条需求信号",
  "AI 分析引擎运行中...",
  "连接北美、欧洲、亚太市场...",
];

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 鼠标跟踪
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 打字机效果
  useEffect(() => {
    const text = typewriterTexts[currentText];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < text.length) {
            setDisplayText(text.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentText((prev) => (prev + 1) % typewriterTexts.length);
          }
        }
      },
      isDeleting ? 30 : 80
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentText]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ y, opacity }}
    >
      {/* 动态背景 - 增强版 */}
      <div className="absolute inset-0">
        {/* 多层渐变光晕 */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyber-purple/30 rounded-full blur-[120px]"
          animate={{
            x: mousePosition.x * 3,
            y: mousePosition.y * 3,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 },
            scale: { duration: 8, repeat: Infinity }
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyber-cyan/25 rounded-full blur-[120px]"
          animate={{
            x: -mousePosition.x * 3,
            y: -mousePosition.y * 3,
            scale: [1.2, 1, 1.2],
          }}
          transition={{ 
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 },
            scale: { duration: 8, repeat: Infinity }
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-pink/15 rounded-full blur-[200px]"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* 装饰性圆环 */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyber-cyan/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-cyber-purple/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyber-pink/5 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* 扫描线效果 */}
      <div className="absolute inset-0 scan-lines opacity-20" />

      {/* 主内容 */}
      <div className="relative z-10 text-center px-4">
        {/* 顶部标签 - 增强动画 */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 rounded-full border border-cyber-cyan/30 bg-cyber-dark/50 backdrop-blur-md"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-green" />
          </span>
          <span className="text-sm text-cyber-cyan font-mono tracking-wider">
            SYSTEM ONLINE · AI POWERED
          </span>
        </motion.div>

        {/* 主标题 - 故障效果 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cyber text-6xl md:text-8xl lg:text-9xl font-bold mb-6 relative"
        >
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink inline-block"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          >
            DEMAND OS
          </motion.span>
          
          {/* 故障层 */}
          <motion.span
            className="absolute inset-0 text-cyber-cyan/30 font-cyber text-6xl md:text-8xl lg:text-9xl font-bold"
            animate={{
              x: [0, -3, 0, 3, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
            aria-hidden
          >
            DEMAND OS
          </motion.span>
        </motion.h1>

        {/* 中文副标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <span className="font-cyber text-3xl md:text-4xl text-cyber-cyan neon-text">
            工业绿洲
          </span>
          <motion.span
            className="inline-block w-1 h-8 bg-cyber-cyan ml-2 align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>

        {/* 描述文字 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4"
        >
          AI 驱动的全球需求实时对接系统
        </motion.p>

        {/* 打字机效果行 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="h-8 mb-8"
        >
          <span className="text-cyber-purple font-mono">
            {">"} {displayText}
            <motion.span
              className="inline-block w-2 h-5 bg-cyber-purple ml-1 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </span>
        </motion.div>

        {/* CTA 按钮组 - 增强版 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <motion.button
            className="group relative px-10 py-4 bg-transparent border-2 border-cyber-cyan text-cyber-cyan font-cyber font-semibold rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 245, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 group-hover:text-cyber-black transition-colors">
              探索需求
            </span>
            <motion.div
              className="absolute inset-0 bg-cyber-cyan"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            {/* 光效扫过 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.button>

          <motion.button
            className="group relative px-10 py-4 bg-cyber-purple/20 border-2 border-cyber-purple text-cyber-purple font-cyber font-semibold rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(157, 78, 221, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 group-hover:text-white transition-colors">
              发布需求
            </span>
            <motion.div
              className="absolute inset-0 bg-cyber-purple"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        {/* 统计数字展示 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
        >
          {[
            { value: "24K+", label: "全球需求" },
            { value: "150+", label: "覆盖国家" },
            { value: "99.9%", label: "系统稳定" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
            >
              <motion.div
                className="text-2xl md:text-3xl font-cyber font-bold text-cyber-cyan"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(0, 245, 255, 0.5)",
                    "0 0 20px rgba(0, 245, 255, 0.8)",
                    "0 0 10px rgba(0, 245, 255, 0.5)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-500 font-mono mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* 装饰性代码行 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 font-mono text-xs text-gray-600 space-y-1"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <code>
              {">"} initializing demand_matrix...{" "}
              <span className="text-cyber-green">✓ DONE</span>
            </code>
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <code>
              {">"} connecting to global_network...{" "}
              <span className="text-cyber-green">✓ CONNECTED</span>
            </code>
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <code>
              {">"} ai_agent.status:{" "}
              <motion.span
                className="text-cyber-cyan"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                SCANNING
              </motion.span>
            </code>
          </motion.div>
        </motion.div>

        {/* 向下滚动提示 */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 2, duration: 0.5 },
            y: { duration: 1.5, repeat: Infinity, delay: 2 }
          }}
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs font-mono">SCROLL DOWN</span>
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </motion.svg>
          </div>
        </motion.div>
      </div>

      {/* 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cyber-black via-cyber-black/80 to-transparent" />
    </motion.section>
  );
}
