"use client";

import { motion } from "framer-motion";
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
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[240px]">
          {/* HERO 卡 (2x2) - Demand-OS */}
          <motion.div
            className="col-span-1 md:col-span-2 row-span-2 relative overflow-hidden bg-slate-50 border border-slate-200 rounded-sm group hover:-translate-y-1 hover:border-[#00509d] transition-all duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-white opacity-50" />
            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              <div>
                <Globe className="w-12 h-12 text-[#00509d] mb-4" />
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3">
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

              <p className="text-sm text-[#00509d] font-medium">
                了解 Demand-OS →
              </p>
            </div>
          </motion.div>

          {/* 战略卡 (1x2 垂直) - 企业规划 */}
          <motion.div
            className="col-span-1 row-span-2 bg-[#051c2c] text-white border border-slate-900 rounded-sm group hover:-translate-y-1 hover:border-[#00509d] transition-all duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-6 flex flex-col justify-between">
              <div>
                <Compass className="w-10 h-10 mb-4 opacity-80" />
                <h3 className="text-2xl font-serif font-bold mb-3">
                  战略咨询
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  企业海外规划与市场进入策略
                </p>
              </div>
              <p className="text-sm text-slate-400 font-medium">
                探索服务 →
              </p>
            </div>
          </motion.div>

          {/* 增长卡 (2x1) - TikTok 孵化器 */}
          <motion.div
            className="col-span-1 md:col-span-2 row-span-1 bg-white border border-slate-200 rounded-sm group hover:-translate-y-1 hover:border-[#00509d] transition-all duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <TrendingUp className="w-10 h-10 text-[#00509d]" />
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900">
                    孕育下一个畅销书
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
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

          {/* INFRA 卡 (1x1) - 展览 */}
          <motion.div
            className="col-span-1 row-span-1 bg-slate-50 border border-slate-200 rounded-sm group hover:-translate-y-1 hover:border-[#00509d] transition-all duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-6 flex flex-col justify-between">
              <Package className="w-8 h-8 text-[#00509d]" />
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  海外展览
                </h3>
                <p className="text-xs text-slate-600 mt-1">美国 • 英国</p>
              </div>
            </div>
          </motion.div>

          {/* INFRA 卡 (1x1) - 仓库 */}
          <motion.div
            className="col-span-1 row-span-1 bg-slate-50 border border-slate-200 rounded-sm group hover:-translate-y-1 hover:border-[#00509d] transition-all duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-6 flex flex-col justify-between">
              <Warehouse className="w-8 h-8 text-[#00509d]" />
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  海外仓库
                </h3>
                <p className="text-xs text-slate-600 mt-1">全球物流网络</p>
              </div>
            </div>
          </motion.div>

          {/* VIP 卡 (1x1) - 会员俱乐部 */}
          <motion.div
            className="col-span-1 row-span-1 bg-white border border-slate-200 rounded-sm group hover:-translate-y-1 hover:border-[#00509d] transition-all duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="h-full p-6 flex flex-col justify-between">
              <Award className="w-8 h-8 text-[#00509d]" />
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  会员俱乐部
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  精英企业网络
                </p>
              </div>
            </div>
          </motion.div>

          {/* 信息卡 - 活动 */}
          <motion.div
            className="col-span-1 bg-white border border-slate-200 rounded-sm p-4 hover:bg-slate-50 transition"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Calendar className="w-6 h-6 text-slate-400 mb-2" />
            <p className="text-sm text-[#00509d] font-medium">活动</p>
          </motion.div>

          {/* 信息卡 - 新闻 */}
          <motion.div
            className="col-span-1 bg-white border border-slate-200 rounded-sm p-4 hover:bg-slate-50 transition"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Newspaper className="w-6 h-6 text-slate-400 mb-2" />
            <p className="text-sm text-[#00509d] font-medium">新闻</p>
          </motion.div>

          {/* 信息卡 - 人才 */}
          <motion.div
            className="col-span-1 bg-white border border-slate-200 rounded-sm p-4 hover:bg-slate-50 transition"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Users className="w-6 h-6 text-slate-400 mb-2" />
            <p className="text-sm text-[#00509d] font-medium">人才</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
