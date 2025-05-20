'use client';

import classNames from 'classnames';
import type { FC } from 'react';
import { useState, useMemo } from 'react';

import type { AvatarProps } from '#ui/Common/AvatarGroup/Avatar';
import Avatar from '#ui/Common/AvatarGroup/Avatar';
import avatarstyles from '#ui/Common/AvatarGroup/Avatar/index.module.css';
import AvatarOverlay from '#ui/Common/AvatarGroup/Overlay';
import Tooltip from '#ui/Common/Tooltip';
import type { LinkLike } from '#ui/types';

import styles from './index.module.css';

type AvatarGroupProps = {
  avatars: Array<AvatarProps>;
  limit?: number;
  isExpandable?: boolean;
  size?: AvatarProps['size'];
  container?: HTMLElement;
  as?: LinkLike;
};

const AvatarGroup: FC<AvatarGroupProps> = ({
  avatars,
  limit = 10,
  isExpandable = true,
  size = 'small',
  container,
  as,
}) => {
  const [showMore, setShowMore] = useState(false);

  const renderAvatars = useMemo(
    () => avatars.slice(0, showMore ? avatars.length : limit),
    [avatars, limit, showMore]
  );

  const handleShowMoreClick = isExpandable
    ? () => setShowMore(prev => !prev)
    : undefined;

  return (
    <div
      className={classNames(styles.avatarGroup, styles[size], {
        [styles.expandable]: avatars.length > limit,
      })}
    >
      {renderAvatars.map(avatar => (
        <Tooltip
          key={avatar.nickname}
          asChild
          container={container}
          content={<AvatarOverlay {...avatar} as={as} />}
        >
          <Avatar
            {...avatar}
            size={size}
            className={classNames({
              'cursor-pointer': avatar.url,
              'pointer-events-none': !avatar.url,
            })}
            as={as}
          />
        </Tooltip>
      ))}

      {avatars.length > limit && (
        <span
          onClick={handleShowMoreClick}
          className={classNames(
            avatarstyles.avatar,
            avatarstyles[size],
            'cursor-pointer'
          )}
        >
          <span className={avatarstyles.item}>
            {`${showMore ? '-' : '+'}${avatars.length - limit}`}
          </span>
        </span>
      )}
    </div>
  );
};

export default AvatarGroup;
