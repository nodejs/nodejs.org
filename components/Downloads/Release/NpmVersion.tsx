'use client';

import { useContext } from 'react';
import type { FC } from 'react';

import { ReleaseContext } from '@/providers/releaseProvider';

const NpmVersion: FC = () => {
  const {
    release: { npm },
  } = useContext(ReleaseContext);

  return <>{npm}</>;
};

export default NpmVersion;
