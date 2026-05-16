import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { fetchPublishedHome, fetchServices, fetchTestimonials, fetchMatterportExperience } from '@lib/payload-queries';
import type { Locale } from '@lib/i18n';
import type { ServiceCardModel } from '@components/home/RenderedSections';
import SeoJsonLd from '@components/SeoJsonLd';
import {
  buildFaqSchema,
  buildImageObjectSchema,
  buildPageMetadata,
  buildReviewSchema,
  buildVideoObjectSchema,
  loadSeoContext,
  resolveMediaUrl,
} from '@lib/seo';

export const dynamic = 'force-dynamic';

function mediaUrlFromValue(value: unknown): string | undefined {
  if (!value || typeof value !== 'object' || !('url' in value)) return undefined;
  const url = (value as { url?: unknown }).url;
  return typeof url === 'string' ? url : undefined;
}

function toPlainText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';
  const record = value as Record<string, unknown>;
  if (typeof record.text === 'string') return record.text;
  if (typeof record.value === 'string') return record.value;
  if (Array.isArray(record.children)) return record.children.map(toPlainText).join(' ');
  if (Array.isArray(record.blocks)) return record.blocks.map(toPlainText).join(' ');
  const root = record.root as Record<string, unknown> | undefined;
  if (root && Array.isArray(root.children)) return root.children.map(toPlainText).join(' ');
  return '';
}

function resolveHomeFaqItems(locale: Locale, faqBlock: Record<string, unknown> | undefined) {
  const cmsItems = Array.isArray(faqBlock?.items) ? (faqBlock?.items as Array<Record<string, unknown>>) : [];
  if (cmsItems.length > 0) {
    return cmsItems.map((item) => ({
      question: String(item.question || item.title || ''),
      answer: item.answer || item.body || '',
    }));
  }

  return [
    {
      question: locale === 'en' ? 'What properties do you shoot?' : 'ما أنواع العقارات التي نصورها؟',
      answer:
        locale === 'en'
          ? 'Residential, commercial, hospitality, retail and landmark spaces — from single rooms to large estates.'
          : 'سكنية، تجارية، ضيافة، تجزئة ومعالم — من غرف فردية إلى ممتلكات واسعة.',
    },
    {
      question: locale === 'en' ? 'Do you offer Matterport-style tours?' : 'هل تقدمون جولات على طراز Matterport؟',
      answer:
        locale === 'en'
          ? 'Yes — we produce Matterport-inspired walkthroughs with photogrammetry-grade panoramas and optional 3D deliverables.'
          : 'نعم — ننتج جولات تجريبية مستوحاة من Matterport مع بانورامات عالية الجودة وخيارات تسليم ثلاثية الأبعاد.',
    },
    {
      question: locale === 'en' ? 'How long does a typical capture take?' : 'كم يستغرق التصوير عادة؟',
      answer:
        locale === 'en'
          ? 'Small properties often finish within a few hours; larger sites and commercial interiors may take a day or more.'
          : 'المواقع الصغيرة عادة تنتهي خلال ساعات؛ المواقع الكبيرة قد تحتاج يوماً أو أكثر.',
    },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;
  const seo = await loadSeoContext(locale);
  const siteName = typeof seo.site?.siteName === 'string' ? seo.site.siteName : 'GoMapView';
  const defaultTitle =
    seo.site?.seo && typeof seo.site.seo === 'object' && typeof (seo.site.seo as Record<string, unknown>).defaultTitle === 'string'
      ? String((seo.site.seo as Record<string, unknown>).defaultTitle)
      : siteName;
  const defaultDescription =
    seo.site?.seo && typeof seo.site.seo === 'object' && typeof (seo.site.seo as Record<string, unknown>).defaultDescription === 'string'
      ? String((seo.site.seo as Record<string, unknown>).defaultDescription)
      : 'Immersive capture · Matterport-grade delivery for real estate, hospitality, retail & landmarks.';
  const ogImage =
    resolveMediaUrl(seo.site?.seo && typeof seo.site.seo === 'object' ? (seo.site.seo as Record<string, unknown>).ogImage : undefined) ||
    resolveMediaUrl(seo.site?.logo);

  return buildPageMetadata({
    locale,
    pathname: `/${locale}`,
    title: defaultTitle,
    description: defaultDescription,
    siteName,
    ogImage,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;

  const [homeDoc, serviceDocs, matterportData] = await Promise.all([
    fetchPublishedHome(locale),
    fetchServices(locale),
    fetchMatterportExperience(locale),
  ]);
  const testimonials = await fetchTestimonials(locale, 12);

  const sections = (homeDoc?.sections as Array<Record<string, unknown>> | undefined) ?? [];
  const heroBlock = sections.find((s) => s.blockType === 'heroImmersive');
  const restSections = sections.filter((s) => s.blockType !== 'heroImmersive');
  const faqBlock = sections.find((s) => s.blockType === 'faqBlock') as Record<string, unknown> | undefined;
  const heroVideoUrl = typeof heroBlock?.videoUrl === 'string' ? heroBlock.videoUrl : undefined;
  const heroPosterUrl = mediaUrlFromValue(heroBlock?.poster);
  const faqItems = resolveHomeFaqItems(locale, faqBlock);
  const faqSchema = buildFaqSchema(faqItems);
  const reviewSchema = buildReviewSchema({
    testimonials: testimonials as Array<Record<string, unknown>>,
    url: `/${locale}`,
    name: 'GoMapView',
  });
  const videoSchemas = heroVideoUrl
    ? [buildVideoObjectSchema({ url: heroVideoUrl, name: String(heroBlock?.title || 'GoMapView'), description: String(heroBlock?.subtitle || '') })]
    : [];
  const imageSchemas = heroPosterUrl
    ? [buildImageObjectSchema({ url: heroPosterUrl, name: String(heroBlock?.title || 'GoMapView'), description: String(heroBlock?.subtitle || '') })]
    : [];

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
      <SeoJsonLd schemas={[faqSchema, reviewSchema, ...videoSchemas, ...imageSchemas].filter(Boolean)} />
      <HomePageClient locale={locale} heroBlock={heroBlock} sections={restSections} cmsServices={cmsServices} testimonials={testimonials} matterportData={matterportData} />
    </>
  );
}
