"use client";

import HeroPage from "@/components/HeroPage";
import { heroPageConfigs } from "@/lib/hero-pages-config";

export default function NewsPage() {
  const config = heroPageConfigs["news"];
  return <HeroPage {...config} />;
}
