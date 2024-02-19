import type { ReactNode } from 'react';

import type { NodeRelease } from '@/types/releases';
import type { UserOS } from '@/types/userOS';

export type ReleaseState = {
  releases: Array<NodeRelease>;
  version: string;
  os: UserOS;
  bitness: string;
  platform: string;
  release: NodeRelease;
};

export type ReleaseAction =
  | { type: 'SET_VERSION'; payload: string }
  | { type: 'SET_OS'; payload: UserOS }
  | { type: 'SET_BITNESS'; payload: string }
  | { type: 'SET_PLATFORM'; payload: string }
  | { type: 'SET_RELEASES'; payload: Array<NodeRelease> };

export type ReleaseDispatchActions = {
  setVersion: (version: string) => void;
  setOs: (os: UserOS) => void;
  setBitness: (bitness: string) => void;
  setPlatform: (platform: string) => void;
  setReleases: (releases: Array<NodeRelease>) => void;
};

export type ReleaseContextType = {
  state: ReleaseState;
  dispatch: ReleaseDispatchActions;
};

export type ReleaseProviderProps = {
  children: ReactNode;
  releases: Array<NodeRelease>;
};
