/**
 * Discord频道欢迎卡片组件
 * 用于展示频道介绍、使用指南和功能说明
 */

"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface WelcomeSection {
  title: string;
  icon?: LucideIcon;
  content: string | React.ReactNode;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Metric {
  label: string;
  value: string;
  icon: string;
}

interface WelcomeCardProps {
  channelName: string;
  channelIcon: LucideIcon;
  tagline: string;
  description: string;
  howItWorks: { step: number; title: string; description: string }[];
  features?: Feature[];
  metrics?: Metric[];
  tips?: string[];
  callToAction?: string;
  accentColor?: string;
}

export function WelcomeCard({
  channelName,
  channelIcon: Icon,
  tagline,
  description,
  howItWorks,
  features = [],
  metrics = [],
  tips = [],
  callToAction = "Ready to get started? 🚀",
  accentColor = "#5865F2"
}: WelcomeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 rounded-xl bg-gradient-to-br from-discord-hover/50 to-discord-bg border border-white/10 overflow-hidden"
    >
      {/* Header */}
      <div 
        className="px-6 py-5 border-b border-white/10"
        style={{ 
          background: `linear-gradient(135deg, ${accentColor}15 0%, transparent 100%)`
        }}
      >
        <div className="flex items-start gap-4">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <Icon className="w-9 h-9" style={{ color: accentColor }} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              {channelName}
            </h2>
            <p className="text-lg text-white/80 font-medium mb-1">{tagline}</p>
            <p className="text-sm text-white/60 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="px-6 py-5 border-b border-white/10">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          How It Works
        </h3>
        <div className="space-y-4">
          {howItWorks.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 group"
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5"
                style={{ 
                  backgroundColor: `${accentColor}30`,
                  color: accentColor
                }}
              >
                {step.step}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                <p className="text-sm text-white/70 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      {features.length > 0 && (
        <div className="px-6 py-5 border-b border-white/10">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">✨</span>
            Key Features
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl shrink-0">{feature.icon}</span>
                  <div>
                    <h4 className="font-medium text-white text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-white/60 leading-snug">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics */}
      {metrics.length > 0 && (
        <div className="px-6 py-5 border-b border-white/10 bg-white/[0.02]">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Performance Stats
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <div className="text-2xl mb-1">{metric.icon}</div>
                <div className="text-xl font-bold text-white mb-1" style={{ color: accentColor }}>
                  {metric.value}
                </div>
                <div className="text-xs text-white/60">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Pro Tips */}
      {tips.length > 0 && (
        <div className="px-6 py-5 border-b border-white/10">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Pro Tips
          </h3>
          <div className="space-y-2">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-2 text-sm"
              >
                <span className="text-green-400 shrink-0 mt-0.5">✓</span>
                <span className="text-white/70">{tip}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="px-6 py-4 bg-white/[0.02]">
        <p className="text-center text-white font-medium">{callToAction}</p>
      </div>
    </motion.div>
  );
}
