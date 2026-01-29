"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Demand } from "@/types/demand";
import { formatRelativeTime, formatNumber, getUrgencyLabel } from "@/lib/utils";

// 模拟获取需求详情
async function getDemandById(id: string): Promise<Demand | null> {
  // 实际项目中这里调用 API
  const MOCK_DEMANDS: Record<string, Demand> = {
    "1": {
      id: "1",
      title: "高端智能手表配件供应商",
      description: "寻找能够提供高质量智能手表表带、充电器和保护壳的供应商，要求具备CE/FCC认证能力。我们是一家跨境电商公司，在Amazon北美站有稳定的销售渠道，月销量超过10万件。现寻求长期合作的供应商，要求：\n\n1. 具备完整的质量管理体系\n2. 能够提供CE/FCC等认证文件\n3. 月产能不低于10万件\n4. 支持OEM/ODM定制\n5. 有跨境电商供货经验优先",
      category: "消费电子",
      region: "北美",
      price_range: "$10,000 - $50,000",
      urgency: "high",
      quantity: 10000,
      unit: "件",
      source_platform: "Amazon",
      business_value: 85,
      tags: ["智能穿戴", "配件", "B2B", "OEM", "跨境电商"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: "active",
    },
    "2": {
      id: "2",
      title: "有机棉婴儿服装OEM代工",
      description: "需要具备GOTS认证的有机棉婴儿服装生产商，月产能需达到5万件以上。我们是欧洲婴童服装品牌，主打环保有机概念，现寻求中国优质代工厂合作。",
      category: "服装纺织",
      region: "欧洲",
      price_range: "$30,000 - $100,000",
      urgency: "medium",
      quantity: 50000,
      unit: "件",
      source_platform: "独立站",
      business_value: 72,
      tags: ["母婴", "有机", "OEM", "GOTS认证"],
      created_at: new Date(Date.now() - 3600000).toISOString(),
      updated_at: new Date(Date.now() - 3600000).toISOString(),
      status: "active",
    },
    "3": {
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
    "4": {
      id: "4",
      title: "新能源汽车直流快充桩组件",
      description: "寻求新能源汽车直流快充桩核心模块供应商，包括功率模块、控制板等，需通过车规级认证。这是政府新能源基础设施建设项目，付款有保障，需求量大且稳定。",
      category: "新能源",
      region: "中国",
      price_range: "$100,000 - $500,000",
      urgency: "critical",
      quantity: 1000,
      unit: "套",
      source_platform: "政府采购",
      business_value: 95,
      tags: ["新能源", "充电桩", "汽车配件", "政府项目"],
      created_at: new Date(Date.now() - 1800000).toISOString(),
      updated_at: new Date(Date.now() - 1800000).toISOString(),
      status: "active",
    },
    "5": {
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
      tags: ["跨境", "仓储", "物流", "FBA"],
      created_at: new Date(Date.now() - 5400000).toISOString(),
      updated_at: new Date(Date.now() - 5400000).toISOString(),
      status: "active",
    },
    "6": {
      id: "6",
      title: "医疗级硅胶制品定制",
      description: "采购医疗级硅胶产品，包括手术器械手柄、导管接头等，需符合FDA和ISO 13485标准。长期稳定订单。",
      category: "医疗器械",
      region: "欧洲",
      price_range: "$50,000 - $200,000",
      urgency: "medium",
      quantity: 20000,
      unit: "件",
      source_platform: "Medica展会",
      business_value: 88,
      tags: ["医疗", "硅胶", "定制", "FDA"],
      created_at: new Date(Date.now() - 10800000).toISOString(),
      updated_at: new Date(Date.now() - 10800000).toISOString(),
      status: "active",
    },
    "7": {
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
    "8": {
      id: "8",
      title: "户外运动防水透气面料",
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
  };

  return MOCK_DEMANDS[id] || null;
}

// 紧急度配置
const urgencyConfig = {
  critical: {
    bg: "bg-red-500/20",
    border: "border-red-500",
    text: "text-red-400",
    label: "紧急",
  },
  high: {
    bg: "bg-cyber-pink/20",
    border: "border-cyber-pink",
    text: "text-cyber-pink",
    label: "较急",
  },
  medium: {
    bg: "bg-cyber-yellow/20",
    border: "border-cyber-yellow",
    text: "text-cyber-yellow",
    label: "一般",
  },
  low: {
    bg: "bg-cyber-green/20",
    border: "border-cyber-green",
    text: "text-cyber-green",
    label: "不急",
  },
};

export default function DemandDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [demand, setDemand] = useState<Demand | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    async function loadDemand() {
      const resolvedParams = await params;
      const data = await getDemandById(resolvedParams.id);
      setDemand(data);
      setLoading(false);
    }
    loadDemand();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <div className="loader-cyber" />
      </div>
    );
  }

  if (!demand) {
    return (
      <div className="min-h-screen bg-cyber-black flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl text-white font-cyber">需求不存在</h1>
        <Link href="/" className="text-cyber-cyan hover:underline">
          返回首页
        </Link>
      </div>
    );
  }

  const config = urgencyConfig[demand.urgency] || urgencyConfig.low;

  return (
    <div className="min-h-screen bg-cyber-black">
      {/* 背景效果 */}
      <div className="fixed inset-0 cyber-grid-animated opacity-30 pointer-events-none" />
      
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 bg-cyber-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-cyber-cyan hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-mono text-sm">返回需求列表</span>
          </Link>
          <div className="text-sm font-mono text-gray-500">
            需求 ID: {demand.id}
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* 状态标签 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className={`px-3 py-1.5 rounded-full text-sm font-mono border ${config.bg} ${config.border} ${config.text}`}>
              {getUrgencyLabel(demand.urgency)}
            </span>
            <span className="text-gray-500 font-mono text-sm">
              发布于 {formatRelativeTime(demand.created_at)}
            </span>
            <span className="text-gray-500 font-mono text-sm">
              来源: {demand.source_platform}
            </span>
          </motion.div>

          {/* 标题 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6 font-cyber"
          >
            {demand.title}
          </motion.h1>

          {/* 关键指标 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-cyber-dark/50 rounded-xl p-4 border border-gray-800">
              <div className="text-xs text-gray-500 mb-1 font-mono">预算范围</div>
              <div className="text-xl font-bold text-cyber-green font-mono">{demand.price_range}</div>
            </div>
            <div className="bg-cyber-dark/50 rounded-xl p-4 border border-gray-800">
              <div className="text-xs text-gray-500 mb-1 font-mono">采购数量</div>
              <div className="text-xl font-bold text-cyber-cyan font-mono">
                {formatNumber(demand.quantity)} {demand.unit}
              </div>
            </div>
            <div className="bg-cyber-dark/50 rounded-xl p-4 border border-gray-800">
              <div className="text-xs text-gray-500 mb-1 font-mono">目标地区</div>
              <div className="text-xl font-bold text-cyber-purple font-mono">{demand.region}</div>
            </div>
            <div className="bg-cyber-dark/50 rounded-xl p-4 border border-gray-800">
              <div className="text-xs text-gray-500 mb-1 font-mono">商业价值</div>
              <div className="text-xl font-bold text-white font-mono flex items-center gap-2">
                {demand.business_value}
                <span className="text-xs text-gray-500">/ 100</span>
              </div>
            </div>
          </motion.div>

          {/* 标签 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {demand.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-cyber-purple/10 border border-cyber-purple/30 rounded-full text-sm text-cyber-purple font-mono"
              >
                #{tag}
              </span>
            ))}
          </motion.div>

          {/* 详细描述 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-cyber-dark/50 rounded-xl p-6 border border-gray-800 mb-8"
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-cyber-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              需求详情
            </h2>
            <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
              {demand.description}
            </div>
          </motion.div>

          {/* 对接按钮区 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={() => setShowContactForm(true)}
              className={`flex-1 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 border-2 ${config.border} ${config.bg} ${config.text} hover:shadow-lg hover:shadow-${demand.urgency === 'critical' ? 'red' : demand.urgency === 'high' ? 'pink' : 'cyan'}-500/30`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                立即对接此需求
              </span>
            </motion.button>
            
            <motion.button
              className="flex-1 py-4 px-8 rounded-xl font-semibold text-lg bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-gray-600 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                收藏需求
              </span>
            </motion.button>
          </motion.div>

          {/* 提示信息 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-4 bg-cyber-cyan/5 border border-cyber-cyan/20 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-cyber-cyan mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-gray-400">
                <p className="text-cyber-cyan font-semibold mb-1">温馨提示</p>
                <p>对接需求后，系统将自动发送您的企业资料给需求方。请确保您的企业资料完整、准确，以提高对接成功率。</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* 联系表单弹窗 */}
      {showContactForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowContactForm(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-cyber-dark border border-gray-800 rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-cyber-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              提交对接申请
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">联系人姓名</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-cyber-black border border-gray-700 rounded-lg text-white focus:border-cyber-cyan focus:outline-none transition-colors"
                  placeholder="请输入您的姓名"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">联系电话</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-cyber-black border border-gray-700 rounded-lg text-white focus:border-cyber-cyan focus:outline-none transition-colors"
                  placeholder="请输入您的电话"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">公司名称</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-cyber-black border border-gray-700 rounded-lg text-white focus:border-cyber-cyan focus:outline-none transition-colors"
                  placeholder="请输入公司名称"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">留言 (可选)</label>
                <textarea
                  className="w-full px-4 py-3 bg-cyber-black border border-gray-700 rounded-lg text-white focus:border-cyber-cyan focus:outline-none transition-colors resize-none"
                  rows={3}
                  placeholder="简要说明您的供货能力..."
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 py-3 px-4 rounded-lg bg-gray-800 text-gray-300 font-semibold hover:bg-gray-700 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-lg bg-cyber-cyan text-cyber-black font-semibold hover:bg-cyber-cyan/90 transition-colors"
                >
                  提交申请
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
