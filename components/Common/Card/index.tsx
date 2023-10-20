import { useMemo } from 'react';
import type { ComponentProps, FC } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import Preview from '@/components/Common/Preview';
import { shortHumanReadableDate } from '@/util/shortHumanReadableDate';

import styles from './index.module.css';

type Author = {
  firstName: string;
  lastName: string;
  src: ComponentProps<typeof AvatarGroup>['avatars'][number]['src'];
};

export type CardProps = {
  title: ComponentProps<typeof Preview>['title'];
  type: ComponentProps<typeof Preview>['type'];
  subtitle: string;
  description: string;
  authors: Author[];
  date: Date;
};

const Card: FC<CardProps> = ({
  title,
  type,
  subtitle,
  description,
  authors,
  date,
}) => {
  const avatars = useMemo(() => {
    const parsedAvatars = authors.map(({ firstName, lastName, src }) => ({
      alt: `${firstName} ${lastName}`,
      src,
      toString() {
        return `${firstName} ${lastName}`;
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
      <p className={styles.subtitle}>{subtitle}</p>
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

export default Card;
