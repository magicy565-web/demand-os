import { NextResponse } from 'next/server';
import { getFactories } from '@/lib/directus';

export async function GET() {
  try {
    const factories = await getFactories();
    return NextResponse.json(factories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
