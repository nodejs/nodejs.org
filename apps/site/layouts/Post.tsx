import Preview from '@node-core/ui-components/Common/Preview';

import { getClientContext } from '#site/client-context';
import AvatarGroup from '#site/components/AvatarGroup';
import BlogCrossLinks from '#site/components/BlogCrossLinks';
import EOLAlert from '#site/components/EOL/EOLAlert';
import Footer from '#site/components/Footer';
import MetaBar from '#site/components/MetaBar';
import NavBar from '#site/components/NavBar';
import { mapAuthorToCardAuthors } from '#site/util/author';
import { mapBlogCategoryToPreviewType } from '#site/util/blog';

import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

const PostLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontmatter } = getClientContext();

  const authors = mapAuthorToCardAuthors(frontmatter.author!);

  const type = mapBlogCategoryToPreviewType(frontmatter.category!);

  return (
    <>
      <NavBar />

      <div className={styles.contentLayout}>
        <div></div>

        <div className={styles.postLayout}>
          <main id="main" tabIndex={-1}>
            {type === 'vulnerability' && <EOLAlert />}

            <h1>{frontmatter.title}</h1>

            <section>
              <AvatarGroup names={authors} size="medium" />

              <p>{authors.join(', ')}</p>
            </section>

            <Preview title={frontmatter.title!} type={type} />

            {children}

            <BlogCrossLinks />
          </main>
        </div>

        <MetaBar />
      </div>

      <Footer />
    </>
  );
};

export default PostLayout;
