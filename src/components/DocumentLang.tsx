'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { locales, localeConfig, type Locale } from '@lib/i18n';

function segmentLocale(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  return locales.includes(seg as Locale) ? (seg as Locale) : 'en';
}

export default function DocumentLang() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = segmentLocale(pathname || '');
    const rtl = localeConfig[locale]?.rtl ?? false;
    document.documentElement.lang = locale;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  }, [pathname]);

  return null;
}
