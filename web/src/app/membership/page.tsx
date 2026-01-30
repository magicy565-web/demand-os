"use client";

import HeroPage from "@/components/HeroPage";
import { heroPageConfigs } from "@/lib/hero-pages-config";

export default function MembershipPage() {
  const config = heroPageConfigs["membership"];
  return <HeroPage {...config} />;
}
