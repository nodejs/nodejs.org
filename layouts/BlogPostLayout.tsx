import { FormattedMessage } from 'react-intl';
import type { PropsWithChildren } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNextraContext } from '../hooks/useNextraContext';
import { getTimeComponent } from '../util/getTimeComponent';

import type { LegacyBlogFrontMatter } from '../types';

const BlogPostLayout = ({ children }: PropsWithChildren) => {
  const nextraContext = useNextraContext();

  const { title, author, date } =
    nextraContext.frontMatter as LegacyBlogFrontMatter;

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
                  values={{ author: author || null }}
                />
                {getTimeComponent(date)}
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
