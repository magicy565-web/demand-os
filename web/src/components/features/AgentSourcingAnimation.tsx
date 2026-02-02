"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Search, 
  Database, 
  Zap, 
  Globe,
  Filter,
  TrendingUp,
  Sparkles,
  Activity,
  UserCheck
} from "lucide-react";

// 生成30-60秒的随机时长
const getRandomDuration = () => Math.floor(Math.random() * (60 - 30 + 1) + 30) * 1000;

const sourcingSteps = [
  { icon: Globe, text: "扫描全球采购平台中", color: "text-blue-600", duration: getRandomDuration() },
  { icon: Search, text: "识别采购意图关键词", color: "text-purple-600", duration: getRandomDuration() },
  { icon: Filter, text: "验证需求真实性", color: "text-orange-600", duration: getRandomDuration() },
  { icon: TrendingUp, text: "计算商业价值评分", color: "text-green-600", duration: getRandomDuration() },
  { icon: UserCheck, text: "等待人工审核验证", color: "text-yellow-600", duration: getRandomDuration() },
  { icon: Database, text: "推送高质量需求", color: "text-cyan-600", duration: getRandomDuration() },
];

export function AgentSourcingAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [demandsFound, setDemandsFound] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 使用当前步骤的持续时间
    const currentDuration = sourcingSteps[currentStep].duration;
    
    // 重置进度
    setProgress(0);
    
    // 进度条动画 - 每100ms更新一次
    const increment = 100 / (currentDuration / 100); // 每100ms增加的百分比
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, 100);

    // 步骤切换
    const stepTimeout = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % sourcingSteps.length);
    }, currentDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep]);

  useEffect(() => {
    // 模拟持续发现需求 - 每30-60秒增加
    const scheduleDemandUpdate = () => {
      const randomDelay = Math.floor(Math.random() * (60 - 30 + 1) + 30) * 1000;
      const timeout = setTimeout(() => {
        setDemandsFound((prev) => prev + Math.floor(Math.random() * 2) + 1);
        scheduleDemandUpdate(); // 递归调度下一次更新
      }, randomDelay);
      return timeout;
    };

    const timeout = scheduleDemandUpdate();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const CurrentIcon = sourcingSteps[currentStep].icon;

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 左侧内容 */}
          <div className="flex items-center gap-6">
            {/* 动画图标 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>

            {/* 当前步骤 */}
            <div className="flex items-center gap-3">
              <motion.div
                key={`step-icon-${currentStep}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-8 h-8 backdrop-blur-sm rounded-lg flex items-center justify-center ${
                  currentStep === 4 ? 'bg-yellow-400/40' : 'bg-white/30'
                }`}
              >
                <CurrentIcon className="w-4 h-4 text-white" />
              </motion.div>
              <motion.div
                key={`step-text-${currentStep}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="min-w-[240px]"
              >
                <p className="text-white font-semibold text-sm">
                  {sourcingSteps[currentStep].text}
                </p>
                {currentStep === 4 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-yellow-200 text-xs mt-0.5"
                  >
                    人工审核确保需求质量
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* 脉动点 */}
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full"
              />
              <div className="w-3 h-3 bg-green-400 rounded-full" />
            </div>
          </div>

          {/* 右侧统计 */}
          <div className="flex items-center gap-6">
            {/* 活跃状态 */}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Activity className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">AI Agent 运行中</span>
            </div>

            {/* 发现数量 */}
            <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-xs">已发现</span>
                <motion.span
                  key={`demands-${demandsFound}-${Date.now()}`}
                  initial={{ scale: 1.5, color: "#fef08a" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  transition={{ duration: 0.5 }}
                  className="text-white font-bold text-lg"
                >
                  {demandsFound}
                </motion.span>
                <span className="text-white text-xs">条需求</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          key={`progress-${currentStep}`}
          className={`h-full rounded-full ${
            currentStep === 4 
              ? 'bg-gradient-to-r from-yellow-300 to-orange-400' 
              : 'bg-white/60'
          }`}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
    </div>
  );
}
