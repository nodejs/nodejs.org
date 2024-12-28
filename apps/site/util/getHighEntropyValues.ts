/// <reference types="user-agent-data-types" />

// This method is used to retrieve a User's platform based on their architecture and bitness.
// @see https://wicg.github.io/ua-client-hints/#http-ua-hints
export const getHighEntropyValues = async <T extends Array<keyof UADataValues>>(
  hints: T
) => {
  let result: UADataValues = {};

  // This is necessary to detect Windows 11 on Edge.
  // [MDN](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues)
  // [MSFT](https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11)
  if (typeof navigator?.userAgentData?.getHighEntropyValues === 'function') {
    const entropyValues = navigator.userAgentData.getHighEntropyValues(hints);

    // Apparently in some cases this is not a Promise, we can Promisify it.
    result = await Promise.resolve(entropyValues).catch(
      // Fallback to an empty object if the Promise fails.
      () => ({}) as UADataValues
    );
  }

  const mappedResult = hints.map(hint => [
    hint,
    // Since the values could come as empty string in some situations
    // we should check if the hint is present in the result and if it's not an empty string.
    hint in result && result[hint] ? result[hint] : undefined,
  ]);

  return Object.fromEntries(mappedResult) as {
    [K in T[number]]: UADataValues[K];
  };
};
