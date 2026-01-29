"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function RadarCard() {
  const [dots, setDots] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const newDots = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-white mb-2">全球需求雷达</h3>
        <p className="text-xs text-slate-400 font-mono">实时监控 · 50,000+ 需求/日</p>
      </div>

      {/* 雷达可视化 */}
      <div className="relative w-32 h-32 mx-auto">
        {/* 背景圆圈 */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full absolute inset-0 opacity-30"
        >
          <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" className="text-blue-500" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" className="text-blue-500" />
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" className="text-blue-500" />
        </svg>

        {/* 旋转扫描线 */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" 
               style={{ clipPath: "polygon(50% 0%, 50% 100%, 0% 50%, 100% 50%)" }} />
        </motion.div>

        {/* 光点 */}
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute w-2 h-2 bg-green-400 rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function AIMatchingCard() {
  const [particlePos, setParticlePos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticlePos((prev) => (prev + 2) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-white mb-2">AI 产能撮合</h3>
        <p className="text-xs text-slate-400 font-mono">智能匹配 · 精准对接</p>
      </div>

      {/* 竖直连接线 */}
      <div className="relative flex-1 flex flex-col items-center justify-between">
        {/* 需求图标 */}
        <div className="text-2xl">📊</div>

        {/* 连接线 */}
        <div className="relative w-1 h-20 bg-gradient-to-b from-blue-500 to-transparent">
          {/* 发光粒子 */}
          <motion.div
            className="absolute left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              top: `${particlePos}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* 工厂图标 */}
        <motion.div
          className="text-2xl"
          animate={{
            scale: particlePos > 90 ? [1, 1.2, 1] : 1,
          }}
        >
          🏭
        </motion.div>
      </div>
    </div>
  );
}

export function MetricsCard() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-white">实时指标</h3>
        <p className="text-xs text-slate-400 font-mono mt-1">状态：在线</p>
      </div>

      {/* 迷你柱状图 */}
      <div className="flex items-end justify-around gap-1 h-12">
        {[65, 45, 80, 55, 70].map((height, i) => (
          <motion.div
            key={i}
            className="w-2 bg-gradient-to-t from-blue-500 to-cyan-400 rounded"
            animate={{
              height: [`${height}%`, `${height + 20}%`, `${height}%`],
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
            }}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      <p className="text-xs text-green-400 font-mono">↑ 24% vs 昨天</p>
    </div>
  );
}

export function FinanceCard() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-white">金融安全</h3>
        <p className="text-xs text-slate-400 font-mono mt-1">企业级加密</p>
      </div>

      {/* 盾牌图标 */}
      <div className="text-4xl mx-auto filter drop-shadow-lg" 
           style={{
             textShadow: "0 0 20px rgba(217, 119, 6, 0.6)",
           }}>
        🛡️
      </div>

      <p className="text-xs text-yellow-600 font-mono text-center">ISO27001 认证</p>
    </div>
  );
}

export function LogisticsCard() {
  const [truckPos, setTruckPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTruckPos((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-white">跨境物流</h3>
        <p className="text-xs text-slate-400 font-mono">全球运输网络</p>
      </div>

      {/* 运输路线 */}
      <div className="relative flex-1 flex items-center">
        <svg className="w-full h-12 absolute" viewBox="0 0 400 100">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* 弧形虚线路径 */}
          <path
            d="M 20 60 Q 200 20 380 60"
            stroke="url(#routeGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            opacity="0.6"
          />
        </svg>

        {/* 卡车图标 */}
        <motion.div
          className="absolute text-2xl"
          style={{
            left: `${truckPos}%`,
          }}
        >
          🚚
        </motion.div>
      </div>

      <p className="text-xs text-blue-400 font-mono">已配送 12,450+ 订单</p>
    </div>
  );
}

export function ManufacturingCard() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-white">共享制造</h3>
        <p className="text-xs text-slate-400 font-mono">产能协作平台</p>
      </div>

      {/* 工厂网络可视化 */}
      <div className="flex-1 flex items-center justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="text-3xl"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          >
            🏗️
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-purple-400 font-mono">联接 2,500+ 工厂</p>
    </div>
  );
}
