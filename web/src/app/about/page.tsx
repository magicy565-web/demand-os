"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Target,
  Award,
  Users,
  Globe,
  TrendingUp,
  Heart,
  Zap,
  Shield,
} from "lucide-react";

const timeline = [
  { year: "2020", event: "公司成立", desc: "在深圳前海注册成立，聚焦跨境贸易数字化" },
  { year: "2021", event: "产品上线", desc: "Demand OS 1.0 发布，首批100家企业入驻" },
  { year: "2022", event: "快速增长", desc: "服务企业突破1000家，覆盖50+国家" },
  { year: "2023", event: "AI升级", desc: "引入AI智能匹配引擎，匹配效率提升300%" },
  { year: "2024", event: "生态完善", desc: "整合物流、金融、仓储全链路服务" },
  { year: "2025", event: "国际化", desc: "北美、欧洲办事处成立，全球化布局" },
];

const team = [
  {
    name: "张伟",
    role: "创始人 & CEO",
    avatar: "👨‍💼",
    bio: "前阿里巴巴国际站总监，10年跨境电商经验",
  },
  {
    name: "李娜",
    role: "CTO",
    avatar: "👩‍💻",
    bio: "前腾讯云架构师，AI领域专家",
  },
  {
    name: "王强",
    role: "COO",
    avatar: "👨‍💼",
    bio: "前京东物流副总裁，供应链管理专家",
  },
  {
    name: "刘芳",
    role: "CMO",
    avatar: "👩‍💼",
    bio: "前字节跳动市场总监，增长黑客实践者",
  },
];

const values = [
  {
    icon: Target,
    title: "客户至上",
    desc: "以客户成功为核心，持续创造价值",
  },
  {
    icon: Zap,
    title: "创新驱动",
    desc: "拥抱新技术，用AI重塑贸易效率",
  },
  {
    icon: Heart,
    title: "诚信透明",
    desc: "坚守商业道德，建立信任关系",
  },
  {
    icon: Shield,
    title: "安全可靠",
    desc: "保护客户数据，确保交易安全",
  },
];

const stats = [
  { value: "10,000+", label: "服务企业" },
  { value: "80+", label: "覆盖国家" },
  { value: "$5B+", label: "年交易额" },
  { value: "98%", label: "客户满意度" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-slate-900 transition" />
            <span className="text-slate-600 group-hover:text-slate-900 transition">返回首页</span>
          </Link>
          <Link href="/saas-home">
            <Image
              src="/logo.png"
              alt="Demand OS"
              width={140}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#051c2c] to-[#00509d] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-6"
          >
            连接全球需求，创造无限商机
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Demand OS 致力于用AI技术重塑全球贸易效率，让每个企业都能轻松对接全球供需
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#00509d] mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">我们的使命</h2>
              <p className="text-lg text-slate-600 mb-4">
                在全球化时代，贸易信息不对称仍是企业发展的最大障碍。我们相信，通过AI技术和大数据分析，可以让全球供需实现实时、精准、高效的匹配。
              </p>
              <p className="text-lg text-slate-600">
                Demand OS 不仅是一个平台，更是一个生态系统。我们整合了供应链、物流、金融等全链路服务，让企业专注于业务本身，其他的交给我们。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-8 rounded-2xl text-white">
                <Globe className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">全球化</h3>
                <p className="text-sm opacity-90">覆盖80+国家和地区</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-teal-500 p-8 rounded-2xl text-white">
                <TrendingUp className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">高效率</h3>
                <p className="text-sm opacity-90">匹配速度提升10倍</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-2xl text-white">
                <Award className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">高品质</h3>
                <p className="text-sm opacity-90">98%客户满意度</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-2xl text-white">
                <Users className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">大生态</h3>
                <p className="text-sm opacity-90">10,000+企业共同成长</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            发展历程
          </motion.h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative mb-12 ${
                  i % 2 === 0 ? "text-right pr-12" : "text-left pl-12 ml-auto"
                } md:w-1/2`}
              >
                <div className="absolute top-0 left-1/2 -ml-4 w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg" />
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.event}
                  </h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            核心团队
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-7xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <div className="text-blue-600 font-medium mb-3">{member.role}</div>
                <p className="text-sm text-slate-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            核心价值观
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl text-center hover:shadow-xl transition"
              >
                <div className="inline-flex p-4 bg-blue-100 rounded-full text-blue-600 mb-4">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 p-12 rounded-2xl text-white"
          >
            <h2 className="text-3xl font-bold mb-4">加入我们，共创未来</h2>
            <p className="text-xl mb-8 opacity-90">
              我们正在寻找充满激情的人才，一起重塑全球贸易
            </p>
            <Link
              href="/careers"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-xl font-medium hover:shadow-xl transition"
            >
              查看职位
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
