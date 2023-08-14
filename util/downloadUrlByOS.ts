import { DIST_URL } from '@/next.constants.mjs';
import type { UserOS } from '@/types/userOS';

export const downloadUrlByOS = (
  versionWithPrefix: string,
  os: UserOS,
  bitness: number
): string => {
  const baseURL = `${DIST_URL}${versionWithPrefix}`;

  switch (os) {
    case 'MAC':
      return `${baseURL}/node-${versionWithPrefix}.pkg`;
    case 'WIN':
      return `${baseURL}/node-${versionWithPrefix}-x${bitness}.msi`;
    case 'LINUX':
      return `${baseURL}/node-${versionWithPrefix}-linux-x64.tar.xz`;
    default:
      return `${baseURL}/node-${versionWithPrefix}.tar.xz`;
  }
};
