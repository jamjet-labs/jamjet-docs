export const defaultLocale = 'en';

export const locales = [
  { locale: 'en', name: 'English' },
  { locale: 'ja', name: 'Japanese' },
  { locale: 'zh', name: 'Chinese' },
  { locale: 'ko', name: 'Korean' },
  { locale: 'es', name: 'Spanish' },
  { locale: 'de', name: 'German' },
] as const;

export type Locale = (typeof locales)[number]['locale'];

export function getLocaleName(locale: string): string {
  return locales.find((l) => l.locale === locale)?.name ?? locale;
}
