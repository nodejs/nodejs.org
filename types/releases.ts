export interface UpcomingReleaseData {
  releaseDate: string;
  releaseType: 'Current' | 'LTS' | 'Maintenance' | 'End-of-life';
  alreadyReleased: boolean;
}

export interface UpcomingRelease {
  name: string;
  releases: UpcomingReleaseData[];
}

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

export type NodeReleaseSupport = Pick<
  NodeRelease,
  'currentStart' | 'ltsStart' | 'maintenanceStart' | 'endOfLife'
>;
