// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Set SITE_URL in the hosting provider once the domain is decided.
const site = process.env.SITE_URL ?? 'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
  site,
  // Every internal link ends in "/", so canonical URLs have a single form.
  trailingSlash: 'always',
  env: {
    schema: {
      // CloudFront URL of the media bucket (demo videos). Videos are hidden when unset.
      PUBLIC_MEDIA_BASE_URL: envField.string({ context: 'client', access: 'public', optional: true, url: true }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-MX' },
      },
    }),
  ],
});
