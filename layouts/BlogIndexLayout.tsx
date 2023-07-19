import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import BaseLayout from './BaseLayout';
import { Time } from '@/components/Common/Time';
import Pagination from '@/components/Pagination';
import LocalizedLink from '@/components/LocalizedLink';
import { useBlogData } from '@/hooks/useBlogData';
import type { FC, PropsWithChildren } from 'react';
import type { BlogPost } from '@/types';

const BlogIndexLayout: FC<PropsWithChildren> = ({ children }) => {
  const { getPagination, getPostsByYear, currentCategory } = useBlogData();

  const currentYear = useMemo(
    () =>
      Number(
        currentCategory.startsWith('year-')
          ? currentCategory.replace('year-', '')
          : new Date().getFullYear()
      ),
    [currentCategory]
  );

  const { posts, pagination } = useMemo(() => {
    return {
      posts: getPostsByYear(currentYear),
      pagination: getPagination(currentYear),
    };
  }, [currentYear, getPagination, getPostsByYear]);

  return (
    <BaseLayout>
      <div className="container" dir="auto">
        <FormattedMessage
          id="layouts.blogIndex.currentYear"
          values={{ year: currentYear }}
          tagName="h2"
        />

        <ul className="blog-index">
          {posts.map((post: BlogPost) => (
            <li key={post.slug}>
              <Time
                date={post.date}
                format={{ month: 'short', day: '2-digit' }}
              />

              <LocalizedLink href={post.slug}>{post.title}</LocalizedLink>
            </li>
          ))}
        </ul>

        <Pagination prevSlug={pagination.prev} nextSlug={pagination.next} />

        {children}
      </div>
    </BaseLayout>
  );
};

export default BlogIndexLayout;
