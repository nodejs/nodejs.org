import semVer from 'semver';

import type {
  DownloadDropdownItem,
  DownloadKind,
  DownloadArtifact,
  OperatingSystem,
  Platform,
} from '#site/types';
import type { NodeRelease } from '#site/types/releases';
import { OS_NOT_SUPPORTING_INSTALLERS, PLATFORMS } from '#site/util/download';
import { getNodeDownloadUrl } from '#site/util/url';

import { DIST_URL } from '#site/next.constants';

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
  versionWithPrefix: string;
  kind?: DownloadKind;
};

/**
 * Returns a list of compatible artifacts for the given options.
 */
const getCompatibleArtifacts = ({
  platforms = PLATFORMS,
  exclude = [],
  versionWithPrefix,
  kind = 'binary',
}: CompatibleArtifactOptions): Array<DownloadArtifact> => {
  return Object.entries(platforms).flatMap(([os, items]) => {
    if (exclude.includes(os)) return [];

    return items
      .filter(({ compatibility, value }) =>
        isCompatible(
          compatibility,
          os as OperatingSystem,
          value,
          versionWithPrefix
        )
      )
      .map(({ value, label }) => {
        const url = getNodeDownloadUrl({
          versionWithPrefix: versionWithPrefix,
          os: os as OperatingSystem,
          platform: value,
          kind: kind,
        });

        return {
          fileName: url.replace(`${DIST_URL}${versionWithPrefix}/`, ''),
          kind: kind,
          os: os as OperatingSystem,
          architecture: label,
          url: url,
          version: versionWithPrefix,
        };
      });
  });
};

/**
 * Builds the release artifacts for a given Node.js release and version.
 * It retrieves binaries, installers, and source files based on the version.
 */
export const buildReleaseArtifacts = (
  release: NodeRelease,
  versionWithPrefix: string
) => {
  const minorVersion = release.minorVersions.find(
    ({ versionWithPrefix: version }) => version === versionWithPrefix
  );

  const enrichedRelease = {
    ...release,
    ...minorVersion,
  };

  return {
    binaries: getCompatibleArtifacts({
      versionWithPrefix: versionWithPrefix,
      kind: 'binary',
    }),
    installers: getCompatibleArtifacts({
      exclude: OS_NOT_SUPPORTING_INSTALLERS,
      versionWithPrefix: versionWithPrefix,
      kind: 'installer',
    }),
    sources: {
      shasum: getNodeDownloadUrl({
        versionWithPrefix: versionWithPrefix,
        kind: 'shasum',
      }),
      tarball: getNodeDownloadUrl({
        versionWithPrefix: versionWithPrefix,
        kind: 'source',
      }),
    },
    version: versionWithPrefix,
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
    return releaseData.find(release => release.status === 'Current')!;
  }

  return releaseData.find(release => semVer.major(version) === release.major)!;
};
