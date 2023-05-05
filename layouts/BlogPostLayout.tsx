import { FormattedMessage } from 'react-intl';
import BaseLayout from './BaseLayout';
import { useNextraContext } from '../hooks/useNextraContext';
import { getTimeComponent } from '../util/getTimeComponent';
import type { FC, PropsWithChildren } from 'react';
import type { LegacyBlogFrontMatter } from '../types';

const BlogPostLayout: FC<PropsWithChildren> = ({ children }) => {
  const nextraContext = useNextraContext();

  const { title, author, date } =
    nextraContext.frontMatter as LegacyBlogFrontMatter;

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
              {getTimeComponent(date)}
            </span>
          </div>

          {children}
        </article>
      </div>
    </BaseLayout>
  );
};

export default BlogPostLayout;
