/**
 * Content data layer.
 *
 * - `site.json`            language-neutral data (name, links, dates, stacks)
 * - `locales/<lang>.json`  every user-facing text for that language (profile, experience, UI strings)
 *
 * Both files are validated with zod at build time, and the locales are checked for parity
 * (same jobs, skills, education entries, UI keys and case-study links), so a missing
 * translation fails the build instead of shipping a blank.
 * Long-form content (case studies, projects) lives in src/content as MDX.
 */
import { z } from 'astro/zod';
import siteJson from './site.json';
import enJson from './locales/en.json';
import esJson from './locales/es.json';
import type { Locale } from '../i18n/ui';

const yearMonth = z.string().regex(/^\d{4}-\d{2}$/, 'Use YYYY-MM');

const siteSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  focus: z.string(),
  email: z.email(),
  links: z.object({ github: z.url(), linkedin: z.url(), source: z.url() }),
  /** Public CV PDFs in /public/cv/ (without phone number). null hides the download button. */
  cv: z.object({ en: z.string().nullable(), es: z.string().nullable() }),
  experience: z.array(
    z.object({
      id: z.string(),
      company: z.string(),
      start: yearMonth,
      /** null = current role */
      end: yearMonth.nullable(),
      stack: z.array(z.string()),
    }),
  ),
  education: z.array(
    z.object({
      id: z.string(),
      kind: z.enum(['degree', 'certification', 'course']),
      org: z.string(),
      period: z.string(),
      url: z.url().optional(),
    }),
  ),
  skills: z.array(z.object({ id: z.string(), items: z.array(z.string()) })),
});

const localeSchema = z.object({
  profile: z.object({
    title: z.string(),
    location: z.string(),
    /** Short professional pitch: meta description and social previews. */
    description: z.string(),
    /** Friendly welcome shown in the hero. */
    intro: z.string(),
    /** Longer CV summary. */
    summary: z.string(),
    now: z.string(),
    languages: z.string(),
    highlights: z.array(z.object({ value: z.string(), label: z.string() })),
  }),
  experience: z.record(
    z.string(),
    z.object({
      role: z.string(),
      location: z.string(),
      context: z.string(),
      /** A bullet with `caseStudy` is shown as a "Key project" card when that case study is published. */
      bullets: z.array(z.object({ text: z.string(), caseStudy: z.string().optional() })),
    }),
  ),
  education: z.record(z.string(), z.object({ title: z.string() })),
  skills: z.record(z.string(), z.string()),
  ui: z.record(z.string(), z.string()),
});

type LocaleContent = z.infer<typeof localeSchema>;

function parse<T>(schema: z.ZodType<T>, data: unknown, file: string): T {
  const result = schema.safeParse(data);
  if (!result.success) throw new Error(`Invalid ${file}:\n${z.prettifyError(result.error)}`);
  return result.data;
}

function sameKeys(label: string, expected: string[], actual: string[]) {
  const missing = expected.filter((k) => !actual.includes(k));
  const extra = actual.filter((k) => !expected.includes(k));
  if (missing.length || extra.length) {
    throw new Error(`${label}: missing [${missing.join(', ')}], unexpected [${extra.join(', ')}]`);
  }
}

export const site = parse(siteSchema, siteJson, 'src/data/site.json');

const locales: Record<Locale, LocaleContent> = {
  en: parse(localeSchema, enJson, 'src/data/locales/en.json'),
  es: parse(localeSchema, esJson, 'src/data/locales/es.json'),
};

for (const [lang, data] of Object.entries(locales)) {
  const file = `locales/${lang}.json`;
  sameKeys(
    `${file} experience`,
    site.experience.map((j) => j.id),
    Object.keys(data.experience),
  );
  sameKeys(
    `${file} education`,
    site.education.map((e) => e.id),
    Object.keys(data.education),
  );
  sameKeys(
    `${file} skills`,
    site.skills.map((s) => s.id),
    Object.keys(data.skills),
  );
  sameKeys(`${file} ui`, Object.keys(enJson.ui), Object.keys(data.ui));
  for (const job of site.experience) {
    const links = (l: Locale) => locales[l].experience[job.id]!.bullets.map((b) => b.caseStudy ?? '-').join();
    if (links(lang as Locale) !== links('en')) {
      throw new Error(`${file} experience.${job.id}: bullets must match en.json (same order and caseStudy links)`);
    }
  }
}

/** UI string keys, typed from en.json. */
export type UIKey = keyof typeof enJson.ui;

export const content = (locale: Locale) => locales[locale];

export const jobs = (locale: Locale) =>
  site.experience.map((job) => ({ ...job, ...locales[locale].experience[job.id]! }));

export const educationItems = (locale: Locale) =>
  site.education.map((item) => ({ ...item, title: locales[locale].education[item.id]!.title }));

export const skillGroups = (locale: Locale) =>
  site.skills.map((group) => ({ ...group, label: locales[locale].skills[group.id]! }));
