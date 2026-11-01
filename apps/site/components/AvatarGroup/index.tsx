import { getAuthors } from '#site/util/author';

import type { AuthorProps } from '#site/types';
import type { ComponentProps, FC } from 'react';

import Avatars from './Avatars';

type AvatarGroupProps = Omit<ComponentProps<typeof Avatars>, 'avatars'> &
  AuthorProps;

// Resolves the authors on the server, so `authors.json` stays there
const AvatarGroup: FC<AvatarGroupProps> = ({
  usernames,
  names,
  clickable = true,
  ...props
}) => (
  <Avatars avatars={getAuthors({ usernames, names, clickable })} {...props} />
);

export default AvatarGroup;
