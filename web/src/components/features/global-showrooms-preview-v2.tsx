"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Building2, Globe2, Users, TrendingUp, ArrowRight, MapPin, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

// Animated counter component
function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { icon: Globe2, label: "全球展厅", value: 2, unit: "城市", color: "from-blue-500 to-cyan-500" },
  { icon: Building2, label: "展示品类", value: 500, unit: "+", color: "from-purple-500 to-pink-500" },
  { icon: Users, label: "月均接待", value: 200, unit: "+", color: "from-orange-500 to-red-500" },
  { icon: TrendingUp, label: "年增长率", value: 103, unit: "%", color: "from-green-500 to-emerald-500" },
];

const locations = [
  {
    city: "洛杉矶",
    country: "美国",
    address: "Los Angeles, CA",
    timezone: "PST (UTC-8)",
    hours: "周一至周六 9:00-18:00",
    team: "15人专业团队",
    features: ["产品展示", "市场测试", "客户洽谈"],
    highlights: ["北美市场入口", "西海岸物流枢纽", "多元文化优势"],
  },
  {
    city: "伦敦",
    country: "英国",
    address: "London, UK",
    timezone: "GMT (UTC+0)",
    hours: "周一至周五 9:00-17:30",
    team: "12人本地团队",
    features: ["品牌孵化", "欧洲市场", "商务对接"],
    highlights: ["欧洲金融中心", "辐射整个欧盟", "高端品牌聚集地"],
  },
];

const testimonials = [
  {
    quote: "通过洛杉矶展厅，我们在3个月内完成了北美市场的首批订单",
    author: "深圳某智能硬件厂商",
    result: "首月GMV $180K",
  },
  {
    quote: "伦敦展厅帮助我们成功对接了5家欧洲连锁零售商",
    author: "广州某家居品牌",
    result: "年度订单 £2.5M",
  },
];

export function GlobalShowroomsPreviewV2() {
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <section ref={sectionRef} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black" />
      
      {/* Radial gradient spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-blue-900/10 to-transparent blur-3xl" />
      
      {/* 3D Grid with perspective */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)] [transform:perspective(1000px)_rotateX(60deg)] opacity-30" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              y: [null, Math.random() * -100 + "%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-sm text-blue-400 font-light tracking-wider">GLOBAL SHOWROOMS NETWORK</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight"
          >
            全球展厅网络
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed"
          >
            在美国洛杉矶、英国伦敦设立实体展厅，为品牌提供产品展示、市场测试、客户洽谈的专业空间
          </motion.p>
          
          {/* Visual divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-px w-32 mx-auto mt-8 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          />
        </motion.div>

        {/* Main Content Grid with enhanced layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* 3D Building Preview with spotlight effect */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative aspect-[4/3] bg-black/40 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm shadow-2xl">
              <Building3D selectedFloor={null} selectedZone={null} />
              
              {/* Interactive hint */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
                className="absolute top-6 right-6 px-3 py-2 bg-blue-500/20 backdrop-blur-md rounded-lg border border-blue-500/30 text-xs text-blue-300"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  点击探索楼层
                </span>
              </motion.div>
            </div>
            
            {/* Info card with enhanced design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute bottom-6 left-6 right-6 bg-black/90 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-2xl"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-light text-white mb-1">6层垂直产业空间</h3>
                  <p className="text-sm text-white/60">
                    打造全产业链选品中心
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light text-white">18,100</div>
                  <div className="text-xs text-white/50">㎡ 专业展示空间</div>
                </div>
              </div>
              
              <Link
                href="/showrooms"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group/link"
              >
                探索完整展厅
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Locations & Stats with enhanced design */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6"
          >
            {/* Global Locations with more details */}
            <div className="space-y-4">
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  onHoverStart={() => setHoveredLocation(index)}
                  onHoverEnd={() => setHoveredLocation(null)}
                  className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-500 cursor-pointer group overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredLocation === index ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 pointer-events-none"
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-5 h-5 text-blue-400" />
                          <h3 className="text-xl font-light text-white">
                            {location.city}
                          </h3>
                          <span className="text-sm text-white/40">{location.country}</span>
                        </div>
                        <p className="text-sm text-white/50 mb-1">{location.address}</p>
                        <div className="flex items-center gap-4 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {location.timezone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {location.team}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-green-400">在线</span>
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        </div>
                        <span className="text-xs text-white/40">{location.hours}</span>
                      </div>
                    </div>
                    
                    {/* Features tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {location.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/60 border border-white/10 group-hover:border-blue-500/30 transition-colors"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* Highlights - shown on hover */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: hoveredLocation === index ? "auto" : 0,
                        opacity: hoveredLocation === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-white/10 space-y-2">
                        {location.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                            <CheckCircle2 className="w-3 h-3 text-blue-400" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Grid with animated counters */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  onHoverStart={() => setHoveredStat(index)}
                  onHoverEnd={() => setHoveredStat(null)}
                  className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredStat === index ? 1 : 0,
                      scale: hoveredStat === index ? 1 : 0.8,
                    }}
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 blur-xl`}
                  />
                  
                  <div className="relative z-10">
                    <stat.icon className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-2xl font-light text-white">
                        <AnimatedCounter value={stat.value} suffix={stat.unit} />
                      </span>
                    </div>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </div>
                  
                  {/* Progress bar */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: 1 + index * 0.1 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 origin-left"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/20 transition-all duration-300"
            >
              <div className="absolute top-4 left-4 text-4xl text-blue-500/20">"</div>
              <p className="text-white/80 mb-4 relative z-10 pl-6 italic">
                {testimonial.quote}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">{testimonial.author}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-light text-blue-400">{testimonial.result}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/showrooms"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-light text-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                预约展厅参观
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Shine effect */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
            </Link>
            
            <Link
              href="/showrooms"
              className="px-8 py-4 bg-white/5 text-white rounded-xl font-light text-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              了解更多
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
