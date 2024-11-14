'use client';

import classNames from 'classnames';
import type { FC } from 'react';
import { useState, useMemo, Fragment } from 'react';

import type { AvatarProps } from '@node-core/ui-components/Common/AvatarGroup/Avatar';
import Avatar from '@node-core/ui-components/Common/AvatarGroup/Avatar';
import avatarstyles from '@node-core/ui-components/Common/AvatarGroup/Avatar/index.module.css';
import AvatarOverlay from '@node-core/ui-components/Common/AvatarGroup/Overlay';
import Tooltip from '@node-core/ui-components/Common/Tooltip';
import type { LinkLike } from '@node-core/ui-components/types';

import styles from './index.module.css';

type AvatarGroupProps = {
  avatars: Array<AvatarProps>;
  limit?: number;
  isExpandable?: boolean;
  size?: AvatarProps['size'];
  container?: HTMLElement;
  LinkWrapper: LinkLike;
};

const AvatarGroup: FC<AvatarGroupProps> = ({
  avatars,
  limit = 10,
  isExpandable = true,
  size = 'small',
  container,
  LinkWrapper = 'a',
}) => {
  const [showMore, setShowMore] = useState(false);

  const renderAvatars = useMemo(
    () => avatars.slice(0, showMore ? avatars.length : limit),
    [showMore, avatars, limit]
  );

  return (
    <div className={classNames(styles.avatarGroup, styles[size])}>
      {renderAvatars.map(({ ...avatar }) => (
        <Fragment key={avatar.nickname}>
          <Tooltip
            asChild
            container={container}
            content={<AvatarOverlay Wrapper={LinkWrapper} {...avatar} />}
          >
            <Avatar
              Wrapper={LinkWrapper}
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
