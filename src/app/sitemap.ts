import { MetadataRoute } from 'next';
import { siteConfig, getCanonicalUrl, Locale } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of siteConfig.pages) {
    // Build alternates for all locales
    const languages: Record<string, string> = {};
    for (const locale of siteConfig.locales) {
      // Use ISO 639-1 codes; for x-default use the default locale URL
      languages[locale] = getCanonicalUrl(page, locale);
    }
    languages['x-default'] = getCanonicalUrl(page, siteConfig.defaultLocale);

    // Add one entry per locale
    for (const locale of siteConfig.locales) {
      entries.push({
        url: getCanonicalUrl(page, locale as Locale),
        lastModified: new Date(),
        changeFrequency: page === '/' ? 'weekly' : 'monthly',
        priority: page === '/' ? 1.0 : 0.8,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
