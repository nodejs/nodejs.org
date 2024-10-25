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
  fallbackImage?: boolean;
};

const WithAvatarGroup: FC<WithAvatarGroupProps> = ({
  usernames,
  names,
  fallbackImage,
  ...props
}) => (
  <AvatarGroup
    avatars={
      usernames
        ? getAuthorWithId(usernames, fallbackImage)
        : names
          ? getAuthorWithName(names)
          : []
    }
    {...props}
  />
);

export default WithAvatarGroup;
