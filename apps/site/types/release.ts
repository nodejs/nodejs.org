import type { DownloadSnippet } from '@/types/downloads';
import type { NodeRelease } from '@/types/releases';
import type { UserOS } from '@/types/userOS';

export type InstallationMethod = 'NVM' | 'FNM' | 'BREW' | 'DOCKER' | 'CHOCO';
export type PackageManager = 'NPM' | 'YARN' | 'PNPM';

export interface ReleaseState {
  os: UserOS;
  version: string;
  bitness: string | number;
  platform: InstallationMethod | '';
  packageManager: PackageManager | '';
}

export type ReleaseAction =
  | { type: 'SET_OS'; payload: UserOS }
  | { type: 'SET_VERSION'; payload: string }
  | { type: 'SET_BITNESS'; payload: string | number }
  | { type: 'SET_PLATFORM'; payload: InstallationMethod | '' }
  | { type: 'SET_MANAGER'; payload: PackageManager | '' };

export interface ReleaseDispatchActions {
  setVersion: (version: string) => void;
  setOS: (os: UserOS) => void;
  setBitness: (bitness: string | number) => void;
  setPlatform: (platform: InstallationMethod | '') => void;
  setPackageManager: (packageManager: PackageManager | '') => void;
}

export interface ReleasesContextType {
  releases: Array<NodeRelease>;
  snippets: Array<DownloadSnippet>;
}

export interface ReleaseContextType
  extends ReleaseState,
    ReleaseDispatchActions {
  release: NodeRelease;
}

export interface ReleasesProviderProps {
  releases: Array<NodeRelease>;
  snippets: Array<DownloadSnippet>;
}

export interface ReleaseProviderProps {
  initialRelease?: NodeRelease;
}
