"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, Eye, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// Detailed BOM data with enterprise-grade fields
const DETECTED_ITEMS = [
  {
    id: 1,
    name: "特大床架",
    sku: "HT-2024-BED-K2",
    materialGrade: "E0级实木多层板",
    dimensions: "2000×1800×450mm",
    hsCode: "9403.50.00",
    moq: 50,
    quantity: 200,
    unitPrice: 3680,
    confidence: 98,
    status: "verified",
    position: { top: "18%", left: "22%" },
    size: { width: "38%", height: "32%" },
  },
  {
    id: 2,
    name: "床头柜",
    sku: "HT-2024-NS-042",
    materialGrade: "北美白橡木",
    dimensions: "500×450×550mm",
    hsCode: "9403.50.00",
    moq: 100,
    quantity: 400,
    unitPrice: 760,
    confidence: 94,
    status: "review",
    position: { top: "22%", left: "62%" },
    size: { width: "14%", height: "16%" },
  },
  {
    id: 3,
    name: "阅读灯",
    sku: "HT-2024-LP-LED08",
    materialGrade: "铝合金+亚克力",
    dimensions: "Φ180×H420mm",
    hsCode: "9405.20.00",
    moq: 200,
    quantity: 400,
    unitPrice: 540,
    confidence: 96,
    status: "verified",
    position: { top: "12%", left: "68%" },
    size: { width: "10%", height: "14%" },
  },
  {
    id: 4,
    name: "休闲椅",
    sku: "HT-2024-CHR-L55",
    materialGrade: "意大利头层牛皮",
    dimensions: "750×800×850mm",
    hsCode: "9401.61.00",
    moq: 30,
    quantity: 200,
    unitPrice: 2150,
    confidence: 92,
    status: "review",
    position: { top: "52%", left: "58%" },
    size: { width: "20%", height: "28%" },
  },
];

export function ImageToBom() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [xrayMode, setXrayMode] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const startScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setVisibleItems([]);

    DETECTED_ITEMS.forEach((item, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, item.id]);
      }, 800 + index * 500);
    });

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 800 + DETECTED_ITEMS.length * 500 + 400);
  };

  useEffect(() => {
    const timer = setTimeout(startScan, 1000);
    return () => clearTimeout(timer);
  }, []);

  const totalValue = DETECTED_ITEMS.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const verifiedCount = DETECTED_ITEMS.filter((i) => i.status === "verified").length;
  const reviewCount = DETECTED_ITEMS.filter((i) => i.status === "review").length;

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-mono text-slate uppercase tracking-wider">
              Module 01 / AI Vision
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">
            AI 智能拆单与核价系统
          </h2>
          <p className="text-sm text-slate max-w-2xl">
            拒绝"拍脑袋"估价。系统基于历史成交大模型，一键将设计图拆解为标准化 BOM 清单，精准锁定原料成本与加工工时。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image Scanner Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Panel Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-paper-warm border-b border-gray-200">
                <span className="text-xs font-mono text-slate">IMAGE_ANALYSIS.view</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-slate">X-RAY</span>
                  <Switch checked={xrayMode} onCheckedChange={setXrayMode} />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={startScan}
                    disabled={isScanning}
                    className="h-7 text-xs bg-transparent border-gray-200 text-slate hover:bg-paper-warm"
                  >
                    <Scan className="w-3 h-3 mr-1" />
                    {isScanning ? "分析中..." : "重新扫描"}
                  </Button>
                </div>
              </div>

              {/* Image Container */}
              <div className={`relative aspect-[4/3] ${xrayMode ? "grayscale invert" : ""}`}>
                {/* Simplified room visualization */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#111827] to-[#1e293b]">
                  <div className="absolute inset-4 border border-gray-200/50 rounded">
                    <div className="absolute top-[15%] left-[18%] w-[42%] h-[38%] bg-[#374151]/20 rounded border border-gray-200/30" />
                    <div className="absolute top-[18%] left-[60%] w-[16%] h-[20%] bg-[#374151]/20 rounded border border-gray-200/30" />
                    <div className="absolute top-[48%] left-[55%] w-[24%] h-[32%] bg-[#374151]/20 rounded border border-gray-200/30" />
                  </div>
                </div>

                {/* Scan Line */}
                <AnimatePresence>
                  {isScanning && (
                    <motion.div
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, ease: "linear" }}
                      className="absolute left-0 right-0 h-[2px] bg-[#3b82f6]"
                    />
                  )}
                </AnimatePresence>

                {/* Detection Boxes - CAD style wireframe */}
                {DETECTED_ITEMS.map((item) => (
                  <AnimatePresence key={item.id}>
                    {visibleItems.includes(item.id) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute border border-[#3b82f6]"
                        style={{
                          top: item.position.top,
                          left: item.position.left,
                          width: item.size.width,
                          height: item.size.height,
                        }}
                      >
                        {/* Corner markers */}
                        <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t border-l border-[#3b82f6]" />
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border-t border-r border-[#3b82f6]" />
                        <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-b border-l border-[#3b82f6]" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b border-r border-[#3b82f6]" />

                        {/* Label */}
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="absolute -top-6 left-0 px-1.5 py-0.5 bg-white border border-gray-200 text-[9px] font-mono text-slate whitespace-nowrap"
                        >
                          {item.sku}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>

              {/* Status Bar */}
              <div className="px-4 py-2 bg-paper-warm border-t border-gray-200 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate">
                  {scanComplete
                    ? `检测完成: ${DETECTED_ITEMS.length} 个物件`
                    : isScanning
                    ? "正在分析图像..."
                    : "等待扫描"}
                </span>
                {scanComplete && (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-[#059669]">
                      已核验: {verifiedCount}
                    </span>
                    <span className="text-[10px] font-mono text-[#d97706]">
                      待复核: {reviewCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* BOM Table - Excel style */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-paper-warm border-b border-gray-200">
              <span className="text-xs font-mono text-slate">BOM_GENERATED.xlsx</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-success/20 text-success border border-[#059669]/30">
                AUTO-GENERATED
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-paper-warm border-b border-gray-200">
                    <th className="px-3 py-2 text-left font-mono text-slate font-normal">SKU</th>
                    <th className="px-3 py-2 text-left font-mono text-slate font-normal">品名</th>
                    <th className="px-3 py-2 text-left font-mono text-slate font-normal">材质等级</th>
                    <th className="px-3 py-2 text-right font-mono text-slate font-normal">数量</th>
                    <th className="px-3 py-2 text-right font-mono text-slate font-normal">含税出厂价</th>
                    <th className="px-3 py-2 text-center font-mono text-slate font-normal">匹配度</th>
                  </tr>
                </thead>
                <tbody>
                  {DETECTED_ITEMS.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={
                        visibleItems.includes(item.id)
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0.3 }
                      }
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-200/50 hover:bg-paper-warm/50"
                    >
                      <td className="px-3 py-2.5 font-mono text-brand-blue">{item.sku}</td>
                      <td className="px-3 py-2.5">
                        <div className="text-foreground">{item.name}</div>
                        <div className="text-[10px] text-slate">{item.dimensions}</div>
                      </td>
                      <td className="px-3 py-2.5 text-slate">{item.materialGrade}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-foreground">{item.quantity}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-foreground">¥{item.unitPrice.toLocaleString()}</td>
                      <td className="px-3 py-2.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono ${
                            item.confidence >= 95
                              ? "bg-success/20 text-success"
                              : "bg-[#d97706]/20 text-[#f59e0b]"
                          }`}
                        >
                          {item.confidence}%
                          {item.status === "review" && (
                            <AlertCircle className="w-2.5 h-2.5" />
                          )}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Summary */}
            <div className="px-4 py-3 bg-paper-warm border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-[10px] text-slate">
                  <span>HS Code: 9403.50.00 / 9405.20.00 / 9401.61.00</span>
                  <span className="mx-2">|</span>
                  <span>MOQ: 30-200 件/款</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-slate">含税出厂价 (EXW)</span>
                  <span className="text-lg font-mono font-bold text-[#d97706]">
                    ¥{totalValue.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-[10px] text-[#059669]">
                <CheckCircle2 className="w-3 h-3" />
                <span>较贸易商采购降本: 35% | 核价专员: 陈经理 已审核</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
