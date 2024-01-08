import { useTranslations } from 'next-intl';
import type { ComponentProps, FC } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import Preview from '@/components/Common/Preview';
import { Time } from '@/components/Common/Time';
import Link from '@/components/Link';

import styles from './index.module.css';

const fallbackToSupportedTypes = (type: string) =>
  ['announcement', 'release', 'vulnerability'].includes(type)
    ? (type as ComponentProps<typeof Preview>['type'])
    : 'announcement';

// @todo: this should probably be a global type?
type Author = { fullName: string; src: string };

type BlogPostCardProps = {
  title: string;
  category: string;
  description?: string;
  authors: Array<Author>;
  date: Date;
  slug: string;
};

const BlogPostCard: FC<BlogPostCardProps> = ({
  title,
  slug,
  category,
  description,
  authors,
  date,
}) => {
  const t = useTranslations();

  const avatars = authors.map(({ fullName, src }) => ({ alt: fullName, src }));

  const type = fallbackToSupportedTypes(category);

  return (
    <article className={styles.container}>
      <Link href={slug} aria-label={title}>
        <Preview
          title={title}
          type={type}
          className={styles.preview}
          width="100%"
          height="auto"
        />
      </Link>

      <Link href={`/blog/${category}`} className={styles.subtitle}>
        {t(`layouts.blog.categories.${category}`)}
      </Link>

      <Link href={slug} aria-hidden="true" className={styles.title}>
        {title}
      </Link>

      {description && <p className={styles.description}>{description}</p>}

      <footer className={styles.footer}>
        <AvatarGroup avatars={avatars} />

        <div className={styles.author}>
          <p>{avatars.map(avatar => avatar.alt).join(', ')}</p>

          <Time
            date={date}
            format={{ day: 'numeric', month: 'short', year: 'numeric' }}
          />
        </div>
      </footer>
    </article>
  );
};

export default BlogPostCard;
