import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LOCALES = {
  en: { code: 'en', label: 'English', rtl: false },
  ar: { code: 'ar', label: 'العربية', rtl: true },
};

export const DEFAULT_LOCALE = 'en';

export function isValidLocale(locale: string): locale is keyof typeof LOCALES {
  return locale in LOCALES;
}
