// Copied from https://github.com/nodejs/nodejs.dev/blob/main/src/hooks/useDetectOs.ts
import { useEffect, useState } from 'react';
import { UserOS, detectOS } from '../util/detectOS';
import { downloadUrlByOS } from '../util/downloadUrlByOS';

export const useDetectOs = () => {
  const [userOS, setUserOS] = useState<UserOS>(UserOS.UNKNOWN);
  const [bitness, setBitness] = useState('');

  useEffect(() => {
    setUserOS(detectOS);

    // This is necessary to detect Windows 11 on Edge.
    // [MDN](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues)
    // [MSFT](https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11)
    // @ts-expect-error no types for "userAgentData" because this API is experimental
    if (typeof navigator.userAgentData?.getHighEntropyValues === 'function') {
      // @ts-expect-error no types for "userAgentData" because this API is experimental
      navigator.userAgentData
        .getHighEntropyValues(['bitness'])
        .then((ua: { bitness: string }) => setBitness(ua.bitness))
        .catch();
    }
  }, []);

  return {
    userOS,
    getDownloadLink: (version: string) =>
      downloadUrlByOS(userOS, version, bitness),
  };
};
