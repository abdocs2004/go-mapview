import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@lib/i18n';
import Container from '@components/Container';
import Button from '@components/Button';
import { fetchPublishedPageByType, fetchServices } from '@lib/payload-queries';
import ServicesClient from './ServicesClient';
import { getSectionStyle } from '@lib/section-styles';
import { cn } from '@lib/utils';
import SeoJsonLd from '@components/SeoJsonLd';
import { buildBreadcrumbSchema, buildPageMetadata, loadSeoContext, resolveMediaUrl } from '@lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;
  const seo = await loadSeoContext(locale);
  const siteName = typeof seo.site?.siteName === 'string' ? seo.site.siteName : 'GoMapView';
  const title = locale === 'en' ? 'Services | GoMapView' : 'الخدمات | GoMapView';
  const description =
    typeof seo.site?.siteDescription === 'string'
      ? seo.site.siteDescription
      : locale === 'en'
        ? 'Explore GoMapView services: Matterport 3D virtual tours, 360 virtual tours, drone videos, photography, Google Maps and local SEO.'
        : 'استكشف خدمات GoMapView: جولات Matterport ثلاثية الأبعاد، جولات 360، فيديوهات درون، تصوير، خرائط جوجل وتحسين محلي.';
  const ogImage = resolveMediaUrl(seo.site?.logo);

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/services`,
    title,
    description,
    siteName,
    ogImage,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;
  const [services, servicesPage] = await Promise.all([
    fetchServices(locale),
    fetchPublishedPageByType(locale, 'services'),
  ]);

  const pageSections = ((servicesPage as Record<string, unknown> | null)?.sections as Array<Record<string, unknown>> | undefined) || [];
  const heroBlock = pageSections.find((s) => s.blockType === 'heroImmersive');
  const ctaBlock = pageSections.find((s) => s.blockType === 'ctaBanner');
  const heroStyle = getSectionStyle(heroBlock || { style: { themeVariant: 'dark', spacing: 'xl', alignment: 'center', headingSize: 'xl' } });
  const ctaStyle = getSectionStyle(ctaBlock || { style: { themeVariant: 'dark', spacing: 'xl', alignment: 'center' } });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: locale === 'en' ? 'Home' : 'الرئيسية', item: `/${locale}` },
    { name: locale === 'en' ? 'Services' : 'الخدمات', item: `/${locale}/services` },
  ]);

  return (
    <>
      <SeoJsonLd schemas={[breadcrumbSchema]} />
      <section className={cn('min-h-screen flex items-center justify-center pt-20 relative overflow-hidden', heroStyle.sectionClass)}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-premium-accent/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/15 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <Container className={heroStyle.containerClass}>
          <div className={cn('relative z-10 space-y-8', heroStyle.contentClass)}>
            <h1 className={cn('text-gradient', heroStyle.headingClass)}>
              {String(heroBlock?.title || (locale === 'en' ? 'Our Services' : 'خدماتنا'))}
            </h1>
            <p className={cn('text-dark-400 max-w-2xl mx-auto', heroStyle.textClass)}>
              {String(heroBlock?.subtitle || (locale === 'en'
                ? 'Comprehensive solutions for every virtual tour need'
                : 'حلول شاملة لكل احتياج من احتياجات الجولات الافتراضية'))}
            </p>
          </div>
        </Container>
      </section>

      <ServicesClient locale={locale} services={services as Array<Record<string, unknown>>} />

      <section className={ctaStyle.sectionClass}>
        <Container className={ctaStyle.containerClass}>
          <div className="relative rounded-2xl overflow-hidden border border-premium-accent/30 px-8 md:px-16 py-16 md:py-24 text-center space-y-6 bg-gradient-to-r from-premium-accent/10 to-blue-500/10">
            <h2 className={ctaStyle.headingClass}>
              {String(ctaBlock?.heading || (locale === 'en' ? 'Ready to get started?' : 'هل أنت مستعد للبدء؟'))}
            </h2>
            <p className={cn('text-dark-300 max-w-2xl mx-auto', ctaStyle.textClass)}>
              {String(ctaBlock?.text || (locale === 'en'
                ? 'Contact our team to discuss your project and find the perfect solution.'
                : 'تواصل مع فريقنا لمناقشة مشروعك.'))}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button size="lg" variant={ctaStyle.buttonVariant}>{String(ctaBlock?.buttonLabel || (locale === 'en' ? 'Contact Us' : 'اتصل بنا'))}</Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}