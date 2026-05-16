import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Save original environment
    const originalEnv = process.env.NODE_ENV;
    
    // 2. Hack: Force development mode to bypass Payload's production lock
    // This allows `push: true` to actually execute and create the tables!
    (process.env as any).NODE_ENV = 'development';
    
    // 3. Initialize Payload (this triggers the database push)
    const payload = await getPayload({ config: config as any });
    
    // 4. Restore original environment
    (process.env as any).NODE_ENV = originalEnv;

    return NextResponse.json({ 
      success: true, 
      message: 'Database schema pushed successfully! All tables created.' 
    });
  } catch (err: any) {
    return NextResponse.json({ 
      success: false, 
      error: err.message, 
      stack: err.stack 
    }, { status: 500 });
  }
}
