import { ViralProduct } from '../types/viral-tracker';

export const VIRAL_PRODUCTS: ViralProduct[] = [
  {
    id: 'vp-001',
    title: 'Portable Neck Fan - Silent Pro',
    category: 'Summer Gadgets',
    trendingScore: 98,
    growthRate: '+450% last 48h',
    originalVideoUrl: 'https://www.tiktok.com/tag/neckfan',
    originalVideoThumbnail: 'https://images.unsplash.com/photo-1619362224246-701551f3583b?q=80&w=400&auto=format&fit=crop',
    influencer: {
      id: 'inf-001',
      handle: '@tech_lifestyle',
      avatar: 'https://i.pravatar.cc/150?u=tech_lifestyle',
      followers: '1.2M',
      niche: 'Tech Gadgets'
    },
    offers: {
      dropshipping: {
        type: 'dropshipping',
        price: 8.50,
        currency: 'USD',
        moq: 1,
        leadTime: '24h dispatch',
        description: 'US/EU local warehouse delivery'
      },
      wholesale: {
        type: 'wholesale',
        price: 3.20,
        currency: 'USD',
        moq: 500,
        leadTime: '7-12 days',
        description: 'Direct factory pricing'
      },
      exclusive: {
        type: 'exclusive',
        price: 2.85,
        currency: 'USD',
        moq: 5000,
        leadTime: '25 days',
        description: 'Private label + exclusive mold'
      }
    },
    assets: [
      { id: 'a-1', type: 'video', title: 'Factory Production Line', url: '#', fileSize: '45MB' },
      { id: 'a-2', type: 'raw_footage', title: 'Material Durability Test', url: '#', fileSize: '120MB' }
    ],
    factoryId: 'f-101',
    factoryName: 'Shenzhen Precision Electronics',
    capacityStatus: 'available',
    lastUpdated: '2026-02-06T10:00:00Z'
  },
  {
    id: 'vp-002',
    title: 'Cloud Comfort Ergonomic Pillow',
    category: 'Home & Bedding',
    trendingScore: 92,
    growthRate: '+180% last 24h',
    originalVideoUrl: 'https://www.tiktok.com/tag/pillow',
    originalVideoThumbnail: 'https://images.unsplash.com/photo-1584108190271-8518f3668123?q=80&w=400&auto=format&fit=crop',
    influencer: {
      id: 'inf-002',
      handle: '@home_hacks',
      avatar: 'https://i.pravatar.cc/150?u=home_hacks',
      followers: '850K',
      niche: 'Interior Design'
    },
    offers: {
      dropshipping: {
        type: 'dropshipping',
        price: 15.90,
        currency: 'USD',
        moq: 1,
        leadTime: '48h dispatch',
        description: 'Cloud shipping from Ningbo'
      },
      wholesale: {
        type: 'wholesale',
        price: 6.40,
        currency: 'USD',
        moq: 200,
        leadTime: '10 days',
        description: 'Vacuum packed to save volume'
      },
      exclusive: {
        type: 'exclusive',
        price: 5.80,
        currency: 'USD',
        moq: 2000,
        leadTime: '20 days',
        description: 'Exclusive cooling gel layer'
      }
    },
    assets: [
      { id: 'a-3', type: 'video', title: 'Material Softness Demo', url: '#', fileSize: '28MB' },
      { id: 'a-4', type: 'image', title: 'Product HD Render', url: '#', fileSize: '5MB' }
    ],
    factoryId: 'f-202',
    factoryName: 'Ningbo Soft-Tex Manufacturing',
    capacityStatus: 'limited',
    lastUpdated: '2026-02-06T09:30:00Z'
  }
];
