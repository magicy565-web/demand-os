/**
 * AI 智能推荐引擎
 * 基于需求特征、历史数据、供应商能力进行智能匹配
 */

export interface Demand {
  id: string;
  title: string;
  description: string;
  category: string;
  region: string;
  priceRange: string;
  urgency: "critical" | "high" | "medium" | "low";
  quantity: number;
  tags: string[];
}

export interface Supplier {
  id: string;
  name: string;
  category: string[];
  regions: string[];
  capacity: number;
  rating: number;
  responseTime: number; // hours
  certifications: string[];
  minOrderQty: number;
  avgPrice: number;
}

export interface MatchScore {
  supplierId: string;
  demandId: string;
  score: number;
  reasons: string[];
  confidence: number;
}

/**
 * 计算需求和供应商的匹配分数
 */
export function calculateMatchScore(
  demand: Demand,
  supplier: Supplier
): MatchScore {
  let score = 0;
  const reasons: string[] = [];
  const weights = {
    category: 30,
    region: 20,
    capacity: 15,
    certifications: 15,
    price: 10,
    urgency: 10,
  };

  // 1. 类别匹配 (30分)
  if (supplier.category.includes(demand.category)) {
    score += weights.category;
    reasons.push(`类别完全匹配: ${demand.category}`);
  } else {
    const relatedCategories = getRelatedCategories(demand.category);
    const overlap = supplier.category.filter((cat) =>
      relatedCategories.includes(cat)
    );
    if (overlap.length > 0) {
      const partialScore = (weights.category * overlap.length) / relatedCategories.length;
      score += partialScore;
      reasons.push(`相关类别匹配: ${overlap.join(", ")}`);
    }
  }

  // 2. 区域匹配 (20分)
  if (supplier.regions.includes(demand.region)) {
    score += weights.region;
    reasons.push(`目标区域覆盖: ${demand.region}`);
  }

  // 3. 产能匹配 (15分)
  const capacityRatio = demand.quantity / supplier.capacity;
  if (capacityRatio >= 0.3 && capacityRatio <= 0.8) {
    score += weights.capacity;
    reasons.push(`产能匹配度高: ${(capacityRatio * 100).toFixed(0)}%`);
  } else if (capacityRatio < 0.3) {
    score += weights.capacity * 0.7;
    reasons.push("产能充足");
  } else if (capacityRatio <= 1.0) {
    score += weights.capacity * 0.5;
    reasons.push("产能接近上限");
  }

  // 4. 认证匹配 (15分)
  const certMatches = demand.tags.filter((tag) =>
    supplier.certifications.includes(tag)
  );
  if (certMatches.length > 0) {
    const certScore = (weights.certifications * certMatches.length) / demand.tags.length;
    score += certScore;
    reasons.push(`认证匹配: ${certMatches.join(", ")}`);
  }

  // 5. 价格匹配 (10分)
  const demandPriceRange = parsePriceRange(demand.priceRange);
  if (
    supplier.avgPrice >= demandPriceRange.min &&
    supplier.avgPrice <= demandPriceRange.max
  ) {
    score += weights.price;
    reasons.push("价格区间匹配");
  } else if (supplier.avgPrice < demandPriceRange.min) {
    score += weights.price * 0.8;
    reasons.push("价格优势明显");
  }

  // 6. 紧急度加权 (10分)
  if (demand.urgency === "critical" && supplier.responseTime <= 24) {
    score += weights.urgency;
    reasons.push("快速响应能力");
  } else if (demand.urgency === "high" && supplier.responseTime <= 48) {
    score += weights.urgency * 0.8;
    reasons.push("响应时效匹配");
  } else {
    score += weights.urgency * 0.5;
  }

  // 计算置信度
  const confidence = calculateConfidence(score, reasons.length);

  return {
    supplierId: supplier.id,
    demandId: demand.id,
    score: Math.min(score, 100),
    reasons,
    confidence,
  };
}

/**
 * 批量推荐：为一个需求找到最佳供应商
 */
export function recommendSuppliers(
  demand: Demand,
  suppliers: Supplier[],
  topN: number = 5
): MatchScore[] {
  const matches = suppliers
    .map((supplier) => calculateMatchScore(demand, supplier))
    .filter((match) => match.score >= 50) // 只返回分数>=50的匹配
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return matches;
}

/**
 * 反向推荐：为供应商推荐最适合的需求
 */
export function recommendDemands(
  supplier: Supplier,
  demands: Demand[],
  topN: number = 5
): MatchScore[] {
  const matches = demands
    .map((demand) => calculateMatchScore(demand, supplier))
    .filter((match) => match.score >= 50)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return matches;
}

/**
 * 智能价格预测
 */
export function predictPrice(demand: Demand, historicalData?: any[]): {
  suggested: number;
  min: number;
  max: number;
  confidence: number;
} {
  // 简化的价格预测算法
  const priceRange = parsePriceRange(demand.priceRange);
  const basePrice = (priceRange.min + priceRange.max) / 2;
  
  // 根据紧急度调整
  const urgencyMultiplier = {
    critical: 1.15,
    high: 1.08,
    medium: 1.0,
    low: 0.95,
  };
  
  const suggested = basePrice * urgencyMultiplier[demand.urgency];
  
  return {
    suggested: parseFloat(suggested.toFixed(2)),
    min: parseFloat((suggested * 0.9).toFixed(2)),
    max: parseFloat((suggested * 1.1).toFixed(2)),
    confidence: 0.75,
  };
}

/**
 * 辅助函数
 */
function getRelatedCategories(category: string): string[] {
  const categoryMap: Record<string, string[]> = {
    "消费电子": ["智能穿戴", "音频设备", "手机配件"],
    "服装": ["纺织品", "配饰", "户外用品"],
    "家居用品": ["厨房用品", "装饰品", "照明"],
    "医疗器械": ["健康护理", "医用耗材", "康复设备"],
  };
  
  return categoryMap[category] || [];
}

function parsePriceRange(priceRange: string): { min: number; max: number } {
  const match = priceRange.match(/\$([\d.]+)\s*-\s*\$([\d.]+)/);
  if (match) {
    return {
      min: parseFloat(match[1]),
      max: parseFloat(match[2]),
    };
  }
  return { min: 0, max: 1000 };
}

function calculateConfidence(score: number, reasonCount: number): number {
  // 置信度基于分数和原因数量
  const scoreConfidence = score / 100;
  const reasonConfidence = Math.min(reasonCount / 5, 1);
  return parseFloat(((scoreConfidence * 0.7 + reasonConfidence * 0.3) * 100).toFixed(1));
}

/**
 * 生成模拟供应商数据
 */
export function generateMockSuppliers(): Supplier[] {
  return [
    {
      id: "s1",
      name: "深圳鹏达电子",
      category: ["消费电子", "音频设备"],
      regions: ["北美", "欧洲"],
      capacity: 100000,
      rating: 4.8,
      responseTime: 12,
      certifications: ["CE", "FCC", "RoHS"],
      minOrderQty: 5000,
      avgPrice: 12.5,
    },
    {
      id: "s2",
      name: "广州纺织集团",
      category: ["服装", "纺织品"],
      regions: ["北美", "亚洲"],
      capacity: 200000,
      rating: 4.6,
      responseTime: 24,
      certifications: ["GOTS", "BSCI", "OEKO-TEX"],
      minOrderQty: 10000,
      avgPrice: 5.2,
    },
    {
      id: "s3",
      name: "东莞智能制造",
      category: ["消费电子", "智能穿戴"],
      regions: ["北美", "欧洲", "亚洲"],
      capacity: 150000,
      rating: 4.9,
      responseTime: 8,
      certifications: ["CE", "FCC", "UL", "ISO9001"],
      minOrderQty: 3000,
      avgPrice: 18.0,
    },
    {
      id: "s4",
      name: "宁波照明科技",
      category: ["家居用品", "照明"],
      regions: ["北美", "欧洲"],
      capacity: 80000,
      rating: 4.5,
      responseTime: 36,
      certifications: ["FCC", "ETL", "Energy Star"],
      minOrderQty: 5000,
      avgPrice: 7.5,
    },
    {
      id: "s5",
      name: "苏州医疗器械",
      category: ["医疗器械", "医用耗材"],
      regions: ["欧洲", "亚洲"],
      capacity: 300000,
      rating: 4.9,
      responseTime: 48,
      certifications: ["FDA", "CE", "ISO13485"],
      minOrderQty: 50000,
      avgPrice: 3.2,
    },
  ];
}
