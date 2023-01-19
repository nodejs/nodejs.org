import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import strftime from 'strftime';
import type { PropsWithChildren } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNextraContext } from '../hooks/useNextraContext';

import type { LegacyBlogFrontMatter } from '../types';

const BlogPostLayout = ({ children }: PropsWithChildren) => {
  const nextraContext = useNextraContext();

  const { title, author, date } =
    nextraContext.frontMatter as LegacyBlogFrontMatter;

  const { dateTime, formatedDate } = useMemo(() => {
    const dateObject = new Date(date);

    return {
      dateTime: strftime('%FT%T%z', dateObject),
      formatedDate: strftime('%F', dateObject),
    };
  }, [date]);

  return (
    <>
      <Header />
      <main id="main">
        <div className="container">
          <article dir="auto">
            <div className="blogpost-header">
              <h1>{title}</h1>
              <span className="blogpost-meta">
                <FormattedMessage
                  id="layouts.blogPost.author.byLine"
                  values={{ author }}
                />
                <time dateTime={dateTime}>{formatedDate}</time>
              </span>
            </div>

            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPostLayout;
