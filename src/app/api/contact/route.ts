import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getPayloadClient } from '@lib/payload-client';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  message: z.string().trim().max(4000),
  locale: z.enum(['en', 'ar']).optional().default('en'),
  sourcePage: z.string().trim().max(240).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: 'Invalid contact payload.' },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();
    await payload.create({
      collection: 'contact-messages',
      data: {
        ...parsed.data,
        sourcePage: parsed.data.sourcePage || '/contact',
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('Contact submission failed', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to submit contact request.' },
      { status: 500 }
    );
  }
}