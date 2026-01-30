"use client";

import HeroPage from "@/components/HeroPage";
import { heroPageConfigs } from "@/lib/hero-pages-config";

export default function TikTokAlliancePage() {
  const config = heroPageConfigs["tiktok-alliance"];
  return <HeroPage {...config} />;
}
