export type NodeReleaseStatus = 'LTS' | 'Current' | 'EoL';

export type NodeReleaseSource = {
  major: number;
  version: string;
  codename?: string;
  npm?: string;
  v8: string;
  latestReleaseDate: string;
  initialReleaseDate: string;
  modules?: string;
};

export type MinorVersion = {
  npm?: string;
  modules?: string;
  releaseDate: string;
  v8: string;
  version: string;
  versionWithPrefix: string;
};

export type NodeRelease = {
  versionWithPrefix: string;
  status: NodeReleaseStatus;
  minorVersions: Array<MinorVersion>;
} & NodeReleaseSource;
