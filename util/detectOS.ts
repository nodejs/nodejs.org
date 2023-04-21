// From https://github.com/nodejs/nodejs.dev/blob/main/src/util/detectOS.ts
// eslint-disable-next-line no-shadow
export enum UserOS {
  MAC = 'MAC',
  WIN = 'WIN',
  LINUX = 'LINUX',
  UNKNOWN = 'UNKNOWN',
}

export function detectOS(): UserOS {
  return (
    // Since `navigator.appVersion` is deprecated, we use the `userAgent``
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appVersion
    detectOsInUserAgent(navigator.userAgent) || UserOS.UNKNOWN
  );
}

export function detectOsInUserAgent(userAgent: string): UserOS {
  const osMatch = userAgent.match(/(Win|Mac|Linux)/);
  const os = (osMatch && osMatch[1]) || '';
  switch (os) {
    case 'Win':
      return UserOS.WIN;
    case 'Mac':
      return UserOS.MAC;
    case 'Linux':
      return UserOS.LINUX;
    default:
      return UserOS.UNKNOWN;
  }
}
