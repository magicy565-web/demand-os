"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Demand, MatchedSupplier, Certification } from "@/types/demand";
import { formatRelativeTime, formatNumber } from "@/lib/utils";

// 模拟获取需求详情（包含专业贸易字段）
async function getDemandById(id: string): Promise<Demand | null> {
  const MOCK_DEMANDS: Record<string, Demand> = {
    "1": {
      id: "1",
      title: "TWS蓝牙耳机OEM订单 - Amazon VC",
      description: "【Amazon Vendor Central】TWS蓝牙耳机OEM订单。贸易条款: FOB Shenzhen，付款方式: T/T 30/70。认证要求: CE/FCC/RoHS/REACH。交期21天，MOQ 5000 PCS。通过审核后预计年采购量 30万USD。",
      category: "消费电子",
      region: "北美",
      price_range: "$8.50 - $12.00",
      urgency: "high",
      quantity: 20000,
      unit: "PCS",
      source_platform: "Amazon Vendor Central",
      business_value: 85,
      tags: ["消费电子", "FOB", "品牌直采", "高利润"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: "active",
      incoterm: "FOB",
      incoterm_location: "FOB Shenzhen",
      payment_term: "T/T 30/70",
      certifications_required: ["CE", "FCC", "RoHS", "REACH"] as Certification[],
      moq: 5000,
      moq_unit: "PCS",
      lead_time_days: 21,
      sample_required: true,
      buyer_type: "retailer",
      buyer_region: "美国",
      profit_estimate: {
        target_price_usd: 10.25,
        suggested_cost_cny: 45,
        estimated_margin: 22.5,
        exchange_rate: 7.25,
        shipping_cost_estimate: 1.2,
        certification_cost: 0.3
      },
      matched_suppliers: [
        {
          supplier_id: "s1",
          supplier_name: "深圳市华声电子有限公司",
          match_score: 95,
          match_reasons: ["认证齐全", "产能充足", "有Amazon供货经验"],
          capacity_available: true,
          certifications_matched: ["CE", "FCC", "RoHS"] as Certification[],
          estimated_quote: 44
        },
        {
          supplier_id: "s2",
          supplier_name: "东莞市声科电子科技有限公司",
          match_score: 88,
          match_reasons: ["价格优势", "交期快", "产能充足"],
          capacity_available: true,
          certifications_matched: ["CE", "FCC"] as Certification[],
          estimated_quote: 42
        },
        {
          supplier_id: "s3",
          supplier_name: "惠州市创音科技有限公司",
          match_score: 82,
          match_reasons: ["品质稳定", "有大客户经验"],
          capacity_available: true,
          certifications_matched: ["CE", "FCC", "RoHS", "REACH"] as Certification[],
          estimated_quote: 48
        }
      ]
    },
    "2": {
      id: "2",
      title: "有机棉T恤代工 - Walmart DSV",
      description: "【Walmart DSV】有机棉T恤代工需求。贸易条款: DDP Los Angeles，付款方式: OA 60 days。认证要求: GOTS/OEKO-TEX/BSCI。交期30天，MOQ 10000 PCS。通过审核后预计年采购量 50万件。",
      category: "服装纺织",
      region: "北美",
      price_range: "$4.50 - $6.00",
      urgency: "medium",
      quantity: 50000,
      unit: "PCS",
      source_platform: "Walmart DSV",
      business_value: 78,
      tags: ["服装纺织", "DDP", "零售商", "标准利润"],
      created_at: new Date(Date.now() - 3600000).toISOString(),
      updated_at: new Date(Date.now() - 3600000).toISOString(),
      status: "active",
      incoterm: "DDP",
      incoterm_location: "DDP Los Angeles",
      payment_term: "OA 60 days",
      certifications_required: ["GOTS", "OEKO-TEX", "BSCI"] as Certification[],
      moq: 10000,
      moq_unit: "PCS",
      lead_time_days: 30,
      sample_required: true,
      buyer_type: "retailer",
      buyer_region: "美国",
      profit_estimate: {
        target_price_usd: 5.25,
        suggested_cost_cny: 22,
        estimated_margin: 15.8,
        exchange_rate: 7.25,
        shipping_cost_estimate: 0.8,
        certification_cost: 0.2
      }
    }
  };
  return MOCK_DEMANDS[id] || null;
}

// 紧急度配置
const URGENCY_CONFIG = {
  critical: { label: "特急", color: "text-red-400", bg: "bg-red-500/15", border: "border-red-500/30" },
  high: { label: "紧急", color: "text-orange-400", bg: "bg-orange-500/15", border: "border-orange-500/30" },
  medium: { label: "中等", color: "text-yellow-400", bg: "bg-yellow-500/15", border: "border-yellow-500/30" },
  low: { label: "一般", color: "text-green-400", bg: "bg-green-500/15", border: "border-green-500/30" },
};

// 信息卡片组件
function InfoCard({ label, value, subValue, highlight = false }: { 
  label: string; 
  value: string | number; 
  subValue?: string;
  highlight?: boolean;
}) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className={`stat-value text-xl ${highlight ? "text-green-400" : ""}`}>{value}</div>
      {subValue && <div className="text-xs text-gray-500 mt-1">{subValue}</div>}
    </div>
  );
}

// 匹配供应商卡片
function SupplierCard({ supplier, rank }: { supplier: MatchedSupplier; rank: number }) {
  const scoreColor = supplier.match_score >= 90 ? "text-green-400" : 
                     supplier.match_score >= 80 ? "text-yellow-400" : "text-gray-400";
  
  return (
    <div className="card-professional p-4 hover:border-blue-500/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            {rank}
          </div>
          <div>
            <div className="font-medium text-white">{supplier.supplier_name}</div>
            <div className="text-xs text-gray-500">
              {supplier.capacity_available ? "✅ 产能可用" : "⚠️ 产能紧张"}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-xl font-bold font-mono ${scoreColor}`}>
            {supplier.match_score}
          </div>
          <div className="text-xs text-gray-500">匹配分</div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1.5 mb-3">
        {supplier.match_reasons.map((reason, i) => (
          <span key={i} className="tag tag-green text-xs">{reason}</span>
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-[#21262d]">
        <div>
          <span className="text-xs text-gray-500">已匹配认证: </span>
          <span className="text-sm text-gray-300">
            {supplier.certifications_matched.join(" / ")}
          </span>
        </div>
        {supplier.estimated_quote && (
          <div className="text-right">
            <div className="text-lg font-bold font-mono text-blue-400">
              ¥{supplier.estimated_quote}
            </div>
            <div className="text-xs text-gray-500">预估报价</div>
          </div>
        )}
      </div>
      
      <div className="mt-3 flex gap-2">
        <button className="btn-primary flex-1 text-sm py-2">发起询价</button>
        <button className="btn-secondary flex-1 text-sm py-2">查看详情</button>
      </div>
    </div>
  );
}

export default function DemandDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [demand, setDemand] = useState<Demand | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"detail" | "suppliers" | "cost">("detail");

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
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="loader" />
      </div>
    );
  }

  if (!demand) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl text-white">需求不存在</h1>
        <Link href="/" className="btn-primary">返回首页</Link>
      </div>
    );
  }

  const urgencyConfig = URGENCY_CONFIG[demand.urgency] || URGENCY_CONFIG.low;
  const profitMargin = demand.profit_estimate?.estimated_margin || 0;

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* 顶部导航 */}
      <nav className="navbar">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm">返回列表</span>
          </Link>
          <div className="h-4 w-px bg-[#30363d]" />
          <span className="text-sm text-gray-500 font-mono">ID: {demand.id}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`tag ${urgencyConfig.bg} ${urgencyConfig.color} ${urgencyConfig.border}`}>
            {urgencyConfig.label}
          </span>
          <span className="status-indicator status-active" />
          <span className="text-sm text-gray-400">实时更新</span>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* 标题区 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="tag tag-blue">{demand.source_platform}</span>
            <span className="text-gray-500">·</span>
            <span className="text-sm text-gray-400">{formatRelativeTime(demand.created_at)}</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">{demand.title}</h1>
          <div className="flex flex-wrap gap-2">
            {demand.tags?.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* 关键指标 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          <InfoCard label="目标单价" value={demand.price_range} />
          <InfoCard label="采购数量" value={`${formatNumber(demand.quantity)} ${demand.unit}`} />
          <InfoCard label="目标市场" value={demand.region} />
          <InfoCard label="贸易条款" value={demand.incoterm_location || "待确认"} />
          <InfoCard label="付款方式" value={demand.payment_term || "待确认"} />
          <InfoCard 
            label="预估毛利" 
            value={`${profitMargin}%`} 
            highlight={profitMargin >= 18}
            subValue={profitMargin >= 18 ? "高利润" : profitMargin >= 12 ? "标准" : "低利润"}
          />
        </div>

        {/* Tab 导航 */}
        <div className="flex gap-1 mb-4 border-b border-[#21262d]">
          {[
            { key: "detail", label: "需求详情" },
            { key: "suppliers", label: `匹配工厂 (${demand.matched_suppliers?.length || 0})` },
            { key: "cost", label: "成本核算" }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key 
                  ? "border-blue-500 text-white" 
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 内容 */}
        {activeTab === "detail" && (
          <div className="space-y-6">
            {/* 需求描述 */}
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">📋 需求描述</div>
              </div>
              <div className="panel-body">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {demand.description}
                </p>
              </div>
            </div>

            {/* 贸易条款 */}
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">📦 贸易条款</div>
              </div>
              <div className="panel-body">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Incoterm</div>
                    <div className="font-medium text-white">{demand.incoterm_location || "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">付款方式</div>
                    <div className="font-medium text-white">{demand.payment_term || "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">MOQ</div>
                    <div className="font-medium text-white">{demand.moq ? `${formatNumber(demand.moq)} ${demand.moq_unit}` : "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">交期要求</div>
                    <div className="font-medium text-white">{demand.lead_time_days ? `${demand.lead_time_days} 天` : "-"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 认证要求 */}
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">🏅 认证要求</div>
              </div>
              <div className="panel-body">
                <div className="flex flex-wrap gap-2">
                  {demand.certifications_required?.map((cert, i) => (
                    <span key={i} className="tag tag-blue">{cert}</span>
                  )) || <span className="text-gray-500">无特殊认证要求</span>}
                </div>
                {demand.sample_required && (
                  <div className="mt-4 pt-4 border-t border-[#21262d]">
                    <span className="tag tag-orange">⚠️ 需要提供样品</span>
                  </div>
                )}
              </div>
            </div>

            {/* 采购商信息 */}
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">🏢 采购商信息</div>
              </div>
              <div className="panel-body">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">买家类型</div>
                    <div className="font-medium text-white">
                      {demand.buyer_type === "brand" ? "品牌商" :
                       demand.buyer_type === "retailer" ? "零售商" :
                       demand.buyer_type === "platform" ? "平台" :
                       demand.buyer_type === "wholesaler" ? "批发商" : "其他"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">买家地区</div>
                    <div className="font-medium text-white">{demand.buyer_region || "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">来源渠道</div>
                    <div className="font-medium text-white">{demand.source_platform}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "suppliers" && (
          <div className="space-y-4">
            {demand.matched_suppliers && demand.matched_suppliers.length > 0 ? (
              <>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400">
                    <span className="text-xl">✅</span>
                    <span className="font-medium">
                      系统已为您匹配到 {demand.matched_suppliers.length} 家园区工厂
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    以下工厂均已通过资质审核，产能和认证满足此订单要求
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {demand.matched_suppliers.map((supplier, index) => (
                    <SupplierCard key={supplier.supplier_id} supplier={supplier} rank={index + 1} />
                  ))}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <div className="empty-state-title">暂无匹配工厂</div>
                <div className="empty-state-description">
                  系统正在为您寻找合适的供应商，请稍后查看
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "cost" && demand.profit_estimate && (
          <div className="space-y-6">
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">💰 利润核算</div>
              </div>
              <div className="panel-body">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">目标单价 (USD)</div>
                    <div className="text-2xl font-bold font-mono text-blue-400">
                      ${demand.profit_estimate.target_price_usd.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">建议出厂价 (CNY)</div>
                    <div className="text-2xl font-bold font-mono text-white">
                      ¥{demand.profit_estimate.suggested_cost_cny.toFixed(0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">预估毛利率</div>
                    <div className={`text-2xl font-bold font-mono ${
                      demand.profit_estimate.estimated_margin >= 18 ? "profit-positive" : 
                      demand.profit_estimate.estimated_margin >= 12 ? "text-yellow-400" : "profit-negative"
                    }`}>
                      {demand.profit_estimate.estimated_margin}%
                    </div>
                  </div>
                </div>
                
                <div className="divider" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">当前汇率</div>
                    <div className="font-mono text-white">1 USD = {demand.profit_estimate.exchange_rate} CNY</div>
                  </div>
                  <div>
                    <div className="text-gray-500">预估运费</div>
                    <div className="font-mono text-white">${demand.profit_estimate.shipping_cost_estimate}/件</div>
                  </div>
                  <div>
                    <div className="text-gray-500">认证成本</div>
                    <div className="font-mono text-white">${demand.profit_estimate.certification_cost}/件</div>
                  </div>
                  <div>
                    <div className="text-gray-500">订单总值</div>
                    <div className="font-mono text-white">
                      ${(demand.profit_estimate.target_price_usd * demand.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <div className="font-medium text-white mb-1">利润优化建议</div>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• 争取 FOB 条款可节省运费成本约 8%</li>
                    <li>• 批量采购认证可分摊成本至 $0.15/件</li>
                    <li>• 建议报价区间: ¥{Math.round(demand.profit_estimate.suggested_cost_cny * 0.95)} - ¥{Math.round(demand.profit_estimate.suggested_cost_cny * 1.05)}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button className="btn-success flex-1 py-3 text-base">
            📋 一键核算成本
          </button>
          <button className="btn-primary flex-1 py-3 text-base">
            📄 下载 RFQ 报价请求书
          </button>
          <button className="btn-secondary flex-1 py-3 text-base">
            🔒 锁定产能
          </button>
        </div>

        {/* 底部提示 */}
        <div className="mt-6 p-4 bg-[#161b22] border border-[#30363d] rounded-lg text-sm text-gray-400">
          <strong className="text-white">⚠️ 重要提示：</strong>
          本平台所有需求数据均经过初步审核，但实际交易前请务必核实采购商资质。
          建议使用平台担保交易服务，保障您的权益。
        </div>
      </main>
    </div>
  );
}
