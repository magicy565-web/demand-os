import { CaseStudy } from '../types/case-study';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-001',
    title: '便携颈挂风扇：30天回本的夏季爆款',
    description: '科技生活博主 @TechLifestyle_Sarah 通过我们平台与深圳精密电子合作，在北美夏季市场推出便携颈挂风扇，首批 2000 件在 30 天内售罄，实现 150% 投资回报率。',
    influencer: {
      name: 'Sarah Chen',
      handle: '@TechLifestyle_Sarah',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      followers: '1.2M',
      niche: '科技生活'
    },
    factory: {
      id: 'factory-001',
      name: '深圳精密电子制造有限公司',
      location: '深圳市, 广东省'
    },
    product: {
      name: 'Portable Neck Fan - Silent Pro',
      category: '便携电子产品',
      image: 'https://images.unsplash.com/photo-1619362224246-701551f3583b?q=80&w=800&auto=format&fit=crop',
      description: '静音便携颈挂风扇，USB-C 充电，三档风速，续航 8 小时'
    },
    cooperationMode: 'wholesale',
    metrics: {
      orderQuantity: 2000,
      gmv: 48000,
      profitMargin: 62,
      duration: '30 天'
    },
    timeline: {
      initiatedAt: '2025-11-15',
      productionStarted: '2025-11-18',
      firstShipment: '2025-11-28',
      completedAt: '2025-12-15'
    },
    testimonial: [
      {
        rating: 5,
        comment: '产品质量超出预期，工厂响应速度很快。交期准时，客户复购率达到 35%。这是我合作过最专业的供应链平台。',
        author: 'influencer'
      },
      {
        rating: 5,
        comment: 'Sarah 的市场洞察力很强，她提供的需求非常清晰。通过平台的认证体系，我们建立了长期合作关系。',
        author: 'factory'
      }
    ],
    successFactors: [
      '精准把握夏季市场时机',
      '工厂具备 CE、FCC 认证，快速通关',
      '批发模式降低成本，提升利润空间',
      '红人粉丝画像与产品高度匹配'
    ],
    media: {
      campaignVideos: ['https://example.com/video1.mp4'],
      productPhotos: [
        'https://images.unsplash.com/photo-1619362224246-701551f3583b?q=80&w=400',
        'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=400'
      ]
    },
    featured: true,
    publishedAt: '2025-12-20',
    status: 'completed'
  },
  {
    id: 'case-002',
    title: '人体工学记忆枕：独家供应打造自有品牌',
    description: '家居博主 @HomeHacks_Emma 选择独家供应模式，与宁波柔纺家居合作开发专属记忆枕产品线，锁定产能并获得品牌授权，3 个月内 GMV 突破 $120K。',
    influencer: {
      name: 'Emma Wilson',
      handle: '@HomeHacks_Emma',
      avatar: 'https://i.pravatar.cc/150?u=emma',
      followers: '850K',
      niche: '家居生活'
    },
    factory: {
      id: 'factory-002',
      name: '宁波柔纺家居用品有限公司',
      location: '宁波市, 浙江省'
    },
    product: {
      name: 'Cloud Comfort Ergonomic Pillow',
      category: '家居纺织品',
      image: 'https://images.unsplash.com/photo-1584108190271-8518f3668123?q=80&w=800&auto=format&fit=crop',
      description: '记忆棉人体工学枕，冷感凝胶层，可拆洗枕套，支持颈椎健康'
    },
    cooperationMode: 'exclusive',
    metrics: {
      orderQuantity: 5000,
      gmv: 120000,
      profitMargin: 68,
      duration: '90 天'
    },
    timeline: {
      initiatedAt: '2025-09-01',
      productionStarted: '2025-09-10',
      firstShipment: '2025-10-05',
      completedAt: '2025-12-01'
    },
    testimonial: [
      {
        rating: 4.9,
        comment: '独家供应模式让我有了自己的产品线。工厂支持私模定制，面料质感非常好。客户反馈睡眠质量明显提升，复购率超过 40%。',
        author: 'influencer'
      },
      {
        rating: 5,
        comment: 'Emma 对产品细节要求很高，我们一起打磨了 3 个版本才最终定型。这种深度合作让我们的产品更有竞争力。',
        author: 'factory'
      }
    ],
    successFactors: [
      '独家供应锁定产能，避免价格战',
      '私模定制打造差异化产品',
      '品牌授权提升产品溢价能力',
      '长期合作建立稳定供应链'
    ],
    media: {
      productPhotos: [
        'https://images.unsplash.com/photo-1584108190271-8518f3668123?q=80&w=400',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400'
      ]
    },
    featured: true,
    publishedAt: '2025-12-10',
    status: 'completed'
  },
  {
    id: 'case-003',
    title: '一件代发测试市场：零风险验证产品潜力',
    description: '新晋博主 @GadgetKing_Mike 通过一件代发模式测试市场反应，无需囤货即可验证产品潜力，成功后转为批发模式，实现规模化增长。',
    influencer: {
      name: 'Mike Johnson',
      handle: '@GadgetKing_Mike',
      avatar: 'https://i.pravatar.cc/150?u=mike',
      followers: '320K',
      niche: '数码评测'
    },
    factory: {
      id: 'factory-001',
      name: '深圳精密电子制造有限公司',
      location: '深圳市, 广东省'
    },
    product: {
      name: 'Wireless Charging Pad',
      category: '消费电子配件',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop',
      description: '15W 快充无线充电板，支持多设备同时充电'
    },
    cooperationMode: 'dropshipping',
    metrics: {
      orderQuantity: 350,
      gmv: 12500,
      profitMargin: 45,
      duration: '45 天'
    },
    timeline: {
      initiatedAt: '2025-10-15',
      productionStarted: '2025-10-15',
      firstShipment: '2025-10-17',
      completedAt: '2025-11-30'
    },
    testimonial: [
      {
        rating: 4.7,
        comment: '一件代发模式让我可以快速测试多个产品，无需担心库存积压。验证市场后，我立即转为批发模式扩大规模。',
        author: 'influencer'
      }
    ],
    successFactors: [
      '零库存风险，快速试错',
      '24-48 小时发货，客户体验好',
      '验证市场后无缝转为批发模式',
      '平台提供完整的物流追踪'
    ],
    media: {
      productPhotos: [
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400'
      ]
    },
    featured: false,
    publishedAt: '2025-12-05',
    status: 'completed'
  }
];

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return CASE_STUDIES.find(c => c.id === id);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter(c => c.featured);
}
