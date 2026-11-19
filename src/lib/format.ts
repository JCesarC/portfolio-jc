import type { Locale } from '../i18n/ui';

const intlLocale: Record<Locale, string> = { en: 'en-US', es: 'es-MX' };

/** "May 2022 – Nov 2026" from YYYY-MM strings; a null end renders `present`. */
export function formatPeriod(start: string, end: string | null, locale: Locale, present: string): string {
  const fmt = new Intl.DateTimeFormat(intlLocale[locale], { month: 'short', year: 'numeric', timeZone: 'UTC' });
  const toDate = (ym: string) => new Date(`${ym}-01T00:00:00Z`);
  return `${fmt.format(toDate(start))} – ${end ? fmt.format(toDate(end)) : present}`;
}
