"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Masonry from "react-masonry-css";
import { DemandCardEnhanced } from "./DemandCardEnhanced";
import { useWebSocket } from "@/hooks/useWebSocket";
import { fetchDemands } from "@/lib/api";
import { Demand } from "@/types/demand";
import { LoadingSpinner } from "./LoadingSpinner";

// 模拟数据 - 当后端不可用时使用
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
    title: "有机棉质婴儿服装代工",
    description: "需要具备GOTS认证的有机棉婴儿服装生产商，月产能需达到5万件以上。长期合作，品质优先。",
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
    description: "采购PLA/ABS/PETG等工业级3D打印耗材，要求直径精度±0.02mm，需提供材料测试报告。",
    category: "工业材料",
    region: "亚太",
    price_range: "$5,000 - $20,000",
    urgency: "low",
    quantity: 5000,
    unit: "卷",
    source_platform: "阿里巴巴",
    business_value: 65,
    tags: ["3D打印", "工业", "耗材"],
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 7200000).toISOString(),
    status: "active",
  },
  {
    id: "4",
    title: "新能源汽车直流快充桩组件",
    description: "寻求新能源汽车直流快充桩核心模块供应商，包括功率模块、控制板等，需通过车规级认证。政府项目，付款有保障。",
    category: "新能源",
    region: "中国",
    price_range: "$100,000 - $500,000",
    urgency: "critical",
    quantity: 1000,
    unit: "套",
    source_platform: "政府采购",
    business_value: 95,
    tags: ["新能源", "充电桩", "汽车配件"],
    created_at: new Date(Date.now() - 1800000).toISOString(),
    updated_at: new Date(Date.now() - 1800000).toISOString(),
    status: "active",
  },
  {
    id: "5",
    title: "跨境电商仓储物流服务",
    description: "需要在美西地区的海外仓服务商，支持FBA转运、一件代发，日处理能力3000单以上。",
    category: "物流服务",
    region: "北美",
    price_range: "$20,000 - $80,000/月",
    urgency: "high",
    quantity: 1,
    unit: "服务",
    source_platform: "行业展会",
    business_value: 78,
    tags: ["跨境", "仓储", "物流"],
    created_at: new Date(Date.now() - 5400000).toISOString(),
    updated_at: new Date(Date.now() - 5400000).toISOString(),
    status: "active",
  },
  {
    id: "6",
    title: "医疗级硅胶制品定制加工",
    description: "采购医疗级硅胶产品，包括手术器械手柄、导管接头等，需符合FDA和ISO 13485标准。长期稳定订单。",
    category: "医疗器械",
    region: "欧洲",
    price_range: "$50,000 - $200,000",
    urgency: "medium",
    quantity: 20000,
    unit: "件",
    source_platform: "Medica展会",
    business_value: 88,
    tags: ["医疗", "硅胶", "定制"],
    created_at: new Date(Date.now() - 10800000).toISOString(),
    updated_at: new Date(Date.now() - 10800000).toISOString(),
    status: "active",
  },
  {
    id: "7",
    title: "智能家居语音控制模块",
    description: "采购支持Alexa和Google Assistant的智能家居语音控制模块，需要SDK支持和技术文档。",
    category: "消费电子",
    region: "全球",
    price_range: "$15,000 - $60,000",
    urgency: "medium",
    quantity: 8000,
    unit: "件",
    source_platform: "Amazon",
    business_value: 76,
    tags: ["智能家居", "语音控制", "IoT"],
    created_at: new Date(Date.now() - 14400000).toISOString(),
    updated_at: new Date(Date.now() - 14400000).toISOString(),
    status: "active",
  },
  {
    id: "8",
    title: "户外运动服饰面料供应",
    description: "需要防水透气面料，用于户外冲锋衣生产，要求耐水压10000mm以上，透气性8000g/m²/24h。",
    category: "服装纺织",
    region: "亚太",
    price_range: "$25,000 - $80,000",
    urgency: "high",
    quantity: 30000,
    unit: "米",
    source_platform: "Canton Fair",
    business_value: 82,
    tags: ["户外", "面料", "防水"],
    created_at: new Date(Date.now() - 18000000).toISOString(),
    updated_at: new Date(Date.now() - 18000000).toISOString(),
    status: "active",
  },
];

// 瀑布流断点配置 - 单列竖向瀑布流
const breakpointColumns = {
  default: 1,
  1280: 1,
  1024: 1,
  768: 1,
  640: 1,
};

interface DemandWaterfallEnhancedProps {
  mode?: "cyber" | "corp";
  onDemandCountChange?: (count: number) => void;
  isMobile?: boolean;
}

export function DemandWaterfallEnhanced({ 
  mode = "cyber",
  onDemandCountChange,
  isMobile = false
}: DemandWaterfallEnhancedProps) {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(true);
  const [useMock, setUseMock] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newDemandIds, setNewDemandIds] = useState<Set<string>>(new Set());
  const [isPaused, setIsPaused] = useState(false);

  // 自动滚动功能
  useEffect(() => {
    if (isPaused) return;

    const scrollInterval = setInterval(() => {
      window.scrollBy({
        top: 1,
        behavior: 'smooth'
      });
      
      // 滚动到底部时回到顶部
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  // 加载初始数据
  useEffect(() => {
    async function loadDemands() {
      setLoading(true);
      try {
        const result = await fetchDemands(1, 20);
        if (result.data.length > 0) {
          setDemands(result.data);
          setUseMock(false);
          onDemandCountChange?.(result.data.length);
        } else {
          setDemands(MOCK_DEMANDS);
          setUseMock(true);
          onDemandCountChange?.(MOCK_DEMANDS.length);
        }
      } catch (error) {
        console.error("Failed to load demands, using mock data:", error);
        setDemands(MOCK_DEMANDS);
        setUseMock(true);
        onDemandCountChange?.(MOCK_DEMANDS.length);
      }
      setLoading(false);
    }
    loadDemands();
  }, [onDemandCountChange]);

  // WebSocket 实时更新处理
  const handleWebSocketMessage = useCallback(
    (demand: Demand, type: "create" | "update" | "delete") => {
      setDemands((prev) => {
        switch (type) {
          case "create":
            // 标记新需求
            setNewDemandIds((ids) => new Set(ids).add(demand.id));
            setTimeout(() => {
              setNewDemandIds((ids) => {
                const newIds = new Set(ids);
                newIds.delete(demand.id);
                return newIds;
              });
            }, 5000);
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

  // WebSocket 连接
  const { isConnected, messageCount } = useWebSocket({
    onMessage: handleWebSocketMessage,
    onConnect: () => console.log("WebSocket connected"),
    onDisconnect: () => console.log("WebSocket disconnected"),
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSpinner />
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 连接状态指示器 */}
      <motion.div
        className="flex items-center justify-between mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
            <motion.div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-gray-400"
              }`}
              animate={{
                scale: isConnected ? [1, 1.3, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-sm text-gray-600">
              {isConnected ? "实时连接" : useMock ? "演示模式" : "离线模式"}
            </span>
          </div>
          
          <AnimatePresence>
            {messageCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                className="px-3 py-1 bg-blue-50 rounded-full"
              >
                <span className="text-xs text-blue-600 font-semibold">
                  +{messageCount} 新需求
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            共 {demands.length} 条需求
          </span>
          {isPaused && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
            >
              已暂停
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* 瀑布流网格 - 使用 Masonry */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        <AnimatePresence mode="popLayout">
          {demands.map((demand, index) => (
            <div key={demand.id} className="mb-6">
              <DemandCardEnhanced
                demand={demand}
                index={index}
                isMobile={isMobile}
              />
            </div>
          ))}
        </AnimatePresence>
      </Masonry>

      {/* 加载更多按钮 */}
      {demands.length > 0 && (
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
            加载更多需求
          </button>
        </motion.div>
      )}
    </div>
  );
}
