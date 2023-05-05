import type { UserOS } from '../types/userOS';

type DownloadUrlByOS = {
  userAgent?: string | undefined;
  userOS: UserOS;
  version: string;
  bitness?: string;
};

export const downloadUrlByOS = ({
  userAgent,
  userOS,
  version,
  bitness,
}: DownloadUrlByOS): string => {
  const baseURL = `https://nodejs.org/dist/${version}`;
  const is64Bit =
    bitness === '64' ||
    userAgent?.includes('WOW64') ||
    userAgent?.includes('Win64');

  switch (userOS) {
    case 'MAC':
      return `${baseURL}/node-${version}.pkg`;
    case 'WIN':
      return `${baseURL}/node-${version}-x${is64Bit ? 64 : 86}.msi`;
    default:
      return `${baseURL}/node-${version}.tar.gz`;
  }
};
