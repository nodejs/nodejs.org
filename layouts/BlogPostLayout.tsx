import { FormattedMessage } from 'react-intl';
import BaseLayout from './BaseLayout';
import { Time } from '@/components/Common/Time';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import type { FC, PropsWithChildren } from 'react';
import type { LegacyBlogFrontMatter } from '@/types';

const BlogPostLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontMatter } = useLayoutContext();

  const { title, author, date } = frontMatter as LegacyBlogFrontMatter;

  return (
    <BaseLayout>
      <div className="container">
        <article dir="auto">
          <div className="blogpost-header">
            <h1>{title}</h1>
            <span className="blogpost-meta">
              <FormattedMessage
                id="layouts.blogPost.author.byLine"
                values={{ author: author || null }}
              />

              <Time
                date={date}
                format={{ month: 'short', day: '2-digit', year: 'numeric' }}
              />
            </span>
          </div>

          {children}
        </article>
      </div>
    </BaseLayout>
  );
};

export default BlogPostLayout;
