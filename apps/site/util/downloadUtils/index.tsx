import type { SelectValue } from '@node-core/ui-components/Common/Select';
import * as InstallMethodIcons from '@node-core/ui-components/Icons/InstallationMethod';
import * as OSIcons from '@node-core/ui-components/Icons/OperatingSystem';
import * as PackageManagerIcons from '@node-core/ui-components/Icons/PackageManager';
import satisfies from 'semver/functions/satisfies';

import type { NodeReleaseStatus } from '#site/types';
import type * as Types from '#site/types/release';
import type { UserPlatform } from '#site/types/userOS';
import type { UserOS } from '#site/types/userOS';

import downloadConstants from './constants.json';

const { Platforms, InstallationMethodLabel, installMethods } =
  downloadConstants;

// Here I'm creating the icon mapping for the installation methods
const installMethodIconsMap = {
  NVM: <InstallMethodIcons.NVM width={16} height={16} />,
  FNM: <InstallMethodIcons.FNM width={16} height={16} />,
  BREW: <InstallMethodIcons.Homebrew width={16} height={16} />,
  DEVBOX: <InstallMethodIcons.Devbox width={16} height={16} />,
  CHOCO: <InstallMethodIcons.Choco width={16} height={16} />,
  DOCKER: <InstallMethodIcons.Docker width={16} height={16} />,
  N: <InstallMethodIcons.N width={16} height={16} />,
  VOLTA: <InstallMethodIcons.Volta width={16} height={16} />,
};

export const {
  OperatingSystems: osConstants,
  OperatingSystemLabel,
  OS_NOT_SUPPORTING_INSTALLERS,
} = downloadConstants;

// const InstallationMethodLabel = downloadConstants.InstallationMethod;
// export const OperatingSystemLabel = downloadConstants.OperatingSystem;
const { PackageManagerLabel } = downloadConstants;

// This is a manual list of OS's that do not sup
// port/have a way of being installed
// with an executable installer. This is used to disable the installer button.
// Note: Windows has one tiny exception for x64 on Node.js versions < 4.0.0

type DownloadCompatibility = {
  os: Array<UserOS | 'LOADING'>;
  installMethod: Array<string>;
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

// Here the list of Operating System Dropdown items are defined !
export const OPERATING_SYSTEMS: Array<DownloadDropdownItem<UserOS>> = [
  {
    label: osConstants[0].label,
    value: osConstants[0].value as UserOS,
    compatibility: osConstants[0].compatibility,
    iconImage: <OSIcons.Microsoft width={16} height={16} />,
  },
  {
    label: osConstants[1].label,
    value: osConstants[1].value as UserOS,
    compatibility: osConstants[1].compatibility,
    iconImage: <OSIcons.Apple width={16} height={16} />,
  },
  {
    label: osConstants[2].label,
    value: osConstants[2].value as UserOS,
    compatibility: osConstants[2].compatibility,
    iconImage: <OSIcons.Linux width={16} height={16} />,
  },
  {
    label: osConstants[3].label,
    value: osConstants[3].value as UserOS,
    compatibility: osConstants[3].compatibility,
    iconImage: <OSIcons.AIX width={16} height={16} />,
  },
];
// Here the list of Install Method Dropdown items are defined !

export const INSTALL_METHODS: Array<
  DownloadDropdownItem<Types.InstallationMethod> &
    Required<
      Pick<DownloadDropdownItem<Types.InstallationMethod>, 'info' | 'url'>
    >
> = installMethods.map(method => {
  // Map compatibility.os from string[] to UserOS[] if present
  // Map compatibility.releases from string[] to NodeReleaseStatus[] if present
  const compatibility = {
    ...method.compatibility,
    os: method.compatibility?.os?.map(os => os as UserOS),
    releases: method.compatibility?.releases?.map(
      (release: string) => release as NodeReleaseStatus
    ),
  };
  return {
    ...method,
    key: method.key as Types.InstallationMethod,
    value: method.value as Types.InstallationMethod,
    // optionally override the label if needed by using InstallationMethodLabel from JSON
    label:
      InstallationMethodLabel[
        method.key as keyof typeof InstallationMethodLabel
      ] || method.label,
    iconImage:
      installMethodIconsMap[method.value as keyof typeof installMethodIconsMap],
    info: method.info as IntlMessageKeys, // cast to expected type
    compatibility,
  };
});

// Here the list of Package Manager  Dropdown items are defined !

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

// Here the list Platform and their specific specification items are defined !

export const PLATFORMS: Record<
  UserOS | 'LOADING',
  Array<DownloadDropdownItem<UserPlatform>>
> = Platforms;
