import semVer from 'semver';

import type { NodeRelease } from '@/types';

export const getReleaseAnnounceLink = (release: NodeRelease) => {
  // No release announcements for the current version or for versions ≤ 18
  if (
    semVer.satisfies(release.version, '<=18') ||
    release.status === 'Current'
  ) {
    return null;
  }

  return `/blog/announcements/v${release.major}-release-announce`;
};
