"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Hash, AtSign, Pin, Users, Bell, Settings, Search, Gift, Smile, PlusCircle, ThumbsUp, ThumbsDown, MessageSquare, TrendingUp, Flame } from "lucide-react"

const channels = [
  { name: "announcements", icon: Hash, pinned: true },
  { name: "product-voting", icon: Hash, active: true },
  { name: "supplier-showcase", icon: Hash },
  { name: "buyer-requests", icon: Hash },
  { name: "general-chat", icon: Hash },
]

const onlineMembers = [
  { name: "Emily_KOL", status: "online", role: "Influencer" },
  { name: "JasonBuyer", status: "online", role: "Buyer" },
  { name: "MaryFactory", status: "idle", role: "Supplier" },
]

interface VotingProduct {
  name: string
  votes: { up: number; down: number }
  author: string
  time: string
  trend: string
}

const votingProducts: VotingProduct[] = [
  { name: "Foldable Travel Kettle (USB-C)", votes: { up: 847, down: 23 }, author: "Emily_KOL", time: "2h", trend: "+142 today" },
  { name: "Magnetic Phone Mount (MagSafe)", votes: { up: 623, down: 45 }, author: "TechReviewer", time: "5h", trend: "+89 today" },
  { name: "Mini Projector (1080P Native)", votes: { up: 512, down: 67 }, author: "HomeGadget", time: "8h", trend: "+56 today" },
]

export default function DiscordCommunityComponent() {
  const [votes, setVotes] = useState(votingProducts.map(p => ({ ...p.votes })))
  const [hasVoted, setHasVoted] = useState<boolean[]>([false, false, false])
  
  const handleVote = (index: number, type: 'up' | 'down') => {
    if (hasVoted[index]) return
    
    setVotes(prev => {
      const newVotes = [...prev]
      newVotes[index] = {
        ...newVotes[index],
        [type]: newVotes[index][type] + 1
      }
      return newVotes
    })
    
    setHasVoted(prev => {
      const newHasVoted = [...prev]
      newHasVoted[index] = true
      return newHasVoted
    })
  }
  
  return (
    <div className="flex h-[600px] bg-[#313338] rounded-lg overflow-hidden">
      {/* Sidebar - Channels */}
      <div className="w-60 bg-[#2b2d31] flex flex-col shrink-0 hidden md:flex">
        {/* Server header */}
        <div className="h-12 px-4 flex items-center border-b border-[#1e1f22] hover:bg-[#35373c] cursor-pointer">
          <span className="font-bold text-navy text-sm truncate">Private Traffic Pool</span>
        </div>
        
        {/* Channels */}
        <div className="flex-1 overflow-y-auto py-2 px-2">
          <div className="text-[11px] font-bold text-[#949ba4] uppercase px-2 mb-1 flex items-center justify-between">
            <span>Product Voting</span>
            <span className="text-[#5865f2]">HOT</span>
          </div>
          
          {channels.map((channel, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                channel.active 
                  ? 'bg-[#404249] text-navy' 
                  : 'text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1]'
              }`}
            >
              <channel.icon className="w-4 h-4 shrink-0 text-[#6d6f78]" />
              <span className="truncate">{channel.name}</span>
              {channel.pinned && <Pin className="w-3 h-3 ml-auto text-[#f59e0b]" />}
            </button>
          ))}
        </div>
        
        {/* User panel */}
        <div className="h-[52px] bg-[#232428] px-2 flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#5865f2]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#23a55a] border-2 border-[#232428] rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-navy truncate">DemandOS_Bot</div>
            <div className="text-[11px] text-[#23a55a]">Online</div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-12 px-4 flex items-center gap-2 border-b border-[#1e1f22] bg-[#313338]">
          <Hash className="w-5 h-5 text-[#6d6f78]" />
          <span className="font-bold text-navy text-sm">product-voting</span>
          <div className="ml-auto flex items-center gap-3 text-[#b5bac1]">
            <Bell className="w-5 h-5 cursor-pointer hover:text-[#dbdee1]" />
            <Search className="w-5 h-5 cursor-pointer hover:text-[#dbdee1]" />
          </div>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Pinned message */}
          <div className="bg-[#2b2d31] border-l-4 border-[#5865f2] rounded p-3 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Pin className="w-4 h-4 text-[#5865f2]" />
              <span className="text-xs font-bold text-[#5865f2]">PINNED MESSAGE</span>
            </div>
            <p className="text-sm text-[#dbdee1]">
              Welcome to the KOL Product Voting Channel! Vote on trending products and help us decide what to source next. Top 3 products will be fast-tracked to factory sampling.
            </p>
          </div>
          
          {/* Voting cards */}
          {votingProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#2b2d31] rounded-lg p-4 hover:bg-[#32353b] transition-colors"
            >
              <div className="flex items-start gap-3">
                {/* Rank badge */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${
                  index === 0 ? 'bg-[#f59e0b] text-black' :
                  index === 1 ? 'bg-[#94a3b8] text-black' :
                  'bg-[#cd7f32] text-black'
                }`}>
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Product name */}
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-navy text-sm">{product.name}</span>
                    {index === 0 && (
                      <span className="px-1.5 py-0.5 bg-[#f59e0b]/20 text-[#f59e0b] text-[10px] font-bold rounded flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        TRENDING
                      </span>
                    )}
                  </div>
                  
                  {/* Author info */}
                  <div className="flex items-center gap-2 text-xs text-[#949ba4] mb-3">
                    <span>Posted by <span className="text-[#00b0f4]">@{product.author}</span></span>
                    <span>·</span>
                    <span>{product.time}</span>
                    <span>·</span>
                    <span className="text-[#23a55a] flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {product.trend}
                    </span>
                  </div>
                  
                  {/* Voting buttons */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleVote(index, 'up')}
                      disabled={hasVoted[index]}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                        hasVoted[index]
                          ? 'bg-[#23a55a]/20 text-[#23a55a]'
                          : 'bg-[#404249] text-[#dbdee1] hover:bg-[#23a55a]/20 hover:text-[#23a55a]'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="font-medium">{votes[index].up}</span>
                    </button>
                    
                    <button 
                      onClick={() => handleVote(index, 'down')}
                      disabled={hasVoted[index]}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                        hasVoted[index]
                          ? 'bg-[#ed4245]/20 text-[#ed4245]'
                          : 'bg-[#404249] text-[#dbdee1] hover:bg-[#ed4245]/20 hover:text-[#ed4245]'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span className="font-medium">{votes[index].down}</span>
                    </button>
                    
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#404249] text-[#dbdee1] rounded-md text-sm hover:bg-[#4752c4] transition-colors ml-auto">
                      <MessageSquare className="w-4 h-4" />
                      <span>Discuss</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Message input */}
        <div className="px-4 pb-4">
          <div className="bg-[#383a40] rounded-lg flex items-center px-4 py-3">
            <PlusCircle className="w-5 h-5 text-[#b5bac1] cursor-pointer hover:text-[#dbdee1] shrink-0" />
            <input 
              type="text"
              placeholder="Message #product-voting"
              className="flex-1 bg-transparent border-none outline-none text-sm text-[#dbdee1] placeholder:text-[#6d6f78] px-3"
            />
            <div className="flex items-center gap-3 text-[#b5bac1] shrink-0">
              <Gift className="w-5 h-5 cursor-pointer hover:text-[#dbdee1]" />
              <Smile className="w-5 h-5 cursor-pointer hover:text-[#dbdee1]" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Right sidebar - Members (hidden on smaller screens) */}
      <div className="w-60 bg-[#2b2d31] hidden lg:block">
        <div className="p-4">
          <div className="text-[11px] font-bold text-[#949ba4] uppercase mb-2">
            Online Members — {onlineMembers.length}
          </div>
          
          {onlineMembers.map((member, i) => (
            <div key={i} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-[#35373c] cursor-pointer">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#5865f2]" />
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#2b2d31] rounded-full ${
                  member.status === 'online' ? 'bg-[#23a55a]' : 'bg-[#f0b232]'
                }`} />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-[#f2f3f5] truncate">{member.name}</div>
                <div className="text-[10px] text-[#949ba4]">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
