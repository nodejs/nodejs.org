export interface UpcomingReleaseData {
  releaseDate: string;
  releaseType: 'Current' | 'LTS' | 'Maintenance' | 'End-of-life';
  alreadyReleased: boolean;
}

export interface UpcomingRelease {
  name: string;
  releases: UpcomingReleaseData[];
}

export interface NodeReleaseData {
  major: number;
  version: string;
  versionWithPrefix: string;
  codename: string;
  isLts: boolean;
  status:
    | 'Maintenance LTS'
    | 'Active LTS'
    | 'Current'
    | 'End-of-life'
    | 'Pending';
  currentStart: string;
  ltsStart?: string;
  maintenanceStart?: string;
  endOfLife: string;
  npm: string;
  v8: string;
  releaseDate: string;
  modules: string;
}

export interface NodeReleasesDataContext {
  releases: NodeReleaseData[];
  lts?: NodeReleaseData;
  current?: NodeReleaseData;
}
