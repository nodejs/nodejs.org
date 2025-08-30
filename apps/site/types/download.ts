import type { SelectValue } from '@node-core/ui-components/Common/Select';

import type {
  IntlMessageKeys,
  NodeReleaseStatus,
  OperatingSystem,
  Platform,
} from '#site/types';

export type DownloadSnippet = {
  name: string;
  language: string;
  content: string;
};

export type DownloadKind = 'installer' | 'binary' | 'source' | 'shasum';

type DownloadCompatibility = {
  os?: Array<OperatingSystem | 'LOADING'>;
  installMethod?: Array<string>;
  platform?: Array<Platform | ''>;
  semver?: Array<string>;
  releases?: Array<NodeReleaseStatus>;
};

export type DownloadDropdownItem<T extends string> = {
  label: IntlMessageKeys;
  recommended?: boolean;
  url?: string;
  info?: IntlMessageKeys;
  compatibility: DownloadCompatibility;
} & Omit<SelectValue<T>, 'label'>;

export type DownloadArtifact = {
  fileName: string;
  kind: DownloadKind;
  os: OperatingSystem;
  architecture: string;
  url: string;
  version: string;
};

export type CompatibleArtifactOptions = {
  platforms?: Record<OperatingSystem, Array<DownloadDropdownItem<Platform>>>;
  exclude?: Array<string>;
  versionWithPrefix: string;
  kind?: DownloadKind;
};

export type CompatiblePlatforms = Array<{
  os: OperatingSystem;
  platform: DownloadDropdownItem<Platform>;
}>;
