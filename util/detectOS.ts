// From https://github.com/nodejs/nodejs.dev/blob/main/src/util/detectOS.ts
// eslint-disable-next-line no-shadow
export enum UserOS {
  MAC = 'MAC',
  WIN = 'WIN',
  UNIX = 'UNIX',
  LINUX = 'LINUX',
  MOBILE = 'MOBILE',
  UNKNOWN = 'UNKNOWN',
}

export function detectOS(): UserOS {
  return (
    // Since `navigator.appVersion` is deprecated, we first try to use the `userAgent``
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appVersion
    detectOsInString(navigator.userAgent) ||
    detectOsInString(navigator.appVersion) ||
    UserOS.UNKNOWN
  );
}

function detectOsInString(userAgent: string): UserOS {
  const osMatch = userAgent.match(/(Win|Mac|Linux|X11|Mobi)/i);
  const os = (osMatch && osMatch[1]) || '';
  switch (os) {
    case 'Win':
      return UserOS.WIN;
    case 'Mac':
      return UserOS.MAC;
    case 'Linux':
      return UserOS.LINUX;
    case 'X11':
      return UserOS.UNIX;
    case 'Mobi':
      return UserOS.MOBILE;
    default:
      return UserOS.UNKNOWN;
  }
}
