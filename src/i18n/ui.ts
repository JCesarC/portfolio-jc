import { content, type UIKey } from '../data';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const htmlLang: Record<Locale, string> = { en: 'en', es: 'es-MX' };
export const ogLocale: Record<Locale, string> = { en: 'en_US', es: 'es_MX' };

/** UI strings come from src/data/locales/<lang>.json (`ui` block). */
export function useTranslations(locale: Locale) {
  const strings = content(locale).ui;
  return (key: UIKey) => strings[key]!;
}

/** Build a locale-aware path. `path` must start with "/". */
export function localePath(locale: Locale, path = '/'): string {
  if (locale === defaultLocale) return path;
  return path === '/' ? `/${locale}/` : `/${locale}${path}`;
}

/** Remove the locale prefix from a pathname, returning the locale-neutral path. */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (l === defaultLocale) continue;
    if (pathname === `/${l}` || pathname === `/${l}/`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en';
}

/** getStaticPaths helper for `[...lang]` routes: en at the root, es under /es. */
export function langPaths() {
  return locales.map((locale) => ({
    params: { lang: locale === defaultLocale ? undefined : locale },
    props: { locale },
  }));
}

/** Locale of a URL pathname, for components rendered inside MDX that don't receive props. */
export function localeFromPath(pathname: string): Locale {
  return (
    locales.find((l) => l !== defaultLocale && (pathname === `/${l}` || pathname.startsWith(`/${l}/`))) ?? defaultLocale
  );
}
