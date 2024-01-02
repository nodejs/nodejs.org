import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import { getClientContext } from '@/client-context';
import { Time } from '@/components/Common/Time';
import Link from '@/components/Link';
import Pagination from '@/components/Pagination';
import getBlogData from '@/next-data/blogData';
import type { BlogDataRSC } from '@/types';

const getCategoryData = async (pathname: string) => {
  // We split the pathname to retrieve the blog category from it since the
  // URL is usually /blog/{category} the second path piece is usually the
  // category name, which usually year-YYYY
  const [, _pathname, category] = pathname.split('/');
  if (_pathname === 'blog' && category && category.length) {
    const data = await getBlogData(category);
    return {
      ...data,
      category,
    };
  }

  // If the pathname does not match to a blog page,
  //   which should not happen (as this hook should only be used in blog pages),
  // or, if there is no category in the URL,
  //   which happens when we're on the blog overview page (index),
  // then we return the most recent year with blog posts
  let year = new Date().getFullYear() + 1;
  let data: BlogDataRSC | undefined;
  while (!data || (data.posts.length === 0 && year)) {
    year -= 1;
    data = await getBlogData(`year-${year}`);
  }
  return {
    ...data,
    category: `year-${year}`,
  };
};

// This is a React Async Server Component
// Note that Hooks cannot be used in a RSC async component
// Async Components do not get re-rendered at all.
const BlogCategoryLayout: FC = async () => {
  const { frontmatter, pathname } = getClientContext();

  const t = await getTranslations();

  const { posts, pagination, category } = await getCategoryData(pathname);

  // This only applies if current category is a year category
  const year = category.replace('year-', '');
  const title = category.startsWith('year-')
    ? t('layouts.blogIndex.currentYear', { year })
    : frontmatter.title;

  // This ensures that whenever we're running on dynamic generation (SSG)
  // that invalid categories or categories/pages without posts will redirect to the 404 page
  // however, the blog overview page (index) will always be generated, even if there are no posts
  if (posts.length === 0 && pathname !== '/blog') {
    return notFound();
  }

  return (
    <div className="container" dir="auto">
      <h2>{title}</h2>

      <ul className="blog-index">
        {posts.map(({ slug, date, title }) => (
          <li key={slug}>
            <Time date={date} format={{ month: 'short', day: '2-digit' }} />
            <Link href={slug}>{title}</Link>
          </li>
        ))}
      </ul>

      <Pagination {...pagination} />
    </div>
  );
};

export default BlogCategoryLayout;
