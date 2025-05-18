import type { SelectValue } from '@node-core/ui-components/Common/Select';
import * as InstallMethodIcons from '@node-core/ui-components/Icons/InstallationMethod';
import * as OSIcons from '@node-core/ui-components/Icons/OperatingSystem';
import * as PackageManagerIcons from '@node-core/ui-components/Icons/PackageManager';


import satisfies from 'semver/functions/satisfies';

import type { NodeReleaseStatus } from '#site/types';
import type * as Types from '#site/types/release';
import type { UserPlatform } from '#site/types/userOS';
import type { UserOS } from '#site/types/userOS';

import constants from './constants.json';

const {
  Platforms,
  InstallationMethodLabel,
  installMethods,
  packageManagers,
  PackageManagerLabel,
} = constants;

export const {
  OperatingSystems: osConstants,
  OperatingSystemLabel,
  OS_NOT_SUPPORTING_INSTALLERS,
} = constants;

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
export const OPERATING_SYSTEMS: Array<DownloadDropdownItem<UserOS>> =
  osConstants.map(os => {
    const IconComponent = OSIcons[os.icon as keyof typeof OSIcons];
    return {
      label: os.label,
      value: os.value as UserOS,

      compatibility: os.compatibility,

      iconImage: IconComponent ? (
        <IconComponent width={16} height={16} />
      ) : undefined,
    };
  });

// Here the list of Install Method Dropdown items are defined !
export const INSTALL_METHODS: Array<
  DownloadDropdownItem<Types.InstallationMethod> &
    Required<
      Pick<DownloadDropdownItem<Types.InstallationMethod>, 'info' | 'url'>
    >
> = installMethods.map(method => {
  const IconComponent =
    InstallMethodIcons[method.key as keyof typeof InstallMethodIcons];
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
    iconImage: IconComponent ? (
      <IconComponent width={16} height={16} />
    ) : undefined,
    info: method.info as IntlMessageKeys, // cast to expected type
    compatibility,
  };
});

// Here the list of Package Manager  Dropdown items are defined !
export const PACKAGE_MANAGERS: Array<
  DownloadDropdownItem<Types.PackageManager>
> = packageManagers.map(manager => {
  const IconComponent =
    PackageManagerIcons[manager.key as keyof typeof PackageManagerIcons];
  return {
    ...manager,
    key: manager.key as Types.PackageManager,
    value: manager.value as Types.PackageManager,
    label:
      PackageManagerLabel[manager.key as keyof typeof PackageManagerLabel] ||
      manager.label,
    iconImage: IconComponent ? (
      <IconComponent width={16} height={16} />
    ) : undefined,
    compatibility: {
      ...manager.compatibility,
      semver: manager.compatibility?.semver?.map(
        (semver: string) => semver as string
      ),
    },
  };
});

// Here the list Platform and their specific specification items are defined !

export const PLATFORMS: Record<
  UserOS | 'LOADING',
  Array<DownloadDropdownItem<UserPlatform>>
> = Platforms;

