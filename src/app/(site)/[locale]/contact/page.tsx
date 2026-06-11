import type { Metadata } from 'next';
import type { Locale } from '@lib/i18n';
import { fetchPublishedPageByType } from '@lib/payload-queries';
import { getSectionStyle } from '@lib/section-styles';
import { getPayloadClient } from '@lib/payload-client';
import ContactClient from './ContactClient';
import SeoJsonLd from '@components/SeoJsonLd';
import {
  buildBreadcrumbSchema,
  buildContactPageSchema,
  buildPageMetadata,
  loadSeoContext,
  resolveMediaUrl,
} from '@lib/seo';

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : null;
}

function toStringValue(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;
  const [contactPage, seo] = await Promise.all([fetchPublishedPageByType(locale, 'contact'), loadSeoContext(locale)]);
  const sections = ((contactPage as Record<string, unknown> | null)?.sections as Array<Record<string, unknown>> | undefined) || [];
  const heroBlock = sections.find((s) => s.blockType === 'heroImmersive');
  const contactBlock = sections.find((s) => s.blockType === 'contactBlock');
  const title = toStringValue(heroBlock?.title, locale === 'en' ? 'Contact Us | Matterport Services Middle East' : 'اتصل بنا | خدمات ماتربورت الشرق الأوسط');
  const description = toStringValue(
    heroBlock?.subtitle,
    locale === 'en'
      ? 'Contact GoMapView for professional Matterport 3D virtual tours, digital twin services, and commercial photography in Saudi Arabia and the UAE.'
      : 'تواصل مع GoMapView لخدمات ماتربورت الاحترافية والجولات الافتراضية ثلاثية الأبعاد والتوائم الرقمية في السعودية والإمارات.'
  );
  const ogImage = resolveMediaUrl((contactBlock as Record<string, unknown> | undefined)?.backgroundImage) || resolveMediaUrl(seo.site?.logo);

  return buildPageMetadata({
    locale,
    pathname: `/${locale}/contact`,
    title,
    description,
    siteName: typeof seo.site?.siteName === 'string' ? seo.site.siteName : 'GoMapView',
    ogImage,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;

  const [contactPage, payload] = await Promise.all([
    fetchPublishedPageByType(locale, 'contact'),
    getPayloadClient(),
  ]);

  const site = await payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: false });

  const siteData = asRecord(site);
  const sections = ((contactPage as Record<string, unknown> | null)?.sections as Array<Record<string, unknown>> | undefined) || [];

  const heroBlock = sections.find((s) => s.blockType === 'heroImmersive');
  const contactBlock = sections.find((s) => s.blockType === 'contactBlock');

  const heroStyle = getSectionStyle(heroBlock || { style: { themeVariant: 'dark', spacing: 'xl', alignment: 'center', headingSize: 'xl' } });
  const contentStyle = getSectionStyle(contactBlock || { style: { themeVariant: 'dark', spacing: 'xl' } });
  const mapStyle = getSectionStyle({ style: { themeVariant: 'dark', spacing: 'xl' } });
  const seo = await loadSeoContext(locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: locale === 'en' ? 'Home' : 'الرئيسية', item: `/${locale}` },
    { name: locale === 'en' ? 'Contact' : 'اتصل بنا', item: `/${locale}/contact` },
  ]);
  const contactPageSchema = buildContactPageSchema(seo, `/${locale}/contact`);

  const defaultPhone = '+966 55 955 1559';
  const defaultPhoneDigits = '+966559551559';
  const mapShortLink = 'https://maps.app.goo.gl/FiSRsbUEzJ25nuTc6';

  const contactInfo = [
    {
      key: 'email' as const,
      title: locale === 'en' ? 'Email' : 'البريد الإلكتروني',
      content: toStringValue(siteData?.contactEmail, 'info@gomapview.com'),
      link: `mailto:${toStringValue(siteData?.contactEmail, 'info@gomapview.com')}`,
    },
    {
      key: 'phone' as const,
      title: locale === 'en' ? 'Phone' : 'الهاتف',
      content: toStringValue(siteData?.phone, defaultPhone),
      link: `tel:${toStringValue(siteData?.phone, defaultPhoneDigits)}`,
    },
    {
      key: 'address' as const,
      title: locale === 'en' ? 'Address' : 'العنوان',
      content: toStringValue(siteData?.address, locale === 'en' ? 'Saudi Arabia' : 'المملكة العربية السعودية'),
      link: toStringValue(siteData?.googleMapsEmbedUrl, mapShortLink),
    },
    {
      key: 'whatsapp' as const,
      title: locale === 'en' ? 'WhatsApp' : 'واتساب',
      content: toStringValue(siteData?.whatsappNumber, defaultPhone),
      link: `https://wa.me/${toStringValue(siteData?.whatsappNumber, defaultPhoneDigits).replace(/\D/g, '')}`,
    },
  ];

  return (
    <>
      <SeoJsonLd schemas={[breadcrumbSchema, contactPageSchema]} />
      <ContactClient
        locale={locale}
        heroTitle={toStringValue(heroBlock?.title, locale === 'en' ? 'Get in Touch' : 'تواصل معنا')}
        heroSubtitle={toStringValue(heroBlock?.subtitle, locale === 'en'
          ? "Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
          : 'هل لديك سؤال؟ نود أن نسمع منك. أرسل لنا رسالة وسنرد في أسرع وقت.')}
        mapEmbedUrl={toStringValue(siteData?.googleMapsEmbedUrl) || 'https://maps.app.goo.gl/FiSRsbUEzJ25nuTc6'}
        contactInfo={contactInfo}
        heroStyle={heroStyle}
        contentStyle={contentStyle}
        mapStyle={mapStyle}
      />
    </>
  );
}
