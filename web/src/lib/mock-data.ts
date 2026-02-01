/**
 * 共享模拟数据
 * 用于在后端不可用时提供前端展示数据
 */

import { Demand } from "@/types/demand";

export const MOCK_DEMANDS: Demand[] = [
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
    title: "跨境电商海外仓储服务",
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
  {
    id: "7",
    title: "智能家居语音控制模块",
    description: "采购支持Alexa/Google Home的智能家居语音控制模块，需集成WiFi和蓝牙功能。",
    category: "消费电子",
    region: "全球",
    price_range: "$15,000 - $60,000",
    urgency: "medium",
    quantity: 30000,
    unit: "件",
    source_platform: "CES展会",
    business_value: 80,
    tags: ["智能家居", "语音控制", "IoT"],
    created_at: new Date(Date.now() - 14400000).toISOString(),
    updated_at: new Date(Date.now() - 14400000).toISOString(),
    status: "active",
  },
  {
    id: "8",
    title: "环保包装材料供应",
    description: "寻找可生物降解包装材料供应商，用于食品包装，需符合欧盟食品接触材料标准。",
    category: "包装材料",
    region: "欧洲",
    price_range: "$25,000 - $80,000",
    urgency: "low",
    quantity: 100000,
    unit: "件",
    source_platform: "行业展会",
    business_value: 70,
    tags: ["环保", "包装", "食品级"],
    created_at: new Date(Date.now() - 18000000).toISOString(),
    updated_at: new Date(Date.now() - 18000000).toISOString(),
    status: "active",
  },
  {
    id: "9",
    title: "工业自动化控制系统",
    description: "采购PLC控制系统及相关传感器，用于工厂自动化改造项目。",
    category: "工业设备",
    region: "中国",
    price_range: "$200,000 - $800,000",
    urgency: "high",
    quantity: 50,
    unit: "套",
    source_platform: "工业展会",
    business_value: 92,
    tags: ["自动化", "PLC", "工业4.0"],
    created_at: new Date(Date.now() - 21600000).toISOString(),
    updated_at: new Date(Date.now() - 21600000).toISOString(),
    status: "active",
  },
  {
    id: "10",
    title: "户外运动服装面料",
    description: "采购防水透气功能面料，用于户外运动服装生产，需提供测试报告。",
    category: "服装纺织",
    region: "北美",
    price_range: "$40,000 - $120,000",
    urgency: "medium",
    quantity: 80000,
    unit: "米",
    source_platform: "Outdoor Retailer",
    business_value: 75,
    tags: ["户外", "面料", "功能性"],
    created_at: new Date(Date.now() - 25200000).toISOString(),
    updated_at: new Date(Date.now() - 25200000).toISOString(),
    status: "active",
  },
];

/**
 * 生成更多模拟数据
 * @param count 生成数量
 * @returns 扩展的模拟数据数组
 */
export function generateMockDemands(count: number = 20): Demand[] {
  const categories = ["消费电子", "服装纺织", "工业材料", "新能源", "物流服务", "医疗器械", "包装材料", "工业设备"];
  const regions = ["北美", "欧洲", "亚太", "中国", "全球", "东南亚", "中东", "南美"];
  const urgencies: Demand["urgency"][] = ["low", "medium", "high", "critical"];
  const platforms = ["Amazon", "独立站", "阿里巴巴", "行业展会", "政府采购", "TikTok Shop"];
  
  const baseDemands = [...MOCK_DEMANDS];
  
  for (let i = baseDemands.length + 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const urgency = urgencies[Math.floor(Math.random() * urgencies.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    
    baseDemands.push({
      id: String(i),
      title: `${category}供应商需求 #${i}`,
      description: `寻找${region}地区的${category}供应商，具体要求详谈。`,
      category,
      region,
      price_range: `$${Math.floor(Math.random() * 100) * 1000} - $${Math.floor(Math.random() * 500) * 1000}`,
      urgency,
      quantity: Math.floor(Math.random() * 10000) + 100,
      unit: "件",
      source_platform: platform,
      business_value: Math.floor(Math.random() * 40) + 60,
      tags: [category, region, urgency === "critical" ? "紧急" : "常规"],
      created_at: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 7)).toISOString(),
      updated_at: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
      status: "active",
    });
  }
  
  return baseDemands;
}
