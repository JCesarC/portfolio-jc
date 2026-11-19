/**
 * Single source of truth for everything that also appears on the CV.
 * Source: CantunPaezJulioCesar_SoftwareEngineer.pdf (Nov 2026).
 * Keep this file and the CV in sync; ideally generate the CV from it later.
 */
import type { Locale } from '../i18n/ui';

type L10n = Record<Locale, string>;

export const profile = {
  name: 'Julio César Cantún Páez',
  shortName: 'Julio Cantún',
  title: {
    en: 'Software Engineer — AI / LLM Applications',
    es: 'Ingeniero de Software — Aplicaciones de IA / LLM',
  } satisfies L10n,
  focus: 'Node.js · TypeScript · Python · LLMs · AWS',
  location: {
    en: 'Campeche, Mexico · Remote',
    es: 'Campeche, México · Remoto',
  } satisfies L10n,
  /** Short first-person pitch for the hero and meta description. The CV keeps the longer `summary`. */
  intro: {
    en: 'I build backend systems and LLM-powered features that hold up in production. For 4+ years I’ve shipped and run the platforms behind a mortgage fintech, including ~2 years as the only engineer on both of them.',
    es: 'Construyo sistemas backend y funcionalidades con LLMs que se sostienen en producción. Durante más de 4 años desarrollé y operé las plataformas de una fintech hipotecaria, incluidos ~2 años como el único ingeniero a cargo de ambas.',
  } satisfies L10n,
  /** CV summary, kept in sync with the PDF. */
  summary: {
    en: 'Software engineer with 4+ years building production systems for a mortgage fintech, including ~2 years as the sole engineer owning two platforms end-to-end. I shipped an LLM-powered payment-capacity assessment to production and built the Node.js/TypeScript APIs and AWS Lambda services behind mortgage and document workflows that handle sensitive financial data.',
    es: 'Ingeniero de software con más de 4 años construyendo sistemas en producción para una fintech hipotecaria, incluidos ~2 años como único ingeniero a cargo de dos plataformas de punta a punta. Llevé a producción una evaluación de capacidad de pago con LLMs y construí las APIs en Node.js/TypeScript y los servicios en AWS Lambda detrás de flujos hipotecarios y documentales con datos financieros sensibles.',
  } satisfies L10n,
  now: {
    en: 'Currently building LLM applications with structured outputs, retrieval, tool calling and evaluation.',
    es: 'Actualmente construyo aplicaciones con LLMs: salidas estructuradas, retrieval, tool calling y evaluación.',
  } satisfies L10n,
  highlights: [
    { value: '4+', label: { en: 'years shipping to production', es: 'años llevando código a producción' } },
    {
      value: '~2',
      label: { en: 'years as sole engineer on two platforms', es: 'años como único ingeniero de dos plataformas' },
    },
    {
      value: '10+',
      label: { en: 'repos moved to GitHub Actions CI/CD', es: 'repos migrados a CI/CD con GitHub Actions' },
    },
  ] satisfies { value: string; label: L10n }[],
  email: 'julio.jccp.1@gmail.com',
  links: {
    github: 'https://github.com/JCesarC',
    linkedin: 'https://www.linkedin.com/in/julio-cesar-c-p/',
    source: 'https://github.com/JCesarC/portfolio',
  },
  /**
   * Public CV PDFs (place them in /public/cv/). Use a version WITHOUT the phone number.
   * Leave null to hide the download button until the file exists.
   */
  cv: {
    en: null,
    es: null,
  } as Record<Locale, string | null>,
  languages: {
    en: 'Spanish (native) · English (professional working proficiency)',
    es: 'Español (nativo) · Inglés (competencia profesional)',
  } satisfies L10n,
};

export type Job = {
  /** Case studies in src/content/work reference this id in their `job` field. */
  id: string;
  company: string;
  role: L10n;
  location: L10n;
  start: string; // YYYY-MM
  end: string | null; // null = present
  context: L10n;
  /**
   * CV bullets. When `caseStudy` matches a published entry in src/content/work,
   * the website shows that bullet as a "Key project" card instead of plain text (no repetition).
   */
  bullets: { text: L10n; caseStudy?: string }[];
  stack: string[];
};

export const experience: Job[] = [
  {
    id: 'chiplo',
    company: 'Chiplo / Fintecimal',
    role: { en: 'Full Stack Developer', es: 'Desarrollador Full Stack' },
    location: { en: 'Remote', es: 'Remoto' },
    start: '2022-05',
    // TODO(julio): confirm whether this role ended in Nov 2026 or is still current (use null).
    end: '2026-11',
    context: {
      en: 'Mortgage fintech: Chiplo (mortgage origination for real-estate agents and brokers) and Docupass (document collection and e-signature for enterprise clients). Sole engineer for ~2 years after team downsizing, owning both platforms end-to-end: features, bug fixes, releases and production support.',
      es: 'Fintech hipotecaria: Chiplo (originación de hipotecas para agentes inmobiliarios y brokers) y Docupass (recolección de documentos y firma electrónica para clientes empresariales). Único ingeniero durante ~2 años tras una reducción de equipo, a cargo de ambas plataformas de punta a punta: funcionalidades, bugs, releases y soporte en producción.',
    },
    bullets: [
      {
        caseStudy: 'llm-payment-capacity',
        text: {
          en: 'Built and shipped an LLM-powered payment-capacity assessment for mortgage applicants (Python, AWS Lambda, GPT-4), with an explainable reasoning summary shown in a Next.js app.',
          es: 'Construí y llevé a producción una evaluación de capacidad de pago con LLMs para solicitantes de hipoteca (Python, AWS Lambda, GPT-4), con un resumen explicable del razonamiento en una app de Next.js.',
        },
      },
      {
        caseStudy: 'versioned-template-editor',
        text: {
          en: 'Built a versioned template editor for mortgage application forms (10+ templates, 5 lenders): field remaps are published in minutes instead of up to a full day, with safe rollback to any earlier version.',
          es: 'Construí un editor de plantillas versionado para solicitudes hipotecarias (10+ plantillas, 5 bancos): los cambios de mapeo se publican en minutos en lugar de hasta un día completo, con rollback seguro a cualquier versión anterior.',
        },
      },
      {
        caseStudy: 'document-pipeline',
        text: {
          en: 'Built and operated AWS Lambda services that auto-fill, compress, merge and package mortgage documents into secure ZIP downloads via pre-signed S3 URLs; the PDF compressor cuts file size by up to 40%.',
          es: 'Construí y operé servicios en AWS Lambda que llenan, comprimen, combinan y empaquetan documentos hipotecarios en ZIPs seguros mediante URLs prefirmadas de S3; el compresor de PDFs reduce el tamaño hasta un 40%.',
        },
      },
      {
        text: {
          en: 'Built Chiplo’s real-estate partner network: agency and agent registration, plus per-agency property projects whose data and documents advisors attach to each client’s mortgage file.',
          es: 'Construí la red de socios inmobiliarios de Chiplo: registro de agencias y agentes, y proyectos de propiedades por agencia cuyos datos y documentos los asesores adjuntan al expediente hipotecario de cada cliente.',
        },
      },
      {
        text: {
          en: 'Maintained the core TypeScript/Express API (application workflows, e-signatures, credit-bureau checks, webhooks, error notifications) and replaced manual builds and deploys with GitHub Actions CI/CD across 10+ repos.',
          es: 'Mantuve la API principal en TypeScript/Express (flujos de solicitud, firma electrónica, consultas a buró de crédito, webhooks, notificaciones de error) y reemplacé builds y despliegues manuales con CI/CD en GitHub Actions en más de 10 repos.',
        },
      },
    ],
    stack: [
      'TypeScript',
      'Node.js',
      'Express',
      'Python',
      'AWS Lambda',
      'S3',
      'MongoDB',
      'PostgreSQL',
      'React',
      'Next.js',
      'GitHub Actions',
    ],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: { en: 'Software Developer', es: 'Desarrollador de Software' },
    location: { en: 'Campeche, Mexico', es: 'Campeche, México' },
    start: '2021-08',
    end: '2022-01',
    context: {
      en: 'Designed and built an order management system for a local restaurant: per-table and per-customer orders, order status, and menu and inventory management.',
      es: 'Diseñé y construí un sistema de gestión de órdenes para un restaurante local: órdenes por mesa y por cliente, estatus de órdenes y gestión de menú e inventario.',
    },
    bullets: [],
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Angular', 'TypeScript'],
  },
];

export type EducationItem = {
  kind: 'degree' | 'certification' | 'course';
  title: L10n;
  org: string;
  period: string;
  url?: string;
};

/** Degree, certifications and courses, newest first. */
export const education: EducationItem[] = [
  {
    kind: 'degree',
    title: { en: 'B.S. in Computer Systems Engineering', es: 'Ingeniería en Sistemas Computacionales' },
    org: 'Instituto Tecnológico Superior de Escárcega',
    period: '2018 – 2023',
  },
];

export const skills: { group: L10n; items: string[] }[] = [
  { group: { en: 'Languages', es: 'Lenguajes' }, items: ['TypeScript', 'JavaScript', 'Python', 'SQL'] },
  {
    group: { en: 'AI / LLM', es: 'IA / LLM' },
    items: [
      'Claude API',
      'OpenAI API',
      'Multi-step LLM pipelines',
      'Structured outputs',
      'Prompt engineering',
      'Evaluation',
    ],
  },
  {
    group: { en: 'Backend & data', es: 'Backend y datos' },
    items: ['Node.js', 'Express', 'Flask', 'REST APIs', 'Webhooks', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    group: { en: 'Cloud & DevOps', es: 'Cloud y DevOps' },
    items: ['AWS Lambda', 'S3', 'API Gateway', 'EC2', 'Docker', 'GitHub Actions', 'Heroku'],
  },
  {
    group: { en: 'Frontend & testing', es: 'Frontend y pruebas' },
    items: ['React', 'Next.js', 'Redux', 'Material UI', 'Jest', 'Cypress', 'React Testing Library'],
  },
];

export function formatPeriod(start: string, end: string | null, locale: Locale, present: string): string {
  const fmt = new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const toDate = (ym: string) => new Date(`${ym}-01T00:00:00Z`);
  return `${fmt.format(toDate(start))} – ${end ? fmt.format(toDate(end)) : present}`;
}
