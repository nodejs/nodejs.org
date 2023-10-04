import * as RadixAvatar from '@radix-ui/react-avatar';
import type { FC } from 'react';

import type { AvatarType } from '@/components/Common/AvatarGroup';

import styles from './index.module.css';

type AvatarProps = AvatarType;

export const fallbackAltAsAvatar = (alt: string = '') =>
  alt
    .match(/\b(\w)/g)
    ?.join('')
    .toLocaleUpperCase();

const Avatar: FC<AvatarProps> = ({ src, alt }) => (
  <RadixAvatar.Root className={styles.avatarRoot}>
    <RadixAvatar.Image src={src} alt={alt} className={styles.avatar} />
    <RadixAvatar.Fallback className={styles.avatar}>
      {fallbackAltAsAvatar(alt)}
    </RadixAvatar.Fallback>
  </RadixAvatar.Root>
);

export default Avatar;
