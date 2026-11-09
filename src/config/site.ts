/**
 * Canonical host is https://www.ledu.cz.
 * Apex https://ledu.cz only redirects; never use it as a canonical.
 * A non-www NEXT_PUBLIC_SITE_URL is normalized so a stale env var
 * cannot point canonicals, sitemap and robots back at the apex.
 */
function resolveSiteUrl(): string {
  const fallback = 'https://www.ledu.cz';
  const raw = process.env.NEXT_PUBLIC_SITE_URL || fallback;
  try {
    const url = new URL(raw);
    if (url.hostname === 'ledu.cz' || url.hostname === 'www.ledu.cz') {
      return fallback;
    }
    return url.origin;
  } catch {
    return fallback;
  }
}

/**
 * Central site configuration.
 * When renaming the site or moving to a new domain, update these values.
 */
export const siteConfig = {
  /** Production domain (no trailing slash) */
  url: resolveSiteUrl(),

  /** Site name used in meta tags & structured data */
  name: 'LEDU',

  /** Default locale (no URL prefix) */
  defaultLocale: 'cs' as const,

  /** All supported locales */
  locales: ['cs', 'en', 'vi', 'ru'] as const,

  /** Locales that get a URL prefix (everything except default) */
  localePrefixes: ['en', 'vi', 'ru'] as const,

  /** All public pages (without locale prefix) */
  pages: [
    '/',
    '/reference',
    '/o-mne',
    '/blog',
    '/kontakt',
  ],

  /** Service landing pages. Czech slugs in every language, same as the rest of the site. */
  servicePages: [
    '/tvorba-webu',
    '/seo',
    '/ppc',
    '/graficky-design',
    '/automatizace',
  ],

  /** Case studies that have a public page. LeadHunter has no screenshot tile. */
  caseStudySlugs: [
    'schlieger',
    'cryptosvet',
    'paadel',
    'leadhunter',
  ],

  /**
   * Blog article slugs that exist in the translation files.
   * Same slug in every language; only the title and excerpt are translated.
   * Dates are the calendar days already shown on the articles.
   */
  blogSlugs: [
    'jak-vytvorit-kvalitni-web',
    'seo-optimalizace-male-firmy',
    'trendy-web-design-2025',
  ],

  blogPublished: {
    'jak-vytvorit-kvalitni-web': '2025-02-15',
    'seo-optimalizace-male-firmy': '2025-02-10',
    'trendy-web-design-2025': '2025-02-01',
  },

  /** Social links */
  social: {
    instagram: 'https://www.instagram.com/ledu.cz/',
    linkedin: 'https://www.linkedin.com/in/ledu/',
  },

  /** Contact */
  email: 'info@ledu.cz',
} as const;

export type Locale = (typeof siteConfig.locales)[number];

/** Path with locale prefix. Czech stays unprefixed. */
export function localizedPath(path: string, locale: Locale = siteConfig.defaultLocale): string {
  const clean = path === '/' ? '' : path;
  if (locale === siteConfig.defaultLocale) {
    return path === '/' ? '/' : path;
  }
  return `/${locale}${clean}`;
}

export function getCanonicalUrl(path: string, locale?: Locale): string {
  const localized = localizedPath(path, locale ?? siteConfig.defaultLocale);
  if (localized === '/') return siteConfig.url;
  return `${siteConfig.url}${localized}`;
}

/**
 * Get all hreflang alternates for a given page path.
 */
export function getHreflangAlternates(path: string): { locale: string; url: string }[] {
  return siteConfig.locales.map((locale) => ({
    locale,
    url: getCanonicalUrl(path, locale),
  }));
}
