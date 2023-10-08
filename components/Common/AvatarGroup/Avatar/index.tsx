import * as RadixAvatar from '@radix-ui/react-avatar';
import type { FC } from 'react';

import styles from './index.module.css';

type AvatarProps = {
  src: string;
  alt: string;
};

const Avatar: FC<AvatarProps> = ({ src, alt }) => (
  <RadixAvatar.Root className={styles.avatarRoot}>
    <RadixAvatar.Image src={src} alt={alt} className={styles.avatar} />
    <RadixAvatar.Fallback className={styles.avatar}>{alt}</RadixAvatar.Fallback>
  </RadixAvatar.Root>
);

export default Avatar;
