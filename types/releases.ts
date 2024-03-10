export type NodeReleaseStatus =
  | 'Maintenance LTS'
  | 'Active LTS'
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
  v8?: string;
  releaseDate?: string;
  modules?: string;
}

export interface NodeRelease extends NodeReleaseSource {
  versionWithPrefix: string;
  isLts: boolean;
  status: NodeReleaseStatus;
}
