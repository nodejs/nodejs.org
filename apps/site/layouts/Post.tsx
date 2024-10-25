import type { FC, PropsWithChildren } from 'react';

import Preview from '@/components/Common/Preview';
import WithAvatarGroup from '@/components/withAvatarGroup';
import WithBlogCrossLinks from '@/components/withBlogCrossLinks';
import WithFooter from '@/components/withFooter';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import { useClientContext } from '@/hooks/react-server';
import ContentLayout from '@/layouts/Content';
import { mapAuthorToCardAuthors } from '@/util/authorUtils';
import { mapBlogCategoryToPreviewType } from '@/util/blogUtils';

import styles from './layouts.module.css';

const PostLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontmatter } = useClientContext();

  const authors = mapAuthorToCardAuthors(frontmatter.author);

  const type = mapBlogCategoryToPreviewType(frontmatter.category);

  return (
    <>
      <WithNavBar />

      <ContentLayout>
        <div className={styles.postLayout}>
          <main>
            <h1>{frontmatter.title}</h1>

            <section>
              <WithAvatarGroup names={authors} />

              <p>{authors.join(', ')}</p>
            </section>

            <Preview title={frontmatter.title!} type={type} />

            {children}

            <WithBlogCrossLinks />
          </main>
        </div>

        <WithMetaBar />
      </ContentLayout>

      <WithFooter />
    </>
  );
};

export default PostLayout;
