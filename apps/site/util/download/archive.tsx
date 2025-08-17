import semVer from 'semver';

import type { DownloadKind, OperatingSystem, Platform } from '#site/types';
import type { NodeRelease } from '#site/types/releases';
import type { DownloadDropdownItem } from '#site/util/download';
import { OS_NOT_SUPPORTING_INSTALLERS, PLATFORMS } from '#site/util/download';
import { getNodeDownloadUrl } from '#site/util/url';

import { DIST_URL } from '#site/next.constants';

export type NodeDownloadArtifact = {
  file: string;
  kind: DownloadKind;
  os: OperatingSystem;
  architecture: string;
  url: string;
  version: string;
};

/**
 * Checks if a download item is compatible with the given OS, platform, and version.
 */
function isCompatible(
  compatibility: DownloadDropdownItem<Platform>['compatibility'],
  os: OperatingSystem,
  platform: Platform,
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
  platforms?: Record<OperatingSystem, Array<DownloadDropdownItem<Platform>>>;
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

    return items
      .filter(({ compatibility, value }) =>
        isCompatible(compatibility, os as OperatingSystem, value, version)
      )
      .map(({ value, label }) => {
        const url = getNodeDownloadUrl({
          version: version,
          os: os as OperatingSystem,
          platform: value,
          kind: kind,
        });

        return {
          file: url.replace(`${DIST_URL}${version}/`, ''),
          kind: kind,
          os: os as OperatingSystem,
          architecture: label,
          url: url,
          version: version,
        };
      });
  });
};

// Define status order priority
const statusOrder = [
  'Current',
  'Active LTS',
  'Maintenance LTS',
  'End-of-life',
  'Pending',
];

type Navigations = Record<string, Array<{ label: string; value: string }>>;

/**
 * Generates the navigation links for the Node.js download archive
 * It creates a list of links for each major release, grouped by status,
 * formatted with the major version and codename if available.
 */
export const getDownloadArchiveNavigation = (releases: Array<NodeRelease>) => {
  // Group releases by status
  const groupedByStatus = releases.reduce((acc, release) => {
    const { status, major, codename, versionWithPrefix } = release;

    if (!acc[status]) {
      acc[status] = [];
    }

    acc[status].push({
      label: `Node.js v${major}.x ${codename ? `(${codename})` : ''}`,
      value: `/download/archive/${versionWithPrefix}`,
    });

    return acc;
  }, {} as Navigations);

  return statusOrder
    .filter(status => groupedByStatus[status])
    .map(status => ({
      label: status,
      items: groupedByStatus[status],
    }));
};

/**
 * Builds the release artifacts for a given Node.js release and version.
 * It retrieves binaries, installers, and source files based on the version.
 */
export const buildReleaseArtifacts = (
  release: NodeRelease,
  version: string
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
    release: enrichedRelease,
  };
};

/**
 * Extracts the version from the pathname.
 * It expects the version to be in the format 'v22.0.4' or 'archive'.
 */
export const extractVersionFromPath = (pathname: string | undefined) => {
  if (!pathname) {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);
  const version = segments.pop();

  // Check version format like (v22.0.4 or 'archive')
  if (!version || !version.match(/^v\d+(\.\d+)*|archive$/)) {
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
    return releaseData.find(release => release.status === 'Current');
  }

  return releaseData.find(release => semVer.major(version) === release.major);
};
