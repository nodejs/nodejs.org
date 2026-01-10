import type { DownloadSnippet } from '#site/types/download';
import type { NodeRelease } from '#site/types/releases';
import type { OperatingSystem, Platform } from '#site/types/userAgent';

export type InstallationMethod =
  | 'NVM'
  | 'FNM'
  | 'BREW'
  | 'DOCKER'
  | 'CHOCO'
  | 'N';
export type PackageManager = 'NPM' | 'YARN' | 'PNPM';

// Items with a pipe/default value mean that they are auto inferred
// during runtime and do not have necessarily a consistent initial value
export type ReleaseState = {
  version: string;
  os: OperatingSystem | 'LOADING';
  platform: Platform | '';
  installMethod: InstallationMethod | '';
  packageManager: PackageManager;
};

export type ReleaseAction =
  | { type: 'SET_VERSION'; payload: string }
  | { type: 'SET_OS'; payload: OperatingSystem }
  | { type: 'SET_PLATFORM'; payload: Platform }
  | { type: 'SET_INSTALL_METHOD'; payload: InstallationMethod }
  | { type: 'SET_MANAGER'; payload: PackageManager };

export type ReleaseDispatchActions = {
  setVersion: (version: string) => void;
  setOS: (os: OperatingSystem) => void;
  setPlatform: (bitness: Platform) => void;
  setInstallMethod: (installMethod: InstallationMethod) => void;
  setPackageManager: (packageManager: PackageManager) => void;
};

export type ReleasesContextType = {
  releases: Array<NodeRelease>;
  snippets: Array<DownloadSnippet>;
};

export type ReleaseContextType = {
  release: NodeRelease;
} & ReleaseState &
  ReleaseDispatchActions;

export type ReleasesProviderProps = {
  releases: Array<NodeRelease>;
  snippets: Array<DownloadSnippet>;
};

export type ReleaseProviderProps = {
  initialRelease?: NodeRelease;
};
