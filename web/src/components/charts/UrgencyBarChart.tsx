"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function UrgencyBarChart() {
  const data = useMemo(
    () => [
      { name: "特急", value: 85, color: "#ef4444" },
      { name: "紧急", value: 142, color: "#f97316" },
      { name: "一般", value: 268, color: "#eab308" },
      { name: "普通", value: 195, color: "#22c55e" },
    ],
    []
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg px-3 py-2 shadow-lg">
          <p className="text-xs text-slate-600 mb-1">{payload[0].payload.name}</p>
          <p className="text-sm font-bold text-slate-900">{payload[0].value} 需求</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl border border-slate-200/60 p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-bold text-slate-900">紧急度分布</h3>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1000}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-100">
        {data.map((item) => (
          <div key={item.name} className="text-center">
            <div
              className="w-full h-1 rounded-full mb-1"
              style={{ backgroundColor: item.color }}
            />
            <p className="text-xs text-slate-600">{item.name}</p>
            <p className="text-sm font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
