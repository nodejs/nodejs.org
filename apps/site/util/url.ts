import { satisfies } from 'semver';

import { DOCS_URL, DIST_URL } from '#site/next.constants.mjs';
import type { OperatingSystem, Platform, DownloadKind } from '#site/types';

export const getNodeApiUrl = (version: string) => {
  if (satisfies(version, '>=0.3.1 <0.5.1')) {
    return `${DOCS_URL}${version}/api/`;
  }

  if (satisfies(version, '>=0.1.14 <0.3.1')) {
    return `${DOCS_URL}${version}/api.html`;
  }

  return satisfies(version, '>=1.0.0 <4.0.0')
    ? `https://iojs.org/dist/${version}/docs/api/`
    : `${DIST_URL}${version}/docs/api/`;
};

type DownloadOptions = {
  /** The Node.js version string, must include the 'v' prefix (e.g., 'v20.12.2'). */
  versionWithPrefix: string;
  /** The target operating system. Defaults to 'LOADING'. */
  os?: OperatingSystem | 'LOADING';
  /** The target platform/architecture (e.g., 'x64', 'arm64'). Defaults to 'x64'. */
  platform?: Platform;
  /** The type of download artifact. Can be 'installer', 'binary', 'source', or 'shasum'. Defaults to 'installer'. */
  kind?: DownloadKind;
};

/**
 * Generates a Node.js download URL for the given options
 */
export const getNodeDownloadUrl = ({
  versionWithPrefix,
  os = 'LOADING',
  platform = 'x64',
  kind = 'installer',
}: DownloadOptions) => {
  const baseURL = `${DIST_URL}${versionWithPrefix}`;

  if (kind === 'source') {
    return `${baseURL}/node-${versionWithPrefix}.tar.gz`;
  }

  if (kind === 'shasum') {
    return `${baseURL}/SHASUMS256.txt.asc`;
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
