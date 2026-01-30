"use client";

import HeroPage from "@/components/HeroPage";
import { heroPageConfigs } from "@/lib/hero-pages-config";

export default function CareersPage() {
  const config = heroPageConfigs["careers"];
  return <HeroPage {...config} />;
}
