import * as RadixAvatar from '@radix-ui/react-avatar';
import classNames from 'classnames';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';

import styles from './index.module.css';

export type AvatarProps = {
  image?: string;
  name?: string;
  nickname: string;
  fallback?: string;
  size?: 'small' | 'medium';
};

const Avatar = forwardRef<
  ElementRef<typeof RadixAvatar.Root>,
  ComponentPropsWithoutRef<typeof RadixAvatar.Root> & AvatarProps
>(({ image, name, fallback, size = 'small', ...props }, ref) => (
  <RadixAvatar.Root
    {...props}
    className={classNames(styles.avatar, styles[size], props.className)}
    ref={ref}
  >
    <RadixAvatar.Image
      loading="lazy"
      src={image}
      alt={name}
      className={styles.item}
    />
    <RadixAvatar.Fallback
      delayMs={500}
      className={classNames(styles.item, styles[size])}
    >
      {fallback}
    </RadixAvatar.Fallback>
  </RadixAvatar.Root>
));

export default Avatar;
