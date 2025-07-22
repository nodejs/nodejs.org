import Preview from '@node-core/ui-components/Common/Preview';
import type { FC, PropsWithChildren } from 'react';

import Link from '#site/components/Link';
import WithAvatarGroup from '#site/components/withAvatarGroup';
import WithBlogCrossLinks from '#site/components/withBlogCrossLinks';
import WithFooter from '#site/components/withFooter';
import WithMetaBar from '#site/components/withMetaBar';
import WithNavBar from '#site/components/withNavBar';
import { useClientContext } from '#site/hooks/react-server';
import { mapAuthorToCardAuthors } from '#site/util/author';
import { mapBlogCategoryToPreviewType } from '#site/util/blog';

import styles from './layouts.module.css';
import PartnersLogoList from '../components/Common/Partners/PartnersLogoList';

const PostLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontmatter } = useClientContext();

  const authors = mapAuthorToCardAuthors(frontmatter.author);

  const type = mapBlogCategoryToPreviewType(frontmatter.category);

  return (
    <>
      <WithNavBar />

      <div className={styles.contentLayout}>
        <div className={styles.postLayout}>
          <main>
            <h1>{frontmatter.title}</h1>

            <section>
              <WithAvatarGroup names={authors} size="medium" />

              <p>{authors.join(', ')}</p>
            </section>

            <Preview title={frontmatter.title!} type={type} />

            {children}
            {type === 'vulnerability' && (
              <section className="flex-col! flex w-full gap-4">
                <h2 className="text-center">Thanks by Our Partners</h2>
                <p>
                  We are able to offer security releases proudly due to the
                  support of these partners
                  <Link href="/about/partners/"> and more</Link>.
                </p>
                <PartnersLogoList categories="security" />
              </section>
            )}
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
