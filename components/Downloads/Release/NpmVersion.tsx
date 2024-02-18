'use client';

import type { FC } from 'react';

import { useReleaseContext } from '@/providers/releaseProvider';

const ReleaseNpm: FC = () => {
  const {
    state: {
      release: { npm },
    },
  } = useReleaseContext();

  return <>{npm}</>;
};

export default ReleaseNpm;
