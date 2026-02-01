"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Ticket, ArrowRight, Users, Lock, Mic, Calendar, Clock, CheckCircle } from "lucide-react"
import { content } from "@/lib/locale"

export default function WebinarTicket() {
  const [countdown, setCountdown] = useState({ days: 4, hours: 12, minutes: 45, seconds: 30 })
  
  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  const localeTicket = content.ticket

  return (
    <section className="py-24 bg-gradient-to-b from-[#020617] to-[#0c4a6e]/20 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-brand-blue text-xs font-bold tracking-widest uppercase mb-4">
            <Lock className="w-3 h-3" />
            Supply Chain Intelligence Bureau
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            {localeTicket.title}
          </h2>
        </div>

        {/* Holographic ticket container */}
        <div className="relative bg-slate-50/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row group hover:border-[#06b6d4]/30 transition-colors duration-500">
           
          {/* Left side: Visual ticket stub */}
          <div className="md:w-5/12 bg-gradient-to-br from-[#1e293b] to-[#020617] p-8 relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
            {/* Holographic shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#06b6d4]/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-blue/20 blur-[50px] rounded-full" />
            
            <div className="relative z-10 h-full flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="inline-block px-3 py-1 border border-[#eab308]/50 bg-brand-blue/10 text-brand-blue text-[10px] font-bold tracking-widest rounded mb-6">
                  {localeTicket.badge}
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2 leading-tight">
                  {localeTicket.title}
                </h3>
                <p className="text-slate text-sm mt-2">{localeTicket.subTitle}</p>
              </div>
              
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#334155] rounded-full flex items-center justify-center border border-white/10">
                    <Mic className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <div className="text-navy text-sm font-bold">{localeTicket.speaker.name}</div>
                    <div className="text-slate text-xs">{localeTicket.speaker.title}</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between text-xs font-mono text-brand-blue">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {localeTicket.event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {localeTicket.event.time}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Decorative barcode */}
            <div className="absolute bottom-4 right-[-10px] rotate-[-90deg] text-[10px] text-[#334155] font-mono tracking-[4px] opacity-50">
              NO.8942-VIP-ACCESS
            </div>
          </div>

          {/* Right side: Benefits & conversion */}
          <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
            {/* Countdown */}
            <div className="mb-8">
              <div className="text-xs text-slate mb-3 uppercase tracking-wide">Event starts in:</div>
              <div className="flex gap-3">
                {[
                  { value: countdown.days, label: "Days" },
                  { value: countdown.hours, label: "Hours" },
                  { value: countdown.minutes, label: "Min" },
                  { value: countdown.seconds, label: "Sec" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold font-mono text-navy">
                        {String(item.value).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-navy mb-6">
              {localeTicket.benefits.title}
            </h3>
            
            <ul className="space-y-4 mb-8">
              {localeTicket.benefits.list.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#e2e8f0] text-sm">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center border border-[#06b6d4]/30">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="email" 
                  placeholder={localeTicket.form.email}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy focus:border-[#06b6d4] outline-none transition-colors placeholder:text-[#475569]" 
                />
                <input 
                  type="text" 
                  placeholder={localeTicket.form.company}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy focus:border-[#06b6d4] outline-none transition-colors placeholder:text-[#475569]" 
                />
              </div>
              <button className="w-full group bg-gradient-to-r from-[#eab308] to-[#f59e0b] hover:from-[#fde047] hover:to-[#eab308] text-[#020617] font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#eab308]/20">
                <Ticket className="w-4 h-4" />
                {localeTicket.cta.btn}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate bg-white/50 py-2 rounded">
              <Users className="w-3 h-3" />
              <span>{localeTicket.cta.note}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
