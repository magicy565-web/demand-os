import { InfluencerProfile, CollaborationRequest, ActiveProject, SavedFactory, Notification } from '@/types/influencer-workspace';
import { VERIFIED_FACTORIES } from './factories';

// 模拟当前登录的红人
export const CURRENT_INFLUENCER: InfluencerProfile = {
  id: 'inf-001',
  name: 'Sarah Chen',
  handle: '@TechLifestyle_Sarah',
  avatar: 'https://i.pravatar.cc/150?u=sarah',
  email: 'sarah@example.com',
  phone: '+1 (555) 123-4567',
  socialMedia: [
    {
      platform: 'tiktok',
      handle: '@TechLifestyle_Sarah',
      followers: '1.2M',
      avgViews: '350K',
      engagementRate: 8.5
    },
    {
      platform: 'instagram',
      handle: '@sarahtech',
      followers: '850K',
      avgViews: '120K',
      engagementRate: 6.2
    }
  ],
  niche: ['科技生活', '智能家居', '便携电子'],
  metrics: {
    totalGMV: 285000,
    totalProjects: 12,
    avgProfitMargin: 58,
    successRate: 92
  },
  membershipTier: 'pro',
  joinedAt: '2024-03-15'
};

// 合作邀约
export const COLLABORATION_REQUESTS: CollaborationRequest[] = [
  {
    id: 'req-001',
    influencerId: 'inf-001',
    factoryId: 'factory-001',
    opportunityId: 'opp-001',
    productName: 'Portable Neck Fan - Silent Pro',
    productCategory: '便携电子产品',
    cooperationMode: 'wholesale',
    quantity: 2000,
    targetPrice: 24,
    requirements: '需要支持 USB-C 充电，三档风速，续航至少 8 小时。希望能提供白色和黑色两种颜色。',
    targetMarket: '北美市场',
    expectedLaunchDate: '2026-03-01',
    status: 'accepted',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-03',
    factoryResponse: {
      message: '我们可以满足您的需求。产品支持 USB-C 快充，三档风速（低/中/高），续航 8-10 小时。提供白色、黑色、粉色三种颜色可选。',
      quotedPrice: 22.5,
      moq: 1000,
      leadTime: '15-20 天',
      respondedAt: '2026-02-03'
    }
  },
  {
    id: 'req-002',
    influencerId: 'inf-001',
    factoryId: 'factory-003',
    productName: 'Smart LED Desk Lamp',
    productCategory: '智能家居',
    cooperationMode: 'dropshipping',
    quantity: 500,
    targetPrice: 35,
    requirements: '需要支持 App 控制，色温可调（2700K-6500K），支持定时功能。',
    targetMarket: '欧洲市场',
    expectedLaunchDate: '2026-03-15',
    status: 'pending',
    createdAt: '2026-02-05',
    updatedAt: '2026-02-05'
  },
  {
    id: 'req-003',
    influencerId: 'inf-001',
    factoryId: 'factory-005',
    productName: 'Wireless Earbuds Pro',
    productCategory: '消费电子配件',
    cooperationMode: 'exclusive',
    quantity: 5000,
    targetPrice: 45,
    requirements: '需要主动降噪功能，续航 6 小时以上，支持无线充电。希望能进行私模定制，打造独家产品线。',
    targetMarket: '全球市场',
    expectedLaunchDate: '2026-04-01',
    status: 'negotiating',
    createdAt: '2026-01-28',
    updatedAt: '2026-02-04',
    factoryResponse: {
      message: '我们对独家合作非常感兴趣。可以提供主动降噪、6-8 小时续航、无线充电功能。私模定制需要额外 2-3 周开发时间。',
      quotedPrice: 42,
      moq: 3000,
      leadTime: '30-35 天（含私模开发）',
      respondedAt: '2026-02-02'
    }
  }
];

// 进行中的项目
export const ACTIVE_PROJECTS: ActiveProject[] = [
  {
    id: 'proj-001',
    influencerId: 'inf-001',
    factoryId: 'factory-001',
    factory: VERIFIED_FACTORIES[0],
    product: {
      name: 'Portable Neck Fan - Silent Pro',
      category: '便携电子产品',
      image: 'https://images.unsplash.com/photo-1619362224246-701551f3583b?q=80&w=800&auto=format&fit=crop'
    },
    cooperationMode: 'wholesale',
    orderQuantity: 2000,
    unitPrice: 22.5,
    totalValue: 45000,
    status: 'shipping',
    progress: 85,
    timeline: {
      orderPlaced: '2026-01-10',
      productionStarted: '2026-01-12',
      qualityCheckCompleted: '2026-01-28',
      shipped: '2026-02-01'
    },
    shipping: {
      trackingNumber: 'SF1234567890',
      carrier: 'SF Express',
      estimatedDelivery: '2026-02-10'
    },
    createdAt: '2026-01-10'
  },
  {
    id: 'proj-002',
    influencerId: 'inf-001',
    factoryId: 'factory-002',
    factory: VERIFIED_FACTORIES[1],
    product: {
      name: 'Memory Foam Pillow',
      category: '家居纺织品',
      image: 'https://images.unsplash.com/photo-1584108190271-8518f3668123?q=80&w=800&auto=format&fit=crop'
    },
    cooperationMode: 'exclusive',
    orderQuantity: 1000,
    unitPrice: 18,
    totalValue: 18000,
    status: 'production',
    progress: 45,
    timeline: {
      orderPlaced: '2026-01-25',
      productionStarted: '2026-01-28'
    },
    createdAt: '2026-01-25'
  }
];

// 收藏的工厂
export const SAVED_FACTORIES: SavedFactory[] = [
  {
    factoryId: 'factory-001',
    factory: VERIFIED_FACTORIES[0],
    savedAt: '2025-12-15',
    notes: '产品质量优秀，响应速度快，适合批量合作。',
    tags: ['电子产品', '快速交付', '高质量']
  },
  {
    factoryId: 'factory-002',
    factory: VERIFIED_FACTORIES[1],
    savedAt: '2025-12-20',
    notes: '纺织品专家，支持私模定制，适合打造独家产品线。',
    tags: ['纺织品', '私模定制', '独家合作']
  },
  {
    factoryId: 'factory-004',
    factory: VERIFIED_FACTORIES[3],
    savedAt: '2026-01-05',
    notes: '家居用品品类齐全，MOQ 灵活，适合测试市场。',
    tags: ['家居用品', '低 MOQ', '品类齐全']
  }
];

// 通知
export const NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    type: 'collaboration_response',
    title: '合作邀约已接受',
    message: '深圳精密电子制造有限公司已接受您的合作邀约，并提供了报价。',
    read: false,
    createdAt: '2026-02-03T10:30:00Z',
    actionUrl: '/workspace/requests/req-001'
  },
  {
    id: 'notif-002',
    type: 'project_update',
    title: '订单已发货',
    message: '您的订单 #proj-001 已从工厂发货，预计 2026-02-10 送达。',
    read: false,
    createdAt: '2026-02-01T14:20:00Z',
    actionUrl: '/workspace/projects/proj-001'
  },
  {
    id: 'notif-003',
    type: 'new_opportunity',
    title: '新商机推荐',
    message: 'Agent 发现了 3 个与您的垂直领域匹配的爆款商机。',
    read: true,
    createdAt: '2026-01-30T09:15:00Z',
    actionUrl: '/opportunities'
  },
  {
    id: 'notif-004',
    type: 'collaboration_response',
    title: '合作邀约进入协商阶段',
    message: '东莞智联科技有限公司对您的独家合作提案表示兴趣，希望进一步协商细节。',
    read: true,
    createdAt: '2026-02-02T16:45:00Z',
    actionUrl: '/workspace/requests/req-003'
  }
];
