import type { FC } from 'react';

import { getClientContext } from '#site/client-context';
import provideReleaseData from '#site/next-data/providers/releaseData';
import {
  buildReleaseArtifacts,
  extractVersionFromPath,
  findReleaseByVersion,
} from '#site/util/download/archive';

type DownloadArchive = ReturnType<typeof buildReleaseArtifacts>;

type WithDownloadArchiveProps = {
  children: FC<DownloadArchive>;
};

/**
 * Higher-order component that extracts version from pathname,
 * fetches release data, and provides download artifacts to child component
 */
const WithDownloadArchive: FC<WithDownloadArchiveProps> = async ({
  children: Component,
}) => {
  const { pathname } = getClientContext();

  // Extract version from pathname
  const version = extractVersionFromPath(pathname);

  if (version == null) {
    return null;
  }

  // Find the release data for the given version
  const releaseData = provideReleaseData();
  const release = findReleaseByVersion(releaseData, version);

  if (!release) {
    return null;
  }

  const releaseArtifacts = buildReleaseArtifacts(
    release,
    version === 'archive' ? release.versionWithPrefix : version
  );

  return <Component {...releaseArtifacts} />;
};

export default WithDownloadArchive;
