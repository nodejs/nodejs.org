import { DIST_URL } from '#site/next.constants.mjs';
import type { UserOS, UserPlatform } from '#site/types/userOS';

export type DownloadKind = 'installer' | 'binary' | 'source' | 'shasum';

type DownloadOptions = {
  version: string;
  os?: UserOS | 'LOADING';
  platform?: UserPlatform;
  kind?: DownloadKind;
};

/**
 * Generates a Node.js download URL for the given options.
 *
 * @param options - The download options.
 * @param options.version - The Node.js version string, must include the 'v' prefix (e.g., 'v20.12.2').
 * @param options.os - The target operating system. Defaults to 'LOADING'.
 * @param options.platform - The target platform/architecture (e.g., 'x64', 'arm64'). Defaults to 'x64'.
 * @param options.kind - The type of download artifact. Can be 'installer', 'binary', 'source', or 'shasum'. Defaults to 'installer'.
 * @returns The fully qualified URL to the requested Node.js artifact.
 *
 * @example
 * getNodeDownloadUrl({ version: 'v20.12.2', os: 'MAC', platform: 'arm64', kind: 'binary' });
 * // => 'https://nodejs.org/dist/v20.12.2/node-v20.12.2-darwin-arm64.tar.gz'
 */
export const getNodeDownloadUrl = ({
  version,
  os = 'LOADING',
  platform = 'x64',
  kind = 'installer',
}: DownloadOptions) => {
  const baseURL = `${DIST_URL}${version}`;

  if (kind === 'source') {
    return `${baseURL}/node-${version}.tar.gz`;
  }

  if (kind === 'shasum') {
    return `${baseURL}/SHASUMS256.txt.asc`;
  }

  switch (os) {
    case 'MAC':
      // Prepares a downloadable Node.js installer link for the x64, ARM64 platforms
      if (kind === 'installer') {
        return `${baseURL}/node-${version}.pkg`;
      }

      // Prepares a downloadable Node.js link for the ARM64 platform
      if (typeof platform === 'string') {
        return `${baseURL}/node-${version}-darwin-${platform}.tar.gz`;
      }

      // Prepares a downloadable Node.js link for the x64 platform.
      // Since the x86 platform is not officially supported, returns the x64
      // link as the default value.
      return `${baseURL}/node-${version}-darwin-x64.tar.gz`;
    case 'WIN': {
      if (kind === 'installer') {
        // Prepares a downloadable Node.js installer link for the ARM platforms
        if (typeof platform === 'string') {
          return `${baseURL}/node-${version}-${platform}.msi`;
        }

        // Prepares a downloadable Node.js installer link for the x64 and x86 platforms
        return `${baseURL}/node-${version}-x${platform}.msi`;
      }

      // Prepares a downloadable Node.js link for the ARM64 platform
      if (typeof platform === 'string') {
        return `${baseURL}/node-${version}-win-${platform}.zip`;
      }

      // Prepares a downloadable Node.js link for the x64 and x86 platforms
      return `${baseURL}/node-${version}-win-x${platform}.zip`;
    }
    case 'LINUX':
      // Prepares a downloadable Node.js link for the ARM platforms such as
      // ARMv7 and ARMv8
      if (typeof platform === 'string') {
        return `${baseURL}/node-${version}-linux-${platform}.tar.xz`;
      }

      // Prepares a downloadable Node.js link for the x64 platform.
      // Since the x86 platform is not officially supported, returns the x64
      // link as the default value.
      return `${baseURL}/node-${version}-linux-x64.tar.xz`;
    case 'AIX':
      // Prepares a downloadable Node.js link for AIX
      if (typeof platform === 'string') {
        return `${baseURL}/node-${version}-aix-${platform}.tar.gz`;
      }

      return `${baseURL}/node-${version}-aix-ppc64.tar.gz`;
    default:
      // Prepares a downloadable Node.js source code link
      return `${baseURL}/node-${version}.tar.gz`;
  }
};
