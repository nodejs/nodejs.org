import { DIST_URL } from '@/next.constants.mjs';
import type { UserOS } from '@/types/userOS';

export const getNodeDownloadUrl = (
  versionWithPrefix: string,
  os: UserOS,
  bitness: string | number,
  kind: 'installer' | 'binary' | 'source' = 'installer'
): string => {
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
      if (typeof bitness === 'string') {
        return `${baseURL}/node-${versionWithPrefix}-darwin-${bitness}.tar.gz`;
      }

      // Prepares a downloadable Node.js link for the x64 platform.
      // Since the x86 platform is not officially supported, returns the x64
      // link as the default value.
      return `${baseURL}/node-${versionWithPrefix}-darwin-x64.tar.gz`;
    case 'WIN': {
      if (kind === 'installer') {
        // Prepares a downloadable Node.js installer link for the ARM platforms
        if (typeof bitness === 'string') {
          return `${baseURL}/node-${versionWithPrefix}-${bitness}.msi`;
        }

        // Prepares a downloadable Node.js installer link for the x64 and x86 platforms
        return `${baseURL}/node-${versionWithPrefix}-x${bitness}.msi`;
      }

      // Prepares a downloadable Node.js link for the ARM64 platform
      if (typeof bitness === 'string') {
        return `${baseURL}/node-${versionWithPrefix}-win-${bitness}.zip`;
      }

      // Prepares a downloadable Node.js link for the x64 and x86 platforms
      return `${baseURL}/node-${versionWithPrefix}-win-x${bitness}.zip`;
    }
    case 'LINUX':
      // Prepares a downloadable Node.js link for the ARM platforms such as
      // ARMv7 and ARMv8
      if (typeof bitness === 'string') {
        return `${baseURL}/node-${versionWithPrefix}-linux-${bitness}.tar.xz`;
      }

      // Prepares a downloadable Node.js link for the x64 platform.
      // Since the x86 platform is not officially supported, returns the x64
      // link as the default value.
      return `${baseURL}/node-${versionWithPrefix}-linux-x64.tar.xz`;
    case 'AIX':
      // Prepares a downloadable Node.js link for AIX
      if (typeof bitness === 'string') {
        return `${baseURL}/node-${versionWithPrefix}-aix-${bitness}.tar.gz`;
      }

      return `${baseURL}/node-${versionWithPrefix}-aix-ppc64.tar.gz`;
    default:
      // Prepares a downloadable Node.js source code link
      return `${baseURL}/node-${versionWithPrefix}.tar.gz`;
  }
};
