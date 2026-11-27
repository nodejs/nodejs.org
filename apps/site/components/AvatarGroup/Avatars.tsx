'use client';

import AvatarGroupContainer from '@node-core/ui-components/Common/AvatarGroup';

import Link from '#site/components/Link';
import useMediaQuery from '#site/hooks/useMediaQuery';

import type { ComponentProps, FC } from 'react';

type AvatarsProps = Omit<ComponentProps<typeof AvatarGroupContainer>, 'as'> & {
  compactLimit?: number;
};

const Avatars: FC<AvatarsProps> = ({
  limit,
  compactLimit = limit,
  ...props
}) => {
  // Since we cannot always show the same number of avatars in Mobile / Tablet
  // resolution as we do on desktop, `compactLimit` applies to the resolutions below
  const isSmallerThanDesktop = useMediaQuery('(max-width: 1280px)');

  return (
    <AvatarGroupContainer
      as={Link}
      limit={isSmallerThanDesktop ? compactLimit : limit}
      {...props}
    />
  );
};

export default Avatars;
