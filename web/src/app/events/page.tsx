"use client";

import HeroPage from "@/components/pages/HeroPage";
import { heroPageConfigs } from "@/lib/hero-pages-config";

export default function EventsPage() {
  const config = heroPageConfigs["events"];
  return <HeroPage {...config} />;
}
