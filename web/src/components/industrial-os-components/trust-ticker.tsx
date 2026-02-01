"use client";

import { motion } from "framer-motion";

const PARTNERS = [
  { name: "中国信保", type: "government" },
  { name: "招商银行", type: "bank" },
  { name: "顺丰国际", type: "logistics" },
  { name: "阿里国际站", type: "platform" },
  { name: "希尔顿", type: "client" },
  { name: "万豪集团", type: "client" },
  { name: "华住集团", type: "client" },
  { name: "亚朵酒店", type: "client" },
  { name: "佛山市政府", type: "government" },
  { name: "东莞厚街镇", type: "government" },
  { name: "深圳前海", type: "government" },
  { name: "中国银行", type: "bank" },
];

const CERTIFICATIONS = [
  { name: "ISO 27001", desc: "信息安全" },
  { name: "等保三级", desc: "数据安全" },
  { name: "SGS认证", desc: "质量体系" },
  { name: "FSC认证", desc: "环保材料" },
];

export function TrustTicker() {
  // Double the array for seamless loop
  const doubledPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-8 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Certifications row */}
        <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-2 px-3 py-1.5 bg-paper-warm border border-gray-200 rounded"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <span className="text-[10px] font-mono text-slate">{cert.name}</span>
              <span className="text-[9px] text-slate">| {cert.desc}</span>
            </div>
          ))}
        </div>

        {/* Partner ticker */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#111827] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#111827] to-transparent z-10" />

          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{
              x: [0, -50 * PARTNERS.length],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {doubledPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex items-center gap-2 px-4 py-2"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    partner.type === "government"
                      ? "bg-[#dc2626]"
                      : partner.type === "bank"
                      ? "bg-[#3b82f6]"
                      : partner.type === "logistics"
                      ? "bg-success"
                      : partner.type === "platform"
                      ? "bg-[#d97706]"
                      : "bg-[#64748b]"
                  }`}
                />
                <span className="text-xs font-mono text-slate">{partner.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-12 mt-6 text-center flex-wrap">
          <div>
            <div className="text-lg font-mono font-bold text-foreground">142+</div>
            <div className="text-[10px] text-slate">合作企业</div>
          </div>
          <div className="w-px h-8 bg-[#374151] hidden sm:block" />
          <div>
            <div className="text-lg font-mono font-bold text-foreground">¥24.5亿</div>
            <div className="text-[10px] text-slate">累计GMV</div>
          </div>
          <div className="w-px h-8 bg-[#374151] hidden sm:block" />
          <div>
            <div className="text-lg font-mono font-bold text-foreground">98.5%</div>
            <div className="text-[10px] text-slate">准时交付率</div>
          </div>
          <div className="w-px h-8 bg-[#374151] hidden sm:block" />
          <div>
            <div className="text-lg font-mono font-bold text-foreground">35%</div>
            <div className="text-[10px] text-slate">平均降本</div>
          </div>
        </div>
      </div>
    </section>
  );
}
