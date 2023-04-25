export const ReleaseTypes = {
  current: 'Current',
  lts: 'LTS',
  maintenance: 'Maintenance',
  endOfLife: 'End-of-life',
} as const;

type ReleaseType = (typeof ReleaseTypes)[keyof typeof ReleaseTypes];

export interface UpcomingReleaseData {
  releaseDate: string;
  releaseType: ReleaseType;
  alreadyReleased: boolean;
}

export interface UpcomingRelease {
  title: string;
  releases: UpcomingReleaseData[];
}

export interface NodeReleaseData {
  version: string;
  fullVersion: string;
  codename: string;
  isLts: boolean;
  status:
    | 'Maintenance LTS'
    | 'Active LTS'
    | 'Current'
    | 'End-of-life'
    | 'Pending';
  initialRelease: string;
  ltsStart: string | null;
  maintenanceStart: string | null;
  endOfLife: string;
}
