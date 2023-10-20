import { useMemo } from 'react';
import type { ComponentProps, FC } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import Preview from '@/components/Common/Preview';
import { shortHumanReadableDate } from '@/util/shortHumanReadableDate';

import styles from './index.module.css';

export type CardProps = {
  title: ComponentProps<typeof Preview>['title'];
  type: ComponentProps<typeof Preview>['type'];
  subtitle: string;
  description: string;
  author: {
    firstName: string;
    lastName: string;
    src: string;
  };
  date: Date;
};

const Card: FC<CardProps> = ({
  title,
  type,
  subtitle,
  description,
  author,
  date,
}) => {
  const avatars = useMemo(() => {
    const avatars = [
      {
        alt: `${author.firstName} ${author.lastName}`,
        src: author.src,
      },
    ];

    return avatars;
  }, [author.firstName, author.lastName, author.src]);

  return (
    <article className={styles.container}>
      <Preview
        title={title}
        type={type}
        height="auto"
        className={styles.preview}
      />
      <p className={styles.subtitle}>{subtitle}</p>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <footer className={styles.footer}>
        <AvatarGroup avatars={avatars} />
        <div>
          <p className={styles.author}>
            {author.firstName} {author.lastName}
          </p>
          <time className={styles.date} dateTime={date.toISOString()}>
            {shortHumanReadableDate(date)}
          </time>
        </div>
      </footer>
    </article>
  );
};

export default Card;
