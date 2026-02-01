"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings2, CheckCircle2, AlertCircle } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const MATERIALS = [
  { id: "oak", name: "北美白橡木 (FSC认证)", grade: "AA级", priceMultiplier: 1.0 },
  { id: "walnut", name: "美国黑胡桃木", grade: "特级", priceMultiplier: 1.35 },
  { id: "ash", name: "俄罗斯白蜡木", grade: "A级", priceMultiplier: 0.85 },
  { id: "mdf", name: "E0级环保多层板", grade: "国标", priceMultiplier: 0.6 },
];

const MARKET_PRESETS = [
  { id: "us", name: "北美极简风", region: "USA/Canada", moqMultiplier: 1.0 },
  { id: "eu", name: "北欧轻奢风", region: "EU Market", moqMultiplier: 1.2 },
  { id: "me", name: "中东奢华风", region: "GCC Region", moqMultiplier: 0.8 },
  { id: "sea", name: "东南亚度假风", region: "ASEAN", moqMultiplier: 0.7 },
];

const FABRIC_OPTIONS = [
  { id: "linen", name: "亚麻混纺", code: "FAB-LN-01", price: 85 },
  { id: "velvet", name: "意大利绒布", code: "FAB-VL-02", price: 168 },
  { id: "leather", name: "头层牛皮", code: "FAB-LT-03", price: 320 },
  { id: "tech", name: "科技布", code: "FAB-TC-04", price: 120 },
];

export function StyleTuner() {
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [selectedMarket, setSelectedMarket] = useState(MARKET_PRESETS[0]);
  const [selectedFabric, setSelectedFabric] = useState(FABRIC_OPTIONS[0]);
  const [targetCost, setTargetCost] = useState([500000]);
  const [moq, setMoq] = useState([50]);

  const basePrice = 380000;
  const adjustedPrice = Math.round(
    basePrice * selectedMaterial.priceMultiplier + selectedFabric.price * 400
  );
  const withinBudget = adjustedPrice <= targetCost[0];
  const effectiveMoq = Math.round(moq[0] * selectedMarket.moqMultiplier);

  return (
    <section className="py-16 relative bg-paper-warm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Settings2 className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-mono text-slate uppercase tracking-wider">
              Module 02 / C2M Engine
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">
            C2M 柔性反向定制引擎
          </h2>
          <p className="text-sm text-slate max-w-2xl">
            让产能适配需求，而非让需求迁就库存。支持"小单快返"模式，起订量(MOQ)低至 50 件。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Configuration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Material Selector */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-card transition-all hover:shadow-card-hover">
              <div className="px-4 py-2.5 bg-paper-warm border-b border-gray-200">
                <span className="text-xs font-mono text-slate">主材选型 / MATERIAL_SELECT</span>
              </div>
              <div className="p-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-2 text-left font-mono text-slate font-normal">材质名称</th>
                      <th className="pb-2 text-left font-mono text-slate font-normal">等级</th>
                      <th className="pb-2 text-right font-mono text-slate font-normal">价格系数</th>
                      <th className="pb-2 text-center font-mono text-slate font-normal">选择</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MATERIALS.map((material) => (
                      <tr
                        key={material.id}
                        onClick={() => setSelectedMaterial(material)}
                        className={`border-b border-gray-200/50 cursor-pointer transition-colors ${
                          selectedMaterial.id === material.id
                            ? "bg-brand-blue/20"
                            : "hover:bg-paper-warm/50"
                        }`}
                      >
                        <td className="py-2.5 text-foreground">{material.name}</td>
                        <td className="py-2.5 text-slate">{material.grade}</td>
                        <td className="py-2.5 text-right font-mono text-foreground">
                          {material.priceMultiplier === 1
                            ? "基准价"
                            : material.priceMultiplier > 1
                            ? `+${((material.priceMultiplier - 1) * 100).toFixed(0)}%`
                            : `${((material.priceMultiplier - 1) * 100).toFixed(0)}%`}
                        </td>
                        <td className="py-2.5 text-center">
                          <div
                            className={`w-3 h-3 rounded-full border mx-auto ${
                              selectedMaterial.id === material.id
                                ? "bg-[#3b82f6] border-[#3b82f6]"
                                : "border-gray-200"
                            }`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Market Preset & Fabric - Side by Side */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Market Preset */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-2.5 bg-paper-warm border-b border-gray-200">
                  <span className="text-xs font-mono text-slate">终端市场偏好</span>
                </div>
                <div className="p-3 space-y-2">
                  {MARKET_PRESETS.map((market) => (
                    <button
                      key={market.id}
                      onClick={() => setSelectedMarket(market)}
                      className={`w-full p-2.5 rounded border text-left transition-colors ${
                        selectedMarket.id === market.id
                          ? "border-[#3b82f6] bg-brand-blue/20"
                          : "border-gray-200 hover:border-gray-200/80 hover:bg-paper-warm/50"
                      }`}
                    >
                      <div className="text-xs font-medium text-foreground">{market.name}</div>
                      <div className="text-[10px] text-slate font-mono">{market.region}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric Selector */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-2.5 bg-paper-warm border-b border-gray-200">
                  <span className="text-xs font-mono text-slate">软装面料</span>
                </div>
                <div className="p-3 space-y-2">
                  {FABRIC_OPTIONS.map((fabric) => (
                    <button
                      key={fabric.id}
                      onClick={() => setSelectedFabric(fabric)}
                      className={`w-full p-2.5 rounded border text-left transition-colors ${
                        selectedFabric.id === fabric.id
                          ? "border-[#3b82f6] bg-brand-blue/20"
                          : "border-gray-200 hover:border-gray-200/80 hover:bg-paper-warm/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-foreground">{fabric.name}</span>
                        <span className="text-[10px] font-mono text-slate">¥{fabric.price}/m</span>
                      </div>
                      <div className="text-[10px] text-slate font-mono">{fabric.code}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sliders */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Target Cost */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate">目标成本控制</span>
                  <span className="text-sm font-mono text-foreground">
                    ¥{targetCost[0].toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={targetCost}
                  onValueChange={setTargetCost}
                  min={200000}
                  max={1000000}
                  step={10000}
                  className="my-2"
                />
                <div className="flex justify-between text-[10px] text-slate">
                  <span>¥200K</span>
                  <span>¥1,000K</span>
                </div>
              </div>

              {/* MOQ */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate">起订量 (MOQ)</span>
                  <span className="text-sm font-mono text-foreground">{moq[0]} 件/款</span>
                </div>
                <Slider
                  value={moq}
                  onValueChange={setMoq}
                  min={30}
                  max={500}
                  step={10}
                  className="my-2"
                />
                <div className="flex justify-between text-[10px] text-slate">
                  <span>30 件</span>
                  <span>500 件</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Configuration Summary */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-elevated sticky top-24">
              <div className="px-4 py-2.5 bg-paper-warm border-b border-gray-200">
                <span className="text-xs font-mono text-slate">配置摘要 / CONFIG_SUMMARY</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate">主材</span>
                  <span className="font-mono text-foreground">{selectedMaterial.name.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate">市场风格</span>
                  <span className="font-mono text-foreground">{selectedMarket.name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate">面料</span>
                  <span className="font-mono text-foreground">{selectedFabric.name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate">有效MOQ</span>
                  <span className="font-mono text-foreground">{effectiveMoq} 件</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate">预估总价</span>
                    <span className="text-lg font-mono font-bold text-[#d97706]">
                      ¥{adjustedPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Status */}
            <div
              className={`p-4 rounded-lg border ${
                withinBudget
                  ? "bg-success/10 border-[#059669]/30"
                  : "bg-[#dc2626]/10 border-[#dc2626]/30"
              }`}
            >
              <div className="flex items-center gap-2">
                {withinBudget ? (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-[#ef4444]" />
                )}
                <span
                  className={`text-xs font-medium ${
                    withinBudget ? "text-success" : "text-[#ef4444]"
                  }`}
                >
                  {withinBudget ? "符合预算" : "超出预算"}
                </span>
              </div>
              <p className="text-[10px] text-slate mt-1">
                {withinBudget
                  ? `剩余预算: ¥${(targetCost[0] - adjustedPrice).toLocaleString()}`
                  : `超出: ¥${(adjustedPrice - targetCost[0]).toLocaleString()}`}
              </p>
            </div>

            {/* Supplier Match */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="text-xs font-mono text-[#059669]">3 家工厂已匹配</span>
              </div>
              <div className="space-y-2 text-[10px]">
                <div className="flex justify-between text-slate">
                  <span>佛山顺德 · 华美家具</span>
                  <span className="font-mono">45天</span>
                </div>
                <div className="flex justify-between text-slate">
                  <span>东莞厚街 · 鸿利木业</span>
                  <span className="font-mono">52天</span>
                </div>
                <div className="flex justify-between text-slate">
                  <span>江门台山 · 永盛实业</span>
                  <span className="font-mono">48天</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
