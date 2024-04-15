'use client';

import { useContext } from 'react';
import type { FC } from 'react';

import LinkWithArrow from '@/components/Downloads/Release/LinkWithArrow';
import { ReleaseContext } from '@/providers/releaseProvider';

const NpmLink: FC = () => {
  const { release } = useContext(ReleaseContext);

  return (
    <LinkWithArrow
      href={`https://github.com/npm/cli/releases/tag/v${release.npm}`}
    >
      npm ({release.npm})
    </LinkWithArrow>
  );
};

export default NpmLink;
