import Preview from '@node-core/ui-components/Common/Preview';

import EOLAlert from '#site/components/EOL/EOLAlert';
import WithAvatarGroup from '#site/components/withAvatarGroup';
import WithBlogCrossLinks from '#site/components/withBlogCrossLinks';
import WithFooter from '#site/components/withFooter';
import WithMetaBar from '#site/components/withMetaBar';
import WithNavBar from '#site/components/withNavBar';
import { useClientContext } from '#site/hooks/react-server';
import { mapAuthorToCardAuthors } from '#site/util/author';
import { mapBlogCategoryToPreviewType } from '#site/util/blog';

import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

const PostLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontmatter } = useClientContext();

  const authors = mapAuthorToCardAuthors(frontmatter.author!);

  const type = mapBlogCategoryToPreviewType(frontmatter.category!);

  return (
    <>
      <WithNavBar />

      <div className={styles.contentLayout}>
        <div className={styles.postLayout}>
          <main>
            {type === 'vulnerability' && <EOLAlert />}

            <h1>{frontmatter.title}</h1>

            <section>
              <WithAvatarGroup names={authors} size="medium" />

              <p>{authors.join(', ')}</p>
            </section>

            <Preview title={frontmatter.title!} type={type} />

            {children}

            <WithBlogCrossLinks />
          </main>
        </div>

        <WithMetaBar />
      </div>

      <WithFooter />
    </>
  );
};

export default PostLayout;
