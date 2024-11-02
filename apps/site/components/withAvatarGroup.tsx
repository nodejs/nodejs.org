'use client';

import type { ComponentProps, FC } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import { getAuthorWithId, getAuthorWithName } from '@/util/authorUtils';

type WithAvatarGroupProps = Omit<
  ComponentProps<typeof AvatarGroup>,
  'avatars'
> & {
  usernames?: Array<string>;
  names?: Array<string>;
  clickable?: boolean;
};

const WithAvatarGroup: FC<WithAvatarGroupProps> = ({
  usernames,
  names,
  clickable = true,
  ...props
}) => (
  <AvatarGroup
    avatars={
      usernames
        ? getAuthorWithId(usernames, clickable)
        : names
          ? getAuthorWithName(names, clickable)
          : []
    }
    {...props}
  />
);

export default WithAvatarGroup;
