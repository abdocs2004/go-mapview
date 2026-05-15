import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchPublishedPageBySlug, fetchServices } from '@lib/payload-queries';
import type { Locale } from '@lib/i18n';
import RenderedSections, { type ServiceCardModel } from '@components/home/RenderedSections';
import SeoJsonLd from '@components/SeoJsonLd';
import Container from '@components/Container';
import { CMSRichText } from '@components/CMSRichText';
import {
  buildPageMetadata,
  loadSeoContext,
  resolveMediaUrl,
} from '@lib/seo';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

function mediaUrlFromValue(value: unknown): string | undefined {
  if (!value || typeof value !== 'object' || !('url' in value)) return undefined;
  const url = (value as { url?: unknown }).url;
  return typeof url === 'string' ? url : undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;

  const page = await fetchPublishedPageBySlug(locale, slug);
  if (!page) return {};

  const seo = await loadSeoContext(locale);
  const siteName = typeof seo.site?.siteName === 'string' ? seo.site.siteName : 'GoMapView';

  // Use page-specific SEO or fallback to defaults
  const pageSeo = page.seo as { title?: string; description?: string; ogImage?: unknown } | undefined;
  const title = pageSeo?.title || page.title || siteName;
  const description = pageSeo?.description || '';
  const ogImage = resolveMediaUrl(pageSeo?.ogImage) || resolveMediaUrl(page.heroImage);

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/${slug}`,
    title: String(title),
    description: String(description),
    siteName,
    ogImage,
  });
}

export default async function DynamicPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;

  // Don't handle 'home' slug here as it should be handled by the root page.tsx
  if (slug === 'home') {
    notFound();
  }

  const [page, serviceDocs] = await Promise.all([
    fetchPublishedPageBySlug(locale, slug),
    fetchServices(locale),
  ]);

  if (!page) {
    console.log(`Page not found for slug: ${slug} and locale: ${locale}`);
    notFound();
  }

  console.log('Rendering Page Data:', JSON.stringify(page, null, 2));

  const sections = (page.sections as Array<Record<string, unknown>> | undefined) ?? [];
  const heroImageUrl = mediaUrlFromValue(page.heroImage);

  const cmsServices: ServiceCardModel[] = serviceDocs.map((d: Record<string, unknown>) => ({
    slug: String(d.slug || ''),
    title: String(d.title || ''),
    shortDescription: d.shortDescription ? String(d.shortDescription) : undefined,
    icon: d.icon ? String(d.icon) : undefined,
    heroImage: mediaUrlFromValue(d.heroImage),
    ctaLabel: d.ctaLabel ? String(d.ctaLabel) : undefined,
    ctaHref: d.ctaHref ? String(d.ctaHref) : undefined,
  }));

  return (
    <>
      <SeoJsonLd schemas={[]} />
      <main className="min-h-screen bg-dark-950 pt-20">
        {/* Render Hero Image if exists and no immersive hero section is present */}
        {heroImageUrl && !sections.some(s => s.blockType === 'heroImmersive') && (
          <section className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
            <img 
              src={heroImageUrl} 
              alt={String(page.title || '')} 
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Container>
                <h1 className="text-4xl md:text-6xl font-bold text-white text-center">{page.title}</h1>
              </Container>
            </div>
          </section>
        )}

        {/* Render Legacy Content if exists */}
        {page.content && (
          <section className="py-12 md:py-20">
            <Container>
              <div className="prose prose-invert prose-lg max-w-4xl mx-auto">
                <CMSRichText data={page.content} />
              </div>
            </Container>
          </section>
        )}

        {/* Render Layout Sections */}
        <RenderedSections 
          locale={locale} 
          sections={sections} 
          cmsServices={cmsServices} 
        />
      </main>
    </>
  );
}
