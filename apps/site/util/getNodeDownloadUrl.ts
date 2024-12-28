import { DIST_URL } from '@/next.constants.mjs';
import type { UserOS, UserPlatform } from '@/types/userOS';

type DownloadKind = 'installer' | 'binary' | 'source';

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
