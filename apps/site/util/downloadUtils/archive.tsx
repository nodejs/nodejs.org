import semVer from 'semver';

import type { NodeRelease } from '#site/types/releases';
import type { UserOS, UserPlatform } from '#site/types/userOS';
import type { DownloadDropdownItem } from '#site/util/downloadUtils';
import {
  PLATFORMS,
  OS_NOT_SUPPORTING_INSTALLERS,
} from '#site/util/downloadUtils';
import type { DownloadKind } from '#site/util/getNodeDownloadUrl';
import { getNodeDownloadUrl } from '#site/util/getNodeDownloadUrl';

import { DIST_URL } from '#site/next.constants';

export type NodeDownloadArtifact = {
  file: string;
  kind: DownloadKind;
  os: UserOS;
  architecture: string;
  url: string;
  version: string;
};

/**
 * Checks if a download item is compatible with the given OS, platform, and version.
 */
function isCompatible(
  compatibility: DownloadDropdownItem<UserPlatform>['compatibility'],
  os: UserOS,
  platform: UserPlatform,
  version: string
): boolean {
  const {
    os: osList,
    platform: platformList,
    semver: versions,
  } = compatibility;

  return (
    (osList?.includes(os) ?? true) &&
    (platformList?.includes(platform) ?? true) &&
    (versions?.every(r => semVer.satisfies(version, r)) ?? true)
  );
}

type CompatibleArtifactOptions = {
  platforms?: Record<UserOS, Array<DownloadDropdownItem<UserPlatform>>>;
  exclude?: Array<string>;
  version: string;
  kind?: DownloadKind;
};

/**
 * Returns a list of compatible artifacts for the given options.
 */
const getCompatibleArtifacts = ({
  platforms = PLATFORMS,
  exclude = [],
  version,
  kind = 'binary',
}: CompatibleArtifactOptions): Array<NodeDownloadArtifact> => {
  return Object.entries(platforms).flatMap(([os, items]) => {
    if (exclude.includes(os)) return [];

    const operatingSystem = os as UserOS;

    return items
      .filter(({ compatibility, value }) =>
        isCompatible(compatibility, operatingSystem, value, version)
      )
      .map(({ value, label }) => {
        const url = getNodeDownloadUrl({
          version: version,
          os: operatingSystem,
          platform: value,
          kind: kind,
        });

        return {
          file: url.replace(`${DIST_URL}${version}/`, ''),
          kind: kind,
          os: operatingSystem,
          architecture: label,
          url: url,
          version: version,
        };
      });
  });
};

export const buildReleaseArtifacts = (
  release: NodeRelease,
  version: string,
  majors: Array<string>
) => {
  const minorVersion = release.minorVersions.find(
    ({ versionWithPrefix }) => versionWithPrefix === version
  );

  const enrichedRelease = {
    ...release,
    ...minorVersion,
  };

  return {
    binaries: getCompatibleArtifacts({
      version: version,
      kind: 'binary',
    }),
    installers: getCompatibleArtifacts({
      exclude: OS_NOT_SUPPORTING_INSTALLERS,
      version: version,
      kind: 'installer',
    }),
    sources: {
      shasum: getNodeDownloadUrl({
        version: version,
        kind: 'shasum',
      }),
      tarball: getNodeDownloadUrl({
        version: version,
        kind: 'source',
      }),
    },
    version: version,
    minors: enrichedRelease.minorVersions,
    release: enrichedRelease,
    majors: majors,
  };
};

/**
 * Extracts the version from the pathname.
 * It expects the version to be in the format 'v22.0.4' or 'archive'.
 */
export const extractVersionFromPath = (pathname: string | undefined) => {
  if (!pathname) return null;

  const segments = pathname.split('/').filter(Boolean);
  const version = segments.pop();

  // Check version format like (v22.0.4 or 'archive')
  if (!version || (!version.match(/^v\d+(\.\d+)*$/) && version !== 'archive')) {
    return null;
  }

  return version;
};

/**
 * Finds the appropriate release based on version, if 'archive' is passed,
 * it returns the latest LTS release.
 */
export const findReleaseByVersion = (
  releaseData: Array<NodeRelease>,
  version: string | 'archive'
) => {
  if (version === 'archive') {
    return releaseData.find(release => release.status === 'LTS');
  }

  return releaseData.find(release => semVer.major(version) === release.major);
};
