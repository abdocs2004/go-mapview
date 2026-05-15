import type { Locale } from './i18n';
import { getPayloadClient } from './payload-client';

type PayloadLocale = Locale;

export async function fetchPublishedHome(locale: PayloadLocale) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'pages',
      locale,
      fallbackLocale: false,
      depth: 2,
      limit: 1,
      where: {
        and: [{ slug: { equals: 'home' } }, { isPublished: { equals: true } }],
      },
    });
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function fetchPublishedPageByType(locale: PayloadLocale, pageType: string) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'pages',
      locale,
      fallbackLocale: false,
      depth: 2,
      limit: 1,
      where: {
        and: [{ pageType: { equals: pageType } }, { isPublished: { equals: true } }],
      },
    });
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function fetchPublishedPageBySlug(locale: PayloadLocale, slug: string) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'pages',
      locale,
      fallbackLocale: false,
      depth: 2,
      limit: 1,
      where: {
        and: [{ slug: { equals: slug } }, { isPublished: { equals: true } }],
      },
    });
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function fetchServices(locale: PayloadLocale) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'services',
      locale,
      fallbackLocale: false,
      depth: 1,
      limit: 100,
      sort: 'order',
    });
    return result.docs;
  } catch {
    return [];
  }
}

export async function fetchServiceBySlug(locale: PayloadLocale, slug: string) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'services',
      locale,
      fallbackLocale: false,
      depth: 2,
      limit: 1,
      where: { slug: { equals: slug } },
    });
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function fetchPortfolio(locale: PayloadLocale) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'portfolio',
      locale,
      fallbackLocale: false,
      depth: 2,
      limit: 100,
      sort: '-createdAt',
    });
    return result.docs;
  } catch {
    return [];
  }
}

export async function fetchPortfolioBySlug(locale: PayloadLocale, slug: string) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'portfolio',
      locale,
      fallbackLocale: false,
      depth: 2,
      limit: 1,
      where: { slug: { equals: slug } },
    });
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function fetchTeam(locale: PayloadLocale) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'team',
      locale,
      fallbackLocale: false,
      depth: 1,
      limit: 100,
      sort: 'order',
    });
    return result.docs;
  } catch {
    return [];
  }
}

export async function fetchTestimonials(locale: PayloadLocale, limit = 10, featuredOnly = false) {
  try {
    const payload = await getPayloadClient();
    const where: Array<Record<string, { equals: boolean }>> = [{ isPublished: { equals: true } }];
    if (featuredOnly) where.push({ featured: { equals: true } });
    const result = await payload.find({
      collection: 'testimonials',
      locale,
      fallbackLocale: false,
      depth: 1,
      limit,
      where: { and: where },
      sort: 'order',
    });
    return result.docs;
  } catch {
    return [];
  }
}

export async function fetchWhatWeDo() {
  // This project now uses a static "What We Do" section on the About page
  // and the CMS global has been removed. Return null so callers use local static data.
  return null;
}

export async function fetchMatterportExperience(locale: PayloadLocale) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.findGlobal({
      slug: 'matterport-experience',
      locale,
      fallbackLocale: false,
      depth: 1,
    });
    return result ?? null;
  } catch {
    return null;
  }
}
