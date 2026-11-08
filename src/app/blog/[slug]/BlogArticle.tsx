'use client';

import { useEffect } from 'react';
import { Header, SideLabels, Footer } from '@/components';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from '@/i18n/LanguageContext';

type Post = { title: string; date: string; excerpt: string; slug: string };

export default function BlogArticle({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const posts = t('pages.blog.posts') as Post[];
  const post = posts.find((item) => item.slug === slug);

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
