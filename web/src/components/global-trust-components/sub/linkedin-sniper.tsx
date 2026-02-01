"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Linkedin, MapPin, Users, Briefcase, Target, Brain, Send, Sparkles, TrendingUp, ChevronRight, MoreHorizontal } from "lucide-react"

export default function LinkedinSniperComponent() {
  const [showHighlight, setShowHighlight] = useState(false)
  const [typedInMail, setTypedInMail] = useState("")
  
  const inMailText = "Hi Sarah, saw your post on 2026 ESG goals. We manage a supply park in China with 50+ factories that are already ISO 14001 certified and track carbon footprint per SKU. We can help Marriott hit that target. Attached: Sample ESG Report."
  
  useEffect(() => {
    const highlightTimer = setTimeout(() => {
      setShowHighlight(true)
    }, 1500)
    
    return () => clearTimeout(highlightTimer)
  }, [])
  
  useEffect(() => {
    if (showHighlight && typedInMail.length < inMailText.length) {
      const typeTimer = setTimeout(() => {
        setTypedInMail(inMailText.slice(0, typedInMail.length + 1))
      }, 25)
      return () => clearTimeout(typeTimer)
    }
  }, [showHighlight, typedInMail, inMailText])
  
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LinkedIn Profile - Left Side */}
        <div className="flex-1 min-w-0">
          <div className="bg-[#1d2226] rounded-lg overflow-hidden border border-[#38434f]">
            {/* Cover image */}
            <div className="h-24 bg-gradient-to-r from-[#0a66c2] to-[#004182]" />
            
            {/* Profile content */}
            <div className="px-4 pb-4 -mt-12">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-[#2d333b] border-4 border-[#1d2226] mb-3 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-navy text-2xl font-bold">
                  SJ
                </div>
              </div>
              
              {/* Info */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-navy flex items-center gap-2">
                    Sarah Jenkins
                    <span className="text-xs text-[#71767b] font-normal bg-[#38434f] px-2 py-0.5 rounded">3rd</span>
                  </h3>
                  <p className="text-sm text-[#b0b7bf]">VP of Global Supply Chain at Marriott International</p>
                  <div className="flex items-center gap-2 text-xs text-[#71767b] mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>Washington DC-Baltimore Area</span>
                    <span>·</span>
                    <Users className="w-3 h-3" />
                    <span>500+ connections</span>
                  </div>
                </div>
                
                <button className="p-2 hover:bg-[#38434f] rounded-full transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-[#71767b]" />
                </button>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-1.5 bg-[#0a66c2] hover:bg-[#004182] text-navy text-sm font-bold rounded-full transition-colors">
                  Connect
                </button>
                <button className="flex-1 py-1.5 border border-[#0a66c2] text-[#0a66c2] text-sm font-bold rounded-full hover:bg-[#0a66c2]/10 transition-colors">
                  Message
                </button>
              </div>
            </div>
            
            {/* Activity section */}
            <div className="border-t border-[#38434f] p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-navy">Activity</span>
                <span className="text-xs text-[#71767b]">1,240 followers</span>
              </div>
              
              {/* Recent post */}
              <div className="bg-[#2d333b] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-[#71767b]">Sarah posted this · 2h</span>
                </div>
                <p className="text-sm text-[#e7e9ea] leading-relaxed">
                  Our 2026 sustainability goals are ambitious. We need partners who are serious about{' '}
                  <span className={`transition-all duration-500 ${
                    showHighlight 
                      ? 'bg-brand-blue/30 text-brand-blue px-1 py-0.5 rounded border-b-2 border-[#eab308]' 
                      : ''
                  }`}>
                    reducing carbon footprint
                  </span>
                  {' '}in FF&E. #Sustainability #SupplyChain
                </p>
                
                <div className="flex items-center gap-4 mt-3 text-xs text-[#71767b]">
                  <span className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-[#0a66c2] flex items-center justify-center">
                      <TrendingUp className="w-2 h-2 text-navy" />
                    </div>
                    147 reactions
                  </span>
                  <span>23 comments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Sidebar - Right Side */}
        <div className="w-full lg:w-80 shrink-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: showHighlight ? 1 : 0.5, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-50 border border-gray-200 rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#0f172a] to-[#1e293b] border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-brand-blue" />
                  <span className="text-sm font-bold text-navy">Decision-Maker Intel</span>
                </div>
                <span className="px-2 py-1 bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold rounded">
                  MATCH 98%
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Personality analysis */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-[#a855f7]" />
                  <span className="text-xs font-bold text-slate uppercase">Psychometric Analysis</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Personality</span>
                    <span className="text-navy font-medium">Dominant (Driver)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Style</span>
                    <span className="text-[#f59e0b]">Brief. Data-driven.</span>
                  </div>
                </div>
              </div>
              
              {/* Ice-breaker */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-brand-blue" />
                  <span className="text-xs font-bold text-slate uppercase">Ice-Breaker Strategy</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                    <span className="text-[#e2e8f0]">
                      <span className="text-[#22c55e] font-medium">Trigger:</span> Recent ESG/Sustainability post
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    <span className="text-[#e2e8f0]">
                      <span className="text-brand-blue font-medium">Hook:</span> Green Factory certification
                    </span>
                  </div>
                </div>
              </div>
              
              {/* AI drafted InMail */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                  <span className="text-xs font-bold text-slate uppercase">AI-Drafted InMail</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="text-sm text-[#e2e8f0] leading-relaxed min-h-[100px]">
                    {typedInMail}
                    {typedInMail.length < inMailText.length && (
                      <span className="inline-block w-0.5 h-4 bg-[#0a66c2] ml-0.5 animate-pulse" />
                    )}
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <button 
                disabled={typedInMail.length < inMailText.length}
                className="w-full py-3 bg-[#0a66c2] hover:bg-[#004182] disabled:opacity-50 disabled:cursor-not-allowed text-navy font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4" />
                Send InMail (Cost: 1 Credit)
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
