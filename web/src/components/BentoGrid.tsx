"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
}

interface BentoGridItemProps {
  children: ReactNode;
  className?: string;
  colSpan?: "col-span-1" | "col-span-2" | "col-span-4";
  rowSpan?: "row-span-1" | "row-span-2";
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="relative">
      {/* 噪点背景纹理 */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='white' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* 聚光灯容器 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute transition-all duration-200 ease-out pointer-events-none"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
            left: "-200px",
            top: "-200px",
          }}
          id="spotlight"
        />
      </div>

      {/* Bento Grid 容器 */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[250px]">
        {children}
      </div>
    </div>
  );
}

export function BentoGridItem({
  children,
  className = "",
  colSpan = "col-span-1",
  rowSpan = "row-span-1",
}: BentoGridItemProps) {
  return (
    <motion.div
      className={`
        ${colSpan} ${rowSpan}
        relative group
        bg-slate-900/50 backdrop-blur-sm
        border border-white/10 hover:border-blue-500/50
        rounded-xl overflow-hidden
        transition-all duration-300
        ${className}
      `}
      whileHover={{ borderColor: "rgb(59, 130, 246, 0.5)" }}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const spotlight = document.getElementById("spotlight") as HTMLElement;
        if (spotlight) {
          spotlight.style.left = `${e.clientX - rect.left - 200}px`;
          spotlight.style.top = `${e.clientY - rect.top - 200}px`;
        }
      }}
    >
      {/* 发光边框效果 */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/20" />
      </div>

      {/* 内容容器 */}
      <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
