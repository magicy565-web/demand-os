"use client"

import { motion } from "framer-motion"
import { ChevronDown, Globe, Network, Zap } from "lucide-react"
import { content } from "@/lib/locale"

export default function PageHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background network animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Animated network nodes */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Network lines */}
          <motion.line
            x1="10%" y1="20%" x2="30%" y2="40%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.line
            x1="30%" y1="40%" x2="50%" y2="30%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
          <motion.line
            x1="50%" y1="30%" x2="70%" y2="50%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
          <motion.line
            x1="70%" y1="50%" x2="90%" y2="35%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2 }}
          />
          <motion.line
            x1="50%" y1="30%" x2="45%" y2="70%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2.5 }}
          />
          
          {/* Pulsing nodes */}
          {[
            { cx: "10%", cy: "20%", delay: 0 },
            { cx: "30%", cy: "40%", delay: 0.3 },
            { cx: "50%", cy: "30%", delay: 0.6 },
            { cx: "70%", cy: "50%", delay: 0.9 },
            { cx: "90%", cy: "35%", delay: 1.2 },
            { cx: "45%", cy: "70%", delay: 1.5 },
          ].map((node, i) => (
            <motion.circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r="4"
              fill="#eab308"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.3, 1, 0.3], 
                scale: [0.8, 1.2, 0.8] 
              }}
              transition={{
                delay: node.delay,
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>
        
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-blue/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-gray-200 mb-8"
        >
          <Network className="w-4 h-4 text-brand-blue" />
          <span className="text-xs font-medium tracking-wide text-slate">
            {content.hero.badge}
          </span>
        </motion.div>
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-navy mb-6 leading-tight tracking-tight"
        >
          <span className="block">{content.hero.title.line1}</span>
          <span className="block text-brand-blue">{content.hero.title.line2}</span>
        </motion.h1>
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-slate max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {content.hero.desc}
        </motion.p>
        
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
        >
          {[
            { icon: Globe, value: "5", label: "大洲覆盖" },
            { icon: Zap, value: "100K+", label: "触达群组" },
            { icon: Network, value: "24/7", label: "全球协同" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-gray-200">
                <stat.icon className="w-5 h-5 text-brand-blue" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-navy">{stat.value}</div>
                <div className="text-xs text-slate">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate tracking-wide">
            {content.hero.scrollHint}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDown className="w-5 h-5 text-slate" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
