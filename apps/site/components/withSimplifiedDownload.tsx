import type { FC } from 'react';

import { getClientContext } from '#site/client-context';
import getReleaseData from '#site/next-data/releaseData';
import {
  buildReleaseArtifacts,
  extractVersionFromPath,
} from '#site/util/downloadUtils/simple';

type SimplifiedDownload = ReturnType<typeof buildReleaseArtifacts>;

type WithSimplifiedDownloadProps = {
  children: FC<SimplifiedDownload>;
};

/**
 * Provides download artifacts and sidebar items to its child component
 */
const WithSimplifiedDownload: FC<WithSimplifiedDownloadProps> = async ({
  children: Component,
}) => {
  const { pathname } = getClientContext();
  const releaseData = await getReleaseData();

  // Extract version from pathname
  const { version, major } = extractVersionFromPath(pathname) || {};

  if (!version) {
    return null;
  }

  // Find the matching release
  const release = releaseData.find(
    release =>
      release.major === major ||
      (release.isLts === true && version === 'simplified')
  );

  if (!release) {
    return null;
  }

  const majorVersions = releaseData.map(release => release.versionWithPrefix);
  const releaseArtifacts = buildReleaseArtifacts(
    release,
    version,
    majorVersions
  );

  return <Component {...releaseArtifacts} />;
};

export default WithSimplifiedDownload;
