import { Factory } from '../types/factory';

export const VERIFIED_FACTORIES: Factory[] = [
  {
    id: 'factory-001',
    name: '深圳精密电子制造有限公司',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
    location: {
      province: '广东省',
      city: '深圳市',
      address: '宝安区西乡街道固戍工业园'
    },
    establishedYear: 2008,
    employeeCount: '500-1000人',
    certifications: [
      {
        id: 'cert-001',
        type: 'compliance',
        name: 'ISO 9001:2015 质量管理体系认证',
        issuedBy: '中国质量认证中心',
        issuedDate: '2023-01-15',
        validUntil: '2026-01-14'
      },
      {
        id: 'cert-002',
        type: 'export',
        name: 'CE 欧盟安全认证',
        issuedBy: 'TÜV Rheinland',
        issuedDate: '2022-06-10',
        validUntil: '2027-06-09'
      },
      {
        id: 'cert-003',
        type: 'quality',
        name: 'FCC 美国联邦通信委员会认证',
        issuedBy: 'FCC',
        issuedDate: '2023-03-20'
      }
    ],
    trustScore: 98,
    mainCategories: ['便携电子产品', '智能穿戴设备', '消费电子配件'],
    productionCapacity: {
      dailyOutput: 5000,
      monthlyOutput: 150000,
      currentUtilization: 72,
      availableCapacity: 42000,
      leadTime: '7-12 天'
    },
    pricingTiers: [
      {
        mode: 'dropshipping',
        unitPrice: 8.50,
        moq: 1,
        leadTime: '24-48小时发货',
        description: '美国/欧洲海外仓一件代发',
        features: ['无库存风险', '快速测试市场', '支持混合订单', '包含物流追踪']
      },
      {
        mode: 'wholesale',
        unitPrice: 3.20,
        moq: 500,
        leadTime: '7-12天生产',
        description: '工厂直供批发价',
        features: ['利润空间大', '支持定制包装', '质检报告', '30天质保']
      },
      {
        mode: 'exclusive',
        unitPrice: 2.85,
        moq: 5000,
        leadTime: '25-30天生产',
        description: '独家供应协议',
        features: ['锁定产能30天', '私模定制', '独家销售权', '品牌授权', '营销素材包']
      }
    ],
    historicalCases: [
      {
        id: 'case-001',
        influencerName: '@TechLifestyle_Sarah',
        influencerAvatar: 'https://i.pravatar.cc/150?u=sarah',
        productName: 'Portable Neck Fan - Silent Pro',
        orderQuantity: 2000,
        gmv: 48000,
        completedDate: '2025-12-15',
        rating: 5,
        testimonial: '产品质量超出预期，交期准时，客户复购率很高。'
      },
      {
        id: 'case-002',
        influencerName: '@GadgetKing_Mike',
        productName: 'Wireless Charging Pad',
        orderQuantity: 1500,
        gmv: 35000,
        completedDate: '2025-11-20',
        rating: 4.8
      }
    ],
    stats: {
      totalOrders: 1284,
      onTimeDeliveryRate: 96.5,
      qualityPassRate: 98.2,
      returnRate: 1.3,
      averageRating: 4.85
    },
    contact: {
      manager: '李明',
      phone: '+86 755 2345 6789',
      email: 'liming@szprecision.com',
      wechat: 'szprecision_liming'
    },
    media: {
      factoryVideos: ['https://example.com/video1.mp4'],
      productionLinePhotos: [
        'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=400',
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400'
      ],
      certificationDocuments: []
    }
  },
  {
    id: 'factory-002',
    name: '宁波柔纺家居用品有限公司',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
    location: {
      province: '浙江省',
      city: '宁波市',
      address: '鄞州区姜山镇工业园区'
    },
    establishedYear: 2012,
    employeeCount: '200-500人',
    certifications: [
      {
        id: 'cert-004',
        type: 'compliance',
        name: 'OEKO-TEX Standard 100 纺织品安全认证',
        issuedBy: 'OEKO-TEX',
        issuedDate: '2023-02-10',
        validUntil: '2026-02-09'
      },
      {
        id: 'cert-005',
        type: 'eco',
        name: 'GOTS 全球有机纺织品认证',
        issuedBy: 'GOTS',
        issuedDate: '2022-08-15',
        validUntil: '2025-08-14'
      }
    ],
    trustScore: 94,
    mainCategories: ['家居纺织品', '床上用品', '功能性面料'],
    productionCapacity: {
      dailyOutput: 3000,
      monthlyOutput: 90000,
      currentUtilization: 65,
      availableCapacity: 31500,
      leadTime: '10-15 天'
    },
    pricingTiers: [
      {
        mode: 'dropshipping',
        unitPrice: 15.90,
        moq: 1,
        leadTime: '48小时发货',
        description: '宁波港直发海外仓',
        features: ['真空压缩包装', '节省物流成本', '支持混合SKU']
      },
      {
        mode: 'wholesale',
        unitPrice: 6.40,
        moq: 200,
        leadTime: '10-15天生产',
        description: '工厂批发价',
        features: ['支持定制尺寸', '多色可选', '质检报告']
      },
      {
        mode: 'exclusive',
        unitPrice: 5.80,
        moq: 2000,
        leadTime: '20-25天生产',
        description: '独家供应',
        features: ['独家冷感凝胶层', '品牌刺绣', '独家销售权']
      }
    ],
    historicalCases: [
      {
        id: 'case-003',
        influencerName: '@HomeHacks_Emma',
        productName: 'Cloud Comfort Ergonomic Pillow',
        orderQuantity: 1200,
        gmv: 28000,
        completedDate: '2025-12-01',
        rating: 4.9,
        testimonial: '面料质感非常好，客户反馈睡眠质量明显提升。'
      }
    ],
    stats: {
      totalOrders: 856,
      onTimeDeliveryRate: 94.2,
      qualityPassRate: 97.5,
      returnRate: 2.1,
      averageRating: 4.75
    },
    contact: {
      manager: '王芳',
      phone: '+86 574 8765 4321',
      email: 'wangfang@nbsofttex.com',
      wechat: 'nbsofttex_wangfang'
    },
    media: {
      factoryVideos: [],
      productionLinePhotos: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400'
      ],
      certificationDocuments: []
    }
  }
];

export function getFactoryById(id: string): Factory | undefined {
  return VERIFIED_FACTORIES.find(f => f.id === id);
}

export function getFactoriesByCategory(category: string): Factory[] {
  return VERIFIED_FACTORIES.filter(f => 
    f.mainCategories.some(c => c.includes(category))
  );
}
