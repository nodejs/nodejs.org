import satisfies from 'semver/functions/satisfies';

import type { SelectValue } from '@/components/Common/Select';
import OSIcons from '@/components/Icons/OperatingSystem';
import PackageManagerIcons from '@/components/Icons/PackageManager';
import PlatformIcons from '@/components/Icons/Platform';
import type { NodeReleaseStatus } from '@/types';
import type * as Types from '@/types/release';
import type { UserOS, UserPlatform } from '@/types/userOS';

// This is a manual list of OS's that do not support/have a way of being installed
// with an executable installer. This is used to disable the installer button.
// Note: Windows has one tiny exception for x64 on Node.js versions < 4.0.0
export const OS_NOT_SUPPORTING_INSTALLERS: Array<UserOS | 'LOADING'> = [
  'LINUX',
  'AIX',
  'OTHER',
  'LOADING',
];

export enum OperatingSystemLabel {
  WIN = 'Windows',
  MAC = 'macOS',
  LINUX = 'Linux',
  AIX = 'AIX',
  OTHER = 'Other',
  LOADING = 'N/A',
}

export enum InstallationMethodLabel {
  NVM = 'nvm',
  FNM = 'fnm',
  BREW = 'Brew',
  CHOCO = 'Chocolatey',
  DOCKER = 'Docker',
}

export enum PackageManagerLabel {
  NPM = 'npm',
  YARN = 'Yarn',
  PNPM = 'pnpm',
}

type DownloadCompatibility = {
  os: Array<UserOS | 'LOADING'>;
  installMethod: Array<Types.InstallationMethod | ''>;
  platform: Array<UserPlatform | ''>;
  semver: Array<string>;
  releases: Array<NodeReleaseStatus>;
};

// Defines the Type definition for a Release Dropdown Item
type DownloadDropdownItem<T extends string> = {
  // A label to be used within the Dropdown message
  label: string;
  // A flag that indicates if the item is recommended or not (official or community based)
  recommended?: boolean;
  // A URL pointing to the docs or support page for the item
  url?: string;
  // A bottom info that provides additional information about the item
  info?: IntlMessageKeys;
  // A compatibility object that defines the compatibility of the item with the current Release Context
  compatibility: Partial<DownloadCompatibility>;
} & Omit<SelectValue<T>, 'label'>;

// This function is used to get the next item in the dropdown
// when the current item is disabeld/excluded/not valid
// And this is useful when a parent release value (i.e. OS) is changed
// and requires the current dropdown (i.e. Platform) to be updated
export const nextItem = <T extends string>(
  current: T,
  items: Array<DownloadDropdownItem<T>>
): T => {
  const item = items.find(({ value }) => String(value) === String(current));

  const isDisabledOrExcluded = !item || item.disabled;

  if (isDisabledOrExcluded) {
    const nextItem = items.find(({ disabled }) => !disabled);

    if (nextItem) {
      return nextItem.value;
    }
  }

  return current;
};

// This function is used to parse the compatibility of the dropdown items
// In a nice and static way that allows a lot of abstraction and flexibility
export const parseCompat = <
  K extends string,
  T extends DownloadDropdownItem<K>,
>(
  items: Array<T>,
  { os, installMethod, platform, version, release }: Types.ReleaseContextType
): Array<T> => {
  const satisfiesSemver = (semver: string) => satisfies(version, semver);

  const supportsOS = (i: T['compatibility']) => i.os?.includes(os) ?? true;

  const supportsInstallMethod = (i: T['compatibility']) =>
    i.installMethod?.includes(installMethod) ?? true;

  const supportsPlatform = (i: T['compatibility']) =>
    i.platform?.includes(platform) ?? true;

  const supportsVersion = (i: T['compatibility']) =>
    i.semver?.some(satisfiesSemver) ?? true;

  const supportsRelease = (i: T['compatibility']) =>
    i.releases?.includes(release.status) ?? true;

  return items.map(item => ({
    ...item,
    disabled:
      !supportsOS(item.compatibility) ||
      !supportsInstallMethod(item.compatibility) ||
      !supportsPlatform(item.compatibility) ||
      !supportsVersion(item.compatibility) ||
      !supportsRelease(item.compatibility),
  }));
};

export const OPERATING_SYSTEMS: Array<DownloadDropdownItem<UserOS>> = [
  {
    label: OperatingSystemLabel.WIN,
    value: 'WIN',
    compatibility: {},
    iconImage: <OSIcons.Microsoft width={16} height={16} />,
  },
  {
    label: OperatingSystemLabel.MAC,
    value: 'MAC',
    compatibility: {},
    iconImage: <OSIcons.Apple width={16} height={16} />,
  },
  {
    label: OperatingSystemLabel.LINUX,
    value: 'LINUX',
    compatibility: {},
    iconImage: <OSIcons.Linux width={16} height={16} />,
  },
  {
    label: OperatingSystemLabel.AIX,
    value: 'AIX',
    compatibility: { installMethod: [''], semver: ['>= 6.7.0'] },
    iconImage: <OSIcons.AIX width={16} height={16} />,
  },
];

export const INSTALL_METHODS: Array<
  DownloadDropdownItem<Types.InstallationMethod> &
    // Since the ReleaseCodeBox requires an info key to be provided, we force this
    // to be mandatory for install methods
    Required<
      Pick<DownloadDropdownItem<Types.InstallationMethod>, 'info' | 'url'>
    >
> = [
  {
    label: InstallationMethodLabel.NVM,
    value: 'NVM',
    compatibility: { os: ['MAC', 'LINUX', 'OTHER'] },
    iconImage: <PlatformIcons.NVM width={16} height={16} />,
    recommended: true,
    url: 'https://github.com/nvm-sh/nvm',
    info: 'layouts.download.codeBox.platformInfo.nvm',
  },
  {
    label: InstallationMethodLabel.FNM,
    value: 'FNM',
    compatibility: { os: ['MAC', 'LINUX', 'WIN'] },
    iconImage: <PlatformIcons.FNM width={16} height={16} />,
    url: 'https://github.com/Schniz/fnm',
    info: 'layouts.download.codeBox.platformInfo.fnm',
  },
  {
    label: InstallationMethodLabel.BREW,
    value: 'BREW',
    compatibility: { os: ['MAC', 'LINUX'], releases: ['Current', 'LTS'] },
    iconImage: <PlatformIcons.Homebrew width={16} height={16} />,
    url: 'https://brew.sh/',
    info: 'layouts.download.codeBox.platformInfo.brew',
  },
  {
    label: InstallationMethodLabel.CHOCO,
    value: 'CHOCO',
    compatibility: { os: ['WIN'] },
    iconImage: <PlatformIcons.Choco width={16} height={16} />,
    url: 'https://chocolatey.org/',
    info: 'layouts.download.codeBox.platformInfo.choco',
  },
  {
    label: InstallationMethodLabel.DOCKER,
    value: 'DOCKER',
    compatibility: { os: ['WIN', 'MAC', 'LINUX'] },
    iconImage: <PlatformIcons.Docker width={16} height={16} />,
    recommended: true,
    url: 'https://docs.docker.com/get-started/get-docker/',
    info: 'layouts.download.codeBox.platformInfo.docker',
  },
];

export const PACKAGE_MANAGERS: Array<
  DownloadDropdownItem<Types.PackageManager>
> = [
  {
    label: PackageManagerLabel.NPM,
    value: 'NPM',
    compatibility: {},
    iconImage: <PackageManagerIcons.NPM width={16} height={16} />,
  },
  {
    label: PackageManagerLabel.YARN,
    value: 'YARN',
    compatibility: { semver: ['>= v14.19.0', '>= v16.9.0'] },
    iconImage: <PackageManagerIcons.YARN width={16} height={16} />,
  },
  {
    label: PackageManagerLabel.PNPM,
    value: 'PNPM',
    compatibility: { semver: ['>= v14.19.0', '>= v16.9.0'] },
    iconImage: <PackageManagerIcons.PNPM width={16} height={16} />,
  },
];

export const PLATFORMS: Record<
  UserOS,
  Array<DownloadDropdownItem<UserPlatform>>
> = {
  WIN: [
    {
      label: 'x64',
      value: 'x64',
      compatibility: {},
    },
    {
      label: 'x86',
      value: 'x86',
      compatibility: { semver: ['< 23.0.0'] },
    },
    {
      label: 'ARM64',
      value: 'arm64',
      compatibility: { semver: ['>= 19.9.0'] },
    },
  ],
  MAC: [
    {
      label: 'x64',
      value: 'x64',
      compatibility: {},
    },
    {
      label: 'ARM64',
      value: 'arm64',
      compatibility: {},
    },
  ],
  LINUX: [
    {
      label: 'x64',
      value: 'x64',
      compatibility: {},
    },
    {
      label: 'ARMv7',
      value: 'armv7l',
      compatibility: { semver: ['>= 4.0.0'] },
    },
    {
      label: 'ARM64',
      value: 'arm64',
      compatibility: { semver: ['>= 4.0.0'] },
    },
    {
      label: 'Power LE',
      value: 'ppc64le',
      compatibility: { semver: ['>= 4.4.0'] },
    },
    {
      label: 'System Z',
      value: 's390x',
      compatibility: { semver: ['>= 6.6.0'] },
    },
  ],
  AIX: [
    {
      label: 'Power',
      value: 'ppc64',
      compatibility: { semver: ['>= 6.7.0'] },
    },
  ],
  OTHER: [],
};
