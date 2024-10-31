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
};

const WithAvatarGroup: FC<WithAvatarGroupProps> = ({
  usernames,
  names,
  ...props
}) => (
  <AvatarGroup
    avatars={
      usernames
        ? getAuthorWithId(usernames)
        : names
          ? getAuthorWithName(names)
          : []
    }
    {...props}
  />
);

export default WithAvatarGroup;
