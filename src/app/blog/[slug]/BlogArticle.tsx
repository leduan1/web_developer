'use client';

import { useEffect } from 'react';
import { Header, SideLabels, Footer } from '@/components';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from '@/i18n/LanguageContext';

type Post = { title: string; date: string; excerpt: string; slug: string; relatedServices?: string[] };

export default function BlogArticle({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const posts = t('pages.blog.posts') as Post[];
  const post = posts.find((item) => item.slug === slug);
  const services = t('header.services') as { href: string; label: string }[];
  const related = (post?.relatedServices ?? [])
    .map((href) => services.find((item) => item.href === href))
    .filter((item): item is { href: string; label: string } => Boolean(item));

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} | LEDU`;
    }
  }, [post?.title]);

  if (!post) return null;

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <SideLabels />
      <article className="pt-40 md:pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <LocalizedLink
            href="/blog"
            className="inline-flex items-center min-h-[44px] text-white/70 hover:text-white text-sm uppercase tracking-wider mb-8"
          >
            ← {t('pages.blog.backToBlog') as string}
          </LocalizedLink>
          <p className="text-white/60 text-xs uppercase mb-4">{post.date}</p>
          <h1 className="font-condensed text-4xl md:text-6xl text-white uppercase mb-8 leading-none">
            {post.title}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-12">{post.excerpt}</p>
          {related.length > 0 && (
            <nav aria-label={t('pages.blog.relatedHeading') as string} className="mb-12">
              <h2 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
                {t('pages.blog.relatedHeading') as string}
              </h2>
              <ul className="flex flex-col">
                {related.map((service) => (
                  <li key={service.href}>
                    <LocalizedLink
                      href={service.href}
                      className="inline-flex items-center min-h-[44px] text-white/80 hover:text-white font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {service.label}
                      <span aria-hidden="true" className="ml-2">→</span>
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <LocalizedLink
            href="/kontakt"
            className="inline-flex items-center justify-center min-h-[44px] bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold uppercase text-sm tracking-wider"
          >
            {t('hero.cta') as string}
          </LocalizedLink>
        </div>
      </article>
      <Footer />
    </main>
  );
}
