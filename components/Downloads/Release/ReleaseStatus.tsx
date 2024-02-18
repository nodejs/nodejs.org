'use client';

import type { FC } from 'react';

import { useReleaseContext } from '@/providers/releaseProvider';

const ReleaseStatus: FC = () => {
  const {
    state: {
      release: { status },
    },
  } = useReleaseContext();

  return <>{status}</>;
};

export default ReleaseStatus;
