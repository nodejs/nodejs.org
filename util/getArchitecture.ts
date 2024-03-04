/// <reference types="user-agent-data-types" />

export const getArchitecture = async () => {
  // This is necessary to detect Windows 11 on Edge.
  // [MDN](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues)
  // [MSFT](https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11)
  if (typeof navigator?.userAgentData?.getHighEntropyValues === 'function') {
    const entropyValues = navigator.userAgentData.getHighEntropyValues([
      'architecture',
    ]);

    // Apparently in some cases this is not a Promise, we can Promisify it.
    return Promise.resolve(entropyValues)
      .then(({ architecture }) => architecture)
      .catch(() => undefined);
  }

  return undefined;
};
