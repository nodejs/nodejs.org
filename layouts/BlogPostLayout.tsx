import { useTranslations } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';

import FormattedTime from '@/components/Common/FormattedTime';
import { useClientContext } from '@/hooks/server';

const BlogPostLayout: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations();

  const {
    frontmatter: { title, author, date },
  } = useClientContext();

  return (
    <div className="container">
      <article dir="auto">
        <div className="blogpost-header">
          <h1>{title}</h1>
          <span className="blogpost-meta">
            {t('layouts.blogPost.author.byLine', { author: author || null })}

            <FormattedTime date={date} />
          </span>
        </div>

        {children}
      </article>
    </div>
  );
};

export default BlogPostLayout;
