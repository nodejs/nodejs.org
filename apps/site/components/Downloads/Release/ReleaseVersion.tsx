'use client';

import { useContext } from 'react';
import type { FC } from 'react';

import { ReleaseContext } from '@/providers/releaseProvider';

const ReleaseVersion: FC = () => {
  const {
    release: { version },
  } = useContext(ReleaseContext);

  return <>{version}</>;
};

export default ReleaseVersion;
