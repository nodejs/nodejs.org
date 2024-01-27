import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import { getClientContext } from '@/client-context';
import FormattedTime from '@/components/Common/FormattedTime';
import Link from '@/components/Link';
import Pagination from '@/components/Pagination';
import getBlogData from '@/next-data/blogData';

const getCategoryData = async (pathname: string) => {
  // pathname format can either be: /en/blog/{category}
  // or /en/blog/{category}/page/{page}
  // hence we attempt to interpolate the full /en/blog/{category}/page/{page}
  // and in case of course no page argument is provided we define it to 1
  // note that malformed routes can't happen as they are all statically generated
  const [, , category = 'all', , page = 1] = pathname.split('/');

  const { posts, pagination } = await getBlogData(category, Number(page));

  return { posts, category, pagination };
};

// This is a React Async Server Component
// Note that Hooks cannot be used in a RSC async component
// Async Components do not get re-rendered at all.
const BlogCategoryLayout: FC = async () => {
  const { pathname } = getClientContext();

  const t = await getTranslations();

  const { posts, pagination, category } = await getCategoryData(pathname);

  return (
    <div className="container" dir="auto">
      <h2 style={{ textTransform: 'capitalize' }}>
        {t('layouts.blogIndex.categoryName', {
          category: category.replace('year-', ''),
        })}
      </h2>

      <ul className="blog-index">
        {posts.map(({ slug, date, title }) => (
          <li key={slug}>
            <FormattedTime date={date} />

            <Link href={slug}>{title}</Link>
          </li>
        ))}
      </ul>

      <Pagination category={category} {...pagination} />
    </div>
  );
};

export default BlogCategoryLayout;
