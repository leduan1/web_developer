import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { siteConfig } from '@/config/site';
import { getDictionary } from '@/i18n/dictionaries';
import { buildMetadata, parseLocale } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const headerList = headers();
  const locale = parseLocale(headerList.get('x-locale'));
  const pathname = headerList.get('x-pathname') || '/';
  return buildMetadata(locale, pathname);
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers();
  const locale = parseLocale(headerList.get('x-locale'));
  const dict = getDictionary(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: dict.meta.description,
    inLanguage: locale,
    sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
    areaServed: {
      '@type': 'Country',
      name: 'Czech Republic',
    },
    knowsLanguage: ['cs', 'en', 'vi', 'ru'],
    serviceType: ['Web Development', 'Web Design', 'E-commerce', 'SEO', 'PPC'],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white">
        <LanguageProvider initialLanguage={locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
