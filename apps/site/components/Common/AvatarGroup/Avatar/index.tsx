import * as RadixAvatar from '@radix-ui/react-avatar';
import classNames from 'classnames';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';

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

const Avatar = forwardRef<
  ElementRef<typeof RadixAvatar.Root>,
  ComponentPropsWithoutRef<typeof RadixAvatar.Root> & AvatarProps
>(({ image, nickname, name, fallback, url, size = 'small', ...props }, ref) => {
  const Wrapper = url ? Link : 'div';

  return (
    <RadixAvatar.Root
      {...props}
      className={classNames(styles.avatar, styles[size], props.className)}
      ref={ref}
    >
      <Wrapper
        href={url || undefined}
        target={url ? '_blank' : undefined}
        className={styles.wrapper}
      >
        <RadixAvatar.Image
          loading="lazy"
          src={image}
          alt={name || nickname}
          className={styles.item}
        />
        <RadixAvatar.Fallback
          delayMs={500}
          className={classNames(styles.item, styles[size])}
        >
          {fallback}
        </RadixAvatar.Fallback>
      </Wrapper>
    </RadixAvatar.Root>
  );
});

export default Avatar;
