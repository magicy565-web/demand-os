"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface AppleFeatureProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  dark?: boolean;
}

export default function AppleFeature({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  dark = false,
}: AppleFeatureProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  const bgColor = dark ? "bg-black" : "bg-white";
  const textColor = dark ? "text-white" : "text-black";
  const subtitleColor = dark ? "text-white/60" : "text-black/60";

  return (
    <section ref={ref} className={`relative min-h-screen w-full ${bgColor}`}>
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <div
          className={`grid grid-cols-1 items-center gap-16 lg:grid-cols-2 ${
            reverse ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* 文字内容 */}
          <motion.div
            style={{ opacity }}
            className={`${reverse ? "lg:col-start-2" : ""} space-y-6`}
          >
            <motion.div
              initial={{ opacity: 0, x: reverse ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2
                className={`mb-2 text-sm font-semibold uppercase tracking-wider ${subtitleColor}`}
              >
                {subtitle}
              </h2>
              <h3
                className={`mb-6 text-5xl font-bold leading-tight tracking-tight ${textColor} lg:text-6xl`}
              >
                {title}
              </h3>
              <p
                className={`text-xl leading-relaxed ${subtitleColor} lg:text-2xl`}
              >
                {description}
              </p>
            </motion.div>
          </motion.div>

          {/* 图片 */}
          <motion.div
            style={{ y: imageY, scale }}
            className={`relative ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  // 显示占位符
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const placeholder = document.createElement("div");
                    placeholder.className = `absolute inset-0 bg-gradient-to-br ${
                      dark ? "from-slate-800 to-slate-900" : "from-slate-100 to-slate-200"
                    } flex items-center justify-center`;
                    placeholder.innerHTML = `<span class="${
                      dark ? "text-white/20" : "text-black/20"
                    } text-2xl font-bold">${imageAlt}</span>`;
                    parent.appendChild(placeholder);
                  }
                }}
              />
            </div>

            {/* 装饰性发光 */}
            {dark && (
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-blue-500/10 blur-3xl" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
