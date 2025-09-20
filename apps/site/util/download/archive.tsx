import semVer from 'semver';

import type {
  DownloadDropdownItem,
  DownloadKind,
  DownloadArtifact,
  OperatingSystem,
  Platform,
  CompatiblePlatforms,
  CompatibleArtifactOptions,
} from '#site/types';
import type { NodeRelease } from '#site/types/releases';
import { OS_NOT_SUPPORTING_INSTALLERS, PLATFORMS } from '#site/util/download';
import { getNodeDownloadUrl } from '#site/util/url';

import { DIST_URL } from '#site/next.constants';

/**
 * Creates a download artifact from platform data
 */
const createDownloadArtifact = (
  os: OperatingSystem,
  platform: DownloadDropdownItem<Platform>,
  versionWithPrefix: string,
  kind: DownloadKind
): DownloadArtifact => {
  const url = getNodeDownloadUrl({
    versionWithPrefix,
    os,
    platform: platform.value,
    kind,
  });

  return {
    fileName: url.replace(`${DIST_URL}${versionWithPrefix}/`, ''),
    kind,
    os,
    architecture: platform.label,
    url,
    version: versionWithPrefix,
  };
};

/**
 * Filters platforms by compatibility and exclusions
 */
const getCompatiblePlatforms = (
  platforms: Record<OperatingSystem, Array<DownloadDropdownItem<Platform>>>,
  exclude: Array<string>,
  versionWithPrefix: string
) => {
  return Object.entries(platforms).flatMap(([os, items]) => {
    if (exclude.includes(os)) {
      return [];
    }

    return items
      .filter(({ compatibility }) => {
        // In the download constants file (apps/site/util/download/constants.json),
        //  if no compatibility is defined as a semver, we treat it as supporting all
        //  versions by default.
        if (!compatibility.semver) {
          return true;
        }

        return compatibility.semver.every(version =>
          semVer.satisfies(versionWithPrefix, version)
        );
      })
      .map(platform => ({
        os,
        platform,
      })) as CompatiblePlatforms;
  });
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
  const compatiblePlatforms = getCompatiblePlatforms(
    platforms,
    exclude,
    versionWithPrefix
  );

  return compatiblePlatforms.map(({ os, platform }) =>
    createDownloadArtifact(os, platform, versionWithPrefix, kind)
  );
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
      versionWithPrefix,
      kind: 'binary',
    }),
    installers: getCompatibleArtifacts({
      exclude: OS_NOT_SUPPORTING_INSTALLERS,
      versionWithPrefix,
      kind: 'installer',
    }),
    sources: {
      shasum: getNodeDownloadUrl({
        versionWithPrefix,
        kind: 'shasum',
      }),
      tarball: getNodeDownloadUrl({
        versionWithPrefix,
        kind: 'source',
      }),
    },
    version: versionWithPrefix,
    release: enrichedRelease,
  };
};

/**
 * Extracts the version from the pathname.
 * It expects the version to be in the format like 'v22.0.4'.
 */
export const extractVersionFromPath = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  // The version is expected to be the last segment in the path
  const version = segments.pop()!;

  return version;
};
