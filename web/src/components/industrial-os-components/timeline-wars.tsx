"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, AlertTriangle, CheckCircle2, Clock, DollarSign, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

// Gantt chart data - Traditional sourcing
const TRADITIONAL_TASKS = [
  { id: 1, name: "寻源/打样", phase: "sourcing", start: 0, duration: 60, status: "done", hasDelay: false },
  { id: 2, name: "样品确认", phase: "sampling", start: 60, duration: 30, status: "blocked", hasDelay: true, delayDays: 14 },
  { id: 3, name: "排单/生产", phase: "production", start: 104, duration: 45, status: "pending", hasDelay: false },
  { id: 4, name: "报关/物流", phase: "shipping", start: 149, duration: 30, status: "pending", hasDelay: false },
];

// AI platform tasks
const AI_TASKS = [
  { id: 1, name: "AI 匹配", phase: "match", start: 0, duration: 1, status: "done", hasDelay: false },
  { id: 2, name: "排单/生产", phase: "production", start: 1, duration: 30, status: "done", hasDelay: false },
  { id: 3, name: "报关/物流", phase: "shipping", start: 31, duration: 14, status: "done", hasDelay: false },
];

const TOTAL_TRADITIONAL_DAYS = 179;
const TOTAL_AI_DAYS = 45;

export function TimelineWars() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true);
    setShowResult(false);
    setProgress(0);

    const duration = 4000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setShowResult(true);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const timer = setTimeout(startAnimation, 1500);
    return () => clearTimeout(timer);
  }, []);

  const aiProgress = Math.min(progress * 1.5, 1); // AI finishes faster
  const tradProgress = Math.min(progress * 0.6, 0.55); // Traditional gets stuck around 55%

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
            <Calendar className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-mono text-slate uppercase tracking-wider">
              Module 04 / Timeline Comparison
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">
            全链路履约时效与资金周转对比
          </h2>
          <p className="text-sm text-slate max-w-2xl">
            对于酒店项目，开业延期一天就是真金白银的损失。我们用甘特图证明：AI 平台让您提前 4.5 个月开业。
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            onClick={startAnimation}
            disabled={isAnimating}
            variant="outline"
            size="sm"
            className="h-8 text-xs bg-transparent border-gray-200 text-slate hover:bg-paper-warm gap-1.5"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isAnimating ? "animate-spin" : ""}`} />
            {isAnimating ? "对比中..." : "重新对比"}
          </Button>
          <div className="text-[10px] font-mono text-slate">
            PROJECT_START: 2024-01-01
          </div>
        </div>

        <div className="space-y-6">
          {/* Traditional Sourcing Gantt */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-paper-warm border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate" />
                <span className="text-xs font-mono text-slate">传统采购模式</span>
              </div>
              <span className="text-xs font-mono text-slate">
                总周期: <span className="text-foreground">{TOTAL_TRADITIONAL_DAYS} 天</span> (约 6 个月)
              </span>
            </div>

            {/* Gantt Chart */}
            <div className="p-4">
              {/* Timeline header */}
              <div className="flex items-center mb-4 ml-32">
                <div className="flex-1 flex">
                  {["1月", "2月", "3月", "4月", "5月", "6月"].map((month, i) => (
                    <div key={month} className="flex-1 text-[9px] font-mono text-slate border-l border-gray-200 pl-1">
                      {month}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                {TRADITIONAL_TASKS.map((task) => {
                  const startPercent = (task.start / TOTAL_TRADITIONAL_DAYS) * 100;
                  const widthPercent = (task.duration / TOTAL_TRADITIONAL_DAYS) * 100;
                  const isVisible = tradProgress > startPercent / 100;

                  return (
                    <div key={task.id} className="flex items-center gap-3">
                      <div className="w-28 text-xs text-slate font-mono truncate">{task.name}</div>
                      <div className="flex-1 h-7 bg-paper-warm rounded relative">
                        {/* Grid lines */}
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="absolute top-0 bottom-0 border-l border-gray-200/50"
                            style={{ left: `${(i / 6) * 100}%` }}
                          />
                        ))}

                        {/* Task bar */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isVisible ? { width: `${widthPercent}%` } : { width: 0 }}
                          transition={{ duration: 0.5 }}
                          className={`absolute top-1 bottom-1 rounded-sm flex items-center px-2 ${
                            task.status === "done"
                              ? "bg-[#374151]"
                              : task.status === "blocked"
                              ? "bg-[#dc2626]/30 border border-[#dc2626]/50"
                              : "bg-[#374151]/50 border border-gray-200"
                          }`}
                          style={{ left: `${startPercent}%` }}
                        >
                          {task.hasDelay && (
                            <div className="flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-[#ef4444]" />
                              <span className="text-[8px] font-mono text-[#ef4444]">
                                +{task.delayDays}天延误
                              </span>
                            </div>
                          )}
                        </motion.div>

                        {/* Status badge */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 text-[8px] font-mono px-1 py-0.5 rounded"
                          style={{ left: `calc(${startPercent + widthPercent}% + 4px)` }}
                        >
                          <span
                            className={`px-1.5 py-0.5 rounded ${
                              task.status === "done"
                                ? "bg-[#374151] text-slate"
                                : task.status === "blocked"
                                ? "bg-[#dc2626]/20 text-[#ef4444]"
                                : "bg-[#d97706]/20 text-[#f59e0b]"
                            }`}
                          >
                            {task.status === "done" ? "DONE" : task.status === "blocked" ? "BLOCKED" : "PENDING"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Critical path indicator */}
              <div className="mt-4 flex items-center gap-2 text-[10px] text-[#ef4444]">
                <AlertTriangle className="w-3 h-3" />
                <span>关键路径卡点: 样品确认环节 - 等待客户审批 14 天</span>
              </div>
            </div>
          </div>

          {/* AI Platform Gantt */}
          <div className="bg-white border border-[#059669]/30 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-success/10 border-b border-[#059669]/30">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-xs font-mono text-success">AI 智能采购平台</span>
              </div>
              <span className="text-xs font-mono text-slate">
                总周期: <span className="text-success">{TOTAL_AI_DAYS} 天</span> (约 1.5 个月)
              </span>
            </div>

            {/* Gantt Chart */}
            <div className="p-4">
              {/* Timeline header - shorter */}
              <div className="flex items-center mb-4 ml-32">
                <div className="flex-1 flex">
                  {["第1周", "第2周", "第3周", "第4周", "第5周", "第6周"].map((week, i) => (
                    <div key={week} className="flex-1 text-[9px] font-mono text-slate border-l border-gray-200 pl-1">
                      {week}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                {AI_TASKS.map((task) => {
                  const startPercent = (task.start / TOTAL_AI_DAYS) * 100;
                  const widthPercent = (task.duration / TOTAL_AI_DAYS) * 100;
                  const taskEndPercent = (task.start + task.duration) / TOTAL_AI_DAYS;
                  const isComplete = aiProgress >= taskEndPercent;
                  const isActive = aiProgress > task.start / TOTAL_AI_DAYS && !isComplete;

                  return (
                    <div key={task.id} className="flex items-center gap-3">
                      <div className="w-28 text-xs text-slate font-mono truncate">{task.name}</div>
                      <div className="flex-1 h-7 bg-paper-warm rounded relative">
                        {/* Grid lines */}
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="absolute top-0 bottom-0 border-l border-gray-200/50"
                            style={{ left: `${(i / 6) * 100}%` }}
                          />
                        ))}

                        {/* Task bar */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: isComplete || isActive ? `${widthPercent}%` : 0 }}
                          transition={{ duration: 0.5 }}
                          className={`absolute top-1 bottom-1 rounded-sm ${
                            isComplete ? "bg-success" : "bg-success/50"
                          }`}
                          style={{ left: `${startPercent}%` }}
                        />

                        {/* Status badge */}
                        {(isComplete || isActive) && (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 text-[8px] font-mono"
                            style={{ left: `calc(${startPercent + widthPercent}% + 4px)` }}
                          >
                            <span className="px-1.5 py-0.5 rounded bg-success/20 text-success">
                              {isComplete ? "DONE" : "IN PROGRESS"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Success indicator */}
              <div className="mt-4 flex items-center gap-2 text-[10px] text-success">
                <CheckCircle2 className="w-3 h-3" />
                <span>无卡点: AI 预审通过率 98%，生产排期实时可控</span>
              </div>
            </div>
          </div>
        </div>

        {/* Result Summary */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Time Saved */}
                  <div className="text-center p-4 bg-brand-blue/10 border border-[#0f4c81]/30 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-brand-blue" />
                      <span className="text-xs text-slate">节省时间</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-brand-blue">
                      {TOTAL_TRADITIONAL_DAYS - TOTAL_AI_DAYS}
                    </div>
                    <div className="text-xs text-slate">天 (约 4.5 个月)</div>
                  </div>

                  {/* Revenue Gain */}
                  <div className="text-center p-4 bg-success/10 border border-[#059669]/30 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-success" />
                      <span className="text-xs text-slate">提前开业收益</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-success">$150K</div>
                    <div className="text-xs text-slate">额外营收 (按200间客房计)</div>
                  </div>

                  {/* Cash Flow */}
                  <div className="text-center p-4 bg-[#d97706]/10 border border-[#d97706]/30 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#f59e0b]" />
                      <span className="text-xs text-slate">资金周转加速</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-[#f59e0b]">4×</div>
                    <div className="text-xs text-slate">资金效率提升</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 text-center text-xs text-slate">
                  * 数据基于 200 间客房精品酒店项目，平均房价 $250/晚，入住率 75% 测算
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
