'use client';

import { createContext } from 'react';

import useDetectOS from '#site/hooks/useDetectOS';

import type { FC, PropsWithChildren } from 'react';

export const DetectedOSContext = createContext<ReturnType<typeof useDetectOS>>({
  os: 'LOADING',
  bitness: '',
  architecture: '',
});

export const DetectedOSProvider: FC<PropsWithChildren> = ({ children }) => (
  <DetectedOSContext value={useDetectOS()}>{children}</DetectedOSContext>
);
