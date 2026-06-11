import type { Metadata } from 'next';
import { absoluteMediaUrl } from './media-url';
import type { Locale } from './i18n';
import { getPayloadClient } from './payload-client';

type AnyRecord = Record<string, unknown>;

export type SeoSchema = Record<string, unknown>;

export type SeoSiteContext = {
  site: AnyRecord | null;
  footer: AnyRecord | null;
  socialLinks: AnyRecord | null;
};

export type SeoPageMetadataInput = {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  ogImage?: string;
  siteName?: string;
  noindex?: boolean;
};

export type SeoStandaloneMetadataInput = {
  pathname: string;
  title: string;
  description: string;
  ogImage?: string;
  siteName?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
};

const LOCALIZED_LANGUAGES: Record<Locale, string> = {
  en: 'en-US',
  ar: 'ar-SA',
};

const SERVICE_AREAS = ['Saudi Arabia', 'Riyadh', 'Jeddah', 'Dammam', 'United Arab Emirates', 'Dubai', 'Middle East'];

function asRecord(value: unknown): AnyRecord | null {
  return value && typeof value === 'object' ? (value as AnyRecord) : null;
}

export function getSiteOrigin(): string {
  const origin = process.env.NEXT_PUBLIC_SERVER_URL || 'https://gomapview.com';
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
    return 'https://gomapview.com';
  }
  return origin.replace(/\/$/, '');
}

export function toAbsoluteUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  const origin = getSiteOrigin();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalized}`;
}

export function plainText(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === 'string') return value.trim() || undefined;
  if (Array.isArray(value)) {
    const items = value.map((item) => plainText(item)).filter(Boolean) as string[];
    return items.length ? items.join(' ').trim() : undefined;
  }

  const record = asRecord(value);
  if (!record) return undefined;

  if (typeof record.text === 'string') return record.text.trim() || undefined;
  if (typeof record.value === 'string') return record.value.trim() || undefined;
  if (typeof record.content === 'string') return record.content.trim() || undefined;

  if (Array.isArray(record.children)) {
    const items = record.children.map((item) => plainText(item)).filter(Boolean) as string[];
    if (items.length) return items.join(' ').trim();
  }

  if (Array.isArray(record.blocks)) {
    const items = record.blocks.map((item) => plainText(item)).filter(Boolean) as string[];
    if (items.length) return items.join(' ').trim();
  }

  if (record.root && typeof record.root === 'object') {
    const root = asRecord(record.root);
    if (root?.children && Array.isArray(root.children)) {
      const items = root.children.map((item) => plainText(item)).filter(Boolean) as string[];
      if (items.length) return items.join(' ').trim();
    }
  }

  return undefined;
}

export function resolveMediaUrl(value: unknown): string | undefined {
  const record = asRecord(value);
  if (record && typeof record.url === 'string') return absoluteMediaUrl(record.url);
  if (typeof value === 'string') return absoluteMediaUrl(value);
  return undefined;
}

function normalizeList(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  return values.map((value) => (typeof value === 'string' ? value.trim() : '')).filter(Boolean);
}

export async function loadSeoContext(locale: Locale): Promise<SeoSiteContext> {
  try {
    const payload = await getPayloadClient();
    const [site, footer, socialLinks] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: false }),
      payload.findGlobal({ slug: 'footer', locale, fallbackLocale: false }),
      payload.findGlobal({ slug: 'social-links', locale, fallbackLocale: false }),
    ]);

    return {
      site: asRecord(site),
      footer: asRecord(footer),
      socialLinks: asRecord(socialLinks),
    };
  } catch {
    return { site: null, footer: null, socialLinks: null };
  }
}

export function buildPageMetadata(input: SeoPageMetadataInput): Metadata {
  const { locale, pathname, title, description, ogImage, siteName, noindex } = input;
  const canonicalPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const canonicalUrl = toAbsoluteUrl(canonicalPath) || canonicalPath;
  const alternatePath = canonicalPath.replace(/^\/(en|ar)(?=\/|$)/, '');
  const enUrl = toAbsoluteUrl(`/en${alternatePath === '/' ? '' : alternatePath}`) || canonicalUrl;
  const arUrl = toAbsoluteUrl(`/ar${alternatePath === '/' ? '' : alternatePath}`) || canonicalUrl;

  const image = ogImage ? toAbsoluteUrl(ogImage) : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: enUrl,
        ar: arUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteName || 'GoMapView',
      locale: LOCALIZED_LANGUAGES[locale],
      type: 'website',
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function buildStandalonePageMetadata(input: SeoStandaloneMetadataInput): Metadata {
  const { pathname, title, description, ogImage, siteName, noindex, type = 'website' } = input;
  const canonicalPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const canonicalUrl = toAbsoluteUrl(canonicalPath) || canonicalPath;
  const image = ogImage ? toAbsoluteUrl(ogImage) : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteName || 'GoMapView',
      type,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function buildOrganizationSchema(context: SeoSiteContext): SeoSchema {
  const site = context.site || {};
  const footer = context.footer || {};
  const socialLinks = context.socialLinks || {};
  const siteName = typeof site.siteName === 'string' ? site.siteName : 'GoMapView';
  const description =
    plainText(site.siteDescription) || plainText(site?.seo && typeof site.seo === 'object' ? (site.seo as AnyRecord).defaultDescription : undefined) ||
    'Professional Matterport and 360 virtual tour solutions for real estate, hotels, restaurants, commercial spaces, and businesses across Saudi Arabia and the Middle East.';
  const logo = resolveMediaUrl(site.logo) || resolveMediaUrl((site.seo as AnyRecord | undefined)?.ogImage);
  const contactEmail = typeof site.contactEmail === 'string' ? site.contactEmail : undefined;
  const phone = typeof site.phone === 'string' ? site.phone : undefined;
  const whatsapp = typeof site.whatsappNumber === 'string' ? site.whatsappNumber : undefined;
  const sameAs = normalizeList((socialLinks.links as Array<{ url?: string }> | undefined)?.map((link) => link.url));
  const address = plainText(site.address) || plainText((footer.contactInfo as AnyRecord | undefined)?.address);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${getSiteOrigin()}#organization`,
    name: siteName,
    alternateName: 'GoMapView',
    description,
    url: getSiteOrigin(),
    logo,
    image: logo,
    sameAs,
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'Place', name })),
    knowsLanguage: ['en', 'ar'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English', 'Arabic'],
        email: contactEmail,
        telephone: phone,
        areaServed: SERVICE_AREAS,
      },
      ...(whatsapp
        ? [
            {
              '@type': 'ContactPoint',
              contactType: 'WhatsApp support',
              availableLanguage: ['English', 'Arabic'],
              telephone: whatsapp,
              areaServed: SERVICE_AREAS,
            },
          ]
        : []),
    ],
    email: contactEmail,
    telephone: phone,
    address: address
      ? {
          '@type': 'PostalAddress',
          addressCountry: 'SA',
          streetAddress: address,
        }
      : undefined,
    language: ['en', 'ar'],
    genre: 'Virtual Tour & Matterport Services',
  };
}

export function buildLocalBusinessSchema(context: SeoSiteContext): SeoSchema {
  const site = context.site || {};
  const footer = context.footer || {};
  const siteName = typeof site.siteName === 'string' ? site.siteName : 'GoMapView';
  const description =
    plainText(site.siteDescription) ||
    'Professional Matterport and 360 virtual tour solutions for real estate, hotels, restaurants, commercial spaces, and businesses across Saudi Arabia and the Middle East.';
  const contactEmail = typeof site.contactEmail === 'string' ? site.contactEmail : undefined;
  const phone = typeof site.phone === 'string' ? site.phone : undefined;
  const whatsapp = typeof site.whatsappNumber === 'string' ? site.whatsappNumber : undefined;
  const address = plainText(site.address) || plainText((footer.contactInfo as AnyRecord | undefined)?.address);

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${getSiteOrigin()}#localbusiness`,
    name: siteName,
    description,
    url: getSiteOrigin(),
    email: contactEmail,
    telephone: phone,
    image: resolveMediaUrl(site.logo),
    logo: resolveMediaUrl(site.logo),
    priceRange: '$$',
    currenciesAccepted: 'SAR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    availableLanguage: ['English', 'Arabic'],
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'Place', name })),
    serviceArea: SERVICE_AREAS.map((name) => ({ '@type': 'Place', name })),
    knowsAbout: [
      'Matterport 3D Virtual Tours',
      'Matterport Saudi Arabia',
      'Matterport UAE',
      'Virtual Tours for Hotels',
      'Virtual Tours for Restaurants',
      'Digital Twin Services',
      'Real Estate Photography',
      'Commercial Property Virtual Tours',
    ],
    address: address
      ? {
          '@type': 'PostalAddress',
          addressCountry: 'SA',
          streetAddress: address,
        }
      : undefined,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        availableLanguage: ['English', 'Arabic'],
        email: contactEmail,
        telephone: phone,
      },
      ...(whatsapp
        ? [
            {
              '@type': 'ContactPoint',
              contactType: 'WhatsApp',
              availableLanguage: ['English', 'Arabic'],
              telephone: whatsapp,
            },
          ]
        : []),
    ],
  };
}

export function buildWebSiteSchema(context: SeoSiteContext): SeoSchema {
  const site = context.site || {};
  const siteName = typeof site.siteName === 'string' ? site.siteName : 'GoMapView';
  const description = plainText(site.siteDescription) || 'Immersive virtual tours and 360° experiences.';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${getSiteOrigin()}#website`,
    url: getSiteOrigin(),
    name: siteName,
    description,
    inLanguage: ['en-US', 'ar-SA'],
    publisher: {
      '@id': `${getSiteOrigin()}#organization`,
    },
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; item: string }>): SeoSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.item) || item.item,
    })),
  };
}

export function buildFaqSchema(items: Array<{ question?: string; answer?: unknown }>): SeoSchema | null {
  const mainEntity = items
    .map((item) => {
      const question = typeof item.question === 'string' ? item.question.trim() : '';
      const answer = plainText(item.answer);
      if (!question || !answer) return null;
      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      };
    })
    .filter(Boolean);

  if (!mainEntity.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

export function buildServiceSchema(input: {
  locale: Locale;
  url: string;
  service: AnyRecord;
  context: SeoSiteContext;
}): SeoSchema {
  const { locale, url, service, context } = input;
  const siteName = typeof context.site?.siteName === 'string' ? context.site.siteName : 'GoMapView';
  const title = typeof service.title === 'string' ? service.title : 'Service';
  const description =
    plainText(service.shortDescription) || plainText(service.description) || 'Professional virtual tour service.';
  const image = resolveMediaUrl(service.heroImage) || resolveMediaUrl((service.seo as AnyRecord | undefined)?.ogImage);
  const keywords = typeof service.keywords === 'string' ? service.keywords.split(',').map((item) => item.trim()).filter(Boolean) : [];
  const videos = normalizeVideoUrls(service.heroVideo, service.heroVideoUrl, service.matterportEmbedUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    url,
    name: title,
    serviceType: title,
    description,
    provider: {
      '@id': `${getSiteOrigin()}#organization`,
      name: siteName,
    },
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'Place', name })),
    availableLanguage: ['English', 'Arabic'],
    inLanguage: locale === 'ar' ? 'ar-SA' : 'en-US',
    keywords,
    image,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: title,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: title,
            description,
          },
        },
      ],
    },
    video: videos.length ? videos.map((video) => buildVideoObjectSchema({ url: video, name: title, description, pageUrl: url })) : undefined,
  };
}

export function buildContactPageSchema(context: SeoSiteContext, url: string): SeoSchema {
  const organization = buildOrganizationSchema(context);
  const contactEmail = typeof context.site?.contactEmail === 'string' ? context.site.contactEmail : undefined;
  const phone = typeof context.site?.phone === 'string' ? context.site.phone : undefined;
  const whatsapp = typeof context.site?.whatsappNumber === 'string' ? context.site.whatsappNumber : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#contactpage`,
    url,
    name: 'Contact GoMapView',
    description: 'Contact GoMapView for Matterport, 360 virtual tours, photography, drone videos, and Google Maps visibility services.',
    mainEntity: organization,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: contactEmail,
        telephone: phone,
        availableLanguage: ['English', 'Arabic'],
      },
      ...(whatsapp
        ? [
            {
              '@type': 'ContactPoint',
              contactType: 'WhatsApp',
              telephone: whatsapp,
              availableLanguage: ['English', 'Arabic'],
            },
          ]
        : []),
    ],
  };
}

export function buildReviewSchema(input: {
  testimonials: Array<AnyRecord>;
  url: string;
  name: string;
}): SeoSchema | null {
  const reviews = input.testimonials
    .map((testimonial) => {
      const name = plainText(testimonial.name);
      const reviewBody = plainText(testimonial.content);
      const rating = typeof testimonial.rating === 'number' ? testimonial.rating : Number(testimonial.rating);
      if (!name || !reviewBody) return null;
      return {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name,
        },
        reviewBody,
        reviewRating: Number.isFinite(rating)
          ? {
              '@type': 'Rating',
              ratingValue: rating,
              bestRating: 5,
              worstRating: 1,
            }
          : undefined,
        itemReviewed: {
          '@type': 'Organization',
          name: input.name,
        },
      };
    })
    .filter(Boolean);

  if (!reviews.length) return null;

  const ratings = reviews
    .map((review) => (review as AnyRecord).reviewRating as AnyRecord | undefined)
    .filter(Boolean)
    .map((rating) => Number(rating?.ratingValue))
    .filter((value) => Number.isFinite(value));

  const averageRating = ratings.length ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${input.url}#reviews`,
    name: input.name,
    url: input.url,
    review: reviews,
    aggregateRating: averageRating
      ? {
          '@type': 'AggregateRating',
          ratingValue: Number(averageRating.toFixed(1)),
          reviewCount: reviews.length,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
  };
}

export function buildImageObjectSchema(input: {
  url: string;
  name: string;
  description?: string;
  pageUrl?: string;
}): SeoSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: toAbsoluteUrl(input.url) || input.url,
    url: input.pageUrl || toAbsoluteUrl(input.url) || input.url,
    name: input.name,
    description: input.description,
  };
}

export function buildBlogPostingSchema(input: {
  url: string;
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  keywords?: string[];
  articleSection?: string;
}): SeoSchema {
  const image = input.image ? toAbsoluteUrl(input.image) || input.image : undefined;
  const authorName = input.authorName || 'GoMapView Editorial';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    mainEntityOfPage: toAbsoluteUrl(input.url) || input.url,
    url: toAbsoluteUrl(input.url) || input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: getSiteOrigin(),
    },
    publisher: {
      '@id': `${getSiteOrigin()}#organization`,
    },
    image: image ? [image] : undefined,
    articleSection: input.articleSection,
    keywords: input.keywords && input.keywords.length ? input.keywords.join(', ') : undefined,
    inLanguage: 'en-US',
  };
}

export function buildArticleSchema(input: {
  url: string;
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  keywords?: string[];
  articleSection?: string;
}): SeoSchema {
  const schema = buildBlogPostingSchema(input);
  return {
    ...schema,
    '@type': 'Article',
  };
}

export function buildVideoObjectSchema(input: {
  url: string;
  name: string;
  description?: string;
  pageUrl?: string;
}): SeoSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    contentUrl: toAbsoluteUrl(input.url) || input.url,
    embedUrl: toAbsoluteUrl(input.url) || input.url,
    url: input.pageUrl || toAbsoluteUrl(input.url) || input.url,
    name: input.name,
    description: input.description,
  };
}

function normalizeVideoUrls(...values: Array<unknown>): string[] {
  return values
    .flatMap((value) => {
      if (!value) return [];
      if (typeof value === 'string') return [value];
      const record = asRecord(value);
      if (record && typeof record.url === 'string') return [record.url];
      return [];
    })
    .filter(Boolean);
}
