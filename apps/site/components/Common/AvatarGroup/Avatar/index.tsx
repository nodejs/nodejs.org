import classNames from 'classnames';
import Image from 'next/image';
import type { FC, HTMLAttributes } from 'react';

import Link from '@/components/Link';

import styles from './index.module.css';

export type AvatarProps = {
  image?: string;
  name?: string;
  nickname: string;
  fallback?: string;
  size?: 'small' | 'medium';
  url?: string;
};

const Avatar: FC<HTMLAttributes<HTMLSpanElement> & AvatarProps> = ({
  image,
  nickname,
  name,
  fallback,
  url,
  size = 'small',
  ...props
}) => {
  const Wrapper = url ? Link : 'div';

  return (
    <span
      {...props}
      className={classNames(styles.avatar, styles[size], props.className)}
    >
      <Wrapper
        href={url || undefined}
        target={url ? '_blank' : undefined}
        className={styles.wrapper}
      >
        {image && (
          <Image
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            src={image}
            alt={name || nickname}
            className={styles.item}
          />
        )}

        {!image && (
          <span className={classNames(styles.item, styles[size])}>
            {fallback}
          </span>
        )}
      </Wrapper>
    </span>
  );
};

export default Avatar;
