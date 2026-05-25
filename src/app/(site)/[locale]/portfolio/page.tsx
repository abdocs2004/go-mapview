import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import type { Locale } from '@lib/i18n';
import Container from '@components/Container';
import Button from '@components/Button';
import { ExternalLink } from 'lucide-react';
import { fetchPortfolio, fetchPublishedPageByType } from '@lib/payload-queries';
import PortfolioClient from './PortfolioClient';
import { getSectionStyle } from '@lib/section-styles';
import { cn } from '@lib/utils';
import SeoJsonLd from '@components/SeoJsonLd';
import { buildBreadcrumbSchema, buildPageMetadata, loadSeoContext, resolveMediaUrl } from '@lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;
  const seo = await loadSeoContext(locale);
  const title = locale === 'en' ? 'Portfolio | GoMapView' : 'الأعمال | GoMapView';
  const description =
    locale === 'en'
      ? 'Explore GoMapView portfolio projects, including Matterport tours, 360 experiences, photography, and drone video work.'
      : 'استعرض مشاريع GoMapView، بما في ذلك جولات Matterport وتجارب 360 والتصوير وفيديوهات الدرون.';

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/portfolio`,
    title,
    description,
    siteName: typeof seo.site?.siteName === 'string' ? seo.site.siteName : 'GoMapView',
    ogImage: resolveMediaUrl(seo.site?.logo),
  });
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;

  const [projects, portfolioPage] = await Promise.all([
    fetchPortfolio(locale),
    fetchPublishedPageByType(locale, 'portfolio'),
  ]);

  const pageSections = ((portfolioPage as Record<string, unknown> | null)?.sections as Array<Record<string, unknown>> | undefined) || [];
  const heroBlock = pageSections.find((s) => s.blockType === 'heroImmersive');
  const ctaBlock = pageSections.find((s) => s.blockType === 'ctaBanner');
  const heroStyle = getSectionStyle(heroBlock || { style: { themeVariant: 'dark', spacing: 'xl', alignment: 'center', headingSize: 'xl' } });
  const ctaStyle = getSectionStyle(ctaBlock || { style: { themeVariant: 'dark', spacing: 'xl', alignment: 'center' } });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: locale === 'en' ? 'Home' : 'الرئيسية', item: `/${locale}` },
    { name: locale === 'en' ? 'Portfolio' : 'الأعمال', item: `/${locale}/portfolio` },
  ]);

  return (
    <>
      <SeoJsonLd schemas={[breadcrumbSchema]} />
      {/* Hero Section */}
      <section className={cn('min-h-screen flex items-center justify-center relative pt-20 overflow-hidden', heroStyle.sectionClass)}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-premium-accent/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/15 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <Container className={heroStyle.containerClass}>
          <div className={cn('relative z-10 space-y-8', heroStyle.contentClass)}>
            <h1 className={cn('text-gradient', heroStyle.headingClass)}>
              {String(heroBlock?.title || (locale === 'en' ? 'Our Portfolio' : 'أعمالنا'))}
            </h1>
            <p className={cn('text-dark-400 max-w-2xl mx-auto', heroStyle.textClass)}>
              {String(heroBlock?.subtitle || (locale === 'en'
                ? 'Showcase of our latest and greatest projects'
                : 'عرض لأحدث وأفضل مشاريعنا'))}
            </p>
          </div>
        </Container>
      </section>

      {/* Portfolio Grid */}
      <PortfolioClient locale={locale} projects={projects} />

      {/* CTA Section */}
      <section className={ctaStyle.sectionClass}>
        <Container className={ctaStyle.containerClass}>
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-premium-accent/20 to-blue-500/20" />
            <div className="relative px-8 md:px-16 py-16 md:py-24 text-center space-y-6 border border-premium-accent/30 rounded-2xl">
              <h2 className={ctaStyle.headingClass}>
                {String(ctaBlock?.heading || (locale === 'en'
                  ? 'Showcase Your Next Project'
                  : 'اعرض مشروعك التالي'))}
              </h2>
              <p className={cn('text-dark-300 max-w-2xl mx-auto', ctaStyle.textClass)}>
                {String(ctaBlock?.text || (locale === 'en'
                  ? 'Join our growing portfolio of successful projects.'
                  : 'انضم إلى محفظتنا المتنامية من المشاريع الناجحة.'))}
              </p>
              <Link href={`/${locale}/contact`}>
                <Button size="lg" variant={ctaStyle.buttonVariant} className="gap-2">
                  {String(ctaBlock?.buttonLabel || (locale === 'en' ? 'Start Your Project' : 'ابدأ مشروعك'))}
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
