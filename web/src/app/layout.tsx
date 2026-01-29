import type { Metadata } from "next";
import { ModeSwitch } from "@/components/ModeSwitch";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demand OS | 工业绿洲 - 全球需求实时对接",
  description: "AI 驱动的全球需求实时对接系统，连接全球电商平台的实时需求信号",
  keywords: ["Demand OS", "工业绿洲", "AI", "全球需求", "实时对接", "电商"],
  authors: [{ name: "Demand OS Team" }],
  openGraph: {
    title: "Demand OS | 工业绿洲",
    description: "AI 驱动的全球需求实时对接系统",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen">
        {/* 全局模式切换导航 */}
        <ModeSwitch />
        
        {/* 主内容区 */}
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}
