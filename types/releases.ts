// TODO(HinataKah0): Remove this, see https://github.com/nodejs/nodejs.org/issues/5303#issuecomment-1518947513
/* eslint-disable no-unused-vars */

export enum ReleaseTypes {
  current = 'Current',
  lts = 'LTS',
  maintenance = 'Maintenance',
  endoflife = 'End-of-life',
}

export interface UpcomingReleaseData {
  releaseDate: string;
  releaseType: ReleaseTypes;
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
