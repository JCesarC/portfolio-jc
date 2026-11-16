# Julio Cantún — Portfolio

Personal site of Julio César Cantún Páez, Software Engineer focused on AI / LLM applications.
Bilingual (English at `/`, Spanish at `/es/`), fully static, no client-side framework.

## Stack

- **Astro 7** with content collections and MDX for case studies
- **Tailwind CSS v4** (design tokens in `src/styles/global.css`, light/dark without flash)
- **TypeScript strict**, `astro check` runs on every build
- Self-hosted variable fonts (Inter, Source Serif 4, JetBrains Mono)
- Sitemap with `hreflang`, Open Graph image, JSON-LD `Person`
- Demo videos served from object storage (S3 + CloudFront), not from the repo

## Structure

```
src/
  data/profile.ts        # Single source for profile, experience, skills (mirrors the CV)
  content/work/<lang>/   # Case studies (MDX). Same file name across languages.
  content/archive/<lang>/# Early university/freelance projects
  i18n/ui.ts             # UI strings + locale helpers
  pages/[...lang]/       # One route file serves both locales
  components/            # Flow diagram, Todo, Video, section components
```

## Commands

| Command                        | What it does                                          |
| ------------------------------ | ----------------------------------------------------- |
| `npm run dev`                  | Dev server at `localhost:4321` (shows `<Todo>` notes) |
| `npm run build`                | Type-check and build to `dist/`                       |
| `npm run preview`              | Serve the production build                            |
| `npm run format`               | Prettier (Astro + Tailwind class sorting)             |
| `npm run todos`                | List content still to be written                      |
| `node scripts/generate-og.mjs` | Regenerate `public/og.png`                            |

## Content workflow

- `<Todo>…</Todo>` in MDX renders only in `npm run dev`; production builds drop it. Run `npm run todos` before publishing.
- A case study with `period: TODO` hides the period in production.
- Set `draft: true` in a case study's frontmatter to keep it out of production.

## Environment

Copy `.env.example` to `.env`:

- `SITE_URL` — public URL (canonical links, sitemap, OG tags).
- `PUBLIC_MEDIA_BASE_URL` — CloudFront URL of the media bucket. Videos are hidden when unset.
  Expected keys: `archive/control.mp4`, `archive/comandero.mp4`, `archive/techno-kaab.mp4`, plus any `video` set in a case study.

## Deploy

Static output (`dist/`). Works on Vercel, Cloudflare Pages or Netlify with the default Astro preset; set the two env vars above.
