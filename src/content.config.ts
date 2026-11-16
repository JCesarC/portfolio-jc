import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Case studies of current work. One file per locale: src/content/work/<locale>/<slug>.mdx
 * The slug (file name) must match across locales so the language switch can link them.
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    company: z.string(),
    role: z.string(),
    period: z.string(),
    stack: z.array(z.string()),
    /** Short, verifiable outcomes. Shown on the card and at the top of the case study. */
    impact: z.array(z.object({ value: z.string(), label: z.string() })).max(3),
    /** Path relative to PUBLIC_MEDIA_BASE_URL (S3 + CloudFront), e.g. "work/llm-capacity.mp4". */
    video: z.string().optional(),
    poster: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

/** Early university and freelance projects, shown on a separate page. */
const archive = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/archive' }),
  schema: z.object({
    title: z.string(),
    year: z.string().optional(),
    kind: z.string(),
    order: z.number(),
    stack: z.array(z.string()),
    repos: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    video: z.string().optional(),
  }),
});

export const collections = { work, archive };
