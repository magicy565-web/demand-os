"use client";

import HeroPage from "@/components/pages/HeroPage";
import { heroPageConfigs } from "@/lib/hero-pages-config";

export default function StrategyConsultingPage() {
  const config = heroPageConfigs["strategy-consulting"];
  return <HeroPage {...config} />;
}
