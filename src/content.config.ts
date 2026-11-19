import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Case studies from professional roles, linked from the Experience section. One file per locale: src/content/work/<locale>/<slug>.mdx
 * The slug (file name) must match across locales so the language switch can link them.
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    /** Must match an experience `id` in src/data/site.json. */
    job: z.string(),
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

/**
 * Personal projects (the "Projects" section). One file per locale: src/content/projects/<locale>/<slug>.mdx
 * The MDX body becomes the project's detail page.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    status: z.enum(['building', 'live', 'archived']),
    stack: z.array(z.string()),
    repo: z.url().optional(),
    demo: z.url().optional(),
    impact: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .max(3)
      .default([]),
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

export const collections = { work, projects, archive };
