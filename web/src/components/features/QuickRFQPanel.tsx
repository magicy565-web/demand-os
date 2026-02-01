"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Demand } from "@/types/demand";
import { 
  Send, 
  MessageSquare, 
  Calendar,
  Building2,
  Users,
  FileText,
  Clock,
  CheckCircle2
} from "lucide-react";

interface QuickRFQPanelProps {
  demand: Demand;
  onSubmit?: (data: RFQData) => void;
}

interface RFQData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  message: string;
}

export function QuickRFQPanel({ demand, onSubmit }: QuickRFQPanelProps) {
  const [formData, setFormData] = useState<RFQData>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    message: `您好，我对"${demand.title}"感兴趣，希望了解更多详情。`,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-cyan-600" />
        <h3 className="text-lg font-bold text-gray-900">快速询盘</h3>
      </div>

      {submitted ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-8"
        >
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-3" />
          <p className="text-green-700 font-semibold">询盘已发送！</p>
          <p className="text-sm text-gray-600 mt-1">我们将尽快与您联系</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Building2 className="w-3.5 h-3.5 inline mr-1" />
                公司名称 *
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="请输入公司名称"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Users className="w-3.5 h-3.5 inline mr-1" />
                联系人 *
              </label>
              <input
                type="text"
                required
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="请输入联系人姓名"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                邮箱 *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="example@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                电话 *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="+86 138 0000 0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              <FileText className="w-3.5 h-3.5 inline mr-1" />
              留言
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              placeholder="请描述您的需求..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg"
          >
            <Send className="w-4 h-4" />
            立即发送询盘
          </motion.button>

          <div className="flex items-start gap-2 text-xs text-gray-500 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <Clock className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p>
              <span className="font-semibold text-yellow-700">响应时间：</span>
              我们通常在2小时内回复询盘，工作日24小时内安排专员对接
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
