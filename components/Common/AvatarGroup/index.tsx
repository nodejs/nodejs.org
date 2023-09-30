'use client';
import * as Avatar from '@radix-ui/react-avatar';
import { useState } from 'react';
import type { FC } from 'react';
import styles from './index.module.css';

type AvatarGroupProps = {
  avatars: {
    src: string;
    name: string;
  }[];
  limit?: number;
};

const userNameToFallBackText = (name: string) => {
  // sanitize name before using it
  name = name.toLowerCase().replace(' ', '-');
  const words = name.split('-');
  if (words.length > 1) {
    return words[0][0] + words[1][0];
  }
  return name.slice(0, 2);
};

const AvatarGroup: FC<AvatarGroupProps> = ({ avatars, limit = 10 }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  console.log('avatars', avatars);

  const renderAvatars = showMore ? avatars : avatars.slice(0, limit);

  return (
    <div className={styles.avatarGroup}>
      {renderAvatars.map((avatar, index) => (
        <Avatar.Root key={index} className={styles.avatarRoot}>
          <Avatar.Image
            src={avatar.src}
            alt={avatar.name}
            className={styles.avatar}
          />
          <Avatar.Fallback className={styles.avatar}>
            {userNameToFallBackText(avatar.name)}
          </Avatar.Fallback>
        </Avatar.Root>
      ))}
      {avatars.length > limit && (
        // added span to "emulate" Avatar.Root
        <span className={styles.avatarRoot}>
          <span className={styles.avatar} onClick={toggleShowMore}>
            {showMore ? '-' : `+${avatars.length - limit}`}
          </span>
        </span>
      )}
    </div>
  );
};

export default AvatarGroup;
