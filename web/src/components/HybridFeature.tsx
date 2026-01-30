"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Zap, Shield, Globe } from "lucide-react";

interface HybridFeatureProps {
  subtitle: string;
  title: string;
  description: string;
  imageAlt: string;
  reverse?: boolean;
}

const iconMap = {
  "智能技术": Sparkles,
  "实时洞察": Zap,
  "安全保障": Shield,
  "全球网络": Globe,
};

export default function HybridFeature({
  subtitle,
  title,
  description,
  imageAlt,
  reverse = false,
}: HybridFeatureProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Apple式视差效果
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);

  const Icon = iconMap[subtitle as keyof typeof iconMap] || Sparkles;

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-slate-50 py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 items-center gap-16 lg:grid-cols-2 ${
            reverse ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* 文字内容 - 麦肯锡专业风格 */}
          <motion.div
            style={{ opacity }}
            className={`${reverse ? "lg:col-start-2" : ""} space-y-8`}
          >
            <motion.div
              initial={{ opacity: 0, x: reverse ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* 图标 - Apple风格 */}
              <div className="mb-6 inline-flex rounded-2xl bg-[#051c2c] p-4">
                <Icon className="h-8 w-8 text-white" />
              </div>

              {/* 小标签 */}
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#00509d]">
                {subtitle}
              </p>

              {/* 大标题 - 麦肯锡Serif字体 */}
              <h3 className="mb-6 font-serif text-5xl font-bold leading-tight tracking-tight text-slate-900 lg:text-6xl">
                {title}
              </h3>

              {/* 描述 */}
              <p className="text-xl leading-relaxed text-slate-600 lg:text-2xl">
                {description}
              </p>

              {/* CTA按钮 - 麦肯锡配色 */}
              <button className="group mt-8 inline-flex items-center gap-2 rounded-sm bg-[#051c2c] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#00509d] hover:scale-105">
                了解更多
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>

          {/* 可视化内容区 - Apple式视差 + 麦肯锡配色 */}
          <motion.div
            style={{ y }}
            className={`relative ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl">
              {/* 占位符设计元素 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Icon className="mx-auto mb-4 h-24 w-24 text-[#00509d]/30" />
                  <p className="text-xl font-medium text-slate-400">{imageAlt}</p>
                </div>
              </div>

              {/* 装饰性网格 */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #051c2c 1px, transparent 1px),
                    linear-gradient(to bottom, #051c2c 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* 装饰性光晕 - Apple风格 */}
            <div className="absolute -inset-8 -z-10 rounded-3xl bg-[#00509d]/5 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
