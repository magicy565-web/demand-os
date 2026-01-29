"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CustomerSuccess() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 左侧：引言 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Quote className="w-12 h-12 text-[#00509d] mb-6" />
            <blockquote className="text-3xl font-serif italic text-slate-900 leading-relaxed mb-8">
              "Demand-OS 改变了我们的生产可视性，使我们能够在创纪录的时间内获取沃尔玛的订单。"
            </blockquote>
            <div className="border-l-4 border-[#00509d] pl-4">
              <p className="font-semibold text-slate-900">张建明</p>
              <p className="text-sm text-slate-600">
                中山照明集团 · 首席执行官
              </p>
            </div>
          </motion.div>

          {/* 右侧：黑白行业照片 */}
          <motion.div
            className="relative h-96 bg-slate-200 rounded-sm overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8 },
              },
            }}
          >
            {/* 占位图 - 实际项目中替换为真实图片 */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
              <p className="text-slate-500 text-lg font-medium">
                工厂生产线照片
              </p>
            </div>

            {/* 灰度滤镜效果 */}
            <div className="absolute inset-0 bg-slate-900 mix-blend-multiply opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
