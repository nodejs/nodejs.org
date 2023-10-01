import type { FC } from 'react';
import * as RadixAvatar from '@radix-ui/react-avatar';
import styles from './index.module.css';

type AvatarProps = {
  src?: string;
  alt?: string;
  extraClass?: string;
  onClick?: () => void;
};

const usrnameToFallbackText = (name?: string) => {
  // sanitize name before using it
  if (!name) return;
  const sanitizeName = name.toLowerCase().replace(' ', '-');
  const words = sanitizeName.split('-');
  return words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2);
};

const Avatar: FC<AvatarProps> = ({ src, alt, extraClass, onClick }) => (
  <RadixAvatar.Root className={extraClass} onClick={onClick}>
    <RadixAvatar.Image src={src} alt={alt} className={styles.avatar} />
    <RadixAvatar.Fallback className={styles.avatar}>
      {src ? usrnameToFallbackText(alt) : alt}
    </RadixAvatar.Fallback>
  </RadixAvatar.Root>
);

export default Avatar;
