import { useEffect, useState } from 'react';
import { detectOS } from '../util/detectOS';
import { getBitness } from '../util/getBitness';
import type { UserOS } from '../types/userOS';

export const useDetectOS = () => {
  const [userOSData, setUserOSData] = useState<{
    os: UserOS;
    bitness?: number;
  }>({ os: 'OTHER' });

  useEffect(() => {
    const os = detectOS();

    if (os === 'WIN') {
      getBitness().then(bitness => {
        const userAgent = navigator?.userAgent;

        setUserOSData({
          os: os,
          bitness:
            bitness === '64' ||
            userAgent?.includes('WOW64') ||
            userAgent?.includes('Win64')
              ? 64
              : 86,
        });
      });
    } else {
      setUserOSData({ os: os });
    }
  }, []);

  return userOSData;
};
