"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const partnersList = [
  { name: "Amazon", logo: "/images/partners/amazon.png" },
  { name: "TikTok", logo: "/images/partners/tiktok.png" },
  { name: "Walmart", logo: "/images/partners/walmart.png" },
  { name: "Maersk", logo: "/images/partners/maersk.png" },
  { name: "DHL", logo: "/images/partners/dhl.png" },
];

export default function TrustedEcosystem() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">
            全球企业的信赖之选
          </h2>
          <p className="text-slate-600">与行业领导者合作，构建全球供应链生态</p>
        </motion.div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "合作企业", value: "500+", desc: "全球顶尖企业" },
            { label: "服务国家", value: "80+", desc: "跨境服务网络" },
            { label: "年交易额", value: "$2B+", desc: "平台GMV" },
            { label: "用户满意度", value: "98%", desc: "客户好评" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center border border-slate-200 hover:shadow-lg transition-all"
            >
              <div className="text-3xl font-bold text-[#00509d] mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* 合作伙伴Logo */}
        <motion.h3
          className="text-xl font-semibold text-slate-700 text-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          核心合作伙伴
        </motion.h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {partnersList.map((partner, i) => (
            <PartnerLogo key={i} partner={partner} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerLogo({
  partner,
  index,
}: {
  partner: { name: string; logo: string };
  index: number;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="flex items-center justify-center h-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 0.5,
          transition: { delay: index * 0.1 },
        },
      }}
    >
      {!imageError ? (
        <div className="relative w-full h-full opacity-50 hover:opacity-100 transition-opacity duration-300">
          <Image
            src={partner.logo}
            alt={`${partner.name} Logo`}
            fill
            className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <p className="text-2xl font-bold text-slate-400 hover:text-slate-700 transition">
          {partner.name}
        </p>
      )}
    </motion.div>
  );
}
