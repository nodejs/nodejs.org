import { notFound } from 'next/navigation';
import type { FC } from 'react';
import semVer from 'semver';

import { getClientContext } from '#site/client-context';
import provideReleaseData from '#site/next-data/providers/releaseData';
import {
  buildReleaseArtifacts,
  extractVersionFromPath,
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
    return notFound();
  }

  // Find the release data for the given version
  const releaseData = provideReleaseData();
  const release = releaseData.find(
    release => semVer.major(version) === release.major
  )!;

  const releaseArtifacts = buildReleaseArtifacts(release, version);

  return <Component {...releaseArtifacts} />;
};

export default WithDownloadArchive;
