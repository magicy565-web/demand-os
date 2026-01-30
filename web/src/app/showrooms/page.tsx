"use client";

import HeroPage from "@/components/HeroPage";
import { heroPageConfigs } from "@/lib/hero-pages-config";
import { FloorGuide } from "@/components/showroom/FloorGuide";
import { ShowroomCases } from "@/components/showroom/ShowroomCases";
import { ShowroomGallery } from "@/components/showroom/ShowroomGallery";
import { motion } from "framer-motion";

export default function ShowroomsPage() {
  const config = heroPageConfigs["showrooms"];

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
        
        {/* 1. Floor Guide (Structure) */}
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

        {/* 2. Gallery (Visuals) */}
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

        {/* 3. Cases (Industrial Context) */}
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
