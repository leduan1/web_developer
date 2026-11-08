import { notFound } from 'next/navigation';
import cs from '@/i18n/translations/cs.json';
import BlogArticle from './BlogArticle';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const exists = cs.pages.blog.posts.some((post) => post.slug === params.slug);
  if (!exists) notFound();
  return <BlogArticle slug={params.slug} />;
}
