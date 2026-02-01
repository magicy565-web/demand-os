"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Demand } from "@/types/demand";
import {
  formatRelativeTime,
  formatNumber,
  getUrgencyLabel,
} from "@/lib/utils";
import {
  Package,
  MapPin,
  Tag,
  Star,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

interface DemandCardEnhancedProps {
  demand: Demand;
  index: number;
  isMobile?: boolean;
}

export function DemandCardEnhanced({ demand, index, isMobile = false }: DemandCardEnhancedProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const isNew = Date.now() - new Date(demand.created_at).getTime() < 60000;

  const handleContact = () => {
    const whatsappLink = `https://wa.me/?text=Hi, I'm interested in: ${demand.title}`;
    window.open(whatsappLink, "_blank");
  };

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem("savedDemands") || "[]") as string[];
    if (saved.includes(demand.id)) {
      const updated = saved.filter(id => id !== demand.id);
      localStorage.setItem("savedDemands", JSON.stringify(updated));
      setIsSaved(false);
    } else {
      localStorage.setItem("savedDemands", JSON.stringify([...saved, demand.id]));
      setIsSaved(true);
    }
  };

  const handleViewDetails = () => {
    router.push(`/demand/${demand.id}`);
  };

  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200">
      {/* 头部 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            {isNew && (
              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                新需求
              </span>
            )}
            {demand.urgency === "critical" && (
              <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full">
                紧急
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 leading-relaxed">
            {demand.title}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
            {demand.description}
          </p>
        </div>
      </div>

      {/* 关键信息 */}
      <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{demand.region}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Tag className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{demand.category}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Package className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium">{formatNumber(demand.quantity)} {demand.unit}</span>
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {demand.price_range}
          </div>
        </div>
      </div>

      {/* 标签 */}
      {demand.tags && demand.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {demand.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 text-xs text-gray-600 bg-gray-50 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 按钮组 */}
      <div className="flex gap-2">
        <button
          onClick={handleContact}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>联系供应商</span>
        </button>
        
        <button
          onClick={handleSave}
          className={`px-4 py-2.5 rounded-xl transition-colors ${
            isSaved
              ? "bg-yellow-50 text-yellow-600"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Star className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
        </button>
        
        <button
          onClick={handleViewDetails}
          className="px-4 py-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
      
      {/* 时间戳 */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 text-right">
        {formatRelativeTime(demand.created_at)}
      </div>
    </div>
  );
}
