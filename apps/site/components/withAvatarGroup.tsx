'use client';

import AvatarGroup from '@node-core/ui-components/Common/AvatarGroup';
import type { ComponentProps, FC } from 'react';

import Link from '#site/components/Link';
import type { AuthorProps } from '#site/types';
import { getAuthors } from '#site/util/authorUtils';

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
      usernames: usernames,
      names: names,
      clickable: clickable,
    })}
    as={Link}
    {...props}
  />
);

export default WithAvatarGroup;
