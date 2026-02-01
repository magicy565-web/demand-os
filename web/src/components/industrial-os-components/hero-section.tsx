"use client";

import React from "react"

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, FileText, Cpu, Package, Ship, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const TYPING_PHRASES = [
  "请输入海外采购需求（支持模糊语义/图片/招投标文件）...",
  "200间客房精品酒店，东南亚风格，预算$800K...",
  "迪拜滨海度假村，需采购大堂家具及配饰...",
  "游轮内装项目，地中海风格，交付期90天...",
];

export function HeroSection() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const phrase = TYPING_PHRASES[currentPhraseIndex];
    let charIndex = 0;
    setIsTyping(true);
    setDisplayText("");

    const typeInterval = setInterval(() => {
      if (charIndex <= phrase.length) {
        setDisplayText(phrase.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
        }, 2500);
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, [currentPhraseIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12">
      {/* Background Grid - CAD style */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(55,65,81,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(55,65,81,0.3)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-paper-warm border border-gray-200 mb-6"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
          <span className="text-xs text-slate">专家已核验</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/20 text-success font-mono">
            Human-in-the-Loop
          </span>
        </motion.div>

        {/* Title - Chinese government style */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance"
        >
          <span className="text-foreground">以数换单，</span>
          <span className="text-brand-blue">以单强产</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-3"
        >
          <span className="text-lg text-slate font-mono">
            跨境产业带数字化"链主"平台
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-sm text-slate max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          打通"设计-制造-履约"全链路，构建"前店后厂"出海新基建。
          <br />
          让园区产能直连全球需求，综合成本降低 30%，交付周期缩短 60%。
        </motion.p>

        {/* Command Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-elevated">
            <div className="flex items-center">
              <div className="flex items-center gap-2 px-4 py-3 border-r border-gray-200 bg-paper-warm">
                <Search className="w-4 h-4 text-slate" />
              </div>
              <div className="flex-1 px-4 py-3">
                <span className="font-mono text-sm text-foreground">{displayText}</span>
                <AnimatePresence>
                  {isTyping && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-block w-0.5 h-4 bg-[#3b82f6] ml-0.5"
                    />
                  )}
                </AnimatePresence>
              </div>
              <Button className="m-2 bg-brand-blue hover:bg-brand-blue/90 text-white border-0 gap-2 font-medium">
                立即匹配产能 <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Process Flow - Engineering style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4"
        >
          <ProcessStep icon={<FileText />} label="需求上传" step="01" />
          <FlowConnector />
          <ProcessStep icon={<Cpu />} label="AI 拆单" step="02" />
          <FlowConnector />
          <ProcessStep icon={<Package />} label="智能寻源" step="03" />
          <FlowConnector />
          <ProcessStep icon={<Ship />} label="整柜交付" step="04" />
        </motion.div>

        {/* Data Stats - Government style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          <StatBlock value="142" unit="家" label="规上企业入驻" />
          <StatBlock value="24.5" unit="亿" label="撮合交易GMV" />
          <StatBlock value="60" unit="%" label="周期缩短" />
        </motion.div>
      </div>
    </section>
  );
}

function ProcessStep({
  icon,
  label,
  step,
}: {
  icon: React.ReactNode;
  label: string;
  step: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative">
        <div className="w-12 h-12 rounded bg-paper-warm border border-gray-200 flex items-center justify-center text-slate">
          {icon}
        </div>
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded bg-brand-blue text-white text-[10px] font-mono">
          {step}
        </span>
      </div>
      <span className="text-[10px] text-slate font-mono">{label}</span>
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="hidden sm:flex items-center px-2">
      <div className="w-8 h-[1px] bg-[#374151]" />
      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#374151]" />
    </div>
  );
}

function StatBlock({
  value,
  unit,
  label,
}: {
  value: string;
  unit: string;
  label: string;
}) {
  return (
    <div className="text-center p-3 bg-white border border-gray-200 rounded">
      <div className="flex items-baseline justify-center gap-0.5">
        <span className="text-xl font-mono font-bold text-foreground">{value}</span>
        <span className="text-xs text-slate">{unit}</span>
      </div>
      <span className="text-[10px] text-slate">{label}</span>
    </div>
  );
}
