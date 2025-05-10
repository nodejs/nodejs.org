import Preview from '@node-core/ui-components/Common/Preview';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import Link from '#site/components/Link';
import WithAvatarGroup from '#site/components/withAvatarGroup';
import type { BlogCategory } from '#site/types';
import { mapBlogCategoryToPreviewType } from '#site/util/blogUtils';

import styles from './index.module.css';

type BlogPostCardProps = {
  title: string;
  category: BlogCategory;
  description?: string;
  authors?: Array<string>;
  date?: Date;
  slug?: string;
};

const BlogPostCard: FC<BlogPostCardProps> = ({
  title,
  slug,
  category,
  description,
  authors = [],
  date,
}) => {
  const t = useTranslations();

  const type = mapBlogCategoryToPreviewType(category);

  return (
    <article className={styles.container}>
      <Link href={slug} aria-label={title}>
        <Preview title={title} type={type} />
      </Link>

      <Link href={`/blog/${category}`} className={styles.subtitle}>
        {t(`layouts.blog.categories.${category}`)}
      </Link>

      <Link href={slug} className={styles.title}>
        {title}
      </Link>

      {description && <p className={styles.description}>{description}</p>}

      <footer className={styles.footer}>
        <WithAvatarGroup names={authors} size="medium" clickable={false} />

        <div className={styles.author}>
          {authors && <p>{authors.join(', ')}</p>}

          {date && <FormattedTime date={date} />}
        </div>
      </footer>
    </article>
  );
};

export default BlogPostCard;
