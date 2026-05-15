import type { Locale } from './i18n';

/** Default footer service paths — match CMS slug conventions */
export function defaultFooterServiceLinks(locale: Locale): { label: string; href: string }[] {
  const en = locale === 'en';
  const b = `/${locale}`;
  return [
    {
      label: en ? '360 Virtual Tours' : 'جولات 360',
      href: `${b}/services/360-virtual-tours`,
    },
    {
      label: en ? 'Matterport-style Tours' : 'جولات Matterport',
      href: `${b}/services/matterport-style-tours`,
    },
    {
      label: en ? 'Real Estate Photography' : 'تصوير العقارات',
      href: `${b}/services/real-estate-photography`,
    },
    {
      label: en ? 'Google Maps Integration' : 'خرائط جوجل',
      href: `${b}/services/google-maps-integration`,
    },
    {
      label: en ? 'Local SEO' : 'SEO محلي',
      href: `${b}/services/local-seo`,
    },
    {
      label: en ? 'Google Business' : 'أعمال جوجل',
      href: `${b}/services/google-business-optimization`,
    },
    {
      label: en ? 'Marketing' : 'تسويق',
      href: `${b}/services/marketing-solutions`,
    },
  ];
}
