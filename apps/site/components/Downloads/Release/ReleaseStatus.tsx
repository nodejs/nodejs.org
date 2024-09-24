'use client';

import { useContext } from 'react';
import type { FC } from 'react';

import { ReleaseContext } from '@/providers/releaseProvider';

const ReleaseStatus: FC = () => {
  const {
    release: { status },
  } = useContext(ReleaseContext);

  return <>{status}</>;
};

export default ReleaseStatus;
