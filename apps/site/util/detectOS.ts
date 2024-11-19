import type { UserOS } from '@/types/userOS';

export const detectOsInUserAgent = (userAgent: string | undefined): UserOS => {
  const osMatch = userAgent?.match(/(Win|Mac|Linux|AIX)/);
  const osMap: Record<string, UserOS> = {
    Win: 'WIN',
    Mac: 'MAC',
    Linux: 'LINUX',
    AIX: 'AIX',
  };
  return osMap[osMatch?.[1] ?? ''] || 'OTHER';
};

// Since navigator.appVersion is deprecated, we use the userAgent
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appVersion
export const detectOS = (): UserOS => detectOsInUserAgent(navigator?.userAgent);
