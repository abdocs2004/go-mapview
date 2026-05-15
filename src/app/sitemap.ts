import type { MetadataRoute } from 'next';
import { blogArticles } from '@lib/blog-data';
import { fetchPortfolio, fetchServices } from '@lib/payload-queries';
import { locales, type Locale } from '@lib/i18n';
import { getSiteOrigin } from '@lib/seo';

function makeUrl(pathname: string): string {
  return `${getSiteOrigin()}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

function staticPages(locale: Locale): Array<MetadataRoute.Sitemap[number]> {
  const base = `/${locale}`;
  return [
    { url: makeUrl(base), changeFrequency: 'daily', priority: 1 },
    { url: makeUrl(`${base}/about`), changeFrequency: 'monthly', priority: 0.8 },
    { url: makeUrl(`${base}/services`), changeFrequency: 'weekly', priority: 0.9 },
    { url: makeUrl(`${base}/portfolio`), changeFrequency: 'weekly', priority: 0.8 },
    { url: makeUrl(`${base}/contact`), changeFrequency: 'monthly', priority: 0.7 },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [servicesEn, servicesAr, portfolioEn, portfolioAr] = await Promise.all([
    fetchServices('en'),
    fetchServices('ar'),
    fetchPortfolio('en'),
    fetchPortfolio('ar'),
  ]);

  const pages: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    pages.push(...staticPages(locale));
  }

  for (const service of servicesEn) {
    const slug = typeof service.slug === 'string' ? service.slug : '';
    if (slug) {
      pages.push({ url: makeUrl(`/en/services/${slug}`), changeFrequency: 'weekly', priority: 0.9 });
    }
  }

  for (const service of servicesAr) {
    const slug = typeof service.slug === 'string' ? service.slug : '';
    if (slug) {
      pages.push({ url: makeUrl(`/ar/services/${slug}`), changeFrequency: 'weekly', priority: 0.9 });
    }
  }

  for (const project of portfolioEn) {
    const slug = typeof project.slug === 'string' ? project.slug : '';
    if (slug) {
      pages.push({ url: makeUrl(`/en/portfolio/${slug}`), changeFrequency: 'weekly', priority: 0.8 });
    }
  }

  for (const project of portfolioAr) {
    const slug = typeof project.slug === 'string' ? project.slug : '';
    if (slug) {
      pages.push({ url: makeUrl(`/ar/portfolio/${slug}`), changeFrequency: 'weekly', priority: 0.8 });
    }
  }

  pages.push({ url: makeUrl('/blog'), changeFrequency: 'weekly', priority: 0.8 });

  for (const article of blogArticles) {
    pages.push({ url: makeUrl(`/blog/${article.slug}`), changeFrequency: 'monthly', priority: 0.7 });
  }

  return pages;
}
