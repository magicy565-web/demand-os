"use client";

import React from "react"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Shield, Building2, TrendingUp, Database } from "lucide-react";

export function CommandBar() {
  const [enterprises, setEnterprises] = useState(142);
  const [gmv, setGmv] = useState(24.5);
  const [taxRefund, setTaxRefund] = useState(3500);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEnterprises((prev) => prev + Math.floor(Math.random() * 2));
      setGmv((prev) => prev + Math.random() * 0.1);
      setTaxRefund((prev) => prev + Math.floor(Math.random() * 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ y: -20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-paper-warm border-y border-gray-200 py-3"
    >
      <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-brand-blue flex items-center justify-center">
            <Database className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-navy">
            链智云<span className="text-brand-blue ml-1">SourcingOS</span>
          </span>
        </div>

        {/* System Status Indicators - Enterprise Metrics */}
        <div className="hidden md:flex items-center gap-8">
          <StatusIndicator
            icon={<Building2 className="w-3.5 h-3.5" />}
            label="入驻规上企业"
            value={`${enterprises} 家`}
          />
          <StatusIndicator
            icon={<TrendingUp className="w-3.5 h-3.5" />}
            label="累计撮合GMV"
            value={`¥ ${gmv.toFixed(1)} 亿`}
          />
          <StatusIndicator
            icon={<Activity className="w-3.5 h-3.5" />}
            label="带动退税/结汇"
            value={`$ ${(taxRefund / 100).toFixed(1)} 万`}
          />
        </div>

        {/* Security Badges */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-white border border-gray-200">
            <Shield className="w-3 h-3 text-success" />
            <span className="text-[10px] font-medium text-slate">等保三级</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white border border-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            <span className="text-[10px] font-medium text-slate">系统运行中</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function StatusIndicator({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-slate">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[10px] text-slate uppercase tracking-wider">
          {label}
        </span>
        <span className="text-xs font-medium text-navy">{value}</span>
      </div>
    </div>
  );
}
