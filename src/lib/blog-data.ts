export type LocalizedString = {
  en: string;
  ar: string;
};

export type BlogSection =
  | { kind: 'paragraph'; text: LocalizedString }
  | { kind: 'heading'; level: 1 | 2 | 3; text: LocalizedString }
  | { kind: 'list'; items: LocalizedString[] }
  | { kind: 'quote'; text: LocalizedString; cite?: string }
  | { kind: 'image'; src: string; alt: LocalizedString; caption?: LocalizedString }
  | { kind: 'callout'; title?: LocalizedString; text: LocalizedString }
  | { kind: 'links'; items: Array<{ label: LocalizedString; href: string }> };

export type BlogArticle = {
  slug: string;
  category: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  publishedAt: string;
  updatedAt: string;
  coverImage: string;
  coverAlt: LocalizedString;
  readTime: LocalizedString;
  seoDescription: LocalizedString;
  keywords: string[];
  faq: Array<{ question: LocalizedString; answer: LocalizedString }>;
  sections: BlogSection[];
};

import { ksaHospitality } from './blogs/ksa-hospitality';
import { ksaRestaurants } from './blogs/ksa-restaurants';
import { ksaRealEstate } from './blogs/ksa-real-estate';
import { uaeHotels } from './blogs/uae-hotels';
import { uaeRestaurants } from './blogs/uae-restaurants';
import { uaeRealEstate } from './blogs/uae-real-estate';

export const blogArticles: BlogArticle[] = [
  ksaHospitality,
  ksaRestaurants,
  ksaRealEstate,
  uaeHotels,
  uaeRestaurants,
  uaeRealEstate,
];

export function getBlogArticles(): BlogArticle[] {
  return blogArticles;
}

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}
