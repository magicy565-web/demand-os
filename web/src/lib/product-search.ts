/**
 * 产品搜索与智能匹配引擎
 * 扩展原有的 ai-matching.ts，支持模糊查询和结构化搜索
 */

import { StructuredQuery, ProductMatch } from "@/types/auto-request";

/**
 * 模拟产品库数据
 */
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  keywords: string[];
  fob_price: number;
  moq: number;
  supplier: {
    id: string;
    name: string;
    rating: number;
    response_time: number;
  };
  supports_dropshipping: boolean;
  certifications: string[];
  delivery_time: string;
  thumbnail?: string;
  tags: string[];
}

/**
 * 模拟产品数据库
 */
const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "TWS Pro 主动降噪蓝牙耳机",
    category: "Consumer Electronics",
    description: "支持 ANC 主动降噪，40dB 降噪深度，35 小时续航",
    keywords: ["TWS", "Bluetooth", "Earbuds", "ANC", "Noise Cancelling", "蓝牙耳机"],
    fob_price: 8.5,
    moq: 500,
    supplier: {
      id: "s1",
      name: "深圳鹏达电子",
      rating: 4.8,
      response_time: 12,
    },
    supports_dropshipping: true,
    certifications: ["CE", "FCC", "RoHS"],
    delivery_time: "15-20天",
    tags: ["Hot Seller", "OEM Available"],
  },
  {
    id: "p2",
    name: "智能手环 - 血氧心率监测",
    category: "Consumer Electronics",
    description: "1.4\" AMOLED 屏幕，支持血氧、心率、睡眠监测",
    keywords: ["Smart Band", "Fitness Tracker", "Blood Oxygen", "SpO2", "智能手环"],
    fob_price: 12.0,
    moq: 1000,
    supplier: {
      id: "s3",
      name: "东莞智能制造",
      rating: 4.9,
      response_time: 8,
    },
    supports_dropshipping: false,
    certifications: ["CE", "FCC", "FDA"],
    delivery_time: "20-25天",
    tags: ["New Arrival", "OEM Available"],
  },
  {
    id: "p3",
    name: "Apple Watch 风格智能手表",
    category: "Consumer Electronics",
    description: "1.75\" 高清屏，支持血氧、ECG、运动追踪，IP68 防水",
    keywords: ["Smart Watch", "Apple Watch Style", "Blood Oxygen", "ECG", "Waterproof"],
    fob_price: 16.5,
    moq: 500,
    supplier: {
      id: "s3",
      name: "东莞智能制造",
      rating: 4.9,
      response_time: 8,
    },
    supports_dropshipping: true,
    certifications: ["CE", "FCC", "RoHS"],
    delivery_time: "18-22天",
    tags: ["Hot Seller", "Private Label Available"],
  },
  {
    id: "p4",
    name: "无线充电宝 10000mAh",
    category: "Consumer Electronics",
    description: "支持 15W 无线快充 + 20W PD 有线快充",
    keywords: ["Power Bank", "Wireless Charging", "Fast Charge", "充电宝"],
    fob_price: 7.2,
    moq: 1000,
    supplier: {
      id: "s1",
      name: "深圳鹏达电子",
      rating: 4.8,
      response_time: 12,
    },
    supports_dropshipping: true,
    certifications: ["CE", "FCC", "UL"],
    delivery_time: "12-15天",
    tags: ["Best Seller"],
  },
  {
    id: "p5",
    name: "便携蓝牙音箱 - 防水版",
    category: "Consumer Electronics",
    description: "IP67 防水防尘，20 小时续航，RGB 氛围灯",
    keywords: ["Bluetooth Speaker", "Waterproof", "Portable", "音箱"],
    fob_price: 11.0,
    moq: 500,
    supplier: {
      id: "s1",
      name: "深圳鹏达电子",
      rating: 4.8,
      response_time: 12,
    },
    supports_dropshipping: false,
    certifications: ["CE", "FCC"],
    delivery_time: "15-18天",
    tags: ["OEM Available"],
  },
];

/**
 * 搜索产品 - 基于结构化查询
 */
export async function searchProducts(
  query: StructuredQuery
): Promise<ProductMatch[]> {
  // 模拟数据库查询延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  // 初筛：基于类别和价格
  let candidates = MOCK_PRODUCTS.filter(product => {
    // 类别匹配
    if (query.category && product.category !== query.category) {
      return false;
    }

    // 价格范围
    if (query.target_price) {
      const { min, max } = query.target_price;
      if (min && product.fob_price < min) return false;
      if (max && product.fob_price > max) return false;
    }

    // MOQ 检查
    if (query.moq) {
      const userMaxMoq = query.moq.max || query.moq.min;
      if (userMaxMoq && product.moq > userMaxMoq) {
        // 用户最多能接受的 MOQ 小于产品的 MOQ，不匹配
        return false;
      }
    }

    // Dropshipping 要求
    if (query.special_requirements?.includes("Dropshipping")) {
      if (!product.supports_dropshipping) return false;
    }

    return true;
  });

  // 精排：计算匹配分数
  const matches: ProductMatch[] = candidates.map(product => {
    const score = calculateProductMatchScore(query, product);
    const reasons = generateMatchReasons(query, product, score);

    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.fob_price,
      moq: product.moq,
      supplier: product.supplier,
      match_score: score,
      match_reasons: reasons,
      supports_dropshipping: product.supports_dropshipping,
      certifications: product.certifications,
      thumbnail: product.thumbnail,
    };
  });

  // 按分数排序
  return matches
    .filter(m => m.match_score >= 50) // 过滤低分
    .sort((a, b) => b.match_score - a.match_score);
}

/**
 * 计算产品匹配分数
 */
function calculateProductMatchScore(
  query: StructuredQuery,
  product: Product
): number {
  let score = 0;

  // 1. 关键词匹配 (40分)
  if (query.keywords.length > 0) {
    const matchedKeywords = query.keywords.filter(qk =>
      product.keywords.some(pk => 
        pk.toLowerCase().includes(qk.toLowerCase()) ||
        qk.toLowerCase().includes(pk.toLowerCase())
      )
    );
    const keywordScore = (matchedKeywords.length / query.keywords.length) * 40;
    score += keywordScore;
  }

  // 2. 价格匹配 (25分)
  if (query.target_price) {
    const { min = 0, max = Infinity } = query.target_price;
    const targetMid = (min + max) / 2;
    
    if (product.fob_price >= min && product.fob_price <= max) {
      // 在范围内，根据接近中间值程度打分
      const deviation = Math.abs(product.fob_price - targetMid) / targetMid;
      score += 25 * (1 - Math.min(deviation, 1));
    } else if (product.fob_price < min) {
      // 低于预算，额外加分
      score += 20;
    }
  }

  // 3. MOQ 匹配 (15分)
  if (query.moq) {
    const userMoq = query.moq.min || query.moq.max || 1;
    if (product.moq <= userMoq) {
      score += 15;
    } else if (product.moq <= userMoq * 2) {
      score += 10;
    } else if (product.moq <= userMoq * 5) {
      score += 5;
    }
  }

  // 4. 特殊要求 (10分)
  if (query.special_requirements) {
    if (query.special_requirements.includes("Dropshipping") && product.supports_dropshipping) {
      score += 5;
    }
    if (query.special_requirements.includes("OEM") && product.tags.includes("OEM Available")) {
      score += 5;
    }
  }

  // 5. 认证匹配 (5分)
  if (query.certifications && query.certifications.length > 0) {
    const matchedCerts = query.certifications.filter(qc =>
      product.certifications.includes(qc)
    );
    score += (matchedCerts.length / query.certifications.length) * 5;
  }

  // 6. 供应商评分 (5分)
  score += (product.supplier.rating / 5) * 5;

  return Math.min(Math.round(score), 100);
}

/**
 * 生成匹配原因
 */
function generateMatchReasons(
  query: StructuredQuery,
  product: Product,
  score: number
): string[] {
  const reasons: string[] = [];

  // 关键词匹配
  const matchedKeywords = query.keywords.filter(qk =>
    product.keywords.some(pk =>
      pk.toLowerCase().includes(qk.toLowerCase()) ||
      qk.toLowerCase().includes(pk.toLowerCase())
    )
  );
  if (matchedKeywords.length > 0) {
    reasons.push(`关键词匹配: ${matchedKeywords.join(", ")}`);
  }

  // 价格优势
  if (query.target_price) {
    const { max } = query.target_price;
    if (max && product.fob_price < max * 0.8) {
      reasons.push(`价格优势明显 ($${product.fob_price} << $${max})`);
    } else if (max && product.fob_price <= max) {
      reasons.push(`价格在预算内 ($${product.fob_price})`);
    }
  }

  // MOQ 友好
  if (query.moq) {
    const userMoq = query.moq.min || query.moq.max || 1;
    if (product.moq <= userMoq) {
      reasons.push(`起订量符合要求 (MOQ: ${product.moq})`);
    }
  }

  // Dropshipping
  if (product.supports_dropshipping && query.special_requirements?.includes("Dropshipping")) {
    reasons.push("✅ 支持一件代发");
  }

  // 供应商评分
  if (product.supplier.rating >= 4.7) {
    reasons.push(`优质供应商 (⭐ ${product.supplier.rating})`);
  }

  // 认证
  if (product.certifications.length > 0) {
    reasons.push(`认证齐全: ${product.certifications.join(", ")}`);
  }

  return reasons;
}

/**
 * 获取所有产品（用于测试）
 */
export function getAllProducts(): Product[] {
  return MOCK_PRODUCTS;
}
