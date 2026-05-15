import type { Metadata } from 'next';
import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import WhatsAppFloat from '@components/WhatsAppFloat';
import SeoJsonLd from '@components/SeoJsonLd';
import type { Locale } from '@lib/i18n';
import { messages } from '@lib/i18n';
import {
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildPageMetadata,
  buildWebSiteSchema,
  loadSeoContext,
  plainText,
  resolveMediaUrl,
} from '@lib/seo';
import { fetchServices } from '@lib/payload-queries';
import { getPayloadClient } from '@lib/payload-client';

type NavigationItem = {
  label?: string;
  href?: string;
  isExternal?: boolean;
  subMenu?: Array<{ label?: string; href?: string }>;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : null;
}

function toStringValue(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function richTextToPlainText(value: unknown): string | undefined {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    const parts = value.map((item) => richTextToPlainText(item)).filter(Boolean) as string[];
    return parts.length ? parts.join(' ') : undefined;
  }

  const record = asRecord(value);
  if (!record) return undefined;
  if (typeof record.text === 'string') return record.text;
  if (typeof record.value === 'string') return record.value;

  if (Array.isArray(record.children)) {
    const parts = record.children.map((item) => richTextToPlainText(item)).filter(Boolean) as string[];
    return parts.length ? parts.join(' ') : undefined;
  }

  const root = asRecord(record.root);
  if (root && Array.isArray(root.children)) {
    const parts = root.children.map((item) => richTextToPlainText(item)).filter(Boolean) as string[];
    return parts.length ? parts.join(' ') : undefined;
  }

  return undefined;
}

function withLocale(locale: string, href: string): string {
  if (href.startsWith('http')) return href;
  const path = href.startsWith('/') ? href : `/${href}`;
  if (path === '/blog' || path.startsWith('/blog/')) return path;
  if (path === '/address') return path;
  if (path === `/${locale}` || path.startsWith(`/${locale}/`)) return path;
  return `/${locale}${path}`;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;
  const seo = await loadSeoContext(locale);

  const siteName = typeof seo.site?.siteName === 'string' ? seo.site.siteName : 'GoMapView';
  const title =
    plainText(
      seo.site?.seo && typeof seo.site.seo === 'object'
        ? (seo.site.seo as Record<string, unknown>).defaultTitle
        : undefined
    ) || siteName;
  const description =
    plainText(
      seo.site?.seo && typeof seo.site.seo === 'object'
        ? (seo.site.seo as Record<string, unknown>).defaultDescription
        : undefined
    ) ||
    plainText(seo.site?.siteDescription) ||
    'Professional Matterport and 360 virtual tour solutions for real estate, hotels, restaurants, commercial spaces, and businesses across Saudi Arabia and the Middle East.';
  const ogImage =
    resolveMediaUrl(
      seo.site?.seo && typeof seo.site.seo === 'object'
        ? (seo.site.seo as Record<string, unknown>).ogImage
        : undefined
    ) || resolveMediaUrl(seo.site?.logo);

  return buildPageMetadata({
    locale,
    pathname: `/${locale}`,
    title,
    description,
    siteName,
    ogImage,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === 'ar' ? 'ar' : 'en') as Locale;
  const m = messages[locale];

  const siteContext = await loadSeoContext(locale);
  const siteData = siteContext.site || {};
  const siteName = typeof siteData.siteName === 'string' ? siteData.siteName : 'GoMapView';
  const whatsapp = typeof siteData.whatsappNumber === 'string' ? siteData.whatsappNumber : undefined;
  const logoUrl = resolveMediaUrl(siteData.logo) || '/logo.png';

  const cmsServices = await fetchServices(locale);
  const serviceLinks = cmsServices.map(s => ({
    label: String(s.title),
    href: `/${locale}/services/${s.slug}`
  }));

  let navLinks: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
    children?: Array<{ label: string; href: string }>;
  }> = [
      { label: m.nav.home, href: `/${locale}` },
      { label: m.nav.about, href: `/${locale}/about` },
      { label: m.nav.services, href: `/${locale}/services`, children: serviceLinks },
      { label: m.nav.portfolio, href: `/${locale}/portfolio` },
      { label: m.nav.blog, href: `/${locale}/blog` },
      { label: m.nav.contact, href: `/${locale}/contact` },
    ];

  let headerStyle:
    | {
      isSticky?: boolean;
      isTransparent?: boolean;
      navbarTheme?: string;
      mobileMenuStyle?: string;
    }
    | undefined;
  let footerDescription: string | undefined;
  let footerQuickLinks: Array<{ label: string; href: string }> | undefined;
  let footerServicesLinks: Array<{ label: string; href: string }> | undefined;
  let footerContactInfo: { email?: string; phone?: string; address?: string } | undefined;
  let footerSocialLinks: Array<{ platform: string; url: string }> | undefined;
  let footerStyle: { layout?: string; theme?: string; socialIconStyle?: string } | undefined;
  let socialStyle: { iconStyle?: string } | undefined;

  try {
    const payload = await getPayloadClient();
    const [nav, footer, socialLinks] = await Promise.all([
      payload.findGlobal({ slug: 'navigation', locale, fallbackLocale: false }),
      payload.findGlobal({ slug: 'footer', locale, fallbackLocale: false }),
      payload.findGlobal({ slug: 'social-links', locale, fallbackLocale: false }),
    ]);

    const navData = asRecord(nav);
    const navStyle = asRecord(navData?.headerStyle);
    if (navStyle) {
      headerStyle = {
        isSticky: typeof navStyle.isSticky === 'boolean' ? navStyle.isSticky : undefined,
        isTransparent: typeof navStyle.isTransparent === 'boolean' ? navStyle.isTransparent : undefined,
        navbarTheme: toStringValue(navStyle.navbarTheme),
        mobileMenuStyle: toStringValue(navStyle.mobileMenuStyle),
      };
    }
    const items = navData?.mainNavigation;
    if (Array.isArray(items) && items.length > 0) {
      navLinks = items
        .map((item: NavigationItem) => {
          const href = withLocale(locale, toStringValue(item.href, '/'));
          return {
            label: toStringValue(item.label),
            href,
            isExternal: !!item.isExternal,
            children: Array.isArray(item.subMenu)
              ? item.subMenu
                .map((child) => ({
                  label: toStringValue(child.label),
                  href: withLocale(locale, toStringValue(child.href, '/')),
                }))
                .filter((child) => child.href !== '/address')
              : undefined,
          };
        })
        .filter((item) => item.href !== '/address');
    }

    const footerData = asRecord(footer);
    if (footerData) {
      const companyInfo = asRecord(footerData.companyInfo);
      footerDescription =
        richTextToPlainText(companyInfo?.description) ||
        richTextToPlainText(siteData.siteDescription) ||
        undefined;

      const quickLinks = footerData.quickLinks;
      if (Array.isArray(quickLinks) && quickLinks.length > 0) {
        footerQuickLinks = quickLinks
          .map((link: { label?: string; href?: string }) => ({
            label: toStringValue(link.label),
            href: withLocale(locale, toStringValue(link.href, '/')),
          }))
          .filter((link) => link.label && link.href);
      }

      const servicesLinks = footerData.servicesLinks;
      if (Array.isArray(servicesLinks) && servicesLinks.length > 0) {
        footerServicesLinks = servicesLinks
          .map((link: { label?: string; href?: string }) => ({
            label: toStringValue(link.label),
            href: withLocale(locale, toStringValue(link.href, '/')),
          }))
          .filter((link) => link.label && link.href);
      }

      const contactInfo = asRecord(footerData.contactInfo);
      if (contactInfo) {
        footerContactInfo = {
          email: contactInfo.email ? toStringValue(contactInfo.email) : toStringValue(siteData.contactEmail),
          phone: contactInfo.phone ? toStringValue(contactInfo.phone) : toStringValue(siteData.phone),
          address: contactInfo.address ? toStringValue(contactInfo.address) : toStringValue(siteData.address),
        };
      }

      const footerStyleData = asRecord(footerData.footerStyle);
      if (footerStyleData) {
        footerStyle = {
          layout: toStringValue(footerStyleData.layout),
          theme: toStringValue(footerStyleData.theme),
          socialIconStyle: toStringValue(footerStyleData.socialIconStyle),
        };
      }
    }

    const socialData = asRecord(socialLinks);
    const links = socialData?.links;
    if (Array.isArray(links) && links.length > 0) {
      footerSocialLinks = links
        .map((link: { platform?: string; url?: string }) => ({
          platform: toStringValue(link.platform),
          url: toStringValue(link.url),
        }))
        .filter((link) => link.platform && link.url);
    }

    const socialStyleData = asRecord(socialData?.style);
    if (socialStyleData) {
      socialStyle = {
        iconStyle: toStringValue(socialStyleData.iconStyle),
      };
    }
  } catch {
    // CMS unavailable — fall back to static navigation/footer data.
  }

  return (
    <>
      <SeoJsonLd
        schemas={[
          buildOrganizationSchema(siteContext),
          buildLocalBusinessSchema(siteContext),
          buildWebSiteSchema(siteContext),
        ]}
      />
      <Header
        logo={logoUrl}
        logoAlt={siteName}
        navLinks={navLinks}
        ctaLabel={locale === 'en' ? 'Get Started' : 'ابدأ الآن'}
        ctaHref={`/${locale}/contact`}
        whatsappNumber={whatsapp || '+966559551559'}
        styleSettings={headerStyle}
      />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer
        logo={logoUrl}
        logoAlt={siteName}
        description={
          footerDescription ||
          (locale === 'en'
            ? 'Transform the way people explore spaces with immersive virtual tours and 360° experiences.'
            : 'Transform the way people explore spaces with immersive virtual tours and 360° experiences.')
        }
        quickLinks={footerQuickLinks}
        servicesLinks={footerServicesLinks}
        contactInfo={footerContactInfo}
        socialLinks={footerSocialLinks}
        styleSettings={{ ...footerStyle, socialIconStyle: socialStyle?.iconStyle || footerStyle?.socialIconStyle }}
      />
      <WhatsAppFloat phone={whatsapp || '+966559551559'} />
    </>
  );
}
