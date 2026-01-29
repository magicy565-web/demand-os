"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TrustedEcosystem() {
  const partners = [
    "Amazon",
    "TikTok",
    "Walmart",
    "Maersk",
    "DHL",
    "中国信保",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-serif font-bold text-slate-900 text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          由全球领导人赋能
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-center h-16 opacity-50 hover:opacity-100 transition-opacity duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 0.5,
                  transition: { delay: i * 0.1 },
                },
              }}
            >
              <p className="text-2xl font-bold text-slate-400 hover:text-slate-700 transition">
                {partner}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
