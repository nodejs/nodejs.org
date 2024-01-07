'use client';

import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';
import { useState, useMemo } from 'react';

import Avatar from '@/components/Common/AvatarGroup/Avatar';
import avatarstyles from '@/components/Common/AvatarGroup/Avatar/index.module.css';
import { getAcronymFromString } from '@/util/stringUtils';

import styles from './index.module.css';

type AvatarGroupProps = {
  avatars: Array<ComponentProps<typeof Avatar>>;
  limit?: number;
  isExpandable?: boolean;
};

const AvatarGroup: FC<AvatarGroupProps> = ({
  avatars,
  limit = 10,
  isExpandable = true,
}) => {
  const [showMore, setShowMore] = useState(false);

  const renderAvatars = useMemo(
    () => avatars.slice(0, showMore ? avatars.length : limit),
    [showMore, avatars, limit]
  );

  return (
    <div className={styles.avatarGroup}>
      {renderAvatars.map((avatar, index) => (
        <Avatar
          src={avatar.src}
          alt={getAcronymFromString(avatar.alt)}
          key={index}
        />
      ))}

      {avatars.length > limit && (
        <span
          onClick={isExpandable ? () => setShowMore(prev => !prev) : undefined}
          className={classNames(avatarstyles.avatarRoot, 'cursor-pointer')}
        >
          <span className={avatarstyles.avatar}>
            {`${showMore ? '-' : '+'}${avatars.length - limit}`}
          </span>
        </span>
      )}
    </div>
  );
};

export default AvatarGroup;
