import semVer from 'semver';

import type { NodeRelease } from '@/types';

export const getReleaseAnnounceLink = (release: NodeRelease) => {
  // No release announcement for versions <= 18
  if (semVer.satisfies(release.version, '<=18')) {
    return null;
  }

  if (release.status === 'Current') {
    return null;
  }

  return `/blog/announcements/v${release.major}-release-announce`;
};
