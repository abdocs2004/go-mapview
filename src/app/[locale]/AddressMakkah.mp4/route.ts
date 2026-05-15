import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'AddressMakkah.mp4')
  try {
    const data = await fs.readFile(filePath)
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Length': String(data.length),
        'Cache-Control': 'no-cache',
      },
    })
  } catch (err) {
    return new Response('Not found', { status: 404 })
  }
}
