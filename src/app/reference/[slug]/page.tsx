import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import CaseStudyView from '@/components/CaseStudyView';
import { getDictionary } from '@/i18n/dictionaries';
import { parseLocale } from '@/lib/seo';

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const locale = parseLocale(headers().get('x-locale'));
  const dict = getDictionary(locale);
  const study = dict.pages.caseStudies.items.find((item) => item.slug === params.slug);
  if (!study) notFound();
  return <CaseStudyView slug={params.slug} />;
}
