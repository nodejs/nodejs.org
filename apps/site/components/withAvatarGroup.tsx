'use client';

import AvatarGroup from '@node-core/ui-components/Common/AvatarGroup';
import type { ComponentProps, FC } from 'react';

import Link from '@/components/Link';
import type { AuthorProps } from '@/types';
import { getAuthors } from '@/util/authorUtils';

type WithAvatarGroupProps = Omit<
  ComponentProps<typeof AvatarGroup>,
  'avatars' | 'LinkWrapper'
> &
  AuthorProps;

const WithAvatarGroup: FC<WithAvatarGroupProps> = ({
  usernames,
  names,
  clickable = true,
  ...props
}) => (
  <AvatarGroup
    avatars={getAuthors({
      usernames: usernames,
      names: names,
      clickable: clickable,
    })}
    LinkWrapper={Link}
    {...props}
  />
);

export default WithAvatarGroup;
