"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

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
    },
    {
      title: "TikTok美国家居生活趋势",
      description: "社交电商如何改变消费者行为",
      pages: "42页",
    },
    {
      title: "工厂的数字化转型",
      description: "从传统制造到智能工业的实践路径",
      pages: "56页",
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
              <div className="h-64 bg-slate-100 flex items-center justify-center border-b border-slate-200">
                <FileText className="w-24 h-24 text-slate-300" />
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
