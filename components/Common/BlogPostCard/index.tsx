import { useMemo } from 'react';
import type { ComponentProps, FC } from 'react';
import { FormattedMessage } from 'react-intl';

import AvatarGroup from '@/components/Common/AvatarGroup';
import Preview from '@/components/Common/Preview';
import { shortHumanReadableDate } from '@/util/shortHumanReadableDate';

import styles from './index.module.css';

type Author = {
  fullName: string;
  src: ComponentProps<typeof AvatarGroup>['avatars'][number]['src'];
};

export type BlogPostCardProps = {
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
  const avatars = useMemo(() => {
    const parsedAvatars = authors.map(({ fullName, src }) => ({
      alt: fullName,
      src,
      toString() {
        return fullName;
      },
    }));

    return parsedAvatars;
  }, [authors]);

  const authorNames = avatars.join(', ');

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
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <footer className={styles.footer}>
        <AvatarGroup avatars={avatars} />
        <div>
          <p className={styles.author}>{authorNames}</p>
          <time className={styles.date} dateTime={date.toISOString()}>
            {shortHumanReadableDate(date)}
          </time>
        </div>
      </footer>
    </article>
  );
};

export default BlogPostCard;
