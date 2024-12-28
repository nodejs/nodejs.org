import type { DownloadSnippet } from '@/types/downloads';
import type { NodeRelease } from '@/types/releases';
import type { UserOS, UserPlatform } from '@/types/userOS';

export type InstallationMethod = 'NVM' | 'FNM' | 'BREW' | 'DOCKER' | 'CHOCO';
export type PackageManager = 'NPM' | 'YARN' | 'PNPM';

// Items with a pipe/default value mean that they are auto inferred
// during runtime and do not have necessarily a consistent initial value
export interface ReleaseState {
  version: string;
  os: UserOS | 'LOADING';
  platform: UserPlatform | '';
  installMethod: InstallationMethod | '';
  packageManager: PackageManager;
}

export type ReleaseAction =
  | { type: 'SET_VERSION'; payload: string }
  | { type: 'SET_OS'; payload: UserOS }
  | { type: 'SET_PLATFORM'; payload: UserPlatform }
  | { type: 'SET_INSTALL_METHOD'; payload: InstallationMethod }
  | { type: 'SET_MANAGER'; payload: PackageManager };

export interface ReleaseDispatchActions {
  setVersion: (version: string) => void;
  setOS: (os: UserOS) => void;
  setPlatform: (bitness: UserPlatform) => void;
  setInstallMethod: (installMethod: InstallationMethod) => void;
  setPackageManager: (packageManager: PackageManager) => void;
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
