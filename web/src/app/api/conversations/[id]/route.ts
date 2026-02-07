/**
 * Conversation Detail API Route
 * Handles GET, PUT, DELETE for individual conversations
 */

import { NextRequest, NextResponse } from 'next/server';
import { directusRequest } from '@/lib/directus-client';

/**
 * GET /api/conversations/:id
 * Fetch a single conversation
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Missing authentication token' },
        { status: 401 }
      );
    }

    const response = await directusRequest(
      `/items/conversations/${params.id}`,
      {},
      token
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversation' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/conversations/:id
 * Update a conversation
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const body = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Missing authentication token' },
        { status: 401 }
      );
    }

    const response = await directusRequest(
      `/items/conversations/${params.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
      },
      token
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error updating conversation:', error);
    return NextResponse.json(
      { error: 'Failed to update conversation' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/conversations/:id
 * Delete a conversation
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Missing authentication token' },
        { status: 401 }
      );
    }

    await directusRequest(
      `/items/conversations/${params.id}`,
      {
        method: 'DELETE',
      },
      token
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return NextResponse.json(
      { error: 'Failed to delete conversation' },
      { status: 500 }
    );
  }
}
