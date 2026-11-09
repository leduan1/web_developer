import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/i18n/dictionaries';
import { parseLocale } from '@/lib/seo';
import { buildFaqJsonLd, buildServiceJsonLd } from '@/lib/structured-data';
import JsonLd from './JsonLd';
import ServiceLanding from './ServiceLanding';

export default function ServiceRoute({ slug }: { slug: string }) {
  const locale = parseLocale(headers().get('x-locale'));
  const dict = getDictionary(locale);
  const service = dict.pages.servicePages.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={buildServiceJsonLd({
          name: service.h1,
          description: service.seoDescription,
          path: `/${service.slug}`,
          locale,
        })}
      />
      {service.faq.length > 0 && <JsonLd data={buildFaqJsonLd(service.faq)} />}
      <ServiceLanding slug={slug} />
    </>
  );
}
