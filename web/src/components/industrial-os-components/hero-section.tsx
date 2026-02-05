"use client";

import React from "react"

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Search, FileText, Cpu, Package, Ship, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemandForm } from "./demand-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
  const [showForm, setShowForm] = useState(false);

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

        {/* Title - Chinese government style with enhanced visual impact */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance"
        >
          <span className="text-foreground">以数换单，</span>
          <span className="bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_2px_4px_rgba(59,130,246,0.3)]">
            以单强产
          </span>
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
              <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogTrigger asChild>
                  <Button className="m-2 bg-[#3B82F6] hover:bg-[#2563EB] hover:scale-[1.02] hover:shadow-lg text-white border-0 gap-2 font-medium transition-all duration-200 ease-out group">
                    <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                    立即匹配产能 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto backdrop-blur-sm bg-white/95 border border-gray-200 shadow-2xl">
                  <DemandForm />
                </DialogContent>
              </Dialog>
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
    <motion.div 
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex flex-col items-center gap-1.5 group cursor-pointer"
    >
      <div className="relative">
        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-white to-gray-50 border border-gray-200 flex items-center justify-center text-slate group-hover:border-[#3B82F6]/50 group-hover:shadow-md transition-all duration-300">
          <span className="group-hover:text-[#3B82F6] transition-colors">{icon}</span>
        </div>
        <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white text-[10px] font-mono shadow-sm">
          {step}
        </span>
      </div>
      <span className="text-xs text-slate font-medium group-hover:text-[#3B82F6] transition-colors">{label}</span>
    </motion.div>
  );
}

function FlowConnector() {
  return (
    <div className="hidden sm:flex items-center px-3">
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="w-10 h-[2px] bg-gradient-to-r from-[#3B82F6]/30 to-[#3B82F6]/60 origin-left" 
      />
      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[#3B82F6]/60" />
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
  const [displayValue, setDisplayValue] = useState(0);
  const numValue = parseFloat(value);
  
  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(numValue * easeOut);
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [numValue]);
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -2 }}
      className="text-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-baseline justify-center gap-0.5">
        <span className="text-2xl font-mono font-bold text-[#3B82F6]">
          {displayValue.toFixed(value.includes('.') ? 1 : 0)}
        </span>
        <span className="text-sm text-slate">{unit}</span>
      </div>
      <span className="text-xs text-slate-light mt-1 block">{label}</span>
    </motion.div>
  );
}
