'use client';

import type { FC } from 'react';

import { useReleaseContext } from '@/providers/releaseProvider';

const NpmVersion: FC = () => {
  const {
    state: {
      release: { npm },
    },
  } = useReleaseContext();

  return <>{npm}</>;
};

export default NpmVersion;
