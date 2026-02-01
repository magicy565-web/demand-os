"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useView } from "@/lib/view-context"
import { content } from "@/lib/locale"
import { Globe, Users, Target, MessageSquare, TrendingUp } from "lucide-react"

import FacebookAdComponent from "./sub/facebook-ad"
import DiscordCommunityComponent from "./sub/discord-community"
import LinkedinSniperComponent from "./sub/linkedin-sniper"

type TabId = "public" | "private" | "sniper"

const tabs = [
  { 
    id: "public" as TabId, 
    icon: Globe, 
    color: "text-[#3b82f6]", 
    bg: "bg-[#3b82f6]/10",
    borderColor: "border-[#3b82f6]/50"
  },
  { 
    id: "private" as TabId, 
    icon: MessageSquare, 
    color: "text-[#5865f2]", 
    bg: "bg-[#5865f2]/10",
    borderColor: "border-[#5865f2]/50"
  },
  { 
    id: "sniper" as TabId, 
    icon: Target, 
    color: "text-brand-blue", 
    bg: "bg-brand-blue/10",
    borderColor: "border-[#06b6d4]/50"
  },
]

export default function AcquisitionMatrix() {
  const { viewMode } = useView()
  const [activeTab, setActiveTab] = useState<TabId>("public")

  const localeContent = content.acquisition

  return (
    <section className="py-24 bg-white border-t border-gray-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1e3a8a]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5865f2]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-gray-200 text-xs font-mono text-brand-blue mb-4">
            <TrendingUp className="w-3 h-3" />
            {viewMode === "enterprise" ? localeContent.badge.enterprise : localeContent.badge.government}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            {viewMode === "enterprise" ? localeContent.title.enterprise : localeContent.title.government}
          </h2>
          <p className="text-slate max-w-2xl mx-auto">
            {viewMode === "enterprise" ? localeContent.desc.enterprise : localeContent.desc.government}
          </p>
        </div>

        {/* Tab controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {tabs.map((tab) => {
            const tabLocale = localeContent.tabs[tab.id]
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative p-4 rounded-xl border text-left transition-all duration-300 ${
                  activeTab === tab.id 
                    ? `${tab.borderColor} bg-slate-50 shadow-[0_0_20px_rgba(6,182,212,0.1)]` 
                    : "border-gray-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${tab.bg} ${tab.color}`}>
                    <tab.icon className="w-5 h-5" />
                  </div>
                  <span className={`font-bold ${activeTab === tab.id ? "text-navy" : "text-slate"}`}>
                    {tabLocale.label}
                  </span>
                </div>
                <div className="text-xs text-slate pl-[52px]">
                  {tabLocale.metric}
                </div>
                {/* Active indicator */}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] rounded-b-xl" 
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Content area */}
        <div className="relative min-h-[600px] border border-gray-200 bg-slate-50/50 rounded-2xl overflow-hidden backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "public" && <FacebookAdComponent />}
              {activeTab === "private" && <DiscordCommunityComponent />}
              {activeTab === "sniper" && <LinkedinSniperComponent />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
