import type { UserOS } from '@/types/userOS';

export const detectOsInUserAgent = (userAgent: string | undefined): UserOS => {
  // Match OS names and convert to uppercase directly if there's a match
  const osMatch = userAgent?.match(/(Win|Mac|Linux|AIX)/);
  return osMatch ? (osMatch[1].toUpperCase() as UserOS) : 'OTHER';
};

// Since `navigator.appVersion` is deprecated, we use the `userAgent``
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appVersion
export const detectOS = (): UserOS => detectOsInUserAgent(navigator?.userAgent);
