import { useMemo } from 'react';
import type { ComponentProps, FC } from 'react';
import { FormattedMessage } from 'react-intl';

import AvatarGroup from '@/components/Common/AvatarGroup';
import Preview from '@/components/Common/Preview';

import styles from './index.module.css';

const dateTimeFormat = new Intl.DateTimeFormat(navigator.language, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

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
  const avatars = useMemo(
    () =>
      authors.map(({ fullName, src }) => ({
        alt: fullName,
        src,
        toString: () => fullName,
      })),
    [authors]
  );

  const formattedDate = useMemo(
    () => ({
      ISOString: date.toISOString(),
      short: dateTimeFormat.format(date),
    }),
    [date]
  );

  return (
    <article className={styles.container}>
      <Preview
        title={title}
        type={type}
        height="auto"
        className={styles.preview}
      />
      <p className={styles.subtitle}>
        <FormattedMessage id={`components.common.card.${type}`} />
      </p>
      <p aria-hidden="true" className={styles.title}>
        {title}
      </p>
      <p className={styles.description}>{description}</p>
      <footer className={styles.footer}>
        <AvatarGroup avatars={avatars} />
        <div>
          <p className={styles.author}>{avatars.join(', ')}</p>
          <time className={styles.date} dateTime={formattedDate.ISOString}>
            {formattedDate.short}
          </time>
        </div>
      </footer>
    </article>
  );
};

export default BlogPostCard;
