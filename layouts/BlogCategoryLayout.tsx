import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import type { FC } from 'react';

import { Time } from '@/components/Common/Time';
import Pagination from '@/components/Pagination';
import { useClientContext, useBlogData } from '@/hooks/server';
import { Link } from '@/navigation.mjs';
import type { BlogPost } from '@/types';

const BlogCategoryLayout: FC = () => {
  const t = useTranslations();
  const { getPagination, getPostsByYear, getPostsByCategory, currentCategory } =
    useBlogData();

  const { frontmatter } = useClientContext();

  const { posts, pagination, title } = useMemo(() => {
    if (currentCategory.startsWith('year-')) {
      const categoryWithoutPrefix = currentCategory.replace('year-', '');

      return {
        posts: getPostsByYear(categoryWithoutPrefix),
        pagination: getPagination(categoryWithoutPrefix),
        title: t('layouts.blogIndex.currentYear', {
          year: categoryWithoutPrefix,
        }),
      };
    }

    return {
      posts: getPostsByCategory(currentCategory),
      pagination: undefined,
      title: frontmatter.title,
    };
  }, [
    currentCategory,
    frontmatter.title,
    getPagination,
    getPostsByCategory,
    getPostsByYear,
    t,
  ]);

  return (
    <div className="container" dir="auto">
      <h2>{title}</h2>

      <ul className="blog-index">
        {posts.map((post: BlogPost) => (
          <li key={post.slug}>
            <Time
              date={post.date}
              format={{ month: 'short', day: '2-digit' }}
            />

            <Link href={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <Pagination {...pagination} />
    </div>
  );
};

export default BlogCategoryLayout;
