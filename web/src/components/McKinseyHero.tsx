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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid - 调整卡片高度更加平衡 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 auto-rows-[280px]">
          {/* HERO 卡 (2x2) - Demand-OS */}
          <Link href="/saas-home/demand-os">
          <motion.div
            className="col-span-1 md:col-span-2 row-span-2 relative overflow-hidden bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg shadow-sm group hover:-translate-y-2 hover:shadow-xl hover:border-[#00509d] transition-all duration-500 cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full p-10 flex flex-col justify-between">
              <div>
                <Globe className="w-14 h-14 text-[#00509d] mb-6" />
                <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
                  全球贸易的操作系统
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
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

              <p className="text-sm text-[#00509d] font-medium group-hover:underline">
                了解 Demand-OS →
              </p>
            </div>
          </motion.div>
          </Link>

          {/* 战略卡 (1x2 垂直) - 企业规划 */}
          <Link href="/strategy-consulting">
          <motion.div
            className="col-span-1 row-span-2 bg-gradient-to-br from-[#051c2c] to-[#0a2a3d] text-white border border-slate-800 rounded-lg shadow-sm group hover:-translate-y-2 hover:shadow-xl hover:border-[#00509d] transition-all duration-500 cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-8 flex flex-col justify-between">
              <div>
                <Compass className="w-12 h-12 mb-5 opacity-90" />
                <h3 className="text-2xl font-serif font-bold mb-4">
                  战略咨询
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  企业海外规划与市场进入策略
                </p>
              </div>
              <p className="text-sm text-slate-400 font-medium group-hover:text-white transition-colors">
                探索服务 →
              </p>
            </div>
          </motion.div>
          </Link>

          {/* 增长卡 (2x1) - TikTok 孵化器 */}
          <Link href="/tiktok-alliance">
          <motion.div
            className="col-span-1 md:col-span-2 row-span-1 bg-white border border-slate-200 rounded-lg shadow-sm group hover:-translate-y-2 hover:shadow-xl hover:border-[#00509d] transition-all duration-500 cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-8 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <TrendingUp className="w-12 h-12 text-[#00509d]" />
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    孕育下一个畅销书
                  </h3>
                  <p className="text-sm text-slate-600 mt-2">
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
            className="col-span-1 bg-slate-50 border border-slate-200 rounded-lg shadow-sm group hover:-translate-y-2 hover:shadow-xl hover:border-[#00509d] transition-all duration-500 cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-8 flex flex-col justify-between">
              <Package className="w-10 h-10 text-[#00509d]" />
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  海外展厅
                </h3>
                <p className="text-sm text-slate-600 mt-2">美国 • 英国</p>
              </div>
            </div>
          </motion.div>
          </Link>

          {/* INFRA 卡 (1x1) - 仓库 */}
          <Link href="/logistics">
          <motion.div
            className="col-span-1 row-span-1 bg-slate-50 border border-slate-200 rounded-lg shadow-sm group hover:-translate-y-2 hover:shadow-xl hover:border-[#00509d] transition-all duration-500 cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-8 flex flex-col justify-between">
              <Warehouse className="w-10 h-10 text-[#00509d]" />
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  全球物流
                </h3>
                <p className="text-sm text-slate-600 mt-2">智能仓储网络</p>
              </div>
            </div>
          </motion.div>
          </Link>

          {/* VIP 卡 (1x1) - 会员俱乐部 */}
          <Link href="/membership">
          <motion.div
            className="col-span-1 row-span-1 bg-gradient-to-br from-[#051c2c] to-[#0a2a3d] text-white border border-slate-800 rounded-lg shadow-sm group hover:-translate-y-2 hover:shadow-xl hover:border-[#00509d] transition-all duration-500 cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-8 flex flex-col justify-between">
              <Award className="w-10 h-10 text-white opacity-90" />
              <div>
                <h3 className="text-xl font-serif font-bold text-white">
                  会员俱乐部
                </h3>
                <p className="text-sm text-slate-300 mt-2">
                  精英企业网络
                </p>
              </div>
            </div>
          </motion.div>
          </Link>

          {/* 信息卡 - 活动 */}
          <Link href="/events">
          <motion.div
            className="col-span-1 bg-white border border-slate-200 rounded-lg shadow-sm p-6 hover:bg-slate-50 hover:border-[#00509d] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Calendar className="w-8 h-8 text-slate-400 mb-3" />
            <p className="text-base text-[#00509d] font-semibold">活动</p>
          </motion.div>
          </Link>

          {/* 信息卡 - 新闻 */}
          <Link href="/news">
          <motion.div
            className="col-span-1 bg-white border border-slate-200 rounded-lg shadow-sm p-6 hover:bg-slate-50 hover:border-[#00509d] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Newspaper className="w-8 h-8 text-slate-400 mb-3" />
            <p className="text-base text-[#00509d] font-semibold">新闻</p>
          </motion.div>
          </Link>

          {/* 信息卡 - 人才 */}
          <Link href="/careers">
          <motion.div
            className="col-span-1 bg-white border border-slate-200 rounded-lg shadow-sm p-6 hover:bg-slate-50 hover:border-[#00509d] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Users className="w-8 h-8 text-slate-400 mb-3" />
            <p className="text-base text-[#00509d] font-semibold">人才</p>
          </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
