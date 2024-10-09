import * as RadixAvatar from '@radix-ui/react-avatar';
import type { FC } from 'react';

import styles from './index.module.css';

export type AvatarProps = {
  src: string;
  alt: string;
  fallback: string;
};

const Avatar: FC<AvatarProps> = ({ src, alt, fallback }) => (
  <RadixAvatar.Root className={styles.avatarRoot}>
    <RadixAvatar.Image
      loading="lazy"
      src={src}
      alt={alt}
      title={alt}
      className={styles.avatar}
    />
    <RadixAvatar.Fallback delayMs={500} className={styles.avatar}>
      {fallback}
    </RadixAvatar.Fallback>
  </RadixAvatar.Root>
);

export default Avatar;
