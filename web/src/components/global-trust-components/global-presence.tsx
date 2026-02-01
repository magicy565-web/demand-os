"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Clock, Radio, Phone, Globe } from "lucide-react"
import { content } from "@/lib/locale"

const stations = [
  { 
    id: "fra",
    coordinates: { top: "28%", left: "49%" },
    timezone: 1
  },
  { 
    id: "dxb", 
    coordinates: { top: "42%", left: "59%" },
    timezone: 4
  },
  { 
    id: "las", 
    coordinates: { top: "32%", left: "18%" },
    timezone: -7
  },
  { 
    id: "gz", 
    coordinates: { top: "40%", left: "73%" },
    timezone: 8
  },
] as const

type StationId = typeof stations[number]["id"]

export default function GlobalPresence() {
  const [activeStationId, setActiveStationId] = useState<StationId>("fra")
  const [time, setTime] = useState("")

  const activeStation = stations.find(s => s.id === activeStationId)!
  const localeStation = content.map.stations[activeStationId]

  // Real-time clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
      const localTime = new Date(utc + (3600000 * activeStation.timezone))
      setTime(localTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [activeStation.timezone])

  // Auto-rotate stations
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStationId(prev => {
        const currentIndex = stations.findIndex(s => s.id === prev)
        return stations[(currentIndex + 1) % stations.length].id
      })
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 relative bg-gradient-to-br from-paper-mist via-surface to-paper-warm overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-blue/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left side: Info card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-mono text-brand-blue mb-4">
              <Globe className="w-3 h-3" />
              GLOCALIZATION NETWORK
            </div>
            <h2 className="text-3xl font-bold text-navy mb-2">
              {content.map.sectionTitle}
            </h2>
            <p className="text-slate text-sm">
              {content.map.subTitle}
            </p>
          </div>

          <div className="bg-white/80 border border-gray-200 p-6 rounded-2xl backdrop-blur-md shadow-2xl relative overflow-hidden">
            {/* Scanning light effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#eab308]/50 to-transparent animate-scan" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStationId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-xs text-slate uppercase tracking-wider mb-1 font-mono">
                      {content.map.labels.current}
                    </div>
                    <h3 className="text-3xl font-bold text-navy mb-1">{localeStation.city}</h3>
                    <div className="text-sm text-brand-blue font-mono flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {time} (Local Time)
                    </div>
                  </div>
                  <div className="p-3 bg-[#1e3a8a]/20 rounded-lg text-[#3b82f6] border border-[#3b82f6]/20">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-slate mb-1">{content.map.labels.strategy}</div>
                    <div className="text-sm font-medium text-[#e2e8f0]">{localeStation.title}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate mb-1">{content.map.labels.officer}</div>
                      <div className="text-sm font-bold text-navy">{localeStation.manager}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate mb-1">Role</div>
                      <div className="text-xs text-slate">{localeStation.role}</div>
                    </div>
                  </div>

                  {/* Live status bar */}
                  <div className="bg-white p-3 rounded border border-gray-200 flex gap-3 items-center">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
                    </span>
                    <div>
                      <div className="text-[10px] text-[#22c55e] font-bold uppercase tracking-wider">
                        {content.map.labels.liveStatus}
                      </div>
                      <div className="text-xs text-[#e2e8f0] line-clamp-1">{localeStation.status}</div>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 py-3 bg-white text-[#020617] font-bold rounded-lg hover:bg-brand-blue transition-colors flex items-center justify-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  {content.map.labels.connectBtn}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right side: Map visualization */}
        <div className="lg:col-span-8 relative h-[500px] lg:h-[600px] w-full">
          <div className="absolute inset-0 bg-white/30 rounded-3xl border border-gray-200 overflow-hidden">
            {/* World map SVG background */}
            <svg 
              viewBox="0 0 1000 500" 
              className="absolute inset-0 w-full h-full opacity-20"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Simplified world map paths */}
              <path
                d="M150,150 L180,140 L200,150 L220,145 L240,155 L260,150 L280,160 L300,155 L320,165 L340,160 L360,170 L380,165"
                fill="none"
                stroke="#334155"
                strokeWidth="1"
              />
              <path
                d="M450,120 L480,115 L510,125 L540,120 L570,130 L600,125 L630,135 L660,130"
                fill="none"
                stroke="#334155"
                strokeWidth="1"
              />
              <path
                d="M700,200 L730,195 L760,205 L790,200 L820,210 L850,205"
                fill="none"
                stroke="#334155"
                strokeWidth="1"
              />
              {/* Grid lines */}
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={i * 50}
                  x2="1000"
                  y2={i * 50}
                  stroke="#334155"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 50}
                  y1="0"
                  x2={i * 50}
                  y2="500"
                  stroke="#334155"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              ))}
            </svg>

            {/* Decorative grid */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />

            {/* Connection lines between stations */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {stations.map((station, i) => {
                const nextStation = stations[(i + 1) % stations.length]
                return (
                  <motion.line
                    key={`line-${station.id}`}
                    x1={station.coordinates.left}
                    y1={station.coordinates.top}
                    x2={nextStation.coordinates.left}
                    y2={nextStation.coordinates.top}
                    stroke="#334155"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: i * 0.3 }}
                  />
                )
              })}
            </svg>

            {/* Station hotspots */}
            {stations.map((station) => {
              const stationLocale = content.map.stations[station.id]
              return (
                <button
                  key={station.id}
                  onClick={() => setActiveStationId(station.id)}
                  style={{ left: station.coordinates.left, top: station.coordinates.top }}
                  className={`absolute group flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                    activeStationId === station.id ? "z-30 scale-125" : "z-10 opacity-60 hover:opacity-100 hover:scale-110"
                  }`}
                >
                  {/* Pulsing dot */}
                  <div className="relative flex h-6 w-6 items-center justify-center">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      activeStationId === station.id ? "bg-brand-blue" : "bg-[#64748b]"
                    }`} />
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${
                      activeStationId === station.id 
                        ? "bg-brand-blue shadow-[0_0_20px_#eab308]" 
                        : "bg-[#64748b]"
                    }`} />
                  </div>
                  
                  {/* City label */}
                  <span className={`mt-3 px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md border transition-colors whitespace-nowrap ${
                    activeStationId === station.id 
                      ? "bg-brand-blue text-black border-[#eab308]" 
                      : "bg-slate-50/80 text-[#e2e8f0] border-gray-200 group-hover:border-[#64748b]"
                  }`}>
                    {stationLocale.city}
                  </span>

                  {/* Connector line when active */}
                  {activeStationId === station.id && (
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: 40 }} 
                      className="absolute top-full left-1/2 w-px bg-gradient-to-b from-[#eab308] to-transparent" 
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
