"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ThoughtLeadership() {
  const reports = [
    {
      title: "2026年全球供应链报告",
      description: "深度剖析后疫情时代的供应链重塑",
      pages: "68页",
      cover: "/images/whitepapers/supply-chain.jpg"
    },
    {
      title: "TikTok美国家居生活趋势",
      description: "社交电商如何改变消费者行为",
      pages: "42页",
      cover: "/images/whitepapers/tiktok-trends.jpg"
    },
    {
      title: "工厂的数字化转型",
      description: "从传统制造到智能工业的实践路径",
      pages: "56页",
      cover: "/images/whitepapers/digital-transformation.jpg"
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">
            洞察与观点
          </h2>
          <p className="text-slate-600">
            基于数据驱动的行业研究与战略思考
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reports.map((report, i) => (
            <motion.div
              key={i}
              className="group bg-white border border-slate-200 rounded-sm overflow-hidden hover:-translate-y-1 hover:border-[#00509d] hover:shadow-lg transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.1, duration: 0.6 },
                },
              }}
            >
              {/* 白皮书封面 */}
              <div className="relative h-64 bg-gradient-to-br from-[#051c2c] to-[#00509d] overflow-hidden">
                {/* 背景纹理 */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" 
                    style={{
                      backgroundImage: `linear-gradient(45deg, transparent 48%, white 49%, white 51%, transparent 52%)`,
                      backgroundSize: '20px 20px'
                    }}
                  />
                </div>
                
                {/* 白皮书图标 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <FileText className="w-32 h-32 text-white/20" />
                </div>
                
                {/* 装饰性元素 */}
                <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/30 rounded-full" />
                <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/10 rounded-sm rotate-12" />
                
                {/* 页码显示 */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 text-[#051c2c] text-xs font-semibold rounded">
                  {report.pages}
                </div>
              </div>

              {/* 内容 */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
                  {report.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {report.description}
                </p>
                <p className="text-xs text-slate-400 mb-4">{report.pages}</p>

                {/* 下载按钮 */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#051c2c] text-white rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Download className="w-4 h-4" />
                  <span>下载 PDF</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
