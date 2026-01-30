"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useWebSocket } from "@/hooks/useWebSocket";
import { fetchDemands } from "@/lib/api";
import { Demand } from "@/types/demand";
import { formatRelativeTime, getUrgencyLabel } from "@/lib/utils";

// 模拟数据
const MOCK_DEMANDS: Demand[] = [
  {
    id: "1",
    title: "高端智能手表配件供应商",
    description: "寻找能够提供高质量智能手表表带、充电器和保护壳的供应商，要求具备CE/FCC认证能力。",
    category: "消费电子",
    region: "北美",
    price_range: "$10,000 - $50,000",
    urgency: "high",
    quantity: 10000,
    unit: "件",
    source_platform: "Amazon",
    business_value: 85,
    tags: ["智能穿戴", "配件", "B2B"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: "active",
  },
  {
    id: "2",
    title: "有机棉婴儿服装OEM代工",
    description: "需要具备GOTS认证的有机棉婴儿服装生产商。",
    category: "服装纺织",
    region: "欧洲",
    price_range: "$30,000 - $100,000",
    urgency: "medium",
    quantity: 50000,
    unit: "件",
    source_platform: "独立站",
    business_value: 72,
    tags: ["母婴", "有机", "OEM"],
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
    status: "active",
  },
  {
    id: "3",
    title: "工业级3D打印耗材批量采购",
    description: "采购PLA/ABS/PETG等工业级3D打印耗材。",
    category: "工业材料",
    region: "亚太",
    price_range: "$5,000 - $20,000",
    urgency: "low",
    quantity: 5000,
    unit: "卷",
    source_platform: "阿里巴巴",
    business_value: 65,
    tags: ["3D打印", "工业"],
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 7200000).toISOString(),
    status: "active",
  },
  {
    id: "4",
    title: "新能源汽车直流快充桩组件",
    description: "寻求新能源汽车直流快充桩核心模块供应商。",
    category: "新能源",
    region: "中国",
    price_range: "$100,000 - $500,000",
    urgency: "critical",
    quantity: 1000,
    unit: "套",
    source_platform: "政府采购",
    business_value: 95,
    tags: ["新能源", "充电桩"],
    created_at: new Date(Date.now() - 1800000).toISOString(),
    updated_at: new Date(Date.now() - 1800000).toISOString(),
    status: "active",
  },
  {
    id: "5",
    title: "跨境电商海外仓储服务",
    description: "需要在美西地区的海外仓服务商。",
    category: "物流服务",
    region: "北美",
    price_range: "$20,000 - $80,000/月",
    urgency: "high",
    quantity: 1,
    unit: "服务",
    source_platform: "行业展会",
    business_value: 78,
    tags: ["跨境", "仓储"],
    created_at: new Date(Date.now() - 5400000).toISOString(),
    updated_at: new Date(Date.now() - 5400000).toISOString(),
    status: "active",
  },
  {
    id: "6",
    title: "医疗级硅胶制品定制",
    description: "采购医疗级硅胶产品，需符合FDA标准。",
    category: "医疗器械",
    region: "欧洲",
    price_range: "$50,000 - $200,000",
    urgency: "medium",
    quantity: 20000,
    unit: "件",
    source_platform: "Medica展会",
    business_value: 88,
    tags: ["医疗", "定制"],
    created_at: new Date(Date.now() - 10800000).toISOString(),
    updated_at: new Date(Date.now() - 10800000).toISOString(),
    status: "active",
  },
  {
    id: "7",
    title: "智能家居语音控制模块",
    description: "采购支持Alexa的智能家居语音控制模块。",
    category: "消费电子",
    region: "全球",
    price_range: "$15,000 - $60,000",
    urgency: "medium",
    quantity: 8000,
    unit: "件",
    source_platform: "Amazon",
    business_value: 76,
    tags: ["智能家居", "IoT"],
    created_at: new Date(Date.now() - 14400000).toISOString(),
    updated_at: new Date(Date.now() - 14400000).toISOString(),
    status: "active",
  },
  {
    id: "8",
    title: "户外运动防水透气面料",
    description: "需要防水透气面料，用于户外冲锋衣生产。",
    category: "服装纺织",
    region: "亚太",
    price_range: "$25,000 - $80,000",
    urgency: "high",
    quantity: 30000,
    unit: "米",
    source_platform: "Canton Fair",
    business_value: 82,
    tags: ["户外", "面料"],
    created_at: new Date(Date.now() - 18000000).toISOString(),
    updated_at: new Date(Date.now() - 18000000).toISOString(),
    status: "active",
  },
];

// 紧急度配色
const urgencyConfig = {
  critical: {
    bg: "bg-red-500/20",
    border: "border-red-500",
    text: "text-red-400",
    glow: "shadow-red-500/30",
  },
  high: {
    bg: "bg-cyber-pink/20",
    border: "border-cyber-pink",
    text: "text-cyber-pink",
    glow: "shadow-cyber-pink/30",
  },
  medium: {
    bg: "bg-cyber-yellow/20",
    border: "border-cyber-yellow",
    text: "text-cyber-yellow",
    glow: "shadow-cyber-yellow/30",
  },
  low: {
    bg: "bg-cyber-green/20",
    border: "border-cyber-green",
    text: "text-cyber-green",
    glow: "shadow-cyber-green/30",
  },
};

// 简洁版需求卡片
function DemandCard({ demand, onClick }: { demand: Demand; onClick: () => void }) {
  const config = urgencyConfig[demand.urgency] || urgencyConfig.low;

  return (
    <motion.div
      className={`relative min-w-[320px] max-w-[320px] p-5 rounded-xl bg-cyber-dark/80 border border-gray-800 backdrop-blur-sm cursor-pointer group hover:border-cyber-cyan/50 transition-all duration-300`}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
    >
      {/* 紧急度标签 */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-mono px-2 py-1 rounded-full border ${config.bg} ${config.border} ${config.text}`}>
          {getUrgencyLabel(demand.urgency).label}
        </span>
        <span className="text-xs text-gray-500 font-mono">
          {formatRelativeTime(demand.created_at)}
        </span>
      </div>

      {/* 标题 */}
      <h3 className="text-base font-semibold text-white mb-2 line-clamp-1 group-hover:text-cyber-cyan transition-colors">
        {demand.title}
      </h3>

      {/* 关键信息 - 简洁版 */}
      <div className="flex items-center gap-3 mb-3 text-sm">
        <span className="text-cyber-cyan">{demand.region}</span>
        <span className="text-gray-600">|</span>
        <span className="text-cyber-purple">{demand.category}</span>
      </div>

      {/* 价格 - 突出显示 */}
      <div className="text-lg font-bold text-cyber-green font-mono mb-4">
        {demand.price_range}
      </div>

      {/* 对接按钮 - 突出设计 */}
      <motion.button
        className={`w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${config.bg} ${config.border} border-2 ${config.text} hover:shadow-lg ${config.glow}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          立即对接
        </span>
      </motion.button>

      {/* 商业价值指示器 */}
      <div className="absolute top-5 right-5">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
          demand.business_value >= 80 ? "bg-cyber-green/20 text-cyber-green" :
          demand.business_value >= 60 ? "bg-cyber-cyan/20 text-cyber-cyan" :
          "bg-gray-700 text-gray-400"
        }`}>
          {demand.business_value}
        </div>
      </div>

      {/* 悬浮光效 */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/5 to-cyber-purple/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

// 自动滚动列表
export function DemandScrollList() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 加载数据
  useEffect(() => {
    async function loadDemands() {
      setLoading(true);
      try {
        const result = await fetchDemands(1, 20);
        if (result.data.length > 0) {
          setDemands(result.data);
        } else {
          setDemands(MOCK_DEMANDS);
        }
      } catch (error) {
        console.error("Failed to load demands:", error);
        setDemands(MOCK_DEMANDS);
      }
      setLoading(false);
    }
    loadDemands();
  }, []);

  // WebSocket 实时更新
  const handleWebSocketMessage = useCallback(
    (demand: Demand, type: "create" | "update" | "delete") => {
      setDemands((prev) => {
        switch (type) {
          case "create":
            return [demand, ...prev.slice(0, 19)];
          case "update":
            return prev.map((d) => (d.id === demand.id ? demand : d));
          case "delete":
            return prev.filter((d) => d.id !== demand.id);
          default:
            return prev;
        }
      });
    },
    []
  );

  const { isConnected, messageCount } = useWebSocket({
    onMessage: handleWebSocketMessage,
  });

  // 自动滚动
  useEffect(() => {
    if (!scrollRef.current || isPaused || loading) return;

    const scrollContainer = scrollRef.current;
    let animationId: number;
    const scrollSpeed = 1;

    const scroll = () => {
      if (scrollContainer && !isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        // 无限滚动 - 当滚动到一半时重置
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused, loading, demands]);

  // 点击跳转
  const handleDemandClick = (id: string) => {
    router.push(`/demand/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="loader-cyber" />
      </div>
    );
  }

  // 复制一份数据用于无限滚动
  const duplicatedDemands = [...demands, ...demands];

  return (
    <div className="relative">
      {/* 状态栏 */}
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-cyber-dark/50 rounded-full border border-gray-800">
            <motion.div
              className={`w-2 h-2 rounded-full ${isConnected ? "bg-cyber-green" : "bg-red-500"}`}
              animate={{ scale: isConnected ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-xs font-mono text-gray-400">
              {isConnected ? "实时同步中" : "演示模式"}
            </span>
          </div>
          {messageCount > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-cyber-cyan font-mono"
            >
              +{messageCount} 新需求
            </motion.span>
          )}
        </div>
        
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
            isPaused 
              ? "bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan" 
              : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
          }`}
        >
          {isPaused ? "▶ 继续" : "⏸ 暂停"}
        </button>
      </div>

      {/* 滚动容器 */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* 左侧渐变遮罩 */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cyber-black to-transparent z-10 pointer-events-none" />
        
        {/* 右侧渐变遮罩 */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cyber-black to-transparent z-10 pointer-events-none" />

        {/* 滚动内容 */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden py-4 px-4"
          style={{ scrollBehavior: "auto" }}
        >
          {duplicatedDemands.map((demand, index) => (
            <DemandCard
              key={`${demand.id}-${index}`}
              demand={demand}
              onClick={() => handleDemandClick(demand.id)}
            />
          ))}
        </div>
      </div>

      {/* 底部统计 */}
      <div className="flex items-center justify-center gap-8 mt-6 text-sm text-gray-500 font-mono">
        <span>共 <span className="text-cyber-cyan">{demands.length}</span> 条需求</span>
        <span>鼠标悬停可暂停滚动</span>
      </div>
    </div>
  );
}
