import { DIST_URL } from '@/next.constants.mjs';
import type { UserOS } from '@/types/userOS';

export const downloadUrlByOS = (
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
      if (kind === 'installer') {
        return `${baseURL}/node-${versionWithPrefix}.pkg`;
      }

      if (typeof bitness === 'string') {
        return `${baseURL}/node-${versionWithPrefix}-darwin-${bitness}.tar.gz`;
      }

      return `${baseURL}/node-${versionWithPrefix}-darwin-x${bitness}.tar.gz`;
    case 'WIN': {
      if (kind === 'installer') {
        if (typeof bitness === 'string') {
          return `${baseURL}/node-${versionWithPrefix}-${bitness}.msi`;
        }

        return `${baseURL}/node-${versionWithPrefix}-x${bitness}.msi`;
      }

      if (typeof bitness === 'string') {
        return `${baseURL}/node-${versionWithPrefix}-win-${bitness}.zip`;
      }

      return `${baseURL}/node-${versionWithPrefix}-win-x${bitness}.zip`;
    }
    case 'LINUX':
      if (typeof bitness === 'string') {
        return `${baseURL}/node-${versionWithPrefix}-linux-${bitness}.tar.xz`;
      }

      return `${baseURL}/node-${versionWithPrefix}-linux-x${bitness}.tar.xz`;
    default:
      return `${baseURL}/node-${versionWithPrefix}.tar.gz`;
  }
};
