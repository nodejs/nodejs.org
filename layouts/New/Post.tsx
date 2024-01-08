import type { FC, PropsWithChildren } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import Preview from '@/components/Common/Preview';
import {
  mapAuthorToCardAuthors,
  mapCategoryType,
} from '@/components/withBlogCategories';
import WithBlogCrossLinks from '@/components/withBlogCrossLinks';
import WithFooter from '@/components/withFooter';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import { useClientContext } from '@/hooks/react-server';
import ContentLayout from '@/layouts/New/Content';

import styles from './layouts.module.css';

const PostLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontmatter } = useClientContext();

  const authors = mapAuthorToCardAuthors(frontmatter.author);

  return (
    <>
      <WithNavBar />

      <ContentLayout>
        <div className={styles.postLayout}>
          <main>
            <h1>{frontmatter.title}</h1>

            <section>
              <AvatarGroup
                avatars={authors.map(author => ({
                  alt: author.fullName,
                  src: author.src,
                }))}
              />

              <p>{authors.map(author => author.fullName).join(', ')}</p>
            </section>

            <Preview
              title={frontmatter.title}
              type={mapCategoryType(frontmatter.category)}
              width="100%"
              height="auto"
            />

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
