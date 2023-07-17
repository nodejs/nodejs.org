import type { UserOS } from '@/types/userOS';

export const detectOsInUserAgent = (userAgent: string | undefined): UserOS => {
  const osMatch = userAgent?.match(/(Win|Mac|Linux)/);
  switch (osMatch && osMatch[1]) {
    case 'Win':
      return 'WIN';
    case 'Mac':
      return 'MAC';
    case 'Linux':
      return 'LINUX';
    default:
      return 'OTHER';
  }
};

// Since `navigator.appVersion` is deprecated, we use the `userAgent``
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appVersion
export const detectOS = (): UserOS => detectOsInUserAgent(navigator?.userAgent);
