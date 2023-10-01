'use client';
import type { FC } from 'react';
import { useState, useMemo } from 'react';
import Avatar from './Avatar';
import styles from './index.module.css';

type AvatarGroupProps = {
  avatars: {
    src: string;
    alt?: string;
  }[];
  limit?: number;
};

const AvatarGroup: FC<AvatarGroupProps> = ({ avatars, limit = 10 }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const renderAvatars = useMemo(
    () => (showMore ? avatars : avatars.slice(0, limit)),
    [showMore, avatars, limit]
  );

  return (
    <div className={styles.avatarGroup}>
      {renderAvatars.map((avatar, index) => (
        <Avatar
          src={avatar.src}
          alt={avatar.alt}
          extraClass={styles.avatarRoot}
          key={index}
        />
      ))}
      {avatars.length > limit && (
        <Avatar
          extraClass={styles.avatarRoot}
          alt={showMore ? '-' : `+${avatars.length - limit}`}
          onClick={toggleShowMore}
        />
      )}
    </div>
  );
};

export default AvatarGroup;
