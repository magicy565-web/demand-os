"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Play, Clock, ArrowRight } from "lucide-react";

interface AgendaEvent {
  status: "live" | "upcoming" | "replay";
  date?: string;
  title: string;
  detail: string;
  viewers?: number;
  buttonText: string;
}

export function SourcingAgenda() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const events: AgendaEvent[] = [
    {
      status: "live",
      title: "新能源储能技术专场",
      detail: "50+ 全新SKU | 15家核心供应商",
      viewers: 328,
      buttonText: "进入直播",
    },
    {
      status: "upcoming",
      date: "2月28日",
      title: "智能宠物用品采购会",
      detail: "Top 20 工厂 | 独家首发",
      buttonText: "预约席位",
    },
    {
      status: "upcoming",
      date: "3月5日",
      title: "家居五金系列发布",
      detail: "欧标认证 | 一站式采购",
      buttonText: "预约席位",
    },
    {
      status: "replay",
      date: "已结束",
      title: "户外露营装备展",
      detail: "回放可用 | 完整目录",
      buttonText: "观看回放",
    },
  ];

  const getStatusBadge = (status: AgendaEvent["status"]) => {
    switch (status) {
      case "live":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500 rounded-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse-live" />
            <span className="text-white text-xs font-medium">直播中</span>
          </div>
        );
      case "upcoming":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-sm">
            <Calendar className="w-3 h-3 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-medium">即将开始</span>
          </div>
        );
      case "replay":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-[#0A192F]/10 rounded-sm">
            <Play className="w-3 h-3 text-[#0A192F]/60" />
            <span className="text-[#0A192F]/60 text-xs font-medium">回放</span>
          </div>
        );
    }
  };

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge variant="outline" className="mb-4 border-[#D4AF37]/30 text-[#D4AF37]">
            全球采购日程
          </Badge>
          <h2 className="font-serif text-3xl lg:text-5xl text-[#0A192F] mb-4 chinese-heading">
            不只是一场发布会
          </h2>
          <p className="text-[#0A192F]/60 max-w-2xl mx-auto chinese-text">
            这是一个持续运营的全球采购频道。每周精选行业专场，让您的品牌持续曝光。
          </p>
        </div>

        {/* Agenda List - Bloomberg Style */}
        <div
          className={`border border-[#0A192F]/10 rounded-sm overflow-hidden transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#0A192F] text-white text-sm font-medium">
            <div className="col-span-2">状态</div>
            <div className="col-span-4">活动名称</div>
            <div className="col-span-3">详情</div>
            <div className="col-span-3 text-right">操作</div>
          </div>

          {/* Event Rows */}
          {events.map((event, index) => (
            <div
              key={index}
              className={`grid grid-cols-12 gap-4 px-6 py-5 items-center border-b border-[#0A192F]/5 last:border-b-0 transition-all duration-500 hover:bg-[#F3F4F6]/50 ${
                event.status === "live" ? "bg-red-50/50" : ""
              }`}
              style={{
                transitionDelay: `${index * 100 + 300}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-20px)",
              }}
            >
              {/* Status */}
              <div className="col-span-2 flex items-center gap-3">
                {getStatusBadge(event.status)}
              </div>

              {/* Title */}
              <div className="col-span-4">
                <h3 className="font-medium text-[#0A192F] chinese-text">{event.title}</h3>
                {event.date && event.status !== "live" && (
                  <div className="flex items-center gap-1.5 mt-1 text-[#0A192F]/50 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>{event.date}</span>
                  </div>
                )}
                {event.status === "live" && event.viewers && (
                  <div className="flex items-center gap-1.5 mt-1 text-red-500 text-sm">
                    <Users className="w-3 h-3" />
                    <span>{event.viewers} 人正在观看</span>
                  </div>
                )}
              </div>

              {/* Detail */}
              <div className="col-span-3">
                <p className="text-[#0A192F]/60 text-sm chinese-text">{event.detail}</p>
              </div>

              {/* Action */}
              <div className="col-span-3 flex justify-end">
                <Button
                  size="sm"
                  variant={event.status === "live" ? "default" : "outline"}
                  className={`rounded-sm ${
                    event.status === "live"
                      ? "bg-[#D4AF37] hover:bg-[#C9A227] text-[#0A192F]"
                      : "border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F] hover:text-white"
                  }`}
                >
                  {event.buttonText}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div
          className={`mt-8 text-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[#0A192F]/50 text-sm chinese-text">
            每周更新 3-5 场行业专场直播 · 错过直播可观看回放
          </p>
        </div>
      </div>
    </section>
  );
}
