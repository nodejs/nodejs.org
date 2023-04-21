// Copied From https://github.com/nodejs/nodejs.dev/blob/main/src/util/downloadUrlByOS.ts
import { UserOS } from './detectOS';

export default function downloadUrlByOS(
  userOS: UserOS,
  version: string,
  bitness?: string
): string {
  const baseURL = `https://nodejs.org/dist/${version}`;

  if (userOS === UserOS.MOBILE) {
    return baseURL;
  }

  if (userOS === UserOS.MAC) {
    return `${baseURL}/node-${version}.pkg`;
  }

  if (userOS === UserOS.WIN) {
    if (
      bitness === '64' ||
      navigator.appVersion.includes('WOW64') ||
      navigator.appVersion.includes('Win64')
    ) {
      return `${baseURL}/node-${version}-x64.msi`;
    }

    return `${baseURL}/node-${version}-x86.msi`;
  }

  return `${baseURL}/node-${version}.tar.gz`;
}
