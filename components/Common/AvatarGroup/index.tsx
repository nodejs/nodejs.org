import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';
import { useState, useMemo } from 'react';

import { getAcronymFromString } from '@/util/stringUtils';

import Avatar from './Avatar';
import avatarstyles from './Avatar/index.module.css';
import styles from './index.module.css';

type AvatarGroupProps = {
  avatars: ComponentProps<typeof Avatar>[];
  limit?: number;
};

const AvatarGroup: FC<AvatarGroupProps> = ({ avatars, limit = 10 }) => {
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
          onClick={() => setShowMore(!showMore)}
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
