import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';

type Entry = CollectionEntry<'work'> | CollectionEntry<'archive'>;

/** Entries live at <locale>/<slug>; ids come from the glob loader. */
export const localeOf = (entry: Entry) => entry.id.split('/')[0] as Locale;
export const slugOf = (entry: Entry) => entry.id.split('/').slice(1).join('/');

export async function getWork(locale: Locale) {
  const all = await getCollection('work', (e) => localeOf(e) === locale && (import.meta.env.DEV || !e.data.draft));
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getArchive(locale: Locale) {
  const all = await getCollection('archive', (e) => localeOf(e) === locale);
  return all.sort((a, b) => a.data.order - b.data.order);
}
