'use client';

import type { FC } from 'react';

import { useReleaseContext } from '@/providers/releaseProvider';

const ReleaseVersion: FC = () => {
  const {
    state: {
      release: { version },
    },
  } = useReleaseContext();

  return <>{version}</>;
};

export default ReleaseVersion;
