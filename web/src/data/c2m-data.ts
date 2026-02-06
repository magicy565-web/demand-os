/**
 * C2M 引擎模拟数据
 * 包含材质、市场风格、工厂等数据
 */

import { Material, MarketStyle, Factory } from '@/types/c2m';

// ============ 材质库 ============
export const MATERIALS: Material[] = [
  // 木材类
  {
    id: 'wood-oak',
    name: '北美白橡木 (FSC认证)',
    category: 'wood',
    grade: 'AA级',
    basePrice: 380000,
    priceMultiplier: 1.0,
    unit: '件',
    description: '环保认证，纹理清晰，适合高端家具',
    certifications: ['FSC', 'PEFC'],
  },
  {
    id: 'wood-walnut',
    name: '美国黑胡桃木',
    category: 'wood',
    grade: '特级',
    basePrice: 380000,
    priceMultiplier: 1.35,
    unit: '件',
    description: '深褐色，高端质感，适合奢华风格',
    certifications: ['FSC'],
  },
  {
    id: 'wood-ash',
    name: '俄罗斯白蜡木',
    category: 'wood',
    grade: 'A级',
    basePrice: 380000,
    priceMultiplier: 0.85,
    unit: '件',
    description: '浅色系，纹理细致，性价比高',
    certifications: ['PEFC'],
  },
  {
    id: 'wood-mdf',
    name: 'E0级环保多层板',
    category: 'wood',
    grade: '国标',
    basePrice: 380000,
    priceMultiplier: 0.6,
    unit: '件',
    description: '环保等级最高，成本控制首选',
    certifications: ['E0认证'],
  },

  // 面料类
  {
    id: 'fabric-linen',
    name: '亚麻混纺',
    category: 'fabric',
    grade: '标准',
    basePrice: 85,
    priceMultiplier: 1.0,
    unit: '米',
    description: '天然纤维，透气性好，易打理',
  },
  {
    id: 'fabric-velvet',
    name: '意大利绒布',
    category: 'fabric',
    grade: '高级',
    basePrice: 168,
    priceMultiplier: 1.2,
    unit: '米',
    description: '手感顺滑，光泽度高，适合轻奢',
  },
  {
    id: 'fabric-leather',
    name: '头层牛皮',
    category: 'fabric',
    grade: '特级',
    basePrice: 320,
    priceMultiplier: 1.5,
    unit: '米',
    description: '真皮材质，质感顶级，适合高端项目',
  },
  {
    id: 'fabric-tech',
    name: '科技布',
    category: 'fabric',
    grade: '高级',
    basePrice: 120,
    priceMultiplier: 1.1,
    unit: '米',
    description: '防污防水，易清洁，现代感强',
  },
];

// ============ 市场风格库 ============
export const MARKET_STYLES: MarketStyle[] = [
  {
    id: 'market-us',
    name: '北美极简风',
    region: 'USA/Canada',
    moqMultiplier: 1.0,
    stylePreferences: {
      materials: ['wood-oak', 'wood-ash', 'fabric-linen', 'fabric-tech'],
      colors: ['白色', '灰色', '原木色'],
      aesthetics: ['极简', '功能性', '自然'],
    },
    targetPrice: 800000,
  },
  {
    id: 'market-eu',
    name: '北欧轻奢风',
    region: 'EU Market',
    moqMultiplier: 1.2,
    stylePreferences: {
      materials: ['wood-ash', 'fabric-velvet', 'fabric-linen'],
      colors: ['米色', '浅灰', '淡蓝'],
      aesthetics: ['轻奢', '温暖', '舒适'],
    },
    targetPrice: 900000,
  },
  {
    id: 'market-me',
    name: '中东奢华风',
    region: 'GCC Region',
    moqMultiplier: 0.8,
    stylePreferences: {
      materials: ['wood-walnut', 'fabric-leather', 'fabric-velvet'],
      colors: ['深褐', '金色', '深蓝'],
      aesthetics: ['奢华', '厚重', '工艺'],
    },
    targetPrice: 1200000,
  },
  {
    id: 'market-sea',
    name: '东南亚度假风',
    region: 'ASEAN',
    moqMultiplier: 0.7,
    stylePreferences: {
      materials: ['wood-mdf', 'fabric-linen', 'fabric-tech'],
      colors: ['白色', '原木', '米色'],
      aesthetics: ['清爽', '轻盈', '自然'],
    },
    targetPrice: 650000,
  },
];

// ============ 工厂库 ============
export const FACTORIES: Factory[] = [
  {
    id: 'factory-001',
    name: '佛山陶瓷-华美建材',
    province: 'Guangdong',
    industrialBeltId: 'belt-001',
    mainProducts: ['木制家具', '陶瓷制品', '装饰建材'],
    capabilities: ['定制设计', '小批量生产', '快速交付'],
    moq: 50,
    leadTime: 28,
    certifications: ['ISO9001', 'FSC'],
    rating: 4.5,
    priceTiers: [
      { minQty: 50, maxQty: 199, unitPrice: 2800, discount: 0 },
      { minQty: 200, maxQty: 499, unitPrice: 2660, discount: 0.05 },
      { minQty: 500, maxQty: 999, unitPrice: 2520, discount: 0.1 },
      { minQty: 1000, unitPrice: 2380, discount: 0.15 },
    ],
    status: 'active',
  },
  {
    id: 'factory-002',
    name: '东莞家具-鸿运家私',
    province: 'Guangdong',
    industrialBeltId: 'belt-002',
    mainProducts: ['家具制造', '软装配饰', '木制品'],
    capabilities: ['大批量生产', '品质稳定', '国际认证'],
    moq: 45,
    leadTime: 32,
    certifications: ['ISO9001', 'CE', 'FSC'],
    rating: 4.8,
    priceTiers: [
      { minQty: 45, maxQty: 199, unitPrice: 2900, discount: 0 },
      { minQty: 200, maxQty: 499, unitPrice: 2755, discount: 0.05 },
      { minQty: 500, maxQty: 999, unitPrice: 2610, discount: 0.1 },
      { minQty: 1000, unitPrice: 2465, discount: 0.15 },
    ],
    status: 'active',
  },
  {
    id: 'factory-003',
    name: '江门纺织-永泰实业',
    province: 'Guangdong',
    industrialBeltId: 'belt-003',
    mainProducts: ['纺织品', '面料加工', '软装'],
    capabilities: ['面料定制', '快速打样', '环保认证'],
    moq: 52,
    leadTime: 25,
    certifications: ['OEKO-TEX', 'ISO14001'],
    rating: 4.3,
    priceTiers: [
      { minQty: 52, maxQty: 199, unitPrice: 180, discount: 0 },
      { minQty: 200, maxQty: 499, unitPrice: 171, discount: 0.05 },
      { minQty: 500, maxQty: 999, unitPrice: 162, discount: 0.1 },
      { minQty: 1000, unitPrice: 153, discount: 0.15 },
    ],
    status: 'active',
  },
  {
    id: 'factory-004',
    name: '中山灯饰-光明照明',
    province: 'Guangdong',
    industrialBeltId: 'belt-004',
    mainProducts: ['灯饰制造', '照明设备', '装饰件'],
    capabilities: ['精密加工', '定制方案', '快速响应'],
    moq: 49,
    leadTime: 30,
    certifications: ['ISO9001', 'CCC'],
    rating: 4.6,
    priceTiers: [
      { minQty: 49, maxQty: 199, unitPrice: 1200, discount: 0 },
      { minQty: 200, maxQty: 499, unitPrice: 1140, discount: 0.05 },
      { minQty: 500, maxQty: 999, unitPrice: 1080, discount: 0.1 },
      { minQty: 1000, unitPrice: 1020, discount: 0.15 },
    ],
    status: 'active',
  },
  {
    id: 'factory-005',
    name: '宁波家居-尚品制造',
    province: 'Zhejiang',
    industrialBeltId: 'belt-005',
    mainProducts: ['家居用品', '木制家具', '软装'],
    capabilities: ['OEM/ODM', '品质管理', '供应链完善'],
    moq: 60,
    leadTime: 35,
    certifications: ['ISO9001', 'FSC', 'CE'],
    rating: 4.7,
    priceTiers: [
      { minQty: 60, maxQty: 199, unitPrice: 2600, discount: 0 },
      { minQty: 200, maxQty: 499, unitPrice: 2470, discount: 0.05 },
      { minQty: 500, maxQty: 999, unitPrice: 2340, discount: 0.1 },
      { minQty: 1000, unitPrice: 2210, discount: 0.15 },
    ],
    status: 'active',
  },
  {
    id: 'factory-006',
    name: '苏州纺织-锦绣坊',
    province: 'Jiangsu',
    industrialBeltId: 'belt-006',
    mainProducts: ['高端面料', '丝绸制品', '纺织品'],
    capabilities: ['面料创新', '小批量定制', '快速打样'],
    moq: 55,
    leadTime: 22,
    certifications: ['OEKO-TEX', 'ISO14001', 'FSC'],
    rating: 4.9,
    priceTiers: [
      { minQty: 55, maxQty: 199, unitPrice: 220, discount: 0 },
      { minQty: 200, maxQty: 499, unitPrice: 209, discount: 0.05 },
      { minQty: 500, maxQty: 999, unitPrice: 198, discount: 0.1 },
      { minQty: 1000, unitPrice: 187, discount: 0.15 },
    ],
    status: 'active',
  },
  {
    id: 'factory-007',
    name: '上海家具-精工坊',
    province: 'Shanghai',
    industrialBeltId: 'belt-007',
    mainProducts: ['高端家具', '定制设计', '软装配饰'],
    capabilities: ['设计创新', '工艺精湛', '品质顶级'],
    moq: 40,
    leadTime: 40,
    certifications: ['ISO9001', 'FSC', 'CE', 'CCC'],
    rating: 5.0,
    priceTiers: [
      { minQty: 40, maxQty: 199, unitPrice: 3500, discount: 0 },
      { minQty: 200, maxQty: 499, unitPrice: 3325, discount: 0.05 },
      { minQty: 500, maxQty: 999, unitPrice: 3150, discount: 0.1 },
      { minQty: 1000, unitPrice: 2975, discount: 0.15 },
    ],
    status: 'active',
  },
];

// ============ 辅助函数 ============

/**
 * 根据 ID 获取材质
 */
export function getMaterialById(id: string): Material | undefined {
  return MATERIALS.find(m => m.id === id);
}

/**
 * 根据 ID 获取市场风格
 */
export function getMarketStyleById(id: string): MarketStyle | undefined {
  return MARKET_STYLES.find(m => m.id === id);
}

/**
 * 根据 ID 获取工厂
 */
export function getFactoryById(id: string): Factory | undefined {
  return FACTORIES.find(f => f.id === id);
}

/**
 * 获取所有活跃工厂
 */
export function getActiveFactories(): Factory[] {
  return FACTORIES.filter(f => f.status === 'active');
}

/**
 * 根据产品类型筛选工厂
 */
export function filterFactoriesByProduct(productType: 'wood' | 'fabric'): Factory[] {
  const keyword = productType === 'wood' ? '木' : productType === 'fabric' ? '纺' : '';
  return FACTORIES.filter(f =>
    f.mainProducts.some(p => p.includes(keyword)) && f.status === 'active'
  );
}
