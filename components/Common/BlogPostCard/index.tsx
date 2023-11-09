import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import type { ComponentProps, FC } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import Preview from '@/components/Common/Preview';
import { Time } from '@/components/Common/Time';

import styles from './index.module.css';

type Author = {
  fullName: string;
  src: string;
};

type BlogPostCardProps = {
  title: ComponentProps<typeof Preview>['title'];
  type: Required<ComponentProps<typeof Preview>>['type'];
  description: string;
  authors: Author[];
  date: Date;
};

const BlogPostCard: FC<BlogPostCardProps> = ({
  title,
  type,
  description,
  authors,
  date,
}) => {
  const t = useTranslations();

  const avatars = useMemo(
    () =>
      authors.map(({ fullName, src }) => ({
        alt: fullName,
        src,
        toString: () => fullName,
      })),
    [authors]
  );

  return (
    <article className={styles.container}>
      <Preview
        title={title}
        type={type}
        height="auto"
        className={styles.preview}
      />
      <p className={styles.subtitle}>{t(`components.common.card.${type}`)}</p>
      <p aria-hidden="true" className={styles.title}>
        {title}
      </p>
      <p className={styles.description}>{description}</p>
      <footer className={styles.footer}>
        <AvatarGroup avatars={avatars} />
        <div className={styles.author}>
          <p>{avatars.join(', ')}</p>

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
