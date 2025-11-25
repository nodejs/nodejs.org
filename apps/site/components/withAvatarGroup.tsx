'use client';

import AvatarGroup from '@node-core/ui-components/Common/AvatarGroup';

import Link from '#site/components/Link';
import { getAuthors } from '#site/util/author';

import type { AuthorProps } from '#site/types';
import type { ComponentProps, FC } from 'react';

type WithAvatarGroupProps = Omit<
  ComponentProps<typeof AvatarGroup>,
  'avatars' | 'as'
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
      usernames,
      names,
      clickable,
    })}
    as={Link}
    {...props}
  />
);

export default WithAvatarGroup;
