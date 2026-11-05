'use client';

import classNames from 'classnames';
import { useState, useMemo } from 'react';

import Avatar from '#ui/Common/AvatarGroup/Avatar';
import avatarstyles from '#ui/Common/AvatarGroup/Avatar/index.module.css';
import AvatarOverlay from '#ui/Common/AvatarGroup/Overlay';
import Tooltip from '#ui/Common/Tooltip';
import useMediaQuery from '#ui/hooks/useMediaQuery';

import type { AvatarProps } from '#ui/Common/AvatarGroup/Avatar';
import type { LinkLike } from '#ui/types';
import type { FC } from 'react';

import styles from './index.module.css';

const COMPACT_MEDIA_QUERY = '(max-width: 1280px)';

type AvatarGroupProps = {
  avatars: Array<AvatarProps>;
  limit?: number;
  /** The limit on compact screens (below `xl`), when it differs from `limit` */
  compactLimit?: number;
  isExpandable?: boolean;
  size?: AvatarProps['size'];
  container?: HTMLElement;
  as?: LinkLike;
};

const AvatarGroup: FC<AvatarGroupProps> = ({
  avatars,
  limit: fullLimit = 10,
  compactLimit = fullLimit,
  isExpandable = true,
  size = 'small',
  container,
  as,
}) => {
  const [showMore, setShowMore] = useState(false);

  const isCompact = useMediaQuery(COMPACT_MEDIA_QUERY);
  const limit = isCompact ? compactLimit : fullLimit;

  const renderAvatars = useMemo(
    () => avatars.slice(0, showMore ? avatars.length : limit),
    [avatars, limit, showMore]
  );

  const handleShowMoreClick = isExpandable
    ? () => setShowMore(prev => !prev)
    : undefined;

  return (
    <div className={classNames(styles.avatarGroup, styles[size])}>
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
