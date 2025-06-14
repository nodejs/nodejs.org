import type { SelectValue } from '@node-core/ui-components/Common/Select';
import * as InstallMethodIcons from '@node-core/ui-components/Icons/InstallationMethod';
import * as OSIcons from '@node-core/ui-components/Icons/OperatingSystem';
import * as PackageManagerIcons from '@node-core/ui-components/Icons/PackageManager';
import type { ElementType } from 'react';
import satisfies from 'semver/functions/satisfies';

import { DIST_URL } from '#site/next.constants.mjs';
import type { IntlMessageKeys, NodeReleaseStatus } from '#site/types';
import type * as Types from '#site/types/release';
import type { UserOS, UserPlatform } from '#site/types/userOS';

import constants from './constants.json';

const { systems, installMethods, packageManagers } = constants;

// Extract the non-installer supporting OSes
export const OS_NOT_SUPPORTING_INSTALLERS = Object.entries(systems)
  .filter(([, data]) => !data.supportsInstallers)
  .map(([key]) => key);

// Create OS label mapping for backward compatibility
export const OperatingSystemLabel = Object.fromEntries(
  Object.entries(systems).map(([key, data]) => [key, data.name])
);

// Base types for dropdown functionality
type DownloadCompatibility = {
  os?: Array<UserOS | 'LOADING'>;
  installMethod?: Array<string>;
  platform?: Array<UserPlatform | ''>;
  semver?: Array<string>;
  releases?: Array<NodeReleaseStatus>;
};

type DownloadDropdownItem<T extends string> = {
  label: IntlMessageKeys;
  recommended?: boolean;
  url?: string;
  info?: IntlMessageKeys;
  compatibility: DownloadCompatibility;
} & Omit<SelectValue<T>, 'label'>;

/**
 * Gets the next valid item when current item is disabled/excluded
 */
export const nextItem = <T extends string>(
  current: T,
  items: Array<DownloadDropdownItem<T>>
): T => {
  const currentItem = items.find(
    ({ value }) => String(value) === String(current)
  );
  return currentItem && !currentItem.disabled
    ? current
    : items.find(({ disabled }) => !disabled)?.value || current;
};

/**
 * Parses compatibility of dropdown items based on context
 */
export const parseCompat = <
  K extends string,
  T extends DownloadDropdownItem<K>,
>(
  items: Array<T>,
  { os, installMethod, platform, version, release }: Types.ReleaseContextType
): Array<T> => {
  const checkCompatibility = (compatibility: T['compatibility']) => {
    const checks = [
      !compatibility.os || compatibility.os.includes(os),
      !compatibility.installMethod ||
        compatibility.installMethod.includes(installMethod),
      !compatibility.platform || compatibility.platform.includes(platform),
      !compatibility.semver ||
        compatibility.semver.some(semver => satisfies(version, semver)),
      !compatibility.releases ||
        compatibility.releases.includes(release.status),
    ];

    return checks.every(Boolean);
  };

  return items.map(item => ({
    ...item,
    disabled: !checkCompatibility(item.compatibility),
  }));
};

/**
 * Creates an icon element for a component
 */
const createIcon = (
  IconModule: Record<string, ElementType>,
  iconName: string
) => {
  const IconComponent = IconModule[iconName];
  return <IconComponent width={16} height={16} />;
};

// Operating System dropdown items
type ActualSystems = Omit<typeof systems, 'OTHER' | 'LOADING'>;
export const OPERATING_SYSTEMS = Object.entries(systems as ActualSystems)
  .filter(([key]) => key !== 'LOADING' && key !== 'OTHER')
  .map(([key, data]) => ({
    label: data.name as IntlMessageKeys,
    value: key as UserOS,
    compatibility: data.compatibility,
    iconImage: createIcon(OSIcons, data.icon),
  }));

// Installation Method dropdown items
export const INSTALL_METHODS = installMethods.map(method => ({
  key: method.id,
  value: method.id as Types.InstallationMethod,
  label: method.name as IntlMessageKeys,
  iconImage: createIcon(InstallMethodIcons, method.icon),
  recommended: method.recommended,
  url: method.url,
  info: method.info as IntlMessageKeys,
  compatibility: {
    ...method.compatibility,
    os: method.compatibility?.os?.map(os => os as UserOS),
    releases: method.compatibility?.releases?.map(
      release => release as NodeReleaseStatus
    ),
  },
}));

// Package Manager dropdown items
export const PACKAGE_MANAGERS = packageManagers.map(manager => ({
  key: manager.id,
  value: manager.id as Types.PackageManager,
  label: manager.name as IntlMessageKeys,
  iconImage: createIcon(PackageManagerIcons, manager.id),
  compatibility: {
    ...manager.compatibility,
    semver: manager.compatibility?.semver,
  },
}));

// Platform-specific dropdown items
export const PLATFORMS = Object.fromEntries(
  Object.entries(systems).map(([key, data]) => [
    key,
    data.platforms.map(platform => ({
      label: platform.label,
      value: platform.value as UserPlatform,
      compatibility: platform.compatibility || {},
    })),
  ])
) as Record<UserOS | 'LOADING', Array<DownloadDropdownItem<UserPlatform>>>;

export type DownloadKind = 'installer' | 'binary' | 'source';

export const getNodeDownloadUrl = (
  versionWithPrefix: string,
  os: UserOS | 'LOADING',
  platform: UserPlatform = 'x64',
  kind: DownloadKind = 'installer'
) => {
  const baseURL = `${DIST_URL}${versionWithPrefix}`;

  if (kind === 'source') {
    return `${baseURL}/node-${versionWithPrefix}.tar.gz`;
  }

  switch (os) {
    case 'MAC':
      // Prepares a downloadable Node.js installer link for the x64, ARM64 platforms
      if (kind === 'installer') {
        return `${baseURL}/node-${versionWithPrefix}.pkg`;
      }

      // Prepares a downloadable Node.js link for the ARM64 platform
      if (typeof platform === 'string') {
        return `${baseURL}/node-${versionWithPrefix}-darwin-${platform}.tar.gz`;
      }

      // Prepares a downloadable Node.js link for the x64 platform.
      // Since the x86 platform is not officially supported, returns the x64
      // link as the default value.
      return `${baseURL}/node-${versionWithPrefix}-darwin-x64.tar.gz`;
    case 'WIN': {
      if (kind === 'installer') {
        // Prepares a downloadable Node.js installer link for the ARM platforms
        if (typeof platform === 'string') {
          return `${baseURL}/node-${versionWithPrefix}-${platform}.msi`;
        }

        // Prepares a downloadable Node.js installer link for the x64 and x86 platforms
        return `${baseURL}/node-${versionWithPrefix}-x${platform}.msi`;
      }

      // Prepares a downloadable Node.js link for the ARM64 platform
      if (typeof platform === 'string') {
        return `${baseURL}/node-${versionWithPrefix}-win-${platform}.zip`;
      }

      // Prepares a downloadable Node.js link for the x64 and x86 platforms
      return `${baseURL}/node-${versionWithPrefix}-win-x${platform}.zip`;
    }
    case 'LINUX':
      // Prepares a downloadable Node.js link for the ARM platforms such as
      // ARMv7 and ARMv8
      if (typeof platform === 'string') {
        return `${baseURL}/node-${versionWithPrefix}-linux-${platform}.tar.xz`;
      }

      // Prepares a downloadable Node.js link for the x64 platform.
      // Since the x86 platform is not officially supported, returns the x64
      // link as the default value.
      return `${baseURL}/node-${versionWithPrefix}-linux-x64.tar.xz`;
    case 'AIX':
      // Prepares a downloadable Node.js link for AIX
      if (typeof platform === 'string') {
        return `${baseURL}/node-${versionWithPrefix}-aix-${platform}.tar.gz`;
      }

      return `${baseURL}/node-${versionWithPrefix}-aix-ppc64.tar.gz`;
    default:
      // Prepares a downloadable Node.js source code link
      return `${baseURL}/node-${versionWithPrefix}.tar.gz`;
  }
};
