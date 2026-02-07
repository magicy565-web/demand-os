/**
 * Conversations API Route
 * Handles CRUD operations for conversation history
 */

import { NextRequest, NextResponse } from 'next/server';
import { directusRequest } from '@/lib/directus-client';

/**
 * GET /api/conversations
 * Fetch user's conversation history
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const userId = request.nextUrl.searchParams.get('userId');
    const limit = request.nextUrl.searchParams.get('limit') || '20';
    const offset = request.nextUrl.searchParams.get('offset') || '0';

    if (!token || !userId) {
      return NextResponse.json(
        { error: 'Missing token or userId' },
        { status: 400 }
      );
    }

    const response = await directusRequest(
      `/items/conversations?filter={"user_id":{"_eq":"${userId}"}}&sort=-created_at&limit=${limit}&offset=${offset}`,
      {},
      token
    );

    return NextResponse.json(response.data || []);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/conversations
 * Create a new conversation record
 */
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const body = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Missing authentication token' },
        { status: 401 }
      );
    }

    const conversationData = {
      user_id: body.user_id,
      tiktok_url: body.tiktok_url,
      product_name: body.product_name,
      category: body.category,
      trend_score: body.trend_score || 0,
      lifecycle: body.lifecycle || 'emerging',
      result: body.result || {},
      notes: body.notes || '',
      status: body.status || 'published',
    };

    const response = await directusRequest(
      '/items/conversations',
      {
        method: 'POST',
        body: JSON.stringify(conversationData),
      },
      token
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}
