"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  X, 
  Clock, 
  Mail, 
  Phone, 
  Bell,
  Calendar,
  FileText
} from "lucide-react";
import { Demand } from "@/types/demand";

interface ConnectSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  demand: Demand | null;
}

export function ConnectSuccessModal({ 
  isOpen, 
  onClose, 
  demand 
}: ConnectSuccessModalProps) {
  if (!demand) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* 弹窗内容 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden"
          >
            {/* 关闭按钮 */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </motion.button>

            {/* 成功图标动画 */}
            <div className="pt-12 pb-6 bg-gradient-to-b from-green-50 to-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  delay: 0.2 
                }}
                className="flex justify-center"
              >
                <div className="relative">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-green-400 rounded-full blur-xl"
                  />
                  <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center mt-6 px-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  对接请求已提交
                </h2>
                <p className="text-gray-600">
                  我们已收到您的对接申请，将尽快为您安排
                </p>
              </motion.div>
            </div>

            {/* 需求信息 */}
            <div className="px-6 pb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {demand.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>需求ID: {demand.id}</span>
                      <span>来源: {demand.source_platform}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 后续流程 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3 mb-6"
              >
                <h3 className="font-semibold text-gray-900 mb-3">后续流程</h3>
                
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      等待审核（1-2小时）
                    </h4>
                    <p className="text-xs text-gray-600">
                      我们的需求专员将审核您的对接资质
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      邮件通知（审核后）
                    </h4>
                    <p className="text-xs text-gray-600">
                      审核通过后将发送需求方联系方式至您的邮箱
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      电话跟进（24小时内）
                    </h4>
                    <p className="text-xs text-gray-600">
                      客户经理将致电确认对接进展
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      安排对接会议（3天内）
                    </h4>
                    <p className="text-xs text-gray-600">
                      协助双方安排线上/线下对接会议
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 提醒设置 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="p-4 bg-yellow-50 rounded-xl border border-yellow-200"
              >
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      开启进度通知
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">
                      及时接收对接进度更新，不错过任何商机
                    </p>
                    <div className="flex gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="w-4 h-4 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500"
                        />
                        <span className="text-xs text-gray-700">邮件通知</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="w-4 h-4 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500"
                        />
                        <span className="text-xs text-gray-700">短信通知</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500"
                        />
                        <span className="text-xs text-gray-700">微信通知</span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 底部按钮 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg"
                >
                  继续浏览需求
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
