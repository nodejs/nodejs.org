'use client';
import type { FC } from 'react';
import { useState, useMemo } from 'react';

import { getAcronymFromString } from '@/util/avatars';

import Avatar from './Avatar';
import avatarstyles from './Avatar/index.module.css';
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

  const renderAvatars = useMemo(
    () => (showMore ? avatars : avatars.slice(0, limit)),
    [showMore, avatars, limit]
  );

  return (
    <div className={styles.avatarGroup}>
      {renderAvatars.map((avatar, index) => (
        <Avatar
          src={avatar.src}
          alt={getAcronymFromString(avatar.alt || '')}
          key={index}
        />
      ))}

      {avatars.length > limit && (
        <span
          onClick={() => setShowMore(!showMore)}
          className={avatarstyles.avatarRoot}
        >
          <span className={avatarstyles.avatar}>
            {showMore ? '-' : `+${avatars.length - limit}`}
          </span>
        </span>
      )}
    </div>
  );
};

export default AvatarGroup;
