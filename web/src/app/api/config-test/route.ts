import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const testResults = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
      directusUrl: process.env.NEXT_PUBLIC_DIRECTUS_URL,
      wsUrl: process.env.NEXT_PUBLIC_WS_URL,
    },
    tests: {} as Record<string, any>,
  };

  // Test 1: Check environment variables
  testResults.tests.environmentVariables = {
    status: 'OK',
    variables: {
      apiUrl: !!process.env.NEXT_PUBLIC_API_URL,
      directusUrl: !!process.env.NEXT_PUBLIC_DIRECTUS_URL,
      wsUrl: !!process.env.NEXT_PUBLIC_WS_URL,
    },
  };

  // Test 2: Check domain configuration
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://admin.cnsubscribe.xyz';
  testResults.tests.domainConfiguration = {
    status: 'OK',
    domains: {
      api: apiUrl,
      isDevelopment: apiUrl.includes('admin.cnsubscribe.xyz'),
      isProduction: apiUrl.includes('saas.cnsubscribe.xyz'),
    },
  };

  // Test 3: Attempt API connectivity
  try {
    const apiResponse = await fetch(`${apiUrl}/api/server/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(() => null);

    testResults.tests.apiConnectivity = {
      status: apiResponse ? 'Connected' : 'Failed',
      statusCode: apiResponse?.status || null,
      error: !apiResponse ? 'Could not reach API endpoint' : null,
    };
  } catch (error) {
    testResults.tests.apiConnectivity = {
      status: 'Error',
      error: String(error),
    };
  }

  return new Response(JSON.stringify(testResults, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
