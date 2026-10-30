'use client';

import AvatarGroupContainer from '@node-core/ui-components/Common/AvatarGroup';

import Link from '#site/components/Link';
import { getAuthors } from '#site/util/author';

import type { AuthorProps } from '#site/types';
import type { ComponentProps, FC } from 'react';

type AvatarGroupProps = Omit<
  ComponentProps<typeof AvatarGroupContainer>,
  'avatars' | 'as'
> &
  AuthorProps;

const AvatarGroup: FC<AvatarGroupProps> = ({
  usernames,
  names,
  clickable = true,
  ...props
}) => (
  <AvatarGroupContainer
    avatars={getAuthors({
      usernames,
      names,
      clickable,
    })}
    as={Link}
    {...props}
  />
);

export default AvatarGroup;
