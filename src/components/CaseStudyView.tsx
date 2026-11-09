'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Header, SideLabels, Footer } from '@/components';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from '@/i18n/LanguageContext';

const CASE_STUDY_MEDIA: Record<string, string> = {
  schlieger: '/images/screencapture-schlieger-cz-2025-08-08-12_34_35-1.png',
  cryptosvet: '/images/cryptosvet-2.png',
  paadel: '/images/paadel-cz.jpg',
};

type CaseStudy = {
  slug: string;
  title: string;
  h1: string;
  client: string;
  field: string;
  website: string;
  websiteLabel: string;
  role: string;
  technologies: string[];
  serviceHref: string;
  solution: string[];
  results: string[];
};

type CaseUi = {
  back: string;
  linkLabel: string;
  clientLabel: string;
  fieldLabel: string;
  roleLabel: string;
  techLabel: string;
  websiteLabel: string;
  serviceLabel: string;
  solutionHeading: string;
  resultsHeading: string;
  imageAlt: string;
  moreHeading: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  items: CaseStudy[];
};

export default function CaseStudyView({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const ui = t('pages.caseStudies') as CaseUi;
  const study = ui.items.find((item) => item.slug === slug);
  const nav = t('header.services') as { href: string; label: string }[];
  const media = CASE_STUDY_MEDIA[slug];

  useEffect(() => {
    if (study?.title) document.title = study.title;
  }, [study?.title]);

  if (!study) return null;

  const service = nav.find((item) => item.href === study.serviceHref);
  const others = ui.items.filter((item) => item.slug !== slug);

  const facts: { label: string; value: string; href?: string; external?: boolean }[] = [
    { label: ui.clientLabel, value: study.client },
    { label: ui.fieldLabel, value: study.field },
    { label: ui.roleLabel, value: study.role },
  ];

  if (study.website && study.websiteLabel) {
    facts.push({
      label: ui.websiteLabel,
      value: study.websiteLabel,
      href: study.website,
      external: true,
    });
  }

  if (service) {
    facts.push({ label: ui.serviceLabel, value: service.label, href: service.href });
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <SideLabels />
      <article className="pt-40 md:pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <LocalizedLink
            href="/reference"
            className="inline-flex items-center min-h-[44px] text-white/70 hover:text-white text-sm uppercase tracking-wider mb-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            ← {ui.back}
          </LocalizedLink>
          <h1 className="font-condensed text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-none mb-10">
            {study.h1}
          </h1>

          {media && (
            <figure className="mb-10">
              <div className="relative w-full h-80 md:h-[28rem] overflow-hidden rounded-lg bg-white/5">
                <Image
                  src={media}
                  alt={`${ui.imageAlt}: ${study.client}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover object-top"
                />
              </div>
            </figure>
          )}

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-y border-white/10 py-8 mb-12">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">{fact.label}</dt>
                <dd className="text-white">
                  {fact.href ? (
                    fact.external ? (
                      <a
                        href={fact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center min-h-[44px] underline decoration-white/30 underline-offset-4 hover:decoration-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {fact.value}
                      </a>
                    ) : (
                      <LocalizedLink
                        href={fact.href}
                        className="inline-flex items-center min-h-[44px] underline decoration-white/30 underline-offset-4 hover:decoration-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {fact.value}
                      </LocalizedLink>
                    )
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
            {study.technologies.length > 0 && (
              <div className="sm:col-span-2">
                <dt className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">{ui.techLabel}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="text-white/80 text-[10px] font-bold uppercase tracking-wider border border-white/30 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>

          {study.solution.length > 0 && (
            <section className="mb-12">
              <h2 className="font-condensed text-3xl md:text-4xl text-white uppercase mb-6">{ui.solutionHeading}</h2>
              {study.solution.map((paragraph) => (
                <p key={paragraph} className="text-white/70 text-lg leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </section>
          )}

          {study.results.length > 0 && (
            <section className="mb-12">
              <h2 className="font-condensed text-3xl md:text-4xl text-white uppercase mb-6">{ui.resultsHeading}</h2>
              <ul className="space-y-3">
                {study.results.map((result) => (
                  <li key={result} className="text-white/70 leading-relaxed flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" aria-hidden="true" />
                    {result}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {others.length > 0 && (
            <section className="mb-16">
              <h2 className="font-condensed text-3xl md:text-4xl text-white uppercase mb-6">{ui.moreHeading}</h2>
              <ul className="flex flex-col">
                {others.map((item) => (
                  <li key={item.slug}>
                    <LocalizedLink
                      href={`/reference/${item.slug}`}
                      className="inline-flex items-center min-h-[44px] text-white/80 hover:text-white font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {item.h1}
                      <span aria-hidden="true" className="ml-2">
                        →
                      </span>
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="border border-white/10 p-8 md:p-10">
            <h2 className="font-condensed text-3xl md:text-5xl text-white uppercase mb-4">{ui.ctaTitle}</h2>
            <p className="text-white/70 leading-relaxed mb-8">{ui.ctaText}</p>
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
