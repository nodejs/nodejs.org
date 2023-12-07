import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import { getClientContext } from '@/client-context';
import { Time } from '@/components/Common/Time';
import Link from '@/components/Link';
import Pagination from '@/components/Pagination';
import getBlogData from '@/next-data/blogData';

const getCurrentCategory = (pathname: string) => {
  // We split the pathname to retrieve the blog category from it since the
  // URL is usually /blog/{category} the second path piece is usually the
  // category name, which usually year-YYYY
  const [, _pathname, category] = pathname.split('/');

  if (_pathname === 'blog' && category && category.length) {
    return category;
  }

  // if either the pathname does not match to a blog page
  // which should not happen (as this hook should only be used in blog pages)
  // or if there is no category in the URL we return the current year as category name
  // which is always the default category (for example, the blog index)
  return `year-${new Date().getFullYear()}`;
};

// This is a React Async Server Component
// Note that Hooks cannot be used in a RSC async component
// Async Components do not get re-rendered at all.
const BlogCategoryLayout: FC = async () => {
  const { frontmatter, pathname } = getClientContext();
  const category = getCurrentCategory(pathname);

  const t = await getTranslations();

  const { posts, pagination } = await getBlogData(category);

  // This only applies if current category is a year category
  const year = category.replace('year-', '');

  const title = category.startsWith('year-')
    ? t('layouts.blogIndex.currentYear', { year })
    : frontmatter.title;

  // This ensures that whenever we're running on dynamic generation (SSG)
  // that invalid categories or categories/pages without posts will redirect to the 404 page
  if (posts.length === 0) {
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
