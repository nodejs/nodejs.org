import { useMemo } from 'react';
import BaseLayout from './BaseLayout';
import { Time } from '@/components/Common/Time';
import LocalizedLink from '@/components/LocalizedLink';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { useBlogData } from '@/hooks/useBlogData';
import type { FC, PropsWithChildren } from 'react';
import type { BlogPost } from '@/types';

const CategoryIndexLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontMatter } = useLayoutContext();
  const { getPostsByCategory, currentCategory } = useBlogData();

  const posts = useMemo(
    () => getPostsByCategory(currentCategory),
    [currentCategory, getPostsByCategory]
  );

  return (
    <BaseLayout>
      <div className="container" dir="auto">
        <h2>{frontMatter.title}</h2>

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

        {children}
      </div>
    </BaseLayout>
  );
};

export default CategoryIndexLayout;
