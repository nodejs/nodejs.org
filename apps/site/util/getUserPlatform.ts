import type * as Types from '@/types/userOS';

// This method is used to retrieve a User's platform based on their architecture and bitness.
// Note: This is only used for automatic Platform detection for supported platforms by using `useDetectOS`
// @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues
export const getUserPlatform = (
  userArchitecture: Types.UserArchitecture | '',
  userBitness: Types.UserBitness | ''
): Types.UserPlatform => {
  if (userArchitecture === 'arm' && userBitness === '64') {
    return 'arm64';
  }

  return userBitness === '64' ? 'x64' : 'x86';
};
