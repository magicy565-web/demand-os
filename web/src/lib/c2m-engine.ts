/**
 * C2M 引擎核心计算逻辑
 * 负责成本计算、工厂匹配、阶梯定价等
 */

import {
  Material,
  MarketStyle,
  Factory,
  CostBreakdown,
  CostCalculationParams,
  FactoryMatch,
  PriceTier,
} from '@/types/c2m';

// ============ 常量定义 ============
const BASE_LABOR_COST = 50000; // 基础人工成本（元）
const LABOR_COST_MULTIPLIER = 0.8; // 人工成本随 MOQ 增加而降低的系数
const BASE_OVERHEAD_RATE = 0.15; // 基础管理成本率（15%）
const BASE_LOGISTICS_COST = 5000; // 基础物流成本（元）
const LOGISTICS_COST_PER_UNIT = 10; // 单位物流成本（元/件）

/**
 * 计算成本分解
 * @param params 成本计算参数
 * @returns 成本分解结果
 */
export function calculateCostBreakdown(params: CostCalculationParams): CostBreakdown {
  const { woodMaterial, fabricMaterial, moq, quantity, marketStyle } = params;

  // 1. 计算材料成本
  const woodCost = woodMaterial
    ? woodMaterial.basePrice * woodMaterial.priceMultiplier * quantity
    : 0;

  const fabricCost = fabricMaterial
    ? fabricMaterial.basePrice * fabricMaterial.priceMultiplier * quantity
    : 0;

  // 2. 计算人工成本（随 MOQ 增加而降低）
  const moqFactor = Math.max(0.5, 1 - (moq - 50) / 1000); // MOQ 越大，人工成本越低
  const laborCost = BASE_LABOR_COST * moqFactor;

  // 3. 计算管理成本（基于材料成本）
  const materialCostTotal = woodCost + fabricCost;
  const overheadCost = materialCostTotal * BASE_OVERHEAD_RATE;

  // 4. 计算物流成本
  const logisticsCost = BASE_LOGISTICS_COST + LOGISTICS_COST_PER_UNIT * quantity;

  // 5. 计算总成本和单位价格
  const totalCost = woodCost + fabricCost + laborCost + overheadCost + logisticsCost;
  const unitPrice = quantity > 0 ? totalCost / quantity : 0;

  return {
    woodCost,
    fabricCost,
    laborCost,
    overheadCost,
    logisticsCost,
    totalCost,
    unitPrice,
    profitMargin: 0.2, // 默认 20% 利润空间
    withinBudget: true, // 这个会在使用时根据目标成本判断
  };
}

/**
 * 获取适用的阶梯价格
 * @param factory 工厂信息
 * @param quantity 订购数量
 * @returns 适用的价格层级
 */
export function getApplicablePriceTier(factory: Factory, quantity: number): PriceTier {
  let applicableTier = factory.priceTiers[0];

  for (const tier of factory.priceTiers) {
    if (quantity >= tier.minQty && (!tier.maxQty || quantity <= tier.maxQty)) {
      applicableTier = tier;
      break;
    }
  }

  return applicableTier;
}

/**
 * 计算工厂匹配度
 * @param factory 工厂信息
 * @param params 成本计算参数
 * @returns 匹配度评分 0-100
 */
export function calculateFactoryMatchScore(
  factory: Factory,
  params: CostCalculationParams
): number {
  let score = 50; // 基础分

  // 1. MOQ 匹配度（工厂 MOQ 越接近用户需求，分数越高）
  const moqDifference = Math.abs(factory.moq - params.moq);
  const moqScore = Math.max(0, 30 - moqDifference / 10);
  score += moqScore;

  // 2. 产品匹配度（工厂主营产品与用户选择的材质匹配）
  if (params.woodMaterial && factory.mainProducts.some(p => p.includes('木'))) {
    score += 10;
  }
  if (params.fabricMaterial && factory.mainProducts.some(p => p.includes('布') || p.includes('纺'))) {
    score += 10;
  }

  // 3. 工厂评分权重
  score += factory.rating * 5;

  // 4. 市场风格匹配
  if (params.marketStyle) {
    const styleMatches = params.marketStyle.stylePreferences.materials.filter(
      m => m === params.woodMaterial?.id || m === params.fabricMaterial?.id
    ).length;
    score += styleMatches * 5;
  }

  return Math.min(100, score);
}

/**
 * 智能寻源匹配
 * @param factories 可用工厂列表
 * @param params 成本计算参数
 * @param targetCost 目标成本
 * @returns 排序后的工厂匹配结果
 */
export function matchFactories(
  factories: Factory[],
  params: CostCalculationParams,
  targetCost: number
): FactoryMatch[] {
  const matches: FactoryMatch[] = factories
    .filter(f => f.status === 'active')
    .map(factory => {
      const matchScore = calculateFactoryMatchScore(factory, params);
      const priceTier = getApplicablePriceTier(factory, params.quantity);
      const recommendedPrice = priceTier.unitPrice * (1 + 0.2); // 加 20% 利润

      // 计算匹配原因
      const reasons: string[] = [];
      if (factory.moq <= params.moq) {
        reasons.push(`MOQ 仅需 ${factory.moq} 件`);
      }
      if (factory.rating >= 4) {
        reasons.push(`高评分工厂 (${factory.rating}/5)`);
      }
      if (factory.leadTime <= 30) {
        reasons.push(`快速交期 ${factory.leadTime} 天`);
      }
      if (recommendedPrice <= targetCost) {
        reasons.push('价格优势');
      }

      return {
        factory,
        matchScore,
        reasons,
        recommendedPrice,
        estimatedLeadTime: factory.leadTime,
        priceTier,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return matches;
}

/**
 * 计算 MOQ 阶梯定价
 * @param basePrice 基础价格
 * @param quantity 订购数量
 * @returns 阶梯定价后的单位价格
 */
export function calculateTieredPrice(basePrice: number, quantity: number): number {
  let discount = 0;

  if (quantity >= 1000) {
    discount = 0.15; // 1000+ 件，15% 折扣
  } else if (quantity >= 500) {
    discount = 0.1; // 500-999 件，10% 折扣
  } else if (quantity >= 200) {
    discount = 0.05; // 200-499 件，5% 折扣
  }

  return basePrice * (1 - discount);
}

/**
 * 计算成本节省（对比传统采购）
 * @param c2mCost C2M 成本
 * @param traditionalCost 传统采购成本
 * @returns 节省比例和金额
 */
export function calculateCostSavings(c2mCost: number, traditionalCost: number) {
  const savingsAmount = traditionalCost - c2mCost;
  const savingsPercentage = (savingsAmount / traditionalCost) * 100;

  return {
    savingsAmount,
    savingsPercentage,
    c2mCost,
    traditionalCost,
  };
}

/**
 * 格式化成本为人民币
 * @param cost 成本金额
 * @returns 格式化后的字符串
 */
export function formatCost(cost: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cost);
}

/**
 * 生成成本明细报告
 * @param breakdown 成本分解
 * @returns 格式化的成本报告
 */
export function generateCostReport(breakdown: CostBreakdown): string {
  return `
成本明细报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
木材成本:     ${formatCost(breakdown.woodCost)}
面料成本:     ${formatCost(breakdown.fabricCost)}
人工成本:     ${formatCost(breakdown.laborCost)}
管理成本:     ${formatCost(breakdown.overheadCost)}
物流成本:     ${formatCost(breakdown.logisticsCost)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
总成本:       ${formatCost(breakdown.totalCost)}
单位价格:     ${formatCost(breakdown.unitPrice)}
  `;
}
