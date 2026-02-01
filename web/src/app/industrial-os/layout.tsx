import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "数智产业园系统 OS | 产业数字化解决方案",
  description: "一站式产业数字化解决方案，助力传统产业园焕然一新。AI驱动的供需匹配、小单快返生产、全链路数据可视化分析。",
  keywords: "产业园区,数字化,供应链,AI匹配,工业4.0",
}

export default function IndustrialOSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
