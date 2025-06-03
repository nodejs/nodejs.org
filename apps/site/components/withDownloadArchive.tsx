import type { FC } from 'react';

import { getClientContext } from '#site/client-context';
import getReleaseData from '#site/next-data/releaseData';
import {
  buildReleaseArtifacts,
  extractVersionFromPath,
  findReleaseByVersion,
} from '#site/util/downloadUtils/archive';

type DownloadArchive = ReturnType<typeof buildReleaseArtifacts>;

type WithDownloadArchiveProps = {
  children: FC<DownloadArchive & { majorVersions: Array<string> }>;
};

/**
 * Provides download artifacts and sidebar items to its child component
 */
const WithDownloadArchive: FC<WithDownloadArchiveProps> = async ({
  children: Component,
}) => {
  const { pathname } = getClientContext();
  const releaseData = await getReleaseData();

  // Extract version from pathname
  const version = extractVersionFromPath(pathname);

  if (!version) {
    return null;
  }

  const release = findReleaseByVersion(releaseData, version);

  if (!release) {
    return null;
  }

  const majorVersions = releaseData.map(release => release.versionWithPrefix);
  const releaseArtifacts = buildReleaseArtifacts(release, version);

  return <Component {...releaseArtifacts} majorVersions={majorVersions} />;
};

export default WithDownloadArchive;
