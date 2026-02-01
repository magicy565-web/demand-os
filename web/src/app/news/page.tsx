"use client";

import HeroPage from "@/components/pages/HeroPage";
import { heroPageConfigs } from "@/lib/hero-pages-config";

export default function NewsPage() {
  const config = heroPageConfigs["news"];
  return <HeroPage {...config} />;
}
