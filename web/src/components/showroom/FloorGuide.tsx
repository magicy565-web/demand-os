"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Sparkles, Shirt, Smartphone, Home, Rocket } from "lucide-react";

// 楼层数据：根据实际图片内容定义每层功能
const floors = [
  { 
    id: "6F", 
    name: "品牌运营中心", 
    image: "/images/showroom/6F.png", 
    icon: Rocket,
    color: "from-violet-500 to-purple-600",
    features: ["国际品牌孵化", "跨境电商直播", "商务洽谈中心"],
    area: "2,800㎡",
    highlight: "高端商务"
  },
  { 
    id: "5F", 
    name: "智能家居馆", 
    image: "/images/showroom/5F.png", 
    icon: Home,
    color: "from-blue-500 to-cyan-500",
    features: ["智能家电体验", "IoT生活场景", "科技新品发布"],
    area: "3,200㎡",
    highlight: "智慧生活"
  },
  { 
    id: "4F", 
    name: "数字生活馆", 
    image: "/images/showroom/4F.png", 
    icon: Smartphone,
    color: "from-emerald-500 to-teal-500",
    features: ["3C数码产品", "可穿戴设备", "数码配件专区"],
    area: "3,000㎡",
    highlight: "科技前沿"
  },
  { 
    id: "3F", 
    name: "时尚生活馆", 
    image: "/images/showroom/3F.png", 
    icon: Shirt,
    color: "from-rose-500 to-pink-500",
    features: ["流行服饰", "美妆个护", "潮流配饰"],
    area: "3,500㎡",
    highlight: "时尚潮流"
  },
  { 
    id: "2F", 
    name: "创意设计馆", 
    image: "/images/showroom/2F.png", 
    icon: Sparkles,
    color: "from-amber-500 to-orange-500",
    features: ["原创设计", "文创礼品", "手工艺品"],
    area: "2,600㎡",
    highlight: "匠心创意"
  },
  { 
    id: "1F", 
    name: "综合展示大厅", 
    image: "/images/showroom/1F.png", 
    icon: Building2,
    color: "from-slate-500 to-slate-600",
    features: ["接待中心", "综合服务台", "临展专区"],
    area: "4,000㎡",
    highlight: "首层门户"
  },
];

export function FloorGuide() {
  const [activeFloor, setActiveFloor] = useState(floors[5]); // 默认显示1F

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 左侧：楼层选择器 - 垂直电梯式设计 */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="text-xs text-white/40 uppercase tracking-widest mb-4 px-2">
              Floor Navigator
            </div>
            <div className="space-y-2">
              {floors.map((floor, index) => {
                const Icon = floor.icon;
                const isActive = activeFloor.id === floor.id;
                return (
                  <motion.button
                    key={floor.id}
                    onClick={() => setActiveFloor(floor)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full group relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${floor.color} shadow-lg`
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {/* 楼层编号 */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono text-lg font-bold transition-all ${
                      isActive 
                        ? "bg-white/20 text-white" 
                        : "bg-white/5 text-white/50 group-hover:text-white"
                    }`}>
                      {floor.id}
                    </div>
                    
                    {/* 楼层信息 */}
                    <div className="flex-1 text-left">
                      <div className={`font-medium transition-colors ${
                        isActive ? "text-white" : "text-white/70 group-hover:text-white"
                      }`}>
                        {floor.name}
                      </div>
                      <div className={`text-xs mt-0.5 ${
                        isActive ? "text-white/70" : "text-white/40"
                      }`}>
                        {floor.area} · {floor.highlight}
                      </div>
                    </div>

                    {/* 图标 */}
                    <Icon className={`w-5 h-5 transition-colors ${
                      isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
                    }`} />

                    {/* 激活指示器 */}
                    {isActive && (
                      <motion.div
                        layoutId="floorIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 右侧：楼层平面图展示 */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFloor.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative"
              >
                {/* 平面图 */}
                <div className="aspect-[16/10] relative">
                  <Image
                    src={activeFloor.image}
                    alt={activeFloor.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    className="object-contain p-8"
                    priority
                  />
                  
                  {/* 渐变遮罩 */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* 底部信息面板 */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${activeFloor.color} mb-3`}
                      >
                        {activeFloor.highlight}
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {activeFloor.id} · {activeFloor.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {activeFloor.features.map((feature, i) => (
                          <motion.span
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-sm text-white/80 border border-white/10"
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-white/40 text-xs mb-1">展示面积</div>
                      <div className="text-2xl font-light text-white font-mono">
                        {activeFloor.area}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
