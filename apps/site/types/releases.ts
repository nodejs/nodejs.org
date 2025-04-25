export type NodeReleaseStatus =
  | 'LTS'
  | 'Maintenance'
  | 'Current'
  | 'End-of-life'
  | 'Pending';

export interface NodeReleaseSource {
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
}

export interface MinorVersion {
  version: string;
  releaseDate: string;
}

export interface NodeRelease extends NodeReleaseSource {
  versionWithPrefix: string;
  isLts: boolean;
  status: NodeReleaseStatus;
  releaseAnnounceLink?: string;
  minorVersions: Array<MinorVersion>;
}
