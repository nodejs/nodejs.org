'use client';
import { useState } from 'react';
import styles from './index.module.css';
import type { FC } from 'react';
import Avatar from './avatar';

type AvatarGroupProps = {
  avatars: string[];
  limit?: number;
  forceShow?: boolean;
};

const AvatarGroup: FC<AvatarGroupProps> = ({
  limit = 10,
  avatars,
  forceShow,
}) => {
  const [showMore, setShowMore] = useState(forceShow?.valueOf() || false);

  const handleShowMoreClick = () => {
    if (forceShow) return;
    setShowMore(true);
  };

  return (
    <div className={styles.avatarGroup}>
      {showMore
        ? avatars.map((avatar, index) => <Avatar key={index} src={avatar} />)
        : avatars
            .slice(0, limit)
            .map((avatar, index) => <Avatar key={index} src={avatar} />)}
      {avatars.length > limit && !showMore && (
        <span className={styles.showMore} onClick={() => handleShowMoreClick()}>
          +{avatars.length - limit}
        </span>
      )}
    </div>
  );
};

export default AvatarGroup;
