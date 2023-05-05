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
