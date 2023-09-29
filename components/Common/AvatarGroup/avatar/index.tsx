import { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import type { FC } from 'react';

type AvatarProps = {
  src: string;
};

const Avatar: FC<AvatarProps> = ({ src }) => {
  const [url, setUrl] = useState(src);

  return (
    <Image
      className={styles.avatar}
      src={url}
      width={32}
      height={32}
      alt="avatar"
      onError={() => setUrl('/static/images/avatar-placeholder.svg')}
    />
  );
};

export default Avatar;
