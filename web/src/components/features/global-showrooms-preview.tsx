"use client";

import { motion } from "framer-motion";
import { Building2, Globe2, Users, TrendingUp, ArrowRight, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { ThreeErrorBoundary } from "@/components/three-error-boundary";

// Dynamically import the 3D building component
const Building3D = dynamic(
  () => import("@/components/building-3d").then((mod) => ({ default: mod.Building3D })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900/50 rounded-xl">
        <div className="text-white/60">加载3D展厅...</div>
      </div>
    ),
  }
);

const stats = [
  { icon: Globe2, label: "全球展厅", value: "2", unit: "城市" },
  { icon: Building2, label: "展示品类", value: "500+", unit: "SKU" },
  { icon: Users, label: "月均接待", value: "200+", unit: "客户" },
  { icon: TrendingUp, label: "年增长率", value: "103%", unit: "" },
];

const locations = [
  {
    city: "洛杉矶",
    country: "美国",
    address: "Los Angeles, CA",
    features: ["产品展示", "市场测试", "客户洽谈"],
  },
  {
    city: "伦敦",
    country: "英国",
    address: "London, UK",
    features: ["品牌孵化", "欧洲市场", "商务对接"],
  },
];

export function GlobalShowroomsPreview() {
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Globe2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-light">GLOBAL SHOWROOMS</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            全球展厅网络
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
            在美国洛杉矶、英国伦敦设立实体展厅，为品牌提供产品展示、市场测试、客户洽谈的专业空间
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* 3D Building Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-black/40 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
              <ThreeErrorBoundary>
                <Building3D selectedFloor={null} selectedZone={null} />
              </ThreeErrorBoundary>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-lg font-light text-white mb-2">6层垂直产业空间</h3>
              <p className="text-sm text-white/60 mb-4">
                打造全产业链选品中心，18,100㎡ 专业展示空间
              </p>
              <Link
                href="/showrooms"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group"
              >
                探索完整展厅
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Locations & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Global Locations */}
            <div className="space-y-4">
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  onHoverStart={() => setHoveredLocation(index)}
                  onHoverEnd={() => setHoveredLocation(null)}
                  className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <h3 className="text-xl font-light text-white">
                          {location.city}
                        </h3>
                        <span className="text-sm text-white/40">{location.country}</span>
                      </div>
                      <p className="text-sm text-white/50">{location.address}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {location.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/60 border border-white/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  {hoveredLocation === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl pointer-events-none"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <stat.icon className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-light text-white">{stat.value}</span>
                    {stat.unit && (
                      <span className="text-sm text-white/40">{stat.unit}</span>
                    )}
                  </div>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/showrooms"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-light text-lg overflow-hidden hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                预约展厅参观
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/showrooms"
              className="px-8 py-4 bg-white/5 text-white rounded-xl font-light text-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              了解更多
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
