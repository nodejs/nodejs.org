import { OS } from '@/next.constants.mjs';
import type { UserOS } from '@/types/userOS';

export const detectOsInUserAgent = (userAgent: string | undefined): UserOS => {
  const osMatch = userAgent?.match(/(Win|Mac|Linux|AIX)/);
  switch (osMatch && osMatch[1]) {
    case 'Win':
      return OS.WIN as UserOS;
    case 'Mac':
      return OS.MAC as UserOS;
    case 'Linux':
      return OS.LINUX as UserOS;
    case 'AIX':
      return OS.AIX as UserOS;
    default:
      return OS.OTHER as UserOS;
  }
};

// Since `navigator.appVersion` is deprecated, we use the `userAgent``
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appVersion
export const detectOS = (): UserOS => detectOsInUserAgent(navigator?.userAgent);
