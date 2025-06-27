/// <reference types="user-agent-data-types" />

import type {
  OperatingSystem,
  Architecture,
  Bitness,
  Platform,
} from '#site/types';

// Constants for better maintainability
const OS_PATTERNS = /(Win|Mac|Linux|AIX)/;
const EMPTY_UA_DATA: UADataValues = {};

/**
 * Detects operating system from user agent string
 * @param userAgent - The user agent string to parse
 * @returns The detected OS or 'OTHER' if not recognized
 */
export const detectOsInUserAgent = (
  userAgent: string | undefined
): OperatingSystem => {
  const osMatch = userAgent?.match(OS_PATTERNS);
  return osMatch ? (osMatch[1].toUpperCase() as OperatingSystem) : 'OTHER';
};

/**
 * Detects operating system using navigator.userAgent
 * Note: navigator.appVersion is deprecated, so we use userAgent instead
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appVersion
 */
export const detectOS = (): OperatingSystem =>
  detectOsInUserAgent(navigator?.userAgent);

/**
 * Determines user platform based on architecture and bitness
 * Used for automatic platform detection with `useDetectOS`
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues
 */
export const getUserPlatform = (
  userArchitecture: Architecture | '',
  userBitness: Bitness | ''
): Platform => {
  if (userArchitecture === 'arm' && userBitness === '64') {
    return 'arm64';
  }

  return userBitness === '64' ? 'x64' : 'x86';
};

/**
 * Retrieves high entropy values from User-Agent Client Hints API
 * This method is used to get detailed user platform information including architecture and bitness
 * Necessary for detecting Windows 11 on Edge and other platform-specific features
 *
 * @param hints - Array of hint keys to retrieve
 * @returns Promise resolving to an object with requested hint values
 *
 * @see https://wicg.github.io/ua-client-hints/#http-ua-hints
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues
 * @see https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11
 */
export const getHighEntropyValues = async <T extends Array<keyof UADataValues>>(
  hints: T
): Promise<{ [K in T[number]]: UADataValues[K] }> => {
  let result: UADataValues = EMPTY_UA_DATA;

  // Check if the User-Agent Client Hints API is available
  if (typeof navigator?.userAgentData?.getHighEntropyValues === 'function') {
    try {
      const entropyValues = navigator.userAgentData.getHighEntropyValues(hints);
      // Handle both Promise and non-Promise return values
      result = await Promise.resolve(entropyValues);
    } catch {
      // Fallback to empty object if the API call fails
      result = EMPTY_UA_DATA;
    }
  }

  // Map hints to their values, filtering out empty strings
  const mappedResult = hints.map(hint => [
    hint,
    hint in result && result[hint] ? result[hint] : undefined,
  ]);

  return Object.fromEntries(mappedResult) as {
    [K in T[number]]: UADataValues[K];
  };
};
