export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = { en: 'English', es: 'Español' };
export const htmlLang: Record<Locale, string> = { en: 'en', es: 'es-MX' };

export const ui = {
  en: {
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.skip': 'Skip to content',
    'theme.toggle': 'Toggle color theme',
    'lang.switch': 'Ver en español',
    'hero.cv': 'Download CV',
    'hero.email': 'Email me',
    'experience.title': 'Experience',
    'experience.present': 'Present',
    'experience.cases': 'Case studies from this role',
    'experience.cases.note': 'Products belong to the company; the write-ups cover my part. No client data is shown.',
    'projects.title': 'Projects',
    'projects.lead': 'Personal projects I design, build and maintain on my own.',
    'projects.read': 'Read more',
    'projects.repo': 'Code',
    'projects.demo': 'Live demo',
    'projects.status.building': 'In progress',
    'projects.status.live': 'Live',
    'projects.status.archived': 'Archived',
    'projects.early.title': 'Early projects',
    'projects.early.lead': 'University and first freelance work: Angular, Node.js, Spring Boot and Android apps.',
    'projects.early.cta': 'See early projects',
    'skills.title': 'Skills',
    'contact.title': "Let's talk",
    'contact.lead':
      'Open to remote software engineering roles, especially backend and LLM-powered products. Email is the fastest way to reach me.',
    'footer.archive': 'Early projects',
    'footer.source': 'Source',
    'footer.built': 'Built with Astro.',
    'case.eyebrow': 'Work at',
    'case.back': 'Back to experience',
    'case.role': 'Role',
    'case.period': 'Period',
    'case.status': 'Status',
    'case.stack': 'Stack',
    'case.impact': 'Impact',
    'case.next': 'Next case study',
    'project.eyebrow': 'Personal project',
    'project.back': 'All projects',
    'project.next': 'Next project',
    'archive.title': 'Early projects',
    'archive.lead':
      'University and early freelance work, kept for context. For current work, see the experience and projects on the home page.',
    'archive.back': 'Back to home',
    'archive.repo': 'Repository',
    'video.label': 'Demo video',
  },
  es: {
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contacto',
    'nav.skip': 'Saltar al contenido',
    'theme.toggle': 'Cambiar tema de color',
    'lang.switch': 'View in English',
    'hero.cv': 'Descargar CV',
    'hero.email': 'Escríbeme',
    'experience.title': 'Experiencia',
    'experience.present': 'Actual',
    'experience.cases': 'Casos de estudio de este rol',
    'experience.cases.note':
      'Los productos son de la empresa; los textos cubren mi parte. No se muestran datos de clientes.',
    'projects.title': 'Proyectos',
    'projects.lead': 'Proyectos personales que diseño, construyo y mantengo por mi cuenta.',
    'projects.read': 'Ver más',
    'projects.repo': 'Código',
    'projects.demo': 'Demo',
    'projects.status.building': 'En desarrollo',
    'projects.status.live': 'En línea',
    'projects.status.archived': 'Archivado',
    'projects.early.title': 'Primeros proyectos',
    'projects.early.lead':
      'Trabajo de la universidad y mis primeros freelance: apps en Angular, Node.js, Spring Boot y Android.',
    'projects.early.cta': 'Ver primeros proyectos',
    'skills.title': 'Habilidades',
    'contact.title': 'Hablemos',
    'contact.lead':
      'Abierto a roles remotos de ingeniería de software, especialmente backend y productos con LLMs. El correo es la forma más rápida de contactarme.',
    'footer.archive': 'Primeros proyectos',
    'footer.source': 'Código',
    'footer.built': 'Hecho con Astro.',
    'case.eyebrow': 'Trabajo en',
    'case.back': 'Volver a experiencia',
    'case.role': 'Rol',
    'case.period': 'Periodo',
    'case.status': 'Estado',
    'case.stack': 'Stack',
    'case.impact': 'Impacto',
    'case.next': 'Siguiente caso',
    'project.eyebrow': 'Proyecto personal',
    'project.back': 'Todos los proyectos',
    'project.next': 'Siguiente proyecto',
    'archive.title': 'Primeros proyectos',
    'archive.lead':
      'Proyectos de la universidad y de mis primeros trabajos freelance, conservados como contexto. Para el trabajo actual, mira la experiencia y los proyectos en el inicio.',
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
