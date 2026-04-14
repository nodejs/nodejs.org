export type NodeReleaseStatus = 'LTS' | 'Current' | 'End-of-life';

export type NodeReleaseSource = {
  major: number;
  version: string;
  codename?: string;
  npm?: string;
  v8: string;
  releaseDate: string;
  initialDate: string;
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
