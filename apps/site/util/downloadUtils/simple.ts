import { satisfies } from 'semver';

import type getReleaseData from '#site/next-data/releaseData';
import type { NodeRelease } from '#site/types/releases';
import type { UserOS, UserPlatform } from '#site/types/userOS';

import type { DownloadKind } from '../getNodeDownloadUrl';
import { getNodeDownloadUrl } from '../getNodeDownloadUrl';

import type { DownloadDropdownItem } from '.';
import { PLATFORMS, OS_NOT_SUPPORTING_INSTALLERS } from '.';

import { DIST_URL, BASE_CHANGELOG_URL } from '#site/next.constants';

export type ParsedArtifact = {
  file: string;
  kind: DownloadKind;
  os: UserOS;
  architecture: string;
  url: string;
  version: string;
};

function generateCompatibleDownloads({
  platforms = PLATFORMS,
  exclude = [],
  version,
  kind = 'binary',
}: {
  platforms?: Record<UserOS, Array<DownloadDropdownItem<UserPlatform>>>;
  exclude?: Array<string>;
  version: string;
  kind?: DownloadKind;
}): Array<ParsedArtifact> {
  return Object.entries(platforms).reduce<Array<ParsedArtifact>>(
    (acc, [os, items]) => {
      if (exclude.includes(os as UserOS)) return acc;

      const operatingSystem = os as UserOS;
      items.forEach(({ compatibility, value, label }) => {
        const {
          os: operatingSystems,
          platform: platforms,
          semver: versions,
        } = compatibility;

        if (
          (operatingSystems?.includes(operatingSystem) ?? true) &&
          (platforms?.includes(value) ?? true) &&
          (versions?.every(r => satisfies(version, r)) ?? true)
        ) {
          const url = getNodeDownloadUrl({
            version: version,
            os: operatingSystem,
            platform: value,
            kind: kind,
          });

          acc.push({
            file: url.replace(`${DIST_URL}${version}/`, ''),
            kind: kind,
            os: operatingSystem,
            architecture: label,
            url: url,
            version: version,
          });
        }
      });

      return acc;
    },
    []
  );
}

export const getDownloadTable = ({
  versionWithPrefix,
  version,
  minorVersions,
}: NodeRelease) => ({
  binaries: generateCompatibleDownloads({
    version: versionWithPrefix,
    kind: 'binary',
  }),
  urls: {
    shasum: getNodeDownloadUrl({ version: versionWithPrefix, kind: 'shasum' }),
    source: getNodeDownloadUrl({ version: versionWithPrefix, kind: 'source' }),
    changelog: `${BASE_CHANGELOG_URL}${version}`,
    blogPost: `/blog/release/${versionWithPrefix}`,
  },
  installers: generateCompatibleDownloads({
    exclude: OS_NOT_SUPPORTING_INSTALLERS,
    version: versionWithPrefix,
    kind: 'installer',
  }),
  version: versionWithPrefix,
  minors: minorVersions
    .filter(minor => `v${minor.version}` !== versionWithPrefix)
    .map(minor => {
      const versionWithPrefix = `v${minor.version}`;

      return {
        binaries: generateCompatibleDownloads({
          version: versionWithPrefix,
          kind: 'binary',
        }),
        installers: generateCompatibleDownloads({
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
          blogPost: `/blog/release/${versionWithPrefix}`,
        },
      };
    }),
});

export const mapSidebarItems = (
  releaseData: Awaited<ReturnType<typeof getReleaseData>>
) =>
  Object.values(
    releaseData.reduce<
      Record<
        string,
        { groupName: string; items: Array<{ label: string; link: string }> }
      >
    >((acc, release) => {
      const key = release.status;
      if (!acc[key]) {
        acc[key] = {
          groupName: key,
          items: [],
        };
      }

      const label = [`v${release.major}`];

      if (release.codename) {
        label.push(release.codename);
      }

      acc[key].items.push({
        label: label.join(' '),
        link: `/download/${release.major}`,
      });

      return acc;
    }, {})
  );
