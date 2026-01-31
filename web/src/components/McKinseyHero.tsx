"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Globe,
  TrendingUp,
  Sparkles,
  Package,
  Warehouse,
  Award,
  Calendar,
  Newspaper,
  Users,
  Compass,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function McKinseyHero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative py-12 md:py-20 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-hidden">
      {/* Apple风格背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Apple风格标题区 */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-slate-900 mb-4 md:mb-6">
            全球贸易的
            <span className="block bg-gradient-to-r from-blue-600 to-slate-900 bg-clip-text text-transparent">
              操作系统
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            实时捕捉需求信号，智能匹配全球产能
          </p>
        </motion.div>

        {/* Bento Grid - Apple风格优化 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 auto-rows-[220px] md:auto-rows-[240px] lg:auto-rows-[260px]">
          {/* HERO 卡 (2x2) - Demand-OS */}
          <Link href="/saas-home/demand-os">
          <motion.div
            className="col-span-1 md:col-span-2 row-span-2 relative overflow-hidden bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-slate-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full p-6 md:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-5 md:mb-6 group-hover:scale-105 transition-transform">
                  <Globe className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 mb-3 md:mb-4 leading-tight tracking-tight">
                  全球贸易的操作系统
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed">
                  实时需求捕捉与人工智能产能匹配
                </p>
              </div>

              {/* 抽象数据地图可视化 */}
              <div className="relative h-32 mt-4">
                <svg
                  className="w-full h-full opacity-20"
                  viewBox="0 0 400 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* 连接节点 */}
                  <line
                    x1="50"
                    y1="50"
                    x2="150"
                    y2="30"
                    stroke="#00509d"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                  <line
                    x1="150"
                    y1="30"
                    x2="250"
                    y2="60"
                    stroke="#00509d"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                  <line
                    x1="250"
                    y1="60"
                    x2="350"
                    y2="40"
                    stroke="#00509d"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                  {/* 节点 */}
                  <circle cx="50" cy="50" r="4" fill="#00509d" />
                  <circle cx="150" cy="30" r="4" fill="#00509d" />
                  <circle cx="250" cy="60" r="4" fill="#00509d" />
                  <circle cx="350" cy="40" r="4" fill="#00509d" />
                </svg>
              </div>

              <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                <span className="text-sm">了解 Demand-OS</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>
          </Link>

          {/* 战略卡 (1x2 垂直) - 企业规划 */}
          <Link href="/strategy-consulting">
          <motion.div
            className="col-span-1 row-span-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700/50 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 mb-4 md:mb-5 group-hover:scale-105 group-hover:bg-white/15 transition-all">
                  <Compass className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 leading-tight tracking-tight">
                  战略咨询
                </h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  企业海外规划与市场进入策略
                </p>
              </div>
              <div className="flex items-center gap-2 text-slate-300 group-hover:text-white font-medium group-hover:gap-3 transition-all">
                <span className="text-sm">探索服务</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>
          </Link>

          {/* 增长卡 (2x1) - TikTok 孵化器 */}
          <Link href="/tiktok-alliance">
          <motion.div
            className="col-span-1 md:col-span-2 row-span-1 bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-5 md:p-7 flex items-center justify-between">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex-shrink-0 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-2xl font-semibold text-slate-900 leading-tight tracking-tight">
                    孕育下一个畅销书
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 md:mt-2">
                    TikTok 产业联盟
                  </p>
                </div>
              </div>
              {/* 趋势线图 */}
              <svg
                className="w-24 h-12 opacity-30"
                viewBox="0 0 100 50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline
                  points="0,40 20,35 40,25 60,20 80,10 100,5"
                  fill="none"
                  stroke="#00509d"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </motion.div>
          </Link>

          {/* INFRA 卡 (1x1) - 展览 */}
          <Link href="/showrooms">
          <motion.div
            className="col-span-1 bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-5 md:p-7 flex flex-col justify-between">
              <div className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 group-hover:scale-105 transition-transform">
                <Package className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 leading-tight tracking-tight">
                  海外展厅
                </h3>
                <p className="text-xs md:text-sm text-slate-600 mt-2">美国 • 英国</p>
              </div>
            </div>
          </motion.div>
          </Link>

          {/* INFRA 卡 (1x1) - 仓库 */}
          <Link href="/logistics">
          <motion.div
            className="col-span-1 row-span-1 bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-5 md:p-7 flex flex-col justify-between">
              <div className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 group-hover:scale-105 transition-transform">
                <Warehouse className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 leading-tight tracking-tight">
                  全球物流
                </h3>
                <p className="text-xs md:text-sm text-slate-600 mt-2">智能仓储网络</p>
              </div>
            </div>
          </motion.div>
          </Link>

          {/* VIP 卡 (1x1) - 会员俱乐部 */}
          <Link href="/membership">
          <motion.div
            className="col-span-1 row-span-1 bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700/50 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-5 md:p-7 flex flex-col justify-between">
              <div className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white/10 group-hover:scale-105 group-hover:bg-white/15 transition-all">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white leading-tight tracking-tight">
                  会员俱乐部
                </h3>
                <p className="text-xs md:text-sm text-slate-300 mt-2">
                  精英企业网络
                </p>
              </div>
            </div>
          </motion.div>
          </Link>

          {/* 信息卡 - 活动 */}
          <Link href="/events">
          <motion.div
            className="col-span-1 bg-slate-50 border border-slate-200/60 rounded-2xl shadow-sm p-5 md:p-6 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white group-hover:bg-blue-50 transition-colors mb-3">
              <Calendar className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
            </div>
            <p className="text-sm md:text-base text-slate-900 font-semibold">活动</p>
          </motion.div>
          </Link>

          {/* 信息卡 - 新闻 */}
          <Link href="/news">
          <motion.div
            className="col-span-1 bg-slate-50 border border-slate-200/60 rounded-2xl shadow-sm p-5 md:p-6 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white group-hover:bg-blue-50 transition-colors mb-3">
              <Newspaper className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
            </div>
            <p className="text-sm md:text-base text-slate-900 font-semibold">新闻</p>
          </motion.div>
          </Link>

          {/* 信息卡 - 人才 */}
          <Link href="/careers">
          <motion.div
            className="col-span-1 bg-slate-50 border border-slate-200/60 rounded-2xl shadow-sm p-5 md:p-6 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white group-hover:bg-blue-50 transition-colors mb-3">
              <Users className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
            </div>
            <p className="text-sm md:text-base text-slate-900 font-semibold">人才</p>
          </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
