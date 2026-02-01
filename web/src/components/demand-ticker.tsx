"use client"

import { useEffect, useState } from "react"

const demandUpdates = [
  { city: "伦敦", category: "户外用品", status: "发现原始需求", time: "2小时前" },
  { city: "曼彻斯特", category: "DTC美妆品牌", status: "订单撮合成功", time: "4小时前" },
  { city: "伯明翰", category: "家居智能设备", status: "TikTok话题爆发", time: "6小时前" },
  { city: "利物浦", category: "宠物用品", status: "库存补货预警", time: "8小时前" },
  { city: "爱丁堡", category: "运动装备", status: "新品测试启动", time: "10小时前" },
  { city: "布里斯托", category: "母婴产品", status: "需求热度上升", time: "12小时前" },
]

export function DemandTicker() {
  const [isPaused, setIsPaused] = useState(false)
  
  // Duplicate the array for seamless loop
  const duplicatedUpdates = [...demandUpdates, ...demandUpdates]

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-navy/[0.03] via-navy/[0.05] to-navy/[0.03] border-y border-border/50 py-4">
      <div className="container-editorial">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0 flex items-center gap-2.5 pr-6 border-r border-border/50">
            <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse shadow-md shadow-electric-blue/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/60">
              实时需求
            </span>
          </div>
          
          <div 
            className="flex-1 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className={`flex gap-8 ${isPaused ? '' : 'animate-scroll'}`}
              style={{
                animation: isPaused ? 'none' : 'scroll 60s linear infinite',
              }}
            >
              {duplicatedUpdates.map((update, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 whitespace-nowrap text-xs"
                >
                  <span className="font-medium text-navy">{update.city}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{update.category}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-electric-blue font-medium">{update.status}</span>
                  <span className="text-muted-foreground/50 text-[10px]">
                    ({update.time})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </div>
  )
}
