'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings2,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  Zap,
  Factory,
  DollarSign,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useC2MEngine } from '@/hooks/useC2MEngine';
import { MATERIALS, MARKET_STYLES, FACTORIES, getMaterialById } from '@/data/c2m-data';
import { formatCost } from '@/lib/c2m-engine';
import { CostBreakdownChart } from './cost-breakdown-chart';
import { PriceTierDisplay } from './price-tier-display';
import { ConfigSummary } from './config-summary';

export function StyleTunerEnhanced() {
  const c2m = useC2MEngine({
    initialMoq: 50,
    initialQuantity: 100,
    targetCost: 500000,
  });

  // 本地状态
  const [animatingPrice, setAnimatingPrice] = useState(false);
  const [displayedPrice, setDisplayedPrice] = useState(0);

  // 初始化时计算一次
  useEffect(() => {
    c2m.recalculate(FACTORIES);
  }, []);

  // 当配置变化时重新计算
  useEffect(() => {
    const timer = setTimeout(() => {
      c2m.recalculate(FACTORIES);
      setAnimatingPrice(true);
      setTimeout(() => setAnimatingPrice(false), 500);
    }, 300);

    return () => clearTimeout(timer);
  }, [
    c2m.configuration.selectedMaterials,
    c2m.configuration.selectedMarket,
    c2m.configuration.moq,
    c2m.configuration.quantity,
    c2m.configuration.targetCost,
  ]);

  // 价格动画
  useEffect(() => {
    if (c2m.costBreakdown) {
      const start = displayedPrice;
      const end = c2m.costBreakdown.totalCost;
      const duration = 600;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setDisplayedPrice(start + (end - start) * progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [c2m.costBreakdown?.totalCost]);

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

        {/* Configuration Summary Sticky Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sticky top-20 z-10"
        >
          <ConfigSummary config={c2m.configuration} />
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
                <div className="space-y-2">
                  {/* 木材选择 */}
                  <div>
                    <label className="text-xs font-mono text-slate mb-2 block">木材材质</label>
                    <div className="grid grid-cols-2 gap-2">
                      {MATERIALS.filter(m => m.category === 'wood').map(material => (
                        <motion.button
                          key={material.id}
                          onClick={() => c2m.setWoodMaterial(material)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-3 rounded border transition-all text-left ${
                            c2m.configuration.selectedMaterials.wood?.id === material.id
                              ? 'border-brand-blue bg-brand-blue/10'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-xs font-medium text-foreground">{material.name}</div>
                          <div className="text-[10px] text-slate mt-1">
                            {material.priceMultiplier === 1
                              ? '基准价'
                              : material.priceMultiplier > 1
                              ? `+${((material.priceMultiplier - 1) * 100).toFixed(0)}%`
                              : `${((material.priceMultiplier - 1) * 100).toFixed(0)}%`}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* 面料选择 */}
                  <div>
                    <label className="text-xs font-mono text-slate mb-2 block">软装面料</label>
                    <div className="grid grid-cols-2 gap-2">
                      {MATERIALS.filter(m => m.category === 'fabric').map(material => (
                        <motion.button
                          key={material.id}
                          onClick={() => c2m.setFabricMaterial(material)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-3 rounded border transition-all text-left ${
                            c2m.configuration.selectedMaterials.fabric?.id === material.id
                              ? 'border-brand-blue bg-brand-blue/10'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-xs font-medium text-foreground">{material.name}</div>
                          <div className="text-[10px] text-slate mt-1">{formatCost(material.basePrice)}/米</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Preset & Parameters */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Market Preset */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-2.5 bg-paper-warm border-b border-gray-200">
                  <span className="text-xs font-mono text-slate">终端市场偏好</span>
                </div>
                <div className="p-3 space-y-2">
                  {MARKET_STYLES.map(market => (
                    <motion.button
                      key={market.id}
                      onClick={() => c2m.setMarketStyle(market)}
                      whileHover={{ scale: 1.02 }}
                      className={`w-full p-2.5 rounded border text-left transition-colors ${
                        c2m.configuration.selectedMarket?.id === market.id
                          ? 'border-brand-blue bg-brand-blue/20'
                          : 'border-gray-200 hover:border-gray-200/80 hover:bg-paper-warm/50'
                      }`}
                    >
                      <div className="text-xs font-medium text-foreground">{market.name}</div>
                      <div className="text-[10px] text-slate font-mono">{market.region}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Parameters */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-2.5 bg-paper-warm border-b border-gray-200">
                  <span className="text-xs font-mono text-slate">订单参数</span>
                </div>
                <div className="p-4 space-y-4">
                  {/* MOQ Slider */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-mono text-slate">最小起订量 (MOQ)</label>
                      <span className="text-xs font-mono text-brand-blue font-semibold">
                        {c2m.configuration.moq} 件
                      </span>
                    </div>
                    <Slider
                      value={[c2m.configuration.moq]}
                      onValueChange={([val]) => c2m.setMoq(val)}
                      min={10}
                      max={500}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  {/* Quantity Slider */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-mono text-slate">订购数量</label>
                      <span className="text-xs font-mono text-brand-blue font-semibold">
                        {c2m.configuration.quantity} 件
                      </span>
                    </div>
                    <Slider
                      value={[c2m.configuration.quantity]}
                      onValueChange={([val]) => c2m.setQuantity(val)}
                      min={10}
                      max={2000}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  {/* Target Cost Slider */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-mono text-slate">目标成本</label>
                      <span className="text-xs font-mono text-brand-blue font-semibold">
                        {formatCost(c2m.configuration.targetCost)}
                      </span>
                    </div>
                    <Slider
                      value={[c2m.configuration.targetCost]}
                      onValueChange={([val]) => c2m.setTargetCost(val)}
                      min={100000}
                      max={2000000}
                      step={50000}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown & Chart */}
            {c2m.costBreakdown && (
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="px-4 py-2.5 bg-paper-warm border-b border-gray-200">
                    <span className="text-xs font-mono text-slate">成本明细</span>
                  </div>
                  <div className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate">木材成本</span>
                        <span className="font-mono text-foreground">{formatCost(c2m.costBreakdown.woodCost)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate">面料成本</span>
                        <span className="font-mono text-foreground">{formatCost(c2m.costBreakdown.fabricCost)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate">人工成本</span>
                        <span className="font-mono text-foreground">{formatCost(c2m.costBreakdown.laborCost)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate">管理成本</span>
                        <span className="font-mono text-foreground">{formatCost(c2m.costBreakdown.overheadCost)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate">物流成本</span>
                        <span className="font-mono text-foreground">{formatCost(c2m.costBreakdown.logisticsCost)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-xs font-semibold">
                        <span className="text-foreground">总成本</span>
                        <motion.span
                          key={c2m.costBreakdown.totalCost}
                          className={`font-mono ${animatingPrice ? 'text-brand-blue' : 'text-foreground'}`}
                          animate={{ scale: animatingPrice ? 1.1 : 1 }}
                        >
                          {formatCost(displayedPrice)}
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="px-4 py-2.5 bg-paper-warm border-b border-gray-200">
                    <span className="text-xs font-mono text-slate">成本结构占比</span>
                  </div>
                  <div className="p-0">
                    <CostBreakdownChart data={c2m.costBreakdown} />
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Right Panel - Summary & Matched Factories */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Budget Status */}
            <motion.div
              className={`p-4 rounded-lg border ${
                c2m.withinBudget
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {c2m.withinBudget ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={`text-sm font-semibold ${c2m.withinBudget ? 'text-green-900' : 'text-red-900'}`}>
                    {c2m.withinBudget ? '成本在预算内' : '成本超出预算'}
                  </div>
                  <div className={`text-xs mt-1 ${c2m.withinBudget ? 'text-green-700' : 'text-red-700'}`}>
                    {c2m.costBreakdown && (
                      <>
                        {c2m.withinBudget ? '✓ ' : '✗ '}
                        总成本 {formatCost(c2m.costBreakdown.totalCost)} / 目标 {formatCost(c2m.configuration.targetCost)}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cost Savings */}
            {c2m.costSavings && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-blue-900">成本节省</div>
                    <div className="text-xs text-blue-700 mt-1">
                      相比传统采购节省 {formatCost(c2m.costSavings.amount)}
                    </div>
                    <div className="text-xs text-blue-700">
                      节省比例 {c2m.costSavings.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Top Matched Factory */}
            {c2m.topMatchedFactory && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-start gap-2 mb-3">
                  <Factory className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono text-slate">推荐工厂</div>
                    <div className="text-sm font-semibold text-foreground mt-1">
                      {c2m.topMatchedFactory.factory.name}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate">匹配度</span>
                    <span className="font-mono text-brand-blue font-semibold">
                      {c2m.topMatchedFactory.matchScore}/100
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate">MOQ</span>
                    <span className="font-mono text-foreground">{c2m.topMatchedFactory.factory.moq} 件</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate">交期</span>
                    <span className="font-mono text-foreground">{c2m.topMatchedFactory.estimatedLeadTime} 天</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate">推荐报价</span>
                    <span className="font-mono text-brand-blue font-semibold">
                      {formatCost(c2m.topMatchedFactory.recommendedPrice)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="text-xs font-mono text-slate mb-1">匹配原因</div>
                    <div className="space-y-1">
                      {c2m.topMatchedFactory.reasons.map((reason, idx) => (
                        <div key={idx} className="text-xs text-slate flex items-start gap-2">
                          <span className="text-brand-blue mt-0.5">•</span>
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price Tiers for Top Factory */}
                <PriceTierDisplay 
                  factory={c2m.topMatchedFactory.factory} 
                  currentQuantity={c2m.configuration.quantity} 
                />
              </motion.div>
            )}

            {/* All Matched Factories */}
            {c2m.matchedFactories.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white border border-gray-200 rounded-lg"
              >
                <div className="text-xs font-mono text-slate mb-3">其他推荐工厂</div>
                <div className="space-y-2">
                  {c2m.matchedFactories.slice(1, 3).map(match => (
                    <div key={match.factory.id} className="p-2 bg-paper-warm rounded border border-gray-200">
                      <div className="flex justify-between items-start mb-1">
                        <div className="text-xs font-medium text-foreground">{match.factory.name}</div>
                        <span className="text-xs font-mono text-brand-blue">{match.matchScore}/100</span>
                      </div>
                      <div className="text-xs text-slate">
                        MOQ {match.factory.moq} • {match.estimatedLeadTime} 天交期
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Button */}
            <Button
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
              size="lg"
            >
              <Zap className="w-4 h-4 mr-2" />
              确认配置并寻源
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
