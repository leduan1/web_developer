import { getCanonicalUrl, siteConfig, type Locale } from '@/config/site';

const PERSON_ID = `${siteConfig.url}/o-mne#duy-le`;

export function buildServiceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: getCanonicalUrl(input.path, input.locale),
    serviceType: input.name,
    provider: {
      '@type': 'ProfessionalService',
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Czech Republic',
    },
  };
}

export function buildFaqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildPersonJsonLd(jobTitle: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Duy Le',
    jobTitle,
    url: `${siteConfig.url}/o-mne`,
    image: `${siteConfig.url}/images/me.jpg`,
    email: siteConfig.email,
    telephone: '+420777224577',
    worksFor: {
      '@type': 'ProfessionalService',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
  };
}

export function buildBlogPostingJsonLd(input: {
  headline: string;
  description: string;
  datePublished: string;
  path: string;
  locale: Locale;
}) {
  const url = getCanonicalUrl(input.path, input.locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    inLanguage: input.locale,
    mainEntityOfPage: url,
    url,
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Duy Le',
      url: `${siteConfig.url}/o-mne`,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
