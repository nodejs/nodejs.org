import Preview from '@node-core/ui-components/Common/Preview';

import EOLAlert from '#site/components/EOL/EOLAlert';
import WithAvatarGroup from '#site/components/withAvatarGroup';
import WithBlogCrossLinks from '#site/components/withBlogCrossLinks';
import { useClientContext } from '#site/hooks/server';
import { mapAuthorToCardAuthors } from '#site/util/author';
import { mapBlogCategoryToPreviewType } from '#site/util/blog';

import type { FC, PropsWithChildren } from 'react';

import DefaultLayout from './Default';

import styles from './layouts.module.css';

const PostLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontmatter } = useClientContext();

  const authors = mapAuthorToCardAuthors(frontmatter.author!);

  const type = mapBlogCategoryToPreviewType(frontmatter.category!);

  return (
    <DefaultLayout>
      {type === 'vulnerability' && <EOLAlert />}

      <h1>{frontmatter.title}</h1>

      <section className={styles.postAuthors}>
        <WithAvatarGroup names={authors} size="medium" />

        <p>{authors.join(', ')}</p>
      </section>

      <Preview title={frontmatter.title!} type={type} />

      {children}

      <WithBlogCrossLinks />
    </DefaultLayout>
  );
};

export default PostLayout;
