export const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'gomap-revalidate-dev';

export function getRevalidateSecret(): string {
  return REVALIDATE_SECRET;
}
