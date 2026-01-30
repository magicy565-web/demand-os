"use client";

import { useMemo } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function ProfitGauge() {
  const data = useMemo(
    () => [
      {
        name: "利润率",
        value: 24.8,
        fill: "#10b981",
      },
    ],
    []
  );

  const CustomLegend = () => {
    return (
      <div className="text-center mt-6">
        <div className="text-4xl font-bold text-slate-900">24.8%</div>
        <div className="text-sm text-slate-600 mt-1">平均利润率</div>
        <div className="flex items-center justify-center gap-2 mt-3">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-600">+3.2%</span>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl border border-slate-200/60 p-6"
    >
      <h3 className="text-lg font-bold text-slate-900 mb-2">利润分析</h3>

      <ResponsiveContainer width="100%" height={280}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="100%"
          barSize={30}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={30}
            fill="#10b981"
            animationDuration={1500}
          />
          <Legend
            iconSize={0}
            layout="vertical"
            verticalAlign="middle"
            content={<CustomLegend />}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900">18.5%</div>
          <div className="text-xs text-slate-600 mt-1">最低</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900">24.8%</div>
          <div className="text-xs text-slate-600 mt-1">平均</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900">32.6%</div>
          <div className="text-xs text-slate-600 mt-1">最高</div>
        </div>
      </div>
    </motion.div>
  );
}
