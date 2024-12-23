import type { ComponentProps, FC } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import type { AuthorProps } from '@/types';
import { getAuthors } from '@/util/authorUtils';

type WithAvatarGroupProps = Omit<
  ComponentProps<typeof AvatarGroup>,
  'avatars'
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
    {...props}
  />
);

export default WithAvatarGroup;
