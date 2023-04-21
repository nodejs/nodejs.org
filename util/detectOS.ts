import { UserOS } from '../types/userOS';

export const detectOS = (): UserOS => {
  return (
    // Since `navigator.appVersion` is deprecated, we use the `userAgent``
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appVersion
    detectOsInUserAgent(navigator.userAgent) || 'UNKNOWN'
  );
};

export const detectOsInUserAgent = (userAgent: string): UserOS => {
  const osMatch = userAgent.match(/(Win|Mac|Linux)/);
  const os = (osMatch && osMatch[1]) || '';
  switch (os) {
    case 'Win':
      return 'WIN';
    case 'Mac':
      return 'MAC';
    case 'Linux':
      return 'LINUX';
    default:
      return 'UNKNOWN';
  }
};
