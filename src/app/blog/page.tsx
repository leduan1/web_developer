'use client';

import { Header, SideLabels, Footer } from '@/components';
import PageTitle from '@/components/PageTitle';
import { useTranslation } from '@/i18n/LanguageContext';

export default function BlogPage() {
  const { t } = useTranslation();
  const pb = t('pages.blog') as Record<string, unknown>;
  const posts = pb.posts as { title: string; date: string; excerpt: string; slug: string }[];
  const readMore = pb.readMoreButton as string;

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <PageTitle translationKey="pages.blog.title" />
      <Header />
      <SideLabels />
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h1 className="font-condensed text-5xl md:text-6xl text-white uppercase mb-4">{pb.heading as string}</h1>
          <p className="text-white/70 mb-16 text-lg">
            {pb.description as string}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className="bg-white/5 border border-white/10 rounded-lg p-8 hover:border-red-500/50 transition group"
              >
                <p className="text-white/60 text-xs uppercase mb-3">{post.date}</p>
                <h2 className="font-condensed text-2xl text-white uppercase mb-4 group-hover:text-red-500 transition">
                  {post.title}
                </h2>
                <p className="text-white/70 mb-6 leading-relaxed">{post.excerpt}</p>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-red-500 hover:text-red-400 font-bold uppercase text-xs flex items-center gap-2 transition"
                >
                  {readMore}
                  <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
