'use client';

import AvatarGroupContainer from '@node-core/ui-components/Common/AvatarGroup';

import Link from '#site/components/Link';

import type { ComponentProps, FC } from 'react';

type AvatarsProps = Omit<ComponentProps<typeof AvatarGroupContainer>, 'as'>;

const Avatars: FC<AvatarsProps> = props => (
  <AvatarGroupContainer as={Link} {...props} />
);

export default Avatars;
