'use client';

import classNames from 'classnames';
import type { FC } from 'react';
import { useState, useMemo, Fragment } from 'react';

import type { AvatarProps } from '@/components/Common/AvatarGroup/Avatar';
import Avatar from '@/components/Common/AvatarGroup/Avatar';
import avatarstyles from '@/components/Common/AvatarGroup/Avatar/index.module.css';
import AvatarOverlay from '@/components/Common/AvatarGroup/Overlay';
import Tooltip from '@/components/Common/Tooltip';

import styles from './index.module.css';

type AvatarGroupProps = {
  avatars: Array<AvatarProps>;
  limit?: number;
  isExpandable?: boolean;
  size?: AvatarProps['size'];
  container?: HTMLElement;
};

const AvatarGroup: FC<AvatarGroupProps> = ({
  avatars,
  limit = 10,
  isExpandable = true,
  size = 'small',
  container,
}) => {
  const [showMore, setShowMore] = useState(false);

  const renderAvatars = useMemo(
    () => avatars.slice(0, showMore ? avatars.length : limit),
    [showMore, avatars, limit]
  );

  return (
    <div
      className={classNames(styles.avatarGroup, styles[size], {
        [styles.expandable]: avatars.length > limit,
      })}
    >
      {renderAvatars.map(({ ...avatar }) => (
        <Fragment key={avatar.nickname}>
          <Tooltip
            asChild
            container={container}
            content={<AvatarOverlay {...avatar} />}
          >
            <Avatar
              {...avatar}
              size={size}
              className={classNames({
                'cursor-pointer': avatar.url,
                'pointer-events-none': !avatar.url,
              })}
            />
          </Tooltip>
        </Fragment>
      ))}

      {avatars.length > limit && (
        <span
          onClick={isExpandable ? () => setShowMore(prev => !prev) : undefined}
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
