import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import FormattedTime from '@/components/Common/FormattedTime';
import Preview from '@/components/Common/Preview';
import Link from '@/components/Link';
import { mapBlogCategoryToPreviewType } from '@/util/blogUtils';

import styles from './index.module.css';

// @todo: this should probably be a global type?
type Author = { fullName: string; src: string };

type BlogPostCardProps = {
  title: string;
  category: string;
  description?: string;
  authors?: Array<Author>;
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

  const avatars = authors.map(({ fullName, src }) => ({ alt: fullName, src }));

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
        <AvatarGroup avatars={avatars ?? []} />

        <div className={styles.author}>
          {avatars && <p>{avatars.map(({ alt }) => alt).join(', ')}</p>}

          {date && <FormattedTime date={date} />}
        </div>
      </footer>
    </article>
  );
};

export default BlogPostCard;
