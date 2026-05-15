import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  // Expect URLs like client1.jpg, client2.jpg
  const m = file.match(/^client(\d+)\.(jpg|jpeg|png|webp)$/i)
  if (!m) return new Response('Not found', { status: 404 })

  const idx = Number(m[1])
  const ext = m[2]
  const realName = `client(${idx}).${ext}`
  const filePath = path.join(process.cwd(), 'public', realName)

  try {
    const data = await fs.readFile(filePath)
    const contentType = ext.toLowerCase() === 'png' ? 'image/png' : ext.toLowerCase() === 'webp' ? 'image/webp' : 'image/jpeg'
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(data.length),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err) {
    return new Response('Not found', { status: 404 })
  }
}
