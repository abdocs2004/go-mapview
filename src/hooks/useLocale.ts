'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import type { Locale } from '@lib/i18n';
import { localeConfig, locales } from '@lib/i18n';

function isValidLocale(locale: string | undefined): locale is Locale {
  return !!locale && (locales as readonly string[]).includes(locale);
}

export function useLocale(): Locale {
  const pathname = usePathname();
    const locale = pathname ? pathname.split('/')[1] : undefined;
  
  return isValidLocale(locale) ? locale : 'en';
}

export function useLocaleConfig() {
  const locale = useLocale();
  return localeConfig[locale];
}

export function useIsRTL(): boolean {
  const config = useLocaleConfig();
  return config.rtl;
}

export function useLocalizedPath(path: string): string {
  const locale = useLocale();
  return `/${locale}${path}`;
}

export function useNavigation() {
  const locale = useLocale();
  const isRTL = useIsRTL();

  return useMemo(
    () => ({
      locale,
      isRTL,
    }),
    [locale, isRTL]
  );
}
