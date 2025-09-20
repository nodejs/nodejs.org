import * as RadixAvatar from '@radix-ui/react-avatar';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import type { LinkLike } from '#ui/types';

import styles from './index.module.css';

export type AvatarProps = {
  image?: string;
  name?: string;
  nickname: string;
  fallback?: string;
  size?: 'small' | 'medium';
  url?: string;
  as?: LinkLike | 'div';
};

const Avatar = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement> & AvatarProps
>(
  (
    {
      image,
      nickname,
      name,
      fallback,
      url,
      size = 'small',
      as: Component = 'a',
      ...props
    },
    ref
  ) => {
    if (!url) {
      Component = 'div';
    }

    return (
      <RadixAvatar.Root
        {...props}
        ref={ref}
        className={classNames(styles.avatar, styles[size], props.className)}
      >
        <Component
          href={url || undefined}
          target={url ? '_blank' : undefined}
          className={styles.wrapper}
        >
          <RadixAvatar.Image
            loading="lazy"
            decoding="async"
            src={image}
            alt={name || nickname}
            className={styles.item}
          />
          <RadixAvatar.Fallback
            className={classNames(styles.item, styles[size])}
          >
            {fallback}
          </RadixAvatar.Fallback>
        </Component>
      </RadixAvatar.Root>
    );
  }
);

export default Avatar;
