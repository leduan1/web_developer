'use client';

import { useEffect } from 'react';
import { Header, SideLabels, Footer } from '@/components';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from '@/i18n/LanguageContext';

type ServiceCopy = {
  slug: string;
  title: string;
  h1: string;
  lead: string;
  included: string[];
  process: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  ctaTitle: string;
  ctaText: string;
  related: string[];
  articles: string[];
  cases: string[];
};

type ServiceUi = {
  includedHeading: string;
  processHeading: string;
  faqHeading: string;
  relatedHeading: string;
  articlesHeading: string;
  casesHeading: string;
  ctaButton: string;
};

const linkClass =
  'inline-flex items-center min-h-[44px] text-white/80 hover:text-white font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

function LinkList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  if (links.length === 0) return null;
  return (
    <section className="mt-16">
      <h2 className="font-condensed text-3xl md:text-4xl text-white uppercase mb-6">{title}</h2>
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <LocalizedLink href={link.href} className={linkClass}>
              {link.label}
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ServiceLanding({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const pages = t('pages.servicePages') as ServiceCopy[];
  const service = pages.find((item) => item.slug === slug);
  const ui = t('pages.serviceUi') as ServiceUi;
  const nav = t('header.services') as { href: string; label: string }[];
  const posts = t('pages.blog.posts') as { title: string; slug: string }[];
  const studies = t('pages.caseStudies.items') as { slug: string; h1: string }[];

  useEffect(() => {
    if (service?.title) document.title = service.title;
  }, [service?.title]);

  if (!service) return null;

  const related = service.related
    .map((href) => nav.find((item) => item.href === href))
    .filter((item): item is { href: string; label: string } => Boolean(item));

  const articles = service.articles
    .map((articleSlug) => posts.find((post) => post.slug === articleSlug))
    .filter((post): post is { title: string; slug: string } => Boolean(post))
    .map((post) => ({ href: `/blog/${post.slug}`, label: post.title }));

  const articleLinks =
    articles.length > 0
      ? articles
      : [{ href: '/blog', label: t('pages.blog.heading') as string }];

  const caseLinks = service.cases
    .map((caseSlug) => studies.find((item) => item.slug === caseSlug))
    .filter((item): item is { slug: string; h1: string } => Boolean(item))
    .map((item) => ({ href: `/reference/${item.slug}`, label: item.h1 }));

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <SideLabels />
      <article className="pt-40 md:pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-condensed text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-none mb-8">
            {service.h1}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-16">{service.lead}</p>

          <section>
            <h2 className="font-condensed text-3xl md:text-4xl text-white uppercase mb-6">
              {ui.includedHeading}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.included.map((item) => (
                <li key={item} className="text-white/70 leading-relaxed border-l-2 border-red-500/40 pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="font-condensed text-3xl md:text-4xl text-white uppercase mb-6">
              {ui.processHeading}
            </h2>
            <ol className="space-y-6">
              {service.process.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="font-condensed text-2xl text-red-500" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-white font-bold mb-1">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {service.faq.length > 0 && (
            <section className="mt-16">
              <h2 className="font-condensed text-3xl md:text-4xl text-white uppercase mb-6">
                {ui.faqHeading}
              </h2>
              <div className="border-t border-white/10">
                {service.faq.map((item) => (
                  <details key={item.question} className="group border-b border-white/10">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 min-h-[44px] text-white font-medium [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                      <span>{item.question}</span>
                      <span aria-hidden="true" className="text-xl leading-none group-open:hidden">
                        +
                      </span>
                      <span aria-hidden="true" className="text-xl leading-none hidden group-open:inline">
                        −
                      </span>
                    </summary>
                    <p className="pb-5 text-sm md:text-base leading-relaxed text-white/60">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <LinkList title={ui.casesHeading} links={caseLinks} />
          <LinkList title={ui.relatedHeading} links={related} />
          <LinkList title={ui.articlesHeading} links={articleLinks} />

          <section className="mt-20 border border-white/10 p-8 md:p-10">
            <h2 className="font-condensed text-3xl md:text-5xl text-white uppercase mb-4">{service.ctaTitle}</h2>
            <p className="text-white/70 leading-relaxed mb-8">{service.ctaText}</p>
            <LocalizedLink
              href="/kontakt"
              className="inline-flex items-center justify-center min-h-[44px] bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold uppercase text-sm tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {ui.ctaButton}
            </LocalizedLink>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
