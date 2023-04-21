import type { UserOS } from '../types/userOS';

export const downloadUrlByOS = (
  userAgent: string,
  userOS: UserOS,
  version: string,
  bitness?: string
): string => {
  const baseURL = getBaseURL(version);
  switch (userOS) {
    case 'MAC':
      return getMacUrl(baseURL, version);
    case 'WIN':
      return getWinUrl(baseURL, version, userAgent, bitness);
    default:
      return getDefaultUrl(baseURL, version);
  }
};

const getBaseURL = (version: string): string =>
  `https://nodejs.org/dist/${version}`;

const getMacUrl = (baseURL: string, version: string): string => {
  return `${baseURL}/node-${version}.pkg`;
};

const getWinUrl = (
  baseURL: string,
  version: string,
  userAgent: string,
  bitness?: string
): string => {
  if (
    bitness === '64' ||
    userAgent.includes('WOW64') ||
    userAgent.includes('Win64')
  ) {
    return `${baseURL}/node-${version}-x64.msi`;
  }

  return `${baseURL}/node-${version}-x86.msi`;
};

const getDefaultUrl = (baseURL: string, version: string): string => {
  return `${baseURL}/node-${version}.tar.gz`;
};
