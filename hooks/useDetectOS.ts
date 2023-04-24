import { useEffect, useState } from 'react';
import { detectOS } from '../util/detectOS';
import { downloadUrlByOS } from '../util/downloadUrlByOS';

import type { UserOS } from '../types/userOS';

export const useDetectOS = () => {
  const [userOS, setUserOS] = useState<UserOS>('OTHER');
  const [bitness, setBitness] = useState('');

  useEffect(() => {
    setUserOS(detectOS());

    // This is necessary to detect Windows 11 on Edge.
    // [MDN](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues)
    // [MSFT](https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11)
    // @ts-expect-error no types for "userAgentData" because this API is experimental
    if (typeof navigator?.userAgentData?.getHighEntropyValues === 'function') {
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
      downloadUrlByOS({
        userAgent: navigator?.userAgent,
        userOS,
        version,
        bitness,
      }),
  };
};
