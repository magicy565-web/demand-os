import { NextRequest, NextResponse } from 'next/server';

// Mock 对话数据
const mockConversations = [
  {
    id: '1',
    user_id: 'user1',
    tiktok_url: 'https://www.tiktok.com/@user/video/123',
    product_name: '智能手环',
    category: 'electronics',
    trend_score: 85,
    lifecycle: 'explosive',
    result: { factories: 3, analysis: 'High demand product' },
    notes: '高需求产品，建议快速进入市场',
    status: 'completed',
    created_at: '2026-02-01T10:00:00Z',
    updated_at: '2026-02-01T10:30:00Z',
  },
  {
    id: '2',
    user_id: 'user1',
    tiktok_url: 'https://www.tiktok.com/@user/video/456',
    product_name: '便携式咖啡机',
    category: 'home_garden',
    trend_score: 72,
    lifecycle: 'emerging',
    result: { factories: 5, analysis: 'Growing market' },
    notes: '新兴市场，潜力巨大',
    status: 'completed',
    created_at: '2026-02-02T14:20:00Z',
    updated_at: '2026-02-02T15:00:00Z',
  },
  {
    id: '3',
    user_id: 'user1',
    tiktok_url: 'https://www.tiktok.com/@user/video/789',
    product_name: '无线耳机',
    category: 'electronics',
    trend_score: 91,
    lifecycle: 'explosive',
    result: { factories: 8, analysis: 'Very hot product' },
    notes: '超热门产品，竞争激烈',
    status: 'completed',
    created_at: '2026-02-03T09:15:00Z',
    updated_at: '2026-02-03T10:00:00Z',
  },
  {
    id: '4',
    user_id: 'user1',
    tiktok_url: 'https://www.tiktok.com/@user/video/101',
    product_name: 'LED台灯',
    category: 'home_garden',
    trend_score: 68,
    lifecycle: 'mature',
    result: { factories: 4, analysis: 'Stable market' },
    notes: '成熟市场，稳定需求',
    status: 'completed',
    created_at: '2026-02-04T16:30:00Z',
    updated_at: '2026-02-04T17:00:00Z',
  },
  {
    id: '5',
    user_id: 'user1',
    tiktok_url: 'https://www.tiktok.com/@user/video/202',
    product_name: '瑜伽垫',
    category: 'sports',
    trend_score: 79,
    lifecycle: 'explosive',
    result: { factories: 6, analysis: 'Fitness trend' },
    notes: '健身热潮，持续增长',
    status: 'completed',
    created_at: '2026-02-05T11:45:00Z',
    updated_at: '2026-02-05T12:30:00Z',
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // 获取搜索参数
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category') || '';
    const minScore = parseInt(searchParams.get('minScore') || '0');
    const maxScore = parseInt(searchParams.get('maxScore') || '100');
    const lifecycle = searchParams.get('lifecycle') || '';
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    // 筛选数据
    let filtered = mockConversations.filter((conv) => {
      // 关键词搜索
      if (query) {
        const searchLower = query.toLowerCase();
        const matchesQuery =
          conv.product_name.toLowerCase().includes(searchLower) ||
          conv.notes.toLowerCase().includes(searchLower) ||
          conv.category.toLowerCase().includes(searchLower);
        if (!matchesQuery) return false;
      }

      // 类别筛选
      if (category && conv.category !== category) return false;

      // 趋势分数范围
      if (conv.trend_score < minScore || conv.trend_score > maxScore) return false;

      // 生命周期筛选
      if (lifecycle && conv.lifecycle !== lifecycle) return false;

      return true;
    });

    // 排序
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a];
      let bValue: any = b[sortBy as keyof typeof b];

      // 处理日期
      if (sortBy === 'created_at' || sortBy === 'updated_at') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // 分页
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = filtered.slice(start, end);

    return NextResponse.json({
      success: true,
      data: paginatedData,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      },
      filters: {
        query,
        category,
        minScore,
        maxScore,
        lifecycle,
        sortBy,
        sortOrder,
      },
    });
  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Search failed',
      },
      { status: 500 }
    );
  }
}
