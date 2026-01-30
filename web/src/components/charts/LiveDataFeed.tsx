"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface DataPoint {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: "up" | "down";
}

export default function LiveDataFeed() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { id: "1", label: "实时交易额", value: 234567, change: 12.3, trend: "up" },
    { id: "2", label: "新增需求", value: 48, change: 8.5, trend: "up" },
    { id: "3", label: "匹配成功", value: 15, change: -2.1, trend: "down" },
    { id: "4", label: "在线用户", value: 423, change: 5.7, trend: "up" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) =>
        prev.map((point) => ({
          ...point,
          value:
            point.value +
            Math.floor(Math.random() * 20 - 10) * (point.id === "1" ? 100 : 1),
          change: parseFloat((Math.random() * 20 - 5).toFixed(1)),
          trend: Math.random() > 0.5 ? "up" : "down",
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl border border-slate-200/60 p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-blue-600 animate-pulse" />
        <h3 className="text-lg font-bold text-slate-900">实时数据流</h3>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-slate-600">实时更新</span>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {dataPoints.map((point, index) => (
            <motion.div
              key={point.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-transparent hover:from-blue-50 transition-colors group"
            >
              <div className="flex-1">
                <p className="text-sm text-slate-600 mb-1">{point.label}</p>
                <motion.p
                  key={point.value}
                  initial={{ scale: 1.2, color: "#3b82f6" }}
                  animate={{ scale: 1, color: "#0f172a" }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-slate-900"
                >
                  {point.id === "1"
                    ? `$${(point.value / 1000).toFixed(1)}K`
                    : point.value}
                </motion.p>
              </div>

              <motion.div
                key={`${point.change}-${point.trend}`}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                  point.trend === "up"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {point.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {Math.abs(point.change)}%
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>最后更新: 刚刚</span>
          <span className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            3秒自动刷新
          </span>
        </div>
      </div>
    </motion.div>
  );
}
