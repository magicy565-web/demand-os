import type { Metadata } from "next";
import { GlobalNav } from "@/components/GlobalNav";
import { Playfair_Display, Inter } from 'next/font/google'
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '500', '600']
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

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
        <GlobalNav />
        
        {/* 主内容区 */}
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}
