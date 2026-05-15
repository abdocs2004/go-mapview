import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req: Request, { params }: { params: Promise<Record<string, never>> }) {
  await params;
  const filePath = path.join(process.cwd(), 'public', 'matterport.jpg')
  try {
    const data = await fs.readFile(filePath)
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Length': String(data.length),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err) {
    return new Response('Not found', { status: 404 })
  }
}
