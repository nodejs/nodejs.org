import type { DownloadSnippet } from '#site/types/download';
import type { NodeRelease } from '#site/types/releases';
import type { OperatingSystem, Platform } from '#site/types/userAgent';

export type InstallationMethod =
  | 'NVM'
  | 'FNM'
  | 'VOLTA'
  | 'BREW'
  | 'DEVBOX'
  | 'DOCKER'
  | 'CHOCO'
  | 'N';
export type PackageManager = 'NPM' | 'YARN' | 'PNPM';

// Items with a pipe/default value mean that they are auto inferred
// during runtime and do not have necessarily a consistent initial value
export interface ReleaseState {
  version: string;
  os: OperatingSystem | 'LOADING';
  platform: Platform | '';
  installMethod: InstallationMethod | '';
  packageManager: PackageManager;
}

export type ReleaseAction =
  | { type: 'SET_VERSION'; payload: string }
  | { type: 'SET_OS'; payload: OperatingSystem }
  | { type: 'SET_PLATFORM'; payload: Platform }
  | { type: 'SET_INSTALL_METHOD'; payload: InstallationMethod }
  | { type: 'SET_MANAGER'; payload: PackageManager };

export interface ReleaseDispatchActions {
  setVersion: (version: string) => void;
  setOS: (os: OperatingSystem) => void;
  setPlatform: (bitness: Platform) => void;
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
