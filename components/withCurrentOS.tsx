'use client';

import type { FC } from 'react';

import { useDetectOS } from '@/hooks';

type WithCurrentOS = {
  children: FC<{ os: ReturnType<typeof useDetectOS> }>;
};

export const WithCurrentOS: FC<WithCurrentOS> = ({ children: Component }) => {
  const osData = useDetectOS();

  return <Component os={osData} />;
};
