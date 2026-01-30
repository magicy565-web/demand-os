"use client";

import HeroPage from "@/components/HeroPage";
import { heroPageConfigs } from "@/lib/hero-pages-config";

export default function LogisticsPage() {
  const config = heroPageConfigs["logistics"];
  return <HeroPage {...config} />;
}
