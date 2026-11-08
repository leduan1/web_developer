import type { Metadata } from 'next';
import { siteConfig, localizedPath, type Locale } from '@/config/site';
import { getDictionary, type Dictionary } from '@/i18n/dictionaries';

const OG_LOCALE: Record<Locale, string> = {
  cs: 'cs_CZ',
  en: 'en_US',
  vi: 'vi_VN',
  ru: 'ru_RU',
};

export function parseLocale(value: string | null | undefined): Locale {
  if (value === 'en' || value === 'vi' || value === 'ru' || value === 'cs') {
    return value;
  }
  return siteConfig.defaultLocale;
}

/** Drop /en, /vi, /ru and a trailing slash so routes compare cleanly. */
export function stripLocalePrefix(pathname: string): string {
  const stripped = (pathname || '/').replace(/^\/(en|vi|ru)(?=\/|$)/, '') || '/';
  if (stripped.length > 1 && stripped.endsWith('/')) {
    return stripped.slice(0, -1);
  }
  return stripped;
}

function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of siteConfig.locales) {
    languages[locale] = localizedPath(path, locale);
  }
  languages['x-default'] = localizedPath(path, siteConfig.defaultLocale);
  return languages;
}

type PageCopy = { title: string; description: string };

function resolvePage(locale: Locale, path: string): PageCopy | null {
  const dict: Dictionary = getDictionary(locale);

  if (path.startsWith('/blog/')) {
    const slug = decodeURIComponent(path.slice('/blog/'.length));
    if (!slug || slug.includes('/')) return null;
    const post = dict.pages.blog.posts.find((item) => item.slug === slug);
    if (!post) return null;
    return {
      title: `${post.title} | LEDU`,
      description: post.excerpt,
    };
  }

  switch (path) {
    case '/':
      return { title: dict.meta.title, description: dict.meta.description };
    case '/reference':
      return { title: dict.pages.reference.title, description: dict.pages.reference.seoDescription };
    case '/o-mne':
      return { title: dict.pages.oMne.title, description: dict.pages.oMne.seoDescription };
    case '/blog':
      return { title: dict.pages.blog.title, description: dict.pages.blog.seoDescription };
    case '/kontakt':
      return { title: dict.pages.kontakt.title, description: dict.pages.kontakt.seoDescription };
    default:
      return null;
  }
}

export function buildMetadata(locale: Locale, originalPathname: string): Metadata {
  const path = stripLocalePrefix(originalPathname || '/');
  const canonicalPath = localizedPath(path, locale);
  const page = resolvePage(locale, path);

  if (!page) {
    return {
      metadataBase: new URL(siteConfig.url),
      title: { absolute: 'LEDU' },
      robots: { index: false, follow: false },
      alternates: { canonical: canonicalPath },
    };
  }

  const alternateLocale = siteConfig.locales
    .filter((item) => item !== locale)
    .map((item) => OG_LOCALE[item]);

  return {
    metadataBase: new URL(siteConfig.url),
    title: { absolute: page.title },
    description: page.description,
    keywords: [
      'tvorba webů',
      'e-shop',
      'WordPress',
      'Next.js',
      'React',
      'SEO',
      'PPC',
      'grafický design',
      'automatizace',
      'web developer',
      'Praha',
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale],
      alternateLocale,
      url: canonicalPath,
      siteName: siteConfig.name,
      title: page.title,
      description: page.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
    alternates: {
      canonical: canonicalPath,
      languages: languageAlternates(path),
    },
  };
}
