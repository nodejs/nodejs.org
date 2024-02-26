import type { ReactNode } from 'react';

import type { NodeRelease } from '@/types/releases';
import type { UserOS } from '@/types/userOS';

export type PackageManager = 'NVM' | 'BREW' | 'DOCKER';

export interface ReleaseState {
  os: UserOS;
  release: NodeRelease;
  releases: Array<NodeRelease>;
  bitness: string | number;
  platform: PackageManager;
}

export type ReleaseAction =
  | { type: 'SET_OS'; payload: UserOS }
  | { type: 'SET_VERSION'; payload: string }
  | { type: 'SET_BITNESS'; payload: string | number }
  | { type: 'SET_PLATFORM'; payload: PackageManager };

export interface ReleaseDispatchActions {
  setVersion: (version: string) => void;
  setOS: (os: UserOS) => void;
  setBitness: (bitness: string | number) => void;
  setPlatform: (platform: PackageManager) => void;
}

export interface ReleaseContextType
  extends ReleaseState,
    ReleaseDispatchActions {}

export interface ReleaseProviderProps {
  children: ReactNode;
  releases: Array<NodeRelease>;
  initialRelease: NodeRelease;
}
