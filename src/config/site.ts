/**
 * Central site configuration.
 * When renaming the site or moving to a new domain, update these values.
 */
export const siteConfig = {
  /** Production domain (no trailing slash) */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ledu.cz',

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

  /** Social links */
  social: {
    instagram: 'https://www.instagram.com/ledu.cz/',
    linkedin: 'https://www.linkedin.com/in/ledu/',
  },

  /** Contact */
  email: 'info@ledu.cz',
} as const;

export type Locale = (typeof siteConfig.locales)[number];

/**
 * Get full URL for a page in a given locale.
 * cs: https://domain.com/page
 * en: https://domain.com/en/page
 */
export function getCanonicalUrl(path: string, locale?: Locale): string {
  const base = siteConfig.url;
  const cleanPath = path === '/' ? '' : path;

  if (!locale || locale === siteConfig.defaultLocale) {
    return `${base}${cleanPath || '/'}`;
  }

  return `${base}/${locale}${cleanPath}`;
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
