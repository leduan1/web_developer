import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'LEDU - Web Developer | Tvorba webů a e-shopů',
    template: '%s | LEDU',
  },
  description:
    'Jsem web developer a designér specializující se na vytváření moderních, výkonných webů a e-shopů. Tvorba na míru vašemu podnikání.',
  keywords: [
    'web developer',
    'webový designér',
    'tvorba webů',
    'e-shop',
    'web design',
    'Praha',
    'website creation',
    'e-commerce',
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
    locale: 'cs_CZ',
    alternateLocale: ['en_US', 'vi_VN', 'ru_RU'],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'LEDU - Web Developer | Tvorba webů a e-shopů',
    description:
      'Jsem web developer a designér specializující se na vytváření moderních, výkonných webů a e-shopů.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LEDU - Web Developer',
    description:
      'Web developer a designér specializující se na vytváření moderních, výkonných webů a e-shopů.',
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'cs': siteConfig.url,
      'en': `${siteConfig.url}/en`,
      'vi': `${siteConfig.url}/vi`,
      'ru': `${siteConfig.url}/ru`,
      'x-default': siteConfig.url,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  description:
    'Web developer a designér specializující se na vytváření moderních, výkonných webů a e-shopů.',
  sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
  areaServed: {
    '@type': 'Country',
    name: 'Czech Republic',
  },
  knowsLanguage: ['cs', 'en', 'vi', 'ru'],
  serviceType: ['Web Development', 'Web Design', 'E-commerce Development'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" suppressHydrationWarning>
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
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
