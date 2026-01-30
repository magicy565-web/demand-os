"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Calendar,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    type: "sales",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("感谢您的咨询！我们会在24小时内回复您。");
  };

  return (
    <div className="min-h-screen bg-slate-50">
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

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            联系我们
          </h1>
          <p className="text-xl text-slate-600">
            我们随时为您提供帮助，选择最适合您的联系方式
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Quick Contact Cards */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">电话咨询</h3>
                  <p className="text-sm text-slate-600">工作日 9:00-18:00</p>
                </div>
              </div>
              <div className="space-y-2">
                <a href="tel:400-888-8888" className="block text-lg font-medium text-blue-600 hover:underline">
                  400-888-8888
                </a>
                <p className="text-sm text-slate-600">销售热线（免费）</p>
                <a href="tel:0755-88888888" className="block text-slate-700">
                  0755-8888-8888
                </a>
                <p className="text-sm text-slate-600">技术支持</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl text-green-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">邮件联系</h3>
                  <p className="text-sm text-slate-600">24小时内回复</p>
                </div>
              </div>
              <div className="space-y-3">
                <a href="mailto:sales@demandos.com" className="block text-blue-600 hover:underline">
                  sales@demandos.com
                </a>
                <p className="text-sm text-slate-600">商务合作</p>
                <a href="mailto:support@demandos.com" className="block text-blue-600 hover:underline">
                  support@demandos.com
                </a>
                <p className="text-sm text-slate-600">技术支持</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">办公地址</h3>
                  <p className="text-sm text-slate-600">欢迎预约参观</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-slate-900 mb-1">深圳总部</p>
                  <p className="text-sm text-slate-600">
                    广东省深圳市南山区科技园<br/>
                    腾讯大厦A座18层
                  </p>
                </div>
                <div>
                  <p className="font-medium text-slate-900 mb-1">北京办公室</p>
                  <p className="text-sm text-slate-600">
                    北京市朝阳区望京SOHO T3<br/>
                    12层1201室
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900">工作时间</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">周一至周五</span>
                  <span className="text-slate-900 font-medium">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">周六</span>
                  <span className="text-slate-900 font-medium">10:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">周日及法定节假日</span>
                  <span className="text-slate-500">休息</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                发送消息
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      邮箱 *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      公司名称
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="您的公司"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      电话
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="联系电话"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    咨询类型 *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="sales">产品咨询</option>
                    <option value="support">技术支持</option>
                    <option value="partner">合作洽谈</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    留言内容 *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="请详细描述您的需求..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  发送消息
                </button>

                <p className="text-sm text-slate-500 text-center">
                  提交后我们将在24小时内与您联系
                </p>
              </form>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 rounded-2xl text-white">
                <MessageSquare className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-bold mb-2">在线客服</h3>
                <p className="text-sm opacity-90 mb-4">
                  工作时间内即时响应
                </p>
                <button className="px-6 py-2 bg-white text-blue-600 rounded-xl font-medium hover:shadow-xl transition">
                  开始对话
                </button>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-teal-500 p-6 rounded-2xl text-white">
                <Calendar className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-bold mb-2">预约演示</h3>
                <p className="text-sm opacity-90 mb-4">
                  专属顾问1对1讲解
                </p>
                <button className="px-6 py-2 bg-white text-green-600 rounded-xl font-medium hover:shadow-xl transition">
                  预约时间
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-slate-200 p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            办公地点
          </h2>
          <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
            <MapPin className="w-16 h-16 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 mt-4 text-center">
            地图加载中... (可集成高德地图或百度地图API)
          </p>
        </motion.div>
      </div>
    </div>
  );
}
