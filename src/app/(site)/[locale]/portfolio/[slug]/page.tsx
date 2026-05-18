import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Container from '@components/Container';
import Button from '@components/Button';
import { CMSRichText } from '@components/CMSRichText';
import { fetchPortfolioBySlug, fetchPortfolio } from '@lib/payload-queries';
import type { Locale } from '@lib/i18n';
import { absoluteMediaUrl } from '@lib/media-url';
import { getSectionStyle } from '@lib/section-styles';
import { cn } from '@lib/utils';
import VirtualTourEmbed from '@components/VirtualTourEmbed';

export async function generateStaticParams() {
  const paths: Array<{ locale: string; slug: string }> = [];
  const [portfolioEn, portfolioAr] = await Promise.all([
    fetchPortfolio('en'),
    fetchPortfolio('ar'),
  ]);

  portfolioEn.forEach((item) => {
    if (item.slug) paths.push({ locale: 'en', slug: item.slug });
  });
  portfolioAr.forEach((item) => {
    if (item.slug) paths.push({ locale: 'ar', slug: item.slug });
  });

  return paths;
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;

  const doc = await fetchPortfolioBySlug(locale, slug);
  if (!doc) notFound();

  const thumb =
    doc.thumbnail && typeof doc.thumbnail === 'object' && 'url' in doc.thumbnail
      ? absoluteMediaUrl((doc.thumbnail as { url?: string }).url)
      : '';

  const gallery = Array.isArray(doc.gallery)
    ? (doc.gallery as Array<{ media?: { url?: string }; caption?: string }>)
    : [];

  const embed =
    typeof doc.virtualTourEmbedUrl === 'string' && doc.virtualTourEmbedUrl.length > 0
      ? doc.virtualTourEmbedUrl.trim()
      : '';

  const detailStyle = getSectionStyle({ style: (doc as Record<string, unknown>).detailStyle || {} });

  return (
    <>
      <section className={cn('relative border-b border-dark-800 pt-28 pb-16', detailStyle.sectionClass)}>
        <Container className={detailStyle.containerClass}>
          <Link href={`/${locale}/portfolio`} className="text-sm text-premium-accent hover:underline">
            ← {locale === 'en' ? 'Portfolio' : 'المعرض'}
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-dark-500">{String(doc.category || '')}</p>
              <h1 className={cn('mt-4', detailStyle.headingClass)}>{String(doc.title)}</h1>
              {doc.location ? (
                <p className="mt-4 text-dark-400">{String(doc.location)}</p>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={`/${locale}/contact`}>
                  <Button size="lg" variant={detailStyle.buttonVariant}>{locale === 'en' ? 'Book similar shoot' : 'اطلب مشروعًا مشابهًا'}</Button>
                </Link>
              </div>
            </div>
            {thumb ? (
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-dark-800">
                <Image src={thumb} alt="" fill className={detailStyle.mediaClass} sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {embed ? (
        <section className="border-b border-dark-900 bg-black py-12">
          <Container>
            <h2 className="mb-6 text-2xl font-semibold">
              {locale === 'en' ? 'Embedded experience' : 'التجربة المدمجة'}
            </h2>
            <div className="w-full overflow-hidden rounded-2xl border border-dark-800 bg-dark-950">
              <VirtualTourEmbed
                src={embed}
                locale={locale}
                title={String(doc.title || 'Virtual Tour')}
                thumbnailUrl={thumb}
                className="border-0 rounded-none h-full"
              />
            </div>
          </Container>
        </section>
      ) : null}

      <section className={detailStyle.sectionClass}>
        <Container className={cn('grid gap-12 lg:grid-cols-3', detailStyle.containerClass)}>
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold">{locale === 'en' ? 'Project story' : 'قصة المشروع'}</h2>
            <CMSRichText data={doc.description} className="text-dark-300" />
          </div>
          <aside className={cn('space-y-4 p-6', detailStyle.cardClass)}>
            <h3 className="text-lg font-semibold">{locale === 'en' ? 'Signals' : 'مؤشرات'}</h3>
            <ul className="space-y-3 text-sm">
              {(Array.isArray(doc.results) ? doc.results : []).map(
                (r: { metric?: string; value?: string }, i: number) => (
                  <li key={i} className="flex justify-between gap-4 border-b border-dark-800 pb-2">
                    <span className="text-dark-400">{r.metric}</span>
                    <span className="font-semibold text-premium-accent">{r.value}</span>
                  </li>
                ),
              )}
            </ul>
          </aside>
        </Container>
      </section>

      {gallery.length > 0 ? (
        <section className={cn('border-t border-dark-900', detailStyle.sectionClass)}>
          <Container className={detailStyle.containerClass}>
            <h2 className="mb-8 text-2xl font-semibold">{locale === 'en' ? 'Gallery' : 'المعرض'}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {gallery.map((g, i) => {
                const url = g.media?.url ? absoluteMediaUrl(g.media.url) : '';
                if (!url) return null;
                return (
                  <div key={i} className="space-y-2">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-dark-800">
                      <Image src={url} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                    {g.caption ? <p className="text-sm text-dark-400">{g.caption}</p> : null}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
