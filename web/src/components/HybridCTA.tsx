"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HybridCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[#051c2c] py-32">
      {/* 背景装饰 - Apple式渐变光晕 */}
      <div className="absolute left-1/3 top-0 h-[500px] w-[500px] rounded-full bg-[#00509d]/30 blur-[150px]" />
      <div className="absolute bottom-0 right-1/3 h-[500px] w-[500px] rounded-full bg-[#00509d]/30 blur-[150px]" />

      {/* 网格背景 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
        {/* 标题 - Apple极简 + 麦肯锡专业 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 font-serif text-5xl font-bold leading-tight text-white lg:text-7xl">
            开启全球贸易
            <br />
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              新篇章
            </span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-white/70 lg:text-2xl">
            加入数千家领先企业，体验 Demand-OS 的强大能力
          </p>
        </motion.div>

        {/* CTA按钮组 - 麦肯锡配色 + Apple交互 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button className="group relative overflow-hidden rounded-sm bg-white px-10 py-5 text-lg font-semibold text-[#051c2c] transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <span className="relative z-10 flex items-center gap-2">
              立即开始
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#00509d]/20 to-[#00509d]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>

          <button className="rounded-sm border-2 border-white/30 bg-white/10 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20">
            预约演示
          </button>
        </motion.div>

        {/* 信任标识 - 麦肯锡风格 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-sm text-white/50"
        >
          已为 850+ 全球企业提供服务 · 120+ 国家覆盖 · 中国信保全程保障
        </motion.p>
      </div>
    </section>
  );
}
