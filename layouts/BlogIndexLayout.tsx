import { FormattedMessage } from 'react-intl';
import BaseLayout from './BaseLayout';
import Pagination from '../components/Pagination';
import LocalizedLink from '../components/LocalizedLink';
import { useNextraContext } from '../hooks/useNextraContext';
import { getTimeComponent } from '../util/getTimeComponent';
import type { FC, PropsWithChildren } from 'react';

const BlogIndexLayout: FC<PropsWithChildren> = ({ children }) => {
  const { blogData } = useNextraContext();

  const currentYear = blogData?.currentCategory.replace('year-', '');

  return (
    <BaseLayout>
      <div className="container" dir="auto">
        <FormattedMessage
          id="layouts.blogIndex.currentYear"
          values={{ year: currentYear }}
          tagName="h2"
        />

        <ul className="blog-index">
          {blogData?.posts.map(post => (
            <li key={post.slug}>
              {getTimeComponent(post.date, '%d %b')}
              <LocalizedLink href={post.slug}>{post.title}</LocalizedLink>
            </li>
          ))}
        </ul>

        <Pagination
          prevSlug={blogData?.pagination.prev}
          nextSlug={blogData?.pagination.next}
        />

        {children}
      </div>
    </BaseLayout>
  );
};

export default BlogIndexLayout;
