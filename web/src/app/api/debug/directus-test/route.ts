import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const email = 'magic@gmail.com';
  const password = 'wysk1214';

  try {
    // Step 1: Login
    console.log('Step 1: Logging in...');
    const loginResponse = await fetch('https://admin.cnsubscribe.xyz/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!loginResponse.ok) {
      const error = await loginResponse.text();
      throw new Error(`Login failed: ${error}`);
    }

    const loginData = await loginResponse.json();
    const token = loginData.data?.access_token;

    if (!token) {
      throw new Error('No token received from login');
    }

    console.log('Step 1: Login successful');

    // Step 2: Get user info
    console.log('Step 2: Getting user info...');
    const meResponse = await fetch('https://admin.cnsubscribe.xyz/users/me', {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!meResponse.ok) {
      throw new Error(`Get user failed: ${await meResponse.text()}`);
    }

    const userData = await meResponse.json();
    console.log('Step 2: User info received');

    // Step 3: Test conversations access
    console.log('Step 3: Testing conversations access...');
    const conversationsResponse = await fetch(
      'https://admin.cnsubscribe.xyz/items/conversations?limit=1',
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    );

    if (!conversationsResponse.ok) {
      const error = await conversationsResponse.text();
      throw new Error(`Conversations access failed (${conversationsResponse.status}): ${error}`);
    }

    const conversationsData = await conversationsResponse.json();
    console.log('Step 3: Conversations access successful');

    return NextResponse.json({
      success: true,
      steps: {
        login: 'OK',
        userInfo: {
          id: userData.data?.id,
          email: userData.data?.email,
          role: userData.data?.role,
        },
        conversations: {
          status: 'OK',
          count: conversationsData.data?.length || 0,
          total: conversationsData.meta?.total_count || 'unknown',
        },
      },
    });
  } catch (error) {
    console.error('Debug test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
