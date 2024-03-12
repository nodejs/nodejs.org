'use client';

import { useContext } from 'react';
import type { FC } from 'react';

import { ReleaseContext } from '@/providers/releaseProvider';

import LinkWithArrow from './LinkWithArrow';

const NpmLink: FC = () => {
  const { release } = useContext(ReleaseContext);

  return (
    <LinkWithArrow href={`https://www.npmjs.com/package/npm/v/${release.npm}`}>
      npm ({release.npm})
    </LinkWithArrow>
  );
};

export default NpmLink;
