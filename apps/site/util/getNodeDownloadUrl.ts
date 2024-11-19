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
    // Prepares a downloadable Node.js source code link
    return `${baseURL}/node-${versionWithPrefix}.tar.gz`;
  }

  // Map of OS-specific logic for generating download URLs
  const osUrlMap: Record<UserOS, (bitness: string | number, kind: string) => string> = {
    MAC: (bitness, kind) =>
      kind === 'installer'
        ? // Prepares a downloadable Node.js installer link for the macOS platform
          `${baseURL}/node-${versionWithPrefix}.pkg`
        : // Prepares a downloadable Node.js link for the macOS platform (ARM64 or x64)
          // Since ARM and x64 are supported, returns the platform-specific binary link
          `${baseURL}/node-${versionWithPrefix}-darwin-${typeof bitness === 'string' ? bitness : 'x64'}.tar.gz`,

    WIN: (bitness, kind) =>
      kind === 'installer'
        ? // Prepares a downloadable Node.js installer link for the Windows platform
          // Supports both ARM and x86/x64 architecture, choosing based on bitness
          `${baseURL}/node-${versionWithPrefix}-${typeof bitness === 'string' ? bitness : `x${bitness}`}.msi`
        : // Prepares a downloadable Node.js link for Windows platform (ARM64 or x86/x64)
          // Returns the zip format for both ARM and x86/x64 platforms
          `${baseURL}/node-${versionWithPrefix}-win-${typeof bitness === 'string' ? bitness : `x${bitness}`}.zip`,

    LINUX: (bitness) =>
      // Prepares a downloadable Node.js link for the Linux platform
      // Supports ARM platforms (ARMv7/ARMv8) and x64 platforms.
      // Returns ARM or x64 based on the bitness provided.
      `${baseURL}/node-${versionWithPrefix}-linux-${typeof bitness === 'string' ? bitness : 'x64'}.tar.xz`,

    AIX: (bitness) =>
      // Prepares a downloadable Node.js link for the AIX platform
      // Supports the PPC64 architecture. Returns the appropriate binary based on bitness.
      `${baseURL}/node-${versionWithPrefix}-aix-${typeof bitness === 'string' ? bitness : 'ppc64'}.tar.gz`,

    OTHER: () =>
      // Prepares a downloadable Node.js source code link as a fallback for unsupported OS
      `${baseURL}/node-${versionWithPrefix}.tar.gz`,
  };

  // Return the URL based on the detected OS
  return osUrlMap[os]?.(bitness, kind) || osUrlMap.OTHER();
};
