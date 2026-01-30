"use client";

import HeroPage from "@/components/HeroPage";
import { heroPageConfigs } from "@/lib/hero-pages-config";

export default function DemandOSPage() {
  const config = heroPageConfigs["demand-os"];
  return <HeroPage {...config} />;
}
