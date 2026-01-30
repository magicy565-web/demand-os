"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

interface RegionData {
  name: string;
  value: number;
  color: string;
}

export default function RegionPieChart() {
  const data: RegionData[] = useMemo(
    () => [
      { name: "北美", value: 450, color: "#3b82f6" },
      { name: "欧洲", value: 320, color: "#8b5cf6" },
      { name: "亚洲", value: 280, color: "#10b981" },
      { name: "其他", value: 150, color: "#f59e0b" },
    ],
    []
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg px-3 py-2 shadow-lg">
          <p className="text-xs text-slate-600 mb-1">{data.name}</p>
          <p className="text-sm font-bold text-slate-900">{data.value} 需求</p>
          <p className="text-xs text-slate-500 mt-1">
            {((data.value / 1200) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-slate-600">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl border border-slate-200/60 p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-slate-900">区域分布</h3>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            animationDuration={1000}
            animationBegin={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 pt-4 border-t border-slate-100 text-center">
        <p className="text-2xl font-bold text-slate-900">1,200</p>
        <p className="text-sm text-slate-600 mt-1">总需求数</p>
      </div>
    </motion.div>
  );
}
