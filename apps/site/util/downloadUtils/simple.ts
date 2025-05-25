import type ProgressionSidebarGroup from '@node-core/ui-components/Common/ProgressionSidebar/ProgressionSidebarGroup';
import type { ComponentProps } from 'react';
import { satisfies } from 'semver';

import type getReleaseData from '#site/next-data/releaseData';
import type { NodeRelease } from '#site/types/releases';
import type { UserOS, UserPlatform } from '#site/types/userOS';
import type { DownloadDropdownItem } from '#site/util/downloadUtils';
import {
  PLATFORMS,
  OS_NOT_SUPPORTING_INSTALLERS,
} from '#site/util/downloadUtils';
import type { DownloadKind } from '#site/util/getNodeDownloadUrl';
import { getNodeDownloadUrl } from '#site/util/getNodeDownloadUrl';

import { DIST_URL, BASE_CHANGELOG_URL } from '#site/next.constants';

const RELEASE_POST_URL = '/blog/release/';

export type ParsedArtifact = {
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
    (versions?.every(r => satisfies(version, r)) ?? true)
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
function getCompatibleArtifacts({
  platforms = PLATFORMS,
  exclude = [],
  version,
  kind = 'binary',
}: CompatibleArtifactOptions): Array<ParsedArtifact> {
  return Object.entries(platforms).flatMap(([os, items]) => {
    if (exclude.includes(os as UserOS)) return [];
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
}

export const buildReleaseArtifacts = ({
  versionWithPrefix,
  version,
  minorVersions,
}: NodeRelease) => ({
  binaries: getCompatibleArtifacts({
    version: versionWithPrefix,
    kind: 'binary',
  }),
  urls: {
    shasum: getNodeDownloadUrl({ version: versionWithPrefix, kind: 'shasum' }),
    source: getNodeDownloadUrl({ version: versionWithPrefix, kind: 'source' }),
    changelog: `${BASE_CHANGELOG_URL}${version}`,
    blogPost: `${RELEASE_POST_URL}${versionWithPrefix}`,
  },
  installers: getCompatibleArtifacts({
    exclude: OS_NOT_SUPPORTING_INSTALLERS,
    version: versionWithPrefix,
    kind: 'installer',
  }),
  version: versionWithPrefix,
  minors: minorVersions
    .filter(minor => `v${minor.version}` !== versionWithPrefix) // Exclude the current version
    .map(minor => {
      const versionWithPrefix = `v${minor.version}`;

      return {
        binaries: getCompatibleArtifacts({
          version: versionWithPrefix,
          kind: 'binary',
        }),
        installers: getCompatibleArtifacts({
          exclude: OS_NOT_SUPPORTING_INSTALLERS,
          version: versionWithPrefix,
          kind: 'installer',
        }),
        version: versionWithPrefix,
        urls: {
          source: getNodeDownloadUrl({
            version: versionWithPrefix,
            kind: 'source',
          }),
          changelog: `${BASE_CHANGELOG_URL}${minor.version}`,
          blogPost: `${RELEASE_POST_URL}${versionWithPrefix}`,
        },
      };
    }),
});

type SidebarGroup = ComponentProps<typeof ProgressionSidebarGroup>;

export const groupReleasesByStatus = (
  releaseData: Awaited<ReturnType<typeof getReleaseData>>
): Array<SidebarGroup> => {
  // Reduce the release data into a record grouped by release status (e.g., 'LTS', 'Current')
  const grouped = releaseData.reduce<Record<string, SidebarGroup>>(
    (acc, release) => {
      const statusKey = release.status;

      // Initialize the group if it doesn't exist yet
      if (!acc[statusKey]) {
        acc[statusKey] = {
          groupName: statusKey,
          items: [],
        };
      }

      // Build the label: always include major version, optionally codename
      const labelParts = [`v${release.major}`];
      if (release.codename) {
        labelParts.push(release.codename);
      }

      // Add the release to the group's items
      acc[statusKey].items.push({
        label: labelParts.join(' '),
        link: `/download/${release.major}`,
      });

      return acc;
    },
    {}
  );

  // Return the grouped items as an array for sidebar consumption
  return Object.values(grouped);
};
