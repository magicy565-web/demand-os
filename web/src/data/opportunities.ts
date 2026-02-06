import { Opportunity } from '../types/opportunity';
import { VERIFIED_FACTORIES } from './factories';

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-001',
    title: 'Portable Neck Fan - Silent Pro',
    description: '便携式颈挂风扇在北美夏季市场爆红，多个红人带货视频播放量超 500 万，评论区购买意向强烈。',
    sourceVideoUrl: 'https://www.tiktok.com/@tech_lifestyle/video/7234567890',
    sourceVideoThumbnail: 'https://images.unsplash.com/photo-1619362224246-701551f3583b?q=80&w=800&auto=format&fit=crop',
    influencer: {
      handle: '@tech_lifestyle',
      avatar: 'https://i.pravatar.cc/150?u=tech_lifestyle',
      followers: '1.2M'
    },
    trendMetrics: {
      views: '5.2M',
      likes: '845K',
      comments: '12.3K',
      shares: '34.5K',
      growthRate: 8.5,
      viralScore: 98
    },
    productFeatures: {
      category: '便携电子产品',
      subCategory: '个人降温设备',
      keywords: ['便携', '静音', '充电', 'USB-C', '夏季'],
      priceRange: {
        min: 15,
        max: 35
      }
    },
    matchedFactories: [
      {
        factory: VERIFIED_FACTORIES[0], // 深圳精密电子
        matchScore: 98,
        matchReasons: [
          '主营品类完全匹配（便携电子产品）',
          '拥有 CE、FCC 认证，可直接出口北美',
          '当前产能利用率 72%，有充足可用产能',
          '历史订单准时率 96.5%，履约能力强'
        ],
        recommendedPricing: VERIFIED_FACTORIES[0].pricingTiers
      },
      {
        factory: VERIFIED_FACTORIES[0],
        matchScore: 85,
        matchReasons: [
          '具备电子产品生产经验',
          '交期稳定，平均 10-15 天',
          '支持小批量定制'
        ],
        recommendedPricing: VERIFIED_FACTORIES[0].pricingTiers
      }
    ],
    roiPrediction: {
      initialInvestment: 50000,
      projectedRevenue: 185000,
      profitMargin: 73,
      paybackPeriod: '14 天',
      riskLevel: 'low'
    },
    detectedAt: '2026-02-06T08:30:00Z',
    lifecycleStage: 'explosive',
    status: 'active'
  },
  {
    id: 'opp-002',
    title: 'Cloud Comfort Ergonomic Pillow',
    description: '人体工学记忆枕在家居品类持续走红，多个测评视频获得高互动，用户反馈睡眠质量显著提升。',
    sourceVideoUrl: 'https://www.tiktok.com/@home_hacks/video/7234567891',
    sourceVideoThumbnail: 'https://images.unsplash.com/photo-1584108190271-8518f3668123?q=80&w=800&auto=format&fit=crop',
    influencer: {
      handle: '@home_hacks',
      avatar: 'https://i.pravatar.cc/150?u=home_hacks',
      followers: '850K'
    },
    trendMetrics: {
      views: '3.8M',
      likes: '520K',
      comments: '8.9K',
      shares: '21.2K',
      growthRate: 5.2,
      viralScore: 92
    },
    productFeatures: {
      category: '家居纺织品',
      subCategory: '床上用品',
      keywords: ['记忆棉', '人体工学', '颈椎', '透气', '可拆洗'],
      priceRange: {
        min: 25,
        max: 60
      }
    },
    matchedFactories: [
      {
        factory: VERIFIED_FACTORIES[1], // 宁波柔纺家居
        matchScore: 94,
        matchReasons: [
          '主营家居纺织品，经验丰富',
          '拥有 OEKO-TEX、GOTS 有机认证',
          '支持定制尺寸和多色选择',
          '真空压缩包装，节省物流成本'
        ],
        recommendedPricing: VERIFIED_FACTORIES[1].pricingTiers
      }
    ],
    roiPrediction: {
      initialInvestment: 35000,
      projectedRevenue: 120000,
      profitMargin: 71,
      paybackPeriod: '18 天',
      riskLevel: 'low'
    },
    detectedAt: '2026-02-05T14:20:00Z',
    lifecycleStage: 'explosive',
    status: 'active'
  },
  {
    id: 'opp-003',
    title: 'Minimalist LED Desk Lamp',
    description: '极简风 LED 台灯在居家办公场景中走红，设计感强，适合打造个人品牌。',
    sourceVideoUrl: 'https://www.tiktok.com/@workspace_inspo/video/7234567892',
    sourceVideoThumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop',
    influencer: {
      handle: '@workspace_inspo',
      avatar: 'https://i.pravatar.cc/150?u=workspace',
      followers: '650K'
    },
    trendMetrics: {
      views: '2.1M',
      likes: '280K',
      comments: '4.5K',
      shares: '12.8K',
      growthRate: 3.8,
      viralScore: 85
    },
    productFeatures: {
      category: '智能穿戴设备',
      keywords: ['极简', 'LED', '护眼', '无线充电', '触控'],
      priceRange: {
        min: 30,
        max: 80
      }
    },
    matchedFactories: [
      {
        factory: VERIFIED_FACTORIES[0],
        matchScore: 88,
        matchReasons: [
          '具备 LED 照明产品生产线',
          '支持无线充电功能集成',
          '可提供私模定制服务'
        ],
        recommendedPricing: VERIFIED_FACTORIES[0].pricingTiers
      }
    ],
    roiPrediction: {
      initialInvestment: 45000,
      projectedRevenue: 140000,
      profitMargin: 68,
      paybackPeriod: '21 天',
      riskLevel: 'medium'
    },
    detectedAt: '2026-02-04T10:15:00Z',
    lifecycleStage: 'emerging',
    status: 'active'
  }
];

export function getOpportunityById(id: string): Opportunity | undefined {
  return OPPORTUNITIES.find(o => o.id === id);
}

export function getOpportunitiesByCategory(category: string): Opportunity[] {
  return OPPORTUNITIES.filter(o => o.productFeatures.category === category);
}
