/// <reference types="user-agent-data-types" />

export const getBitness = async () => {
  // This is necessary to detect Windows 11 on Edge.
  // [MDN](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues)
  // [MSFT](https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11)
  if (typeof navigator?.userAgentData?.getHighEntropyValues === 'function') {
    return navigator.userAgentData
      .getHighEntropyValues(['bitness'])
      .then(ua => ua.bitness);
  }

  return undefined;
};
