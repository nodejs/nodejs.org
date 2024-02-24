import type { ReactNode } from 'react';

import type { NodeRelease } from '@/types/releases';
import type { UserOS } from '@/types/userOS';

export interface ReleaseState {
  os: UserOS;
  release: NodeRelease;
  releases: Array<NodeRelease>;
  bitness: string;
  platform: string;
}

export type ReleaseAction =
  | { type: 'SET_OS'; payload: UserOS }
  | { type: 'SET_VERSION'; payload: string }
  | { type: 'SET_BITNESS'; payload: string }
  | { type: 'SET_PLATFORM'; payload: string };

export interface ReleaseDispatchActions {
  setVersion: (version: string) => void;
  setOs: (os: UserOS) => void;
  setBitness: (bitness: string) => void;
  setPlatform: (platform: string) => void;
}

export interface ReleaseContextType
  extends ReleaseState,
    ReleaseDispatchActions {}

export interface ReleaseProviderProps {
  children: ReactNode;
  releases: Array<NodeRelease>;
}
