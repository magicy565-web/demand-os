"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Globe, MoreHorizontal, ThumbsUp, MessageCircle, Share2, Zap, Tag, MapPin, Clock } from "lucide-react"

export default function FacebookAdComponent() {
  const [isScanning, setIsScanning] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)
  const [typedText, setTypedText] = useState("")
  
  const replyText = "Hi David, based on your requirements, our factory in Foshan specializes in brass fixtures for Marriott/Hilton. We have the 'Model-K2' which matches your photo perfectly. MOQ 50pcs, Lead time 25 days. DM sent with catalog."
  
  useEffect(() => {
    // Scanning phase
    const scanTimer = setTimeout(() => {
      setIsScanning(false)
      setShowOverlay(true)
    }, 2000)
    
    return () => clearTimeout(scanTimer)
  }, [])
  
  useEffect(() => {
    if (showOverlay && typedText.length < replyText.length) {
      const typeTimer = setTimeout(() => {
        setTypedText(replyText.slice(0, typedText.length + 1))
      }, 30)
      return () => clearTimeout(typeTimer)
    }
  }, [showOverlay, typedText, replyText])
  
  return (
    <div className="p-6 md:p-8">
      {/* Scanning indicator */}
      {isScanning && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#22c55e] to-transparent animate-scan" />
        </div>
      )}
      
      <div className="max-w-2xl mx-auto">
        {/* Facebook Post Card */}
        <div className={`bg-[#242526] rounded-lg overflow-hidden transition-all duration-500 ${showOverlay ? 'ring-2 ring-[#22c55e]/50' : ''}`}>
          {/* Post Header */}
          <div className="p-4">
            <div className="flex items-start gap-3">
              {/* Group icon */}
              <div className="w-10 h-10 rounded-lg bg-[#3b82f6] flex items-center justify-center text-navy font-bold text-sm shrink-0">
                GH
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#e4e6eb] text-sm">Global Hospitality Sourcing Network</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#b0b3b8] mt-0.5">
                  {/* User avatar */}
                  <div className="w-5 h-5 rounded-full bg-[#4b5563] shrink-0" />
                  <span className="font-medium text-[#e4e6eb]">David Miller</span>
                  <span className="text-[#b0b3b8]">Procurement Director at Hilton</span>
                  <span>·</span>
                  <span>2h</span>
                  <span>·</span>
                  <Globe className="w-3 h-3" />
                </div>
              </div>
              
              <button className="p-2 hover:bg-[#3a3b3c] rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5 text-[#b0b3b8]" />
              </button>
            </div>
            
            {/* Post Content */}
            <div className="mt-3 text-[#e4e6eb] text-sm leading-relaxed">
              <span className="text-[#f97316]">Urgent request</span>: We are renovating our Miami property and need a reliable supplier for{' '}
              <span className={`${showOverlay ? 'bg-[#22c55e]/20 text-[#22c55e] px-1 rounded' : ''} transition-colors duration-500`}>
                200 sets of brass floor lamps
              </span>{' '}
              and{' '}
              <span className={`${showOverlay ? 'bg-[#22c55e]/20 text-[#22c55e] px-1 rounded' : ''} transition-colors duration-500`}>
                custom velvet lounge chairs
              </span>
              . Need to ship by November. Factories only, no trading companies please. Drop your catalog.
            </div>
            
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-1 mt-3 rounded-lg overflow-hidden">
              <div className="aspect-square bg-[#3a3b3c] flex items-center justify-center text-[#b0b3b8] text-xs">
                [Brass Lamp Reference]
              </div>
              <div className="aspect-square bg-[#3a3b3c] flex items-center justify-center text-[#b0b3b8] text-xs">
                [Velvet Chair Reference]
              </div>
            </div>
          </div>
          
          {/* Engagement */}
          <div className="px-4 py-2 border-t border-[#3a3b3c]">
            <div className="flex items-center gap-1 text-[#b0b3b8] text-xs mb-2">
              <div className="flex -space-x-1">
                <div className="w-4 h-4 rounded-full bg-[#3b82f6] flex items-center justify-center">
                  <ThumbsUp className="w-2 h-2 text-navy" />
                </div>
                <div className="w-4 h-4 rounded-full bg-[#ef4444] flex items-center justify-center text-[8px]">
                  *
                </div>
              </div>
              <span>24</span>
              <span className="ml-auto">8 comments · 3 shares</span>
            </div>
            
            {/* Action buttons */}
            <div className="flex border-t border-[#3a3b3c] pt-2">
              {[
                { icon: ThumbsUp, label: "Like" },
                { icon: MessageCircle, label: "Comment" },
                { icon: Share2, label: "Share" },
              ].map((action, i) => (
                <button 
                  key={i}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-[#b0b3b8] hover:bg-[#3a3b3c] rounded-md transition-colors text-sm"
                >
                  <action.icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* AI Overlay Panel */}
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 bg-slate-50 border border-[#22c55e]/30 rounded-xl p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#22c55e]" />
                <span className="text-sm font-bold text-navy">Demand-OS Intelligence</span>
              </div>
              <span className="px-2 py-1 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded text-[10px] font-bold text-[#22c55e]">
                HIGH INTENT LEAD
              </span>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { icon: Tag, label: "Product: Floor Lamp" },
                { icon: Tag, label: "Qty: 200+" },
                { icon: MapPin, label: "Location: Miami" },
                { icon: Clock, label: "Urgency: High" },
              ].map((tag, i) => (
                <span 
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs text-slate"
                >
                  <tag.icon className="w-3 h-3" />
                  {tag.label}
                </span>
              ))}
            </div>
            
            {/* Auto-reply draft */}
            <div className="mb-4">
              <div className="text-xs text-slate mb-2">AI-Generated Reply Draft:</div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-[#e2e8f0] min-h-[80px]">
                {typedText}
                <span className="inline-block w-0.5 h-4 bg-[#22c55e] ml-0.5 animate-pulse" />
              </div>
            </div>
            
            {/* Action button */}
            <button className="w-full py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-navy font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
              <MessageCircle className="w-4 h-4" />
              Post Reply & Send DM
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
