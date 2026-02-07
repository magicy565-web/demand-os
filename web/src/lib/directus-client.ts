/**
 * Directus Client Configuration
 * Handles authentication and API communication with Directus
 */

import { createDirectus, rest, authentication } from '@directus/sdk';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.cnsubscribe.xyz';

export const directusClient = createDirectus(DIRECTUS_URL)
  .with(rest())
  .with(authentication('session', { credentials: 'include' }));

/**
 * Get fresh token from Directus
 */
export async function getDirectusToken(email: string, password: string) {
  try {
    const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with Directus');
    }

    const data = await response.json();
    return data.data.access_token;
  } catch (error) {
    console.error('Directus authentication error:', error);
    throw error;
  }
}

/**
 * Make authenticated request to Directus API
 */
export async function directusRequest(
  endpoint: string,
  options: RequestInit = {},
  token?: string
) {
  const url = `${DIRECTUS_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // 合并现有的 headers
  if (options.headers && typeof options.headers === 'object') {
    Object.assign(headers, options.headers);
  }

  // Use provided token or get server-side token
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    console.log('[Directus] Using provided token');
  } else if (typeof window === 'undefined') {
    // Server-side: use environment credentials
    const email = process.env.DIRECTUS_EMAIL;
    const password = process.env.DIRECTUS_PASSWORD;
    console.log('[Directus] Server-side auth:', { email: email ? 'set' : 'missing', password: password ? 'set' : 'missing' });
    if (email && password) {
      try {
        const serverToken = await getDirectusToken(email, password);
        headers['Authorization'] = `Bearer ${serverToken}`;
        console.log('[Directus] Server token obtained successfully');
      } catch (error) {
        console.error('[Directus] Failed to get server token:', error);
      }
    } else {
      console.warn('[Directus] Missing server credentials in environment');
    }
  }

  try {
    console.log(`[Directus] Request to: ${url}`);
    console.log(`[Directus] Headers:`, JSON.stringify(headers, null, 2));
    
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log(`[Directus] Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Directus] Error response:`, errorText);
      let error;
      try {
        error = JSON.parse(errorText);
      } catch (e) {
        throw new Error(`API request failed: ${errorText}`);
      }
      throw new Error(error.errors?.[0]?.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error(`[Directus] API error (${endpoint}):`, error);
    throw error;
  }
}
