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
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error(`Directus API error (${endpoint}):`, error);
    throw error;
  }
}
