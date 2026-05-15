import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@components/Container';
import Button from '@components/Button';
import { CMSRichText } from '@components/CMSRichText';
import { fetchServiceBySlug } from '@lib/payload-queries';
import type { Locale } from '@lib/i18n';
import { absoluteMediaUrl } from '@lib/media-url';
import { getSectionStyle } from '@lib/section-styles';
import { cn } from '@lib/utils';
import Image from 'next/image';
import React from 'react';
import FAQItemClient from '@components/FAQItemClient';
import SeoJsonLd from '@components/SeoJsonLd';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildImageObjectSchema,
  buildPageMetadata,
  buildServiceSchema,
  buildVideoObjectSchema,
  loadSeoContext,
  plainText,
  resolveMediaUrl,
} from '@lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;
  const [doc, seo] = await Promise.all([fetchServiceBySlug(locale, slug), loadSeoContext(locale)]);
  if (!doc) {
    return buildPageMetadata({
      locale,
      pathname: `/${locale}/services/${slug}`,
      title: locale === 'en' ? 'Service' : 'الخدمة',
      description: locale === 'en' ? 'Service details' : 'تفاصيل الخدمة',
      siteName: typeof seo.site?.siteName === 'string' ? seo.site.siteName : 'GoMapView',
      ogImage: resolveMediaUrl(seo.site?.logo),
    });
  }

  const siteName = typeof seo.site?.siteName === 'string' ? seo.site.siteName : 'GoMapView';
  const title =
    typeof doc.seo === 'object' && doc.seo && typeof (doc.seo as Record<string, unknown>).title === 'string'
      ? String((doc.seo as Record<string, unknown>).title)
      : String(doc.title || siteName);
  const description =
    typeof doc.seo === 'object' && doc.seo && typeof (doc.seo as Record<string, unknown>).description === 'string'
      ? String((doc.seo as Record<string, unknown>).description)
      : plainText(doc.shortDescription) || plainText(doc.description) || '';
  const ogImage =
    resolveMediaUrl(
      typeof doc.seo === 'object' && doc.seo && typeof (doc.seo as Record<string, unknown>).ogImage === 'object'
        ? (doc.seo as Record<string, unknown>).ogImage
        : undefined
    ) || resolveMediaUrl(doc.heroImage) || resolveMediaUrl(seo.site?.logo);

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/services/${slug}`,
    title,
    description,
    siteName,
    ogImage,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;

  const doc = await fetchServiceBySlug(locale, slug);
  if (!doc) notFound();

  const heroVideo =
    doc.heroVideo && typeof doc.heroVideo === 'object' && 'url' in doc.heroVideo
      ? absoluteMediaUrl((doc.heroVideo as { url?: string }).url)
      : typeof doc.heroVideoUrl === 'string'
        ? doc.heroVideoUrl
        : '';

  const heroImage =
    doc.heroImage && typeof doc.heroImage === 'object' && 'url' in doc.heroImage
      ? absoluteMediaUrl((doc.heroImage as { url?: string }).url)
      : '';

  const features = Array.isArray(doc.features)
    ? (doc.features as Array<{ feature?: string }>).map((f) => f.feature).filter(Boolean)
    : [];

  const benefits = Array.isArray(doc.benefits)
    ? (doc.benefits as Array<{ title?: string; description?: string; icon?: string }>)
    : [];

  const processSteps = Array.isArray(doc.process)
    ? (doc.process as Array<{ stepNumber?: number; title?: string; description?: string; image?: unknown }>).sort(
        (a, b) => (a.stepNumber || 0) - (b.stepNumber || 0)
      )
    : [];

  const faqItems = Array.isArray(doc.faq)
    ? (doc.faq as Array<{ question?: string; answer?: string }>)
    : [];

  const gallery = Array.isArray(doc.gallery)
    ? (doc.gallery as Array<{ image?: unknown; caption?: string }>)
    : [];

  const ctaHref =
    typeof doc.ctaHref === 'string' && doc.ctaHref.length > 0
      ? doc.ctaHref.startsWith('http')
        ? doc.ctaHref
        : doc.ctaHref.startsWith('/')
          ? doc.ctaHref
          : `/${locale}/${doc.ctaHref.replace(/^\//, '')}`
      : `/${locale}/contact`;

  const detailStyle = getSectionStyle({ style: (doc as Record<string, unknown>).detailStyle || {} });
  const seoContextForSchema = await loadSeoContext(locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: locale === 'en' ? 'Home' : 'الرئيسية', item: `/${locale}` },
    { name: locale === 'en' ? 'Services' : 'الخدمات', item: `/${locale}/services` },
    { name: String(doc.title || slug), item: `/${locale}/services/${slug}` },
  ]);
  const faqSchema = buildFaqSchema(faqItems);
  const serviceSchema = buildServiceSchema({
    locale,
    url: `/${locale}/services/${slug}`,
    service: doc as Record<string, unknown>,
    context: seoContextForSchema,
  });
  const heroImageSchema = resolveMediaUrl(heroImage) || resolveMediaUrl(doc.heroImage) ? [
    buildImageObjectSchema({
      url: resolveMediaUrl(doc.heroImage) || heroImage,
      name: String(doc.title || slug),
      description: plainText(doc.shortDescription) || plainText(doc.description),
      pageUrl: `/${locale}/services/${slug}`,
    }),
  ] : [];
  const heroVideoSchema = heroVideo ? [
    buildVideoObjectSchema({
      url: heroVideo,
      name: String(doc.title || slug),
      description: plainText(doc.shortDescription) || plainText(doc.description),
      pageUrl: `/${locale}/services/${slug}`,
    }),
  ] : [];
  const gallerySchemas = gallery
    .map((item) => {
      const imgUrl =
        item.image && typeof item.image === 'object' && 'url' in (item.image as Record<string, unknown>)
          ? absoluteMediaUrl((item.image as { url?: string }).url)
          : typeof item.image === 'string'
            ? absoluteMediaUrl(item.image)
            : undefined;
      return imgUrl
        ? buildImageObjectSchema({
            url: imgUrl,
            name: String(item.caption || doc.title || slug),
            description: item.caption ? String(item.caption) : plainText(doc.shortDescription) || plainText(doc.description),
            pageUrl: `/${locale}/services/${slug}`,
          })
        : null;
    })
    .filter(Boolean);

  return (
    <>
      <SeoJsonLd schemas={[breadcrumbSchema, serviceSchema, faqSchema, ...heroImageSchema, ...heroVideoSchema, ...gallerySchemas]} />

      {/* Hero Section */}
      <section className={cn('relative min-h-[55vh] overflow-hidden border-b border-dark-800 pt-24', detailStyle.sectionClass)}>
        {heroVideo ? (
          <video className="absolute inset-0 h-full w-full object-cover opacity-50" src={heroVideo} autoPlay muted loop playsInline />
        ) : heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt={String(doc.title)} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-dark-950/20" />
        <Container className={cn('relative z-10', detailStyle.containerClass)}>
          <p className="text-sm uppercase tracking-[0.35em] text-premium-accent">
            {locale === 'en' ? 'Service' : 'خدمة'}
          </p>
          <h1 className={cn('mt-4 max-w-4xl', detailStyle.headingClass)}>{String(doc.title)}</h1>
          {doc.shortDescription ? (
            <p className="mt-6 max-w-2xl text-lg text-dark-300">{String(doc.shortDescription)}</p>
          ) : null}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={ctaHref}>
              <Button size="lg" variant={detailStyle.buttonVariant}>{String(doc.ctaLabel || (locale === 'en' ? 'Talk to us' : 'تواصل معنا'))}</Button>
            </Link>
            <Link href={`/${locale}/portfolio`}>
              <Button size="lg" variant="outline">
                {locale === 'en' ? 'See work' : 'الأعمال'}
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Overview Section */}
      <section className={detailStyle.sectionClass}>
        <Container className={cn('grid gap-12 lg:grid-cols-3', detailStyle.containerClass)}>
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-semibold">{locale === 'en' ? 'Overview' : 'نظرة عامة'}</h2>
            <CMSRichText data={doc.description} className="text-dark-300 leading-relaxed" />
          </div>
          <aside className={cn('space-y-4 p-6', detailStyle.cardClass)}>
            <h3 className="text-lg font-semibold">{locale === 'en' ? 'Highlights' : 'أبرز النقاط'}</h3>
            <ul className="space-y-3 text-sm text-dark-400">
              {features.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-premium-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      {/* Benefits Section */}
      {benefits.length > 0 && (
        <section className={cn('py-20 md:py-32 border-t border-dark-800', detailStyle.sectionClass)}>
          <Container className={detailStyle.containerClass}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              {locale === 'en' ? 'Key Benefits' : 'الفوائد الرئيسية'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className={cn('p-6 rounded-lg border border-dark-700 hover:border-premium-accent/50 transition-colors', detailStyle.cardClass)}>
                  {benefit.icon && (
                    <div className="text-3xl mb-4">
                      {benefit.icon === 'check' && '✓'}
                      {benefit.icon === 'star' && '⭐'}
                      {benefit.icon === 'zap' && '⚡'}
                      {benefit.icon === 'rocket' && '🚀'}
                      {benefit.icon === 'target' && '🎯'}
                      {benefit.icon === 'shield' && '🛡️'}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-dark-400 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Process Steps Section */}
      {processSteps.length > 0 && (
        <section className={cn('py-20 md:py-32 border-t border-dark-800', detailStyle.sectionClass)}>
          <Container className={detailStyle.containerClass}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              {locale === 'en' ? 'Our Process' : 'عملياتنا'}
            </h2>
            <div className="space-y-12">
              {processSteps.map((step, idx) => {
                const stepImage = step.image
                  ? typeof step.image === 'object' && 'url' in (step.image as Record<string, unknown>)
                    ? absoluteMediaUrl((step.image as { url?: string }).url)
                    : typeof step.image === 'string'
                      ? absoluteMediaUrl(step.image)
                      : undefined
                  : undefined;

                return (
                  <div
                    key={idx}
                    className={cn('grid grid-cols-1 md:grid-cols-2 gap-8 items-center', {
                      'md:grid-flow-dense': idx % 2 === 1,
                    })}
                  >
                    <div className="space-y-4">
                      <div className="inline-block px-4 py-2 bg-premium-accent/10 rounded-lg">
                        <span className="text-sm font-semibold text-premium-accent">
                          {locale === 'en' ? 'Step' : 'خطوة'} {step.stepNumber || idx + 1}
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold">{step.title}</h3>
                      <p className="text-dark-400 leading-relaxed">{step.description}</p>
                    </div>
                    {stepImage && (
                      <div className="relative h-80 rounded-lg overflow-hidden">
                        <Image src={stepImage} alt={String(step.title)} fill className="object-cover" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Gallery Section */}
      {gallery.length > 0 && (
        <section className={cn('py-20 md:py-32 border-t border-dark-800', detailStyle.sectionClass)}>
          <Container className={detailStyle.containerClass}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              {locale === 'en' ? 'Gallery' : 'المعرض'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((item, idx) => {
                const imgUrl = item.image
                  ? typeof item.image === 'object' && 'url' in (item.image as Record<string, unknown>)
                    ? absoluteMediaUrl((item.image as { url?: string }).url)
                    : typeof item.image === 'string'
                      ? absoluteMediaUrl(item.image)
                      : undefined
                  : undefined;

                return imgUrl ? (
                  <div key={idx} className="relative h-64 rounded-lg overflow-hidden group">
                    <Image src={imgUrl} alt={String(item.caption) || 'Gallery image'} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    {item.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm text-white">{item.caption}</p>
                      </div>
                    )}
                  </div>
                ) : null;
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Matterport Section */}
      {typeof doc.matterportEmbedUrl === 'string' && doc.matterportEmbedUrl && (
        <section className={cn('py-20 md:py-32 border-t border-dark-800', detailStyle.sectionClass)}>
          <Container className={detailStyle.containerClass}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              {locale === 'en' ? '3D Experience' : 'تجربة ثلاثية الأبعاد'}
            </h2>
            <div className="relative w-full h-96 md:h-screen rounded-lg overflow-hidden border border-dark-700">
              <iframe
                src={doc.matterportEmbedUrl}
                title="3D Tour"
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </Container>
        </section>
      )}

      {/* FAQ Section */}
      {faqItems.length > 0 && (
        <section className={cn('py-20 md:py-32 border-t border-dark-800', detailStyle.sectionClass)}>
          <Container className={cn('max-w-3xl', detailStyle.containerClass)}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              {locale === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
            </h2>
            <div className="space-y-4">
              {faqItems.map((faq, idx) => (
                <FAQItemClient
                  key={idx}
                  question={faq.question || ''}
                  answer={faq.answer || ''}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className={cn('py-20 md:py-32 border-t border-dark-800', detailStyle.sectionClass)}>
        <Container className={detailStyle.containerClass}>
          <div className="relative rounded-2xl overflow-hidden border border-premium-accent/30 px-8 md:px-16 py-16 md:py-24 text-center space-y-6 bg-gradient-to-r from-premium-accent/10 to-blue-500/10">
            <h2 className="text-3xl md:text-4xl font-bold">
              {locale === 'en' ? 'Ready to get started?' : 'هل أنت مستعد للبدء؟'}
            </h2>
            <p className="text-dark-300 max-w-2xl mx-auto">
              {locale === 'en'
                ? 'Let our experts help you implement this solution for your project.'
                : 'دع خبراءنا يساعدونك في تنفيذ هذا الحل لمشروعك.'}
            </p>
            <Link href={ctaHref}>
              <Button size="lg" variant={detailStyle.buttonVariant}>
                {String(doc.ctaLabel || (locale === 'en' ? 'Talk to us' : 'تواصل معنا'))}
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}


