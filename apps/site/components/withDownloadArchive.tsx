import { notFound } from 'next/navigation';

import { getClientContext } from '#site/client-context';
import provideReleaseData from '#site/next-data/providers/releaseData';
import {
  buildReleaseArtifacts,
  extractVersionFromPath,
} from '#site/util/download/archive';

import type { FC } from 'react';

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

  // Find the release data for the given version
  const releaseData = await provideReleaseData();
  const release = releaseData.find(release =>
    // Match major version only (e.g., v22.x.x for release.major v22)
    version.startsWith(`v${release.major}`)
  )!;

  if (!release) {
    return notFound();
  }

  const releaseArtifacts = buildReleaseArtifacts(release, version);

  return <Component {...releaseArtifacts} />;
};

export default WithDownloadArchive;
