"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Globe,
  TrendingUp,
  Package,
  Warehouse,
  Award,
  Calendar,
  Newspaper,
  Users,
  Compass,
  ArrowRight,
} from "lucide-react";

export default function McKinseyHero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="section-padding bg-gradient-to-b from-paper via-paper-warm to-paper overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy/5 blur-3xl" />
      </div>

      <div className="container-editorial relative">
        {/* Section Header - McKinsey Style */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-5">
            Industrial Oasis
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy mb-6 leading-tight">
            全球贸易的
            <span className="block text-brand-blue">操作系统</span>
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            实时捕捉需求信号，智能匹配全球产能
          </p>
        </div>

        {/* Bento Grid - McKinsey Professional Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          
          {/* HERO Card (2x2) - Demand-OS */}
          <Link href="/saas-home/demand-os" className="col-span-1 md:col-span-2 row-span-2">
            <div className="h-full bg-navy text-paper p-8 lg:p-10 group hover:bg-navy-light transition-colors duration-500">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 border border-electric-blue/30 bg-electric-blue/10 flex items-center justify-center mb-6 group-hover:bg-electric-blue/20 transition-colors">
                    <Globe className="w-6 h-6 text-electric-blue" />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-paper mb-4">
                    全球贸易的操作系统
                  </h2>
                  <p className="text-base text-paper/70 leading-relaxed">
                    实时需求捕捉与人工智能产能匹配，连接全球供需网络
                  </p>
                </div>

                {/* Abstract Data Visualization */}
                <div className="mt-8">
                  <svg className="w-full h-20 opacity-30" viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg">
                    <line x1="50" y1="40" x2="150" y2="25" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="150" y1="25" x2="250" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="250" y1="50" x2="350" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                    <circle cx="50" cy="40" r="4" fill="currentColor" />
                    <circle cx="150" cy="25" r="4" fill="currentColor" />
                    <circle cx="250" cy="50" r="4" fill="currentColor" />
                    <circle cx="350" cy="30" r="4" fill="currentColor" />
                  </svg>
                </div>

                <div className="flex items-center gap-2 text-electric-blue font-medium group-hover:gap-3 transition-all pt-4">
                  <span className="text-sm">了解 Demand-OS</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Strategy Card (1x2 vertical) */}
          <Link href="/strategy-consulting" className="col-span-1 row-span-2">
            <div className="h-full bg-paper p-6 lg:p-8 group hover:bg-paper-warm transition-colors duration-500 border-l border-border">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 border border-navy/20 bg-navy/5 flex items-center justify-center mb-5 group-hover:bg-navy/10 transition-colors">
                    <Compass className="w-5 h-5 text-navy" />
                  </div>
                  <h3 className="text-xl font-serif text-navy mb-3">
                    战略咨询
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    企业海外规划与市场进入策略，专属顾问团队护航
                  </p>
                </div>
                <div className="flex items-center gap-2 text-brand-blue font-medium group-hover:gap-3 transition-all pt-6">
                  <span className="text-sm">探索服务</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* TikTok Alliance Card (2x1) */}
          <Link href="/tiktok-alliance" className="col-span-1 md:col-span-2">
            <div className="h-full bg-paper p-6 lg:p-7 group hover:bg-paper-warm transition-colors duration-500 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 border border-success/20 bg-success/10 flex items-center justify-center flex-shrink-0 group-hover:bg-success/20 transition-colors">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-serif text-navy">
                    孕育下一个畅销书
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    TikTok 产业联盟
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-brand-blue transition-colors" />
            </div>
          </Link>

          {/* Showrooms Card (1x1) */}
          <Link href="/showrooms" className="col-span-1">
            <div className="h-full bg-paper p-5 lg:p-6 group hover:bg-paper-warm transition-colors duration-500">
              <div className="h-full flex flex-col justify-between">
                <div className="w-11 h-11 border border-accent-purple/20 bg-accent-purple/10 flex items-center justify-center group-hover:bg-accent-purple/20 transition-colors">
                  <Package className="w-5 h-5 text-accent-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-navy">海外展厅</h3>
                  <p className="text-xs text-muted-foreground mt-1">美国 • 英国</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Logistics Card (1x1) */}
          <Link href="/logistics" className="col-span-1">
            <div className="h-full bg-paper p-5 lg:p-6 group hover:bg-paper-warm transition-colors duration-500">
              <div className="h-full flex flex-col justify-between">
                <div className="w-11 h-11 border border-amber/20 bg-amber/10 flex items-center justify-center group-hover:bg-amber/20 transition-colors">
                  <Warehouse className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-navy">全球物流</h3>
                  <p className="text-xs text-muted-foreground mt-1">智能仓储网络</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Membership Card (1x1) */}
          <Link href="/membership" className="col-span-1">
            <div className="h-full bg-navy text-paper p-5 lg:p-6 group hover:bg-navy-light transition-colors duration-500">
              <div className="h-full flex flex-col justify-between">
                <div className="w-11 h-11 border border-gold/30 bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Award className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-paper">会员俱乐部</h3>
                  <p className="text-xs text-paper/60 mt-1">精英企业网络</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Quick Links Row */}
          <Link href="/events" className="col-span-1">
            <div className="h-full bg-paper-warm p-5 group hover:bg-paper transition-colors duration-300 flex items-center gap-4">
              <div className="w-10 h-10 border border-border bg-paper flex items-center justify-center group-hover:border-brand-blue transition-colors">
                <Calendar className="w-5 h-5 text-muted-foreground group-hover:text-brand-blue transition-colors" />
              </div>
              <span className="text-sm font-medium text-navy">活动</span>
            </div>
          </Link>

          <Link href="/news" className="col-span-1">
            <div className="h-full bg-paper-warm p-5 group hover:bg-paper transition-colors duration-300 flex items-center gap-4">
              <div className="w-10 h-10 border border-border bg-paper flex items-center justify-center group-hover:border-brand-blue transition-colors">
                <Newspaper className="w-5 h-5 text-muted-foreground group-hover:text-brand-blue transition-colors" />
              </div>
              <span className="text-sm font-medium text-navy">新闻</span>
            </div>
          </Link>

          <Link href="/careers" className="col-span-1">
            <div className="h-full bg-paper-warm p-5 group hover:bg-paper transition-colors duration-300 flex items-center gap-4">
              <div className="w-10 h-10 border border-border bg-paper flex items-center justify-center group-hover:border-brand-blue transition-colors">
                <Users className="w-5 h-5 text-muted-foreground group-hover:text-brand-blue transition-colors" />
              </div>
              <span className="text-sm font-medium text-navy">人才</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
