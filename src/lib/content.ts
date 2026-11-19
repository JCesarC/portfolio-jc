import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';

type Entry = CollectionEntry<'work'> | CollectionEntry<'projects'> | CollectionEntry<'archive'>;

/** Entries live at <locale>/<slug>; ids come from the glob loader. */
export const localeOf = (entry: Entry) => entry.id.split('/')[0] as Locale;
export const slugOf = (entry: Entry) => entry.id.split('/').slice(1).join('/');

const visible = (draft: boolean) => import.meta.env.DEV || !draft;

export async function getWork(locale: Locale, job?: string) {
  const all = await getCollection(
    'work',
    (e) => localeOf(e) === locale && visible(e.data.draft) && (!job || e.data.job === job),
  );
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getProjects(locale: Locale) {
  const all = await getCollection('projects', (e) => localeOf(e) === locale && visible(e.data.draft));
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getArchive(locale: Locale) {
  const all = await getCollection('archive', (e) => localeOf(e) === locale);
  return all.sort((a, b) => a.data.order - b.data.order);
}
