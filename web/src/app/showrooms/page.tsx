"use client";

import HeroPage from "@/components/pages/HeroPage";
import { heroPageConfigs } from "@/lib/hero-pages-config";
import { FloorGuide } from "@/components/showroom/FloorGuide";
import { ShowroomCases } from "@/components/showroom/ShowroomCases";
import { ShowroomGallery } from "@/components/showroom/ShowroomGallery";
import { ThreeErrorBoundary } from "@/components/three-error-boundary";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { Floor, Zone } from "@/lib/floor-data";

// Dynamically import the Building3D component (client-side only)
const Building3D = dynamic(() => import("@/components/building-3d").then(mod => ({ default: mod.Building3D })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-zinc-900/50 rounded-xl">
      <div className="text-white/60">加载3D展厅...</div>
    </div>
  ),
});

const BookingPanel = dynamic(() => import("@/components/booking-panel").then(mod => ({ default: mod.BookingPanel })), {
  ssr: false,
});

export default function ShowroomsPage() {
  const config = heroPageConfigs["showrooms"];
  
  // State for 3D booking interaction
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedFloorData, setSelectedFloorData] = useState<Floor | null>(null);

  const handleFloorSelect = (floorId: number | null) => {
    setSelectedFloor(floorId);
    setSelectedZone(null);
  };

  const handleZoneSelect = (zone: Zone | null, floor: Floor) => {
    setSelectedZone(zone);
    setSelectedFloorData(floor);
  };

  // Override the config for this specific page to use the new banner
  // and ensure the title/subtitle matches the user's intent if needed.
  const updatedConfig = {
    ...config,
    backgroundImage: "/images/showroom banner/建筑效果图（夜）.png",
    // We can also override showScrollIndicator if we want to handle it manually,
    // but HeroPage's default is likely fine.
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      {/* Hero Section */}
      <section className="relative z-10">
        <HeroPage {...updatedConfig} />
      </section>

      {/* Content Sections */}
      <div className="relative z-20 bg-black">
        
        {/* 1. Interactive 3D Booking (V0 Component) */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto mb-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-light mb-4 text-white"
            >
              交互式空间预订
            </motion.h2>
            <p className="text-white/60 max-w-2xl mx-auto font-light">
              体验3D可视化展厅预订系统，实时查看空间状态
            </p>
          </div>
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-6 items-stretch">
              <div className="bg-black/40 rounded-2xl overflow-hidden border border-white/10 h-[700px]">
                <ThreeErrorBoundary>
                  <Building3D
                    selectedFloor={selectedFloor}
                    selectedZone={selectedZone}
                    onFloorSelect={handleFloorSelect}
                    onZoneSelect={handleZoneSelect}
                  />
                </ThreeErrorBoundary>
              </div>
              <div className="bg-black/40 rounded-2xl overflow-hidden border border-white/10 h-[700px] min-h-[700px]">
                <BookingPanel
                  selectedFloor={selectedFloor}
                  selectedZone={selectedZone}
                  selectedFloorData={selectedFloorData}
                  onFloorSelect={handleFloorSelect}
                  onZoneSelect={handleZoneSelect}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Floor Guide (Structure) */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto mb-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-light mb-4 text-white"
            >
              空间规划
            </motion.h2>
            <p className="text-white/60 max-w-2xl mx-auto font-light">
              6层垂直产业空间，打造全产业链选品中心
            </p>
          </div>
          <FloorGuide />
        </section>

        {/* 3. Gallery (Visuals) */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto mb-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-light mb-4 text-white"
            >
              场景展示
            </motion.h2>
            <p className="text-white/60 max-w-2xl mx-auto font-light">
              现代化展陈空间，满足多样化展示需求
            </p>
          </div>
          <ShowroomGallery />
        </section>

        {/* 4. Cases (Industrial Context) */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto mb-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-light mb-4 text-white"
            >
              产业带布局
            </motion.h2>
            <p className="text-white/60 max-w-2xl mx-auto font-light">
              汇聚全国优质产业带资源
            </p>
          </div>
          <ShowroomCases />
        </section>

      </div>
    </main>
  );
}
