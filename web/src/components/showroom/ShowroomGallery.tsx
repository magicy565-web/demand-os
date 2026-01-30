"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { Expand, X } from "lucide-react";

// 根据实际图片内容分类展示
const galleryImages = [
  // 1楼展台区
  { 
    src: "/images/showroom effect/1楼中型展台.jpg", 
    category: "展台", 
    title: "中型展台",
    floor: "1F",
    desc: "适合中小型品牌展示，配备LED背景墙与产品陈列架"
  },
  { 
    src: "/images/showroom effect/1楼互动区展台.jpg", 
    category: "互动", 
    title: "互动体验区",
    floor: "1F",
    desc: "沉浸式体验空间，支持VR/AR产品演示"
  },
  { 
    src: "/images/showroom effect/1楼展台带洽谈区.jpg", 
    category: "洽谈", 
    title: "展台+洽谈区",
    floor: "1F",
    desc: "展示与商务洽谈一体化设计"
  },
  { 
    src: "/images/showroom effect/1楼综合货架.jpg", 
    category: "展台", 
    title: "综合货架区",
    floor: "1F",
    desc: "高密度产品陈列，适合SKU丰富的供应商"
  },
  // 2楼品牌区
  { 
    src: "/images/showroom effect/2楼联合品牌展区.jpg", 
    category: "品牌", 
    title: "联合品牌展区",
    floor: "2F",
    desc: "多品牌联合展示空间，共享流量与资源"
  },
  // 3楼特色产业区
  { 
    src: "/images/showroom effect/3楼特色产业展区A.jpg", 
    category: "产业", 
    title: "特色产业展区A",
    floor: "3F",
    desc: "区域特色产品集中展示"
  },
  { 
    src: "/images/showroom effect/3楼特色产业区B.jpg", 
    category: "产业", 
    title: "特色产业展区B",
    floor: "3F",
    desc: "工艺美术与非遗文化展示"
  },
  { 
    src: "/images/showroom effect/3楼特色产业区C.jpg", 
    category: "产业", 
    title: "特色产业展区C",
    floor: "3F",
    desc: "地方名优特产展示中心"
  },
  // 4楼直播基地
  { 
    src: "/images/showroom effect/4楼直播基地.jpg", 
    category: "直播", 
    title: "直播基地",
    floor: "4F",
    desc: "专业直播间，支持多平台同步直播"
  },
  // 高端展示区
  { 
    src: "/images/showroom effect/gallery-interior.jpg", 
    category: "全景", 
    title: "展厅全景",
    floor: "综合",
    desc: "通透开阔的展示空间设计"
  },
  { 
    src: "/images/showroom effect/gallery-lounge.jpg", 
    category: "休息", 
    title: "商务休息区",
    floor: "VIP",
    desc: "高端商务洽谈与休息空间"
  },
  { 
    src: "/images/showroom effect/gallery-vip.jpg", 
    category: "VIP", 
    title: "VIP接待室",
    floor: "VIP",
    desc: "贵宾专属接待空间"
  },
  // 特色展台
  { 
    src: "/images/showroom effect/展台设计.jpg", 
    category: "展台", 
    title: "展台设计",
    floor: "综合",
    desc: "模块化展台，灵活组合"
  },
  { 
    src: "/images/showroom effect/珠宝展台.png", 
    category: "特展", 
    title: "珠宝展台",
    floor: "特展",
    desc: "高端珠宝专属展示柜"
  },
  { 
    src: "/images/showroom effect/综合展示区.jpg", 
    category: "全景", 
    title: "综合展示区",
    floor: "综合",
    desc: "多品类综合展示空间"
  },
];

const categories = [
  { id: "全部", label: "全部", count: galleryImages.length },
  { id: "展台", label: "展台", count: galleryImages.filter(i => i.category === "展台").length },
  { id: "产业", label: "产业展区", count: galleryImages.filter(i => i.category === "产业").length },
  { id: "直播", label: "直播基地", count: galleryImages.filter(i => i.category === "直播").length },
  { id: "VIP", label: "VIP空间", count: galleryImages.filter(i => ["VIP", "休息", "洽谈"].includes(i.category)).length },
];

export function ShowroomGallery() {
  const [filter, setFilter] = useState("全部");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = filter === "全部" 
    ? galleryImages 
    : filter === "VIP"
    ? galleryImages.filter(img => ["VIP", "休息", "洽谈"].includes(img.category))
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="max-w-7xl mx-auto">
      {/* 过滤器 */}
      <div className="flex justify-center flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`group relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === cat.id 
                ? "bg-white text-black" 
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            {cat.label}
            <span className={`ml-2 text-xs ${filter === cat.id ? "text-black/50" : "text-white/40"}`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* 瀑布流画廊 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Masonry
            breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
            className="flex w-auto -ml-6"
            columnClassName="pl-6 bg-clip-padding"
          >
            {filteredImages.map((img, idx) => (
              <motion.div 
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="mb-6 group relative overflow-hidden rounded-2xl cursor-pointer bg-white/5"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* 悬停遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-white/20 backdrop-blur rounded text-xs text-white/90">
                          {img.floor}
                        </span>
                        <span className="px-2 py-0.5 bg-white/10 backdrop-blur rounded text-xs text-white/70">
                          {img.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-medium text-white mb-1">{img.title}</h4>
                      <p className="text-sm text-white/60 line-clamp-2">{img.desc}</p>
                    </div>
                    
                    {/* 放大按钮 */}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Expand className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </motion.div>
      </AnimatePresence>

      {/* 全屏预览 Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                    {selectedImage.floor}
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                    {selectedImage.category}
                  </span>
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">{selectedImage.title}</h3>
                <p className="text-white/60 max-w-xl mx-auto">{selectedImage.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
