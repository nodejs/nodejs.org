export type NodeReleaseStatus =
  | 'Active LTS'
  | 'Maintenance LTS'
  | 'Current'
  | 'End-of-life'
  | 'Pending';

export type NodeReleaseSource = {
  major: number;
  version: string;
  codename?: string;
  currentStart: string;
  ltsStart?: string;
  maintenanceStart?: string;
  endOfLife: string;
  npm?: string;
  v8: string;
  releaseDate: string;
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
  isLts: boolean;
  status: NodeReleaseStatus;
  minorVersions: Array<MinorVersion>;
} & NodeReleaseSource;
