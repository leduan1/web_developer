import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/config/site';
import cs from '@/i18n/translations/cs.json';
import { getDictionary } from '@/i18n/dictionaries';
import { parseLocale } from '@/lib/seo';
import { buildBlogPostingJsonLd } from '@/lib/structured-data';
import BlogArticle from './BlogArticle';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const exists = cs.pages.blog.posts.some((post) => post.slug === params.slug);
  if (!exists) notFound();

  const locale = parseLocale(headers().get('x-locale'));
  const dict = getDictionary(locale);
  const post = dict.pages.blog.posts.find((item) => item.slug === params.slug);
  const datePublished = siteConfig.blogPublished[params.slug as keyof typeof siteConfig.blogPublished];
  if (!post || !datePublished) notFound();

  return (
    <>
      <JsonLd
        data={buildBlogPostingJsonLd({
          headline: post.title,
          description: post.excerpt,
          datePublished,
          path: `/blog/${params.slug}`,
          locale,
        })}
      />
      <BlogArticle slug={params.slug} />
    </>
  );
}
