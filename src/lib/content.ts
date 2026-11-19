import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, locales, type Locale } from '../i18n/ui';
import { jobs } from '../data';

type Entry = CollectionEntry<'work'> | CollectionEntry<'projects'> | CollectionEntry<'archive'>;

/** Entries live at <locale>/<slug>; ids come from the glob loader. */
export const localeOf = (entry: Entry) => entry.id.split('/')[0] as Locale;
export const slugOf = (entry: Entry) => entry.id.split('/').slice(1).join('/');

const visible = (draft: boolean) => import.meta.env.DEV || !draft;
const byOrder = (a: { data: { order: number } }, b: { data: { order: number } }) => a.data.order - b.data.order;

export async function getWork(locale: Locale, job?: string) {
  const all = await getCollection(
    'work',
    (e) => localeOf(e) === locale && visible(e.data.draft) && (!job || e.data.job === job),
  );
  return all.sort(byOrder);
}

export async function getProjects(locale: Locale) {
  return (await getCollection('projects', (e) => localeOf(e) === locale && visible(e.data.draft))).sort(byOrder);
}

export async function getArchive(locale: Locale) {
  return (await getCollection('archive', (e) => localeOf(e) === locale)).sort(byOrder);
}

/**
 * Jobs with their published case studies. Bullets that point to a published case study are
 * removed from the plain list because they are rendered as "Key project" cards.
 */
export async function getJobs(locale: Locale) {
  return Promise.all(
    jobs(locale).map(async (job) => {
      const cases = await getWork(locale, job.id);
      const published = new Set(cases.map(slugOf));
      const bullets = job.bullets.filter((b) => !b.caseStudy || !published.has(b.caseStudy)).map((b) => b.text);
      return { ...job, cases, bullets };
    }),
  );
}

/**
 * getStaticPaths for `[...lang]/<section>/[slug]` routes. Fails the build when an entry exists in
 * one language but not the other, so the language switch never leads to a 404.
 */
export async function localizedEntryPaths<T extends Entry>(get: (locale: Locale) => Promise<T[]>) {
  const byLocale = new Map(await Promise.all(locales.map(async (l) => [l, await get(l)] as const)));
  const slugs = (l: Locale) => byLocale.get(l)!.map(slugOf).sort().join(', ');
  for (const l of locales) {
    if (slugs(l) !== slugs(defaultLocale)) {
      throw new Error(`Translation mismatch: ${defaultLocale} has [${slugs(defaultLocale)}], ${l} has [${slugs(l)}]`);
    }
  }
  return locales.flatMap((locale) => {
    const entries = byLocale.get(locale)!;
    return entries.map((entry, i) => ({
      params: { lang: locale === defaultLocale ? undefined : locale, slug: slugOf(entry) },
      props: { locale, entry, next: entries.length > 1 ? entries[(i + 1) % entries.length] : undefined },
    }));
  });
}
