export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = { en: 'English', es: 'Español' };
export const htmlLang: Record<Locale, string> = { en: 'en', es: 'es-MX' };

export const ui = {
  en: {
    'nav.work': 'Work',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.skip': 'Skip to content',
    'theme.toggle': 'Toggle color theme',
    'lang.switch': 'Ver en español',
    'hero.cv': 'Download CV',
    'hero.email': 'Email me',
    'work.title': 'Selected work',
    'work.lead':
      'Production systems from a mortgage fintech. Client data is never shown; diagrams and numbers come from the real systems.',
    'work.read': 'Read case study',
    'experience.title': 'Experience',
    'experience.present': 'Present',
    'skills.title': 'Skills',
    'contact.title': "Let's talk",
    'contact.lead':
      'Open to remote software engineering roles, especially backend and LLM-powered products. Email is the fastest way to reach me.',
    'footer.archive': 'Early projects',
    'footer.source': 'Source',
    'footer.built': 'Built with Astro.',
    'case.back': 'All work',
    'case.role': 'Role',
    'case.period': 'Period',
    'case.stack': 'Stack',
    'case.impact': 'Impact',
    'case.next': 'Next case study',
    'archive.title': 'Early projects',
    'archive.lead':
      'University and early freelance work, kept for context. For current work, see the case studies on the home page.',
    'archive.back': 'Back to home',
    'archive.repo': 'Repository',
    'video.label': 'Demo video',
  },
  es: {
    'nav.work': 'Proyectos',
    'nav.experience': 'Experiencia',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contacto',
    'nav.skip': 'Saltar al contenido',
    'theme.toggle': 'Cambiar tema de color',
    'lang.switch': 'View in English',
    'hero.cv': 'Descargar CV',
    'hero.email': 'Escríbeme',
    'work.title': 'Proyectos destacados',
    'work.lead':
      'Sistemas en producción de una fintech hipotecaria. Nunca se muestran datos de clientes; los diagramas y cifras vienen de los sistemas reales.',
    'work.read': 'Leer caso de estudio',
    'experience.title': 'Experiencia',
    'experience.present': 'Actual',
    'skills.title': 'Habilidades',
    'contact.title': 'Hablemos',
    'contact.lead':
      'Abierto a roles remotos de ingeniería de software, especialmente backend y productos con LLMs. El correo es la forma más rápida de contactarme.',
    'footer.archive': 'Primeros proyectos',
    'footer.source': 'Código',
    'footer.built': 'Hecho con Astro.',
    'case.back': 'Todos los proyectos',
    'case.role': 'Rol',
    'case.period': 'Periodo',
    'case.stack': 'Stack',
    'case.impact': 'Impacto',
    'case.next': 'Siguiente caso',
    'archive.title': 'Primeros proyectos',
    'archive.lead':
      'Proyectos de la universidad y de mis primeros trabajos freelance, conservados como contexto. Para el trabajo actual, mira los casos de estudio en el inicio.',
    'archive.back': 'Volver al inicio',
    'archive.repo': 'Repositorio',
    'video.label': 'Video demo',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['en'];

export function useTranslations(locale: Locale) {
  return (key: UIKey) => ui[locale][key];
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
  return locales.map((l) => ({
    params: { lang: l === defaultLocale ? undefined : l },
    props: { locale: l },
  }));
}
