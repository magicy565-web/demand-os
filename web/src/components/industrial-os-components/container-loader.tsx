"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, AlertTriangle, CheckCircle2, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Pallet/cargo manifest data
const CARGO_MANIFEST = [
  { id: 1, pallet: "PLT-001", content: "Bed Frames", weight: "1,200 kg", volume: "8.5 CBM", type: "heavy", stackable: true },
  { id: 2, pallet: "PLT-002", content: "Nightstands", weight: "480 kg", volume: "3.2 CBM", type: "medium", stackable: true },
  { id: 3, pallet: "PLT-003", content: "Chairs", weight: "640 kg", volume: "6.8 CBM", type: "medium", stackable: false },
  { id: 4, pallet: "PLT-004", content: "Lamps (Fragile)", weight: "120 kg", volume: "2.4 CBM", type: "light", stackable: false },
  { id: 5, pallet: "PLT-005", content: "Tables", weight: "860 kg", volume: "5.2 CBM", type: "heavy", stackable: true },
  { id: 6, pallet: "PLT-006", content: "Mirrors", weight: "280 kg", volume: "1.8 CBM", type: "fragile", stackable: false },
];

const UNOPTIMIZED_STATS = {
  utilization: 62,
  containers: 4,
  totalCBM: 67.8,
  maxCBM: 108,
  cost: 28000,
  warnings: ["重货/泡货比例失衡", "易碎品堆叠风险", "重心偏移 +15%"],
};

const OPTIMIZED_STATS = {
  utilization: 94,
  containers: 2,
  totalCBM: 67.8,
  maxCBM: 72,
  cost: 14000,
  warnings: [],
};

export function ContainerLoader() {
  const [optimized, setOptimized] = useState(false);
  const [loadedItems, setLoadedItems] = useState<number[]>([]);

  const stats = optimized ? OPTIMIZED_STATS : UNOPTIMIZED_STATS;

  useEffect(() => {
    setLoadedItems([]);
    CARGO_MANIFEST.forEach((item, index) => {
      setTimeout(() => {
        setLoadedItems((prev) => [...prev, item.id]);
      }, 150 + index * 120);
    });
  }, [optimized]);

  return (
    <section className="py-16 relative bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-mono text-slate uppercase tracking-wider">
              Module 03 / Load Planning
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">
            产业带集货"拼柜"中枢
          </h2>
          <p className="text-sm text-slate max-w-2xl">
            中小工厂货量不够整柜？AI 智能拼柜系统自动匹配同航线货源，散货变整柜，物流成本降低 50%。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Container Visualization - CAD Wireframe Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-paper-warm border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-paper-warm border-b border-gray-200">
              <span className="text-xs font-mono text-slate">CONTAINER_3D.cad / 40ft HC</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOptimized(!optimized)}
                className={`h-7 text-xs bg-transparent gap-1.5 ${
                  optimized
                    ? "border-[#059669] text-success hover:bg-success/10"
                    : "border-[#d97706] text-[#f59e0b] hover:bg-[#d97706]/10"
                }`}
              >
                {optimized ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                {optimized ? "智能整柜 (FCL)" : "散货运输 (LCL)"}
              </Button>
            </div>

            {/* CAD Wireframe View */}
            <div className="relative aspect-[16/10] p-4">
              {/* Grid background */}
              <div className="absolute inset-4 bg-[linear-gradient(rgba(55,65,81,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(55,65,81,0.2)_1px,transparent_1px)] bg-[size:20px_20px]" />

              {/* Container outline - wireframe style */}
              <div className="absolute inset-4 border border-gray-200 rounded">
                {/* Isometric wireframe container */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250">
                  {/* Container back */}
                  <rect x="40" y="30" width="320" height="180" fill="none" stroke="#374151" strokeWidth="1" />
                  {/* Container depth lines */}
                  <line x1="40" y1="30" x2="20" y2="50" stroke="#374151" strokeWidth="1" />
                  <line x1="360" y1="30" x2="380" y2="50" stroke="#374151" strokeWidth="1" />
                  <line x1="40" y1="210" x2="20" y2="230" stroke="#374151" strokeWidth="1" />
                  <line x1="360" y1="210" x2="380" y2="230" stroke="#374151" strokeWidth="1" />
                  {/* Container front */}
                  <rect x="20" y="50" width="360" height="180" fill="none" stroke="#374151" strokeWidth="1" strokeDasharray="4 2" />

                  {/* Cargo items - wireframe boxes */}
                  <AnimatePresence>
                    {CARGO_MANIFEST.map((item, index) => {
                      const isLoaded = loadedItems.includes(item.id);
                      // Calculate positions based on optimization
                      const cols = optimized ? 3 : 2;
                      const row = Math.floor(index / cols);
                      const col = index % cols;
                      const baseX = optimized ? 35 + col * 115 : 50 + col * 155;
                      const baseY = optimized ? 60 + row * 85 : 70 + row * 95;
                      const width = optimized ? 105 : 140;
                      const height = optimized ? 75 : 85;

                      const strokeColor =
                        item.type === "heavy" ? "#3b82f6" :
                        item.type === "fragile" ? "#ef4444" :
                        item.type === "light" ? "#10b981" : "#64748b";

                      return (
                        <motion.g
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <rect
                            x={baseX}
                            y={baseY}
                            width={width}
                            height={height}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth="1.5"
                          />
                          {/* Depth effect */}
                          <line x1={baseX} y1={baseY} x2={baseX - 8} y2={baseY + 8} stroke={strokeColor} strokeWidth="1" />
                          <line x1={baseX + width} y1={baseY} x2={baseX + width + 8} y2={baseY + 8} stroke={strokeColor} strokeWidth="1" />
                          {/* Label */}
                          <text
                            x={baseX + width / 2}
                            y={baseY + height / 2}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#64748b"
                            fontSize="9"
                            fontFamily="monospace"
                          >
                            {item.pallet}
                          </text>
                        </motion.g>
                      );
                    })}
                  </AnimatePresence>

                  {/* Wasted space indicator (unoptimized) */}
                  {!optimized && (
                    <g>
                      <rect x="280" y="165" width="90" height="60" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2" />
                      <text x="325" y="200" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="monospace">
                        WASTED
                      </text>
                    </g>
                  )}
                </svg>

                {/* Dimension labels */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate">
                  L: 12.03m
                </div>
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate rotate-90">
                  H: 2.69m
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="px-4 py-2 border-t border-gray-200 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 border border-[#3b82f6]" />
                <span className="text-[9px] text-slate">重货</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 border border-[#64748b]" />
                <span className="text-[9px] text-slate">普货</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 border border-[#10b981]" />
                <span className="text-[9px] text-slate">轻货</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 border border-[#ef4444]" />
                <span className="text-[9px] text-slate">易碎</span>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Stats & Manifest */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-paper-warm border border-gray-200 rounded-lg p-3">
                <span className="text-[10px] font-mono text-slate">满载率</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <motion.span
                    key={stats.utilization}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className={`text-xl font-mono font-bold ${
                      optimized ? "text-success" : "text-[#f59e0b]"
                    }`}
                  >
                    {stats.utilization}%
                  </motion.span>
                </div>
                <div className="mt-2 h-1.5 bg-paper-warm rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.utilization}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full ${optimized ? "bg-success" : "bg-[#d97706]"}`}
                  />
                </div>
              </div>

              <div className="bg-paper-warm border border-gray-200 rounded-lg p-3">
                <span className="text-[10px] font-mono text-slate">所需柜数</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <motion.span
                    key={stats.containers}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-xl font-mono font-bold text-foreground"
                  >
                    {stats.containers}
                  </motion.span>
                  <span className="text-xs text-slate">× 40ft HC</span>
                </div>
                {optimized && (
                  <div className="text-[10px] text-success mt-1">减少 50%</div>
                )}
              </div>

              <div className="bg-paper-warm border border-gray-200 rounded-lg p-3">
                <span className="text-[10px] font-mono text-slate">头程物流成本</span>
                <motion.div
                  key={stats.cost}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className={`text-xl font-mono font-bold mt-1 ${
                    optimized ? "text-success" : "text-foreground"
                  }`}
                >
                  ${stats.cost.toLocaleString()}
                </motion.div>
                {optimized && (
                  <div className="text-[10px] text-success mt-1">节省 $14,000</div>
                )}
              </div>

              <div className="bg-paper-warm border border-gray-200 rounded-lg p-3">
                <span className="text-[10px] font-mono text-slate">货物体积</span>
                <div className="text-xl font-mono font-bold text-foreground mt-1">
                  {stats.totalCBM} <span className="text-xs font-normal text-slate">CBM</span>
                </div>
                <div className="text-[10px] text-slate mt-1">
                  / {stats.maxCBM} CBM 可用
                </div>
              </div>
            </div>

            {/* Manifest List */}
            <div className="bg-paper-warm border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-3 py-2 bg-paper-warm border-b border-gray-200">
                <span className="text-[10px] font-mono text-slate">配载清单 / MANIFEST.log</span>
              </div>
              <div className="max-h-40 overflow-y-auto">
                {CARGO_MANIFEST.map((item) => (
                  <div
                    key={item.id}
                    className="px-3 py-2 border-b border-gray-200/50 flex items-center justify-between text-[10px]"
                  >
                    <div>
                      <span className="font-mono text-brand-blue">{item.pallet}</span>
                      <span className="text-slate ml-2">{item.content}</span>
                    </div>
                    <div className="text-slate font-mono">
                      {item.weight} / {item.volume}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings */}
            <div
              className={`p-3 rounded-lg border ${
                optimized
                  ? "bg-success/10 border-[#059669]/30"
                  : "bg-[#dc2626]/10 border-[#dc2626]/30"
              }`}
            >
              {optimized ? (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
                  <div>
                    <div className="text-xs font-medium text-success">装载优化完成</div>
                    <p className="text-[10px] text-slate mt-1">
                      AI 已根据重量分布、易碎品保护、堆叠规则完成最优配载方案
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#ef4444] mt-0.5" />
                  <div>
                    <div className="text-xs font-medium text-[#ef4444]">检测到 {stats.warnings.length} 个问题</div>
                    <ul className="text-[10px] text-slate mt-1 space-y-0.5">
                      {stats.warnings.map((warning, i) => (
                        <li key={i}>• {warning}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
