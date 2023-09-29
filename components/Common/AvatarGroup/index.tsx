'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import type { FC } from 'react';

type AvatarGroupProps = {
  limit?: number;
  avatars: string[];
};

const AvatarGroup: FC<AvatarGroupProps> = ({ limit = 10, avatars }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.avatarGroup}>
      {showMore
        ? avatars.map((avatar, index) => (
            <Image
              className={styles.avatar}
              key={index}
              src={avatar}
              width={32}
              height={32}
              alt="avatar"
            />
          ))
        : avatars
            .slice(0, limit)
            .map((avatar, index) => (
              <Image
                className={styles.avatar}
                key={index}
                src={avatar}
                width={32}
                height={32}
                alt="avatar"
              />
            ))}
      {avatars.length > limit && (
        <span
          className={styles.showMore}
          onClick={() => setShowMore(!showMore)}
        >
          +{avatars.length - limit}
        </span>
      )}
    </div>
  );
};

export default AvatarGroup;
