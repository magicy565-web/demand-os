"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { DemandCard } from "./DemandCard";
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
    description: "需要具备GOTS认证的有机棉婴儿服装生产商，月产能需达到5万件以上。",
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
    title: "工业级3D打印耗材",
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
    title: "新能源汽车充电桩组件",
    description: "寻求新能源汽车直流快充桩核心模块供应商，包括功率模块、控制板等，需通过车规级认证。",
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
    title: "医疗级硅胶制品定制",
    description: "采购医疗级硅胶产品，包括手术器械手柄、导管接头等，需符合FDA和ISO 13485标准。",
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
];

export function DemandWaterfall() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(true);
  const [useMock, setUseMock] = useState(false);

  // 加载初始数据
  useEffect(() => {
    async function loadDemands() {
      setLoading(true);
      try {
        const result = await fetchDemands(1, 20);
        if (result.data.length > 0) {
          setDemands(result.data);
          setUseMock(false);
        } else {
          // 后端无数据时使用模拟数据
          setDemands(MOCK_DEMANDS);
          setUseMock(true);
        }
      } catch (error) {
        console.error("Failed to load demands, using mock data:", error);
        setDemands(MOCK_DEMANDS);
        setUseMock(true);
      }
      setLoading(false);
    }
    loadDemands();
  }, []);

  // WebSocket 实时更新处理
  const handleWebSocketMessage = useCallback(
    (demand: Demand, type: "create" | "update" | "delete") => {
      setDemands((prev) => {
        switch (type) {
          case "create":
            // 新数据插入顶部
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
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* 连接状态指示器 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-cyber-green animate-pulse" : "bg-cyber-red"
            }`}
          />
          <span className="text-sm font-mono text-gray-500">
            {isConnected ? "实时连接" : useMock ? "演示模式" : "离线模式"}
          </span>
          {messageCount > 0 && (
            <span className="text-xs text-cyber-cyan font-mono">
              +{messageCount} 更新
            </span>
          )}
        </div>
        <span className="text-sm text-gray-500 font-mono">
          共 {demands.length} 条需求
        </span>
      </div>

      {/* 瀑布流网格 */}
      <div className="masonry-grid">
        {demands.map((demand, index) => (
          <motion.div
            key={demand.id}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            className="masonry-item card-3d-container"
          >
            <DemandCard demand={demand} />
          </motion.div>
        ))}
      </div>

      {/* 加载更多 */}
      {demands.length > 0 && (
        <div className="flex justify-center mt-12">
          <button className="group relative px-8 py-3 border border-cyber-purple/50 text-cyber-purple font-mono text-sm rounded-lg overflow-hidden transition-all hover:border-cyber-purple">
            <span className="relative z-10">加载更多需求</span>
            <div className="absolute inset-0 bg-cyber-purple/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
          </button>
        </div>
      )}
    </div>
  );
}
