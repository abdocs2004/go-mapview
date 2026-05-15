import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { REVALIDATE_SECRET } from '@lib/revalidate';

const routesToRevalidate = [
  '/en',
  '/ar',
  '/en/about',
  '/ar/about',
  '/en/contact',
  '/ar/contact',
  '/en/services',
  '/ar/services',
  '/en/portfolio',
  '/ar/portfolio',
  '/address',
];

export async function POST(request: Request) {
  // Accept secret from both headers and body
  let secret = request.headers.get('x-revalidate-secret');
  let tag = null;

  if (!secret) {
    try {
      const body = await request.json();
      secret = body.revalidateSecret;
      tag = body.tag;
    } catch {
      // Ignore JSON parse errors
    }
  }

  if (!secret || secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // If a specific tag is provided, revalidate by tag
    if (tag) {
      revalidateTag(tag);
      // Also revalidate all routes to ensure updates propagate
      for (const route of routesToRevalidate) {
        revalidatePath(route);
      }
      return NextResponse.json({ ok: true, tag, revalidated: routesToRevalidate.length });
    }

    // Otherwise revalidate all routes
    for (const route of routesToRevalidate) {
      revalidatePath(route);
    }

    return NextResponse.json({ ok: true, revalidated: routesToRevalidate.length });
  } catch (error) {
    console.error('Revalidation failed', error);
    return NextResponse.json({ ok: false, message: 'Revalidation failed' }, { status: 500 });
  }
}