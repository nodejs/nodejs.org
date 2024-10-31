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

export type AvatarGroupProps = {
  avatars: Array<AvatarProps & { url?: string }>;
  limit?: number;
  isExpandable?: boolean;
  size?: AvatarProps['size'];
};

const AvatarGroup: FC<AvatarGroupProps> = ({
  avatars,
  limit = 10,
  isExpandable = true,
  size = 'small',
}) => {
  const [showMore, setShowMore] = useState(false);

  const renderAvatars = useMemo(
    () => avatars.slice(0, showMore ? avatars.length : limit),
    [showMore, avatars, limit]
  );

  return (
    <div className={styles.avatarGroup}>
      {renderAvatars.map(({ ...avatar }) => (
        <Fragment key={avatar.nickname}>
          {avatar.url ? (
            <Tooltip content={<AvatarOverlay {...avatar} />} asChild>
              <Avatar {...avatar} size={size} className="cursor-pointer" />
            </Tooltip>
          ) : (
            <Avatar {...avatar} size={size} />
          )}
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
