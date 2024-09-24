'use client';

import type { FC } from 'react';

import { useDetectOS } from '@/hooks';

type WithCurrentOS = {
  children: FC<{ currentOS: ReturnType<typeof useDetectOS> }>;
};

const WithCurrentOS: FC<WithCurrentOS> = ({ children: Component }) => {
  const osData = useDetectOS();

  return <Component currentOS={osData} />;
};

export default WithCurrentOS;
