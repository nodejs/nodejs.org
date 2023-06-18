import { useEffect, useState } from 'react';
import { detectOS } from '../util/detectOS';
import { getBitness } from '../util/getBitness';
import type { UserOS } from '../types/userOS';

type UserOSState = {
  os: UserOS;
  bitness: number;
};

export const useDetectOS = () => {
  const [userOSState, setUserOSState] = useState<UserOSState>({
    os: 'OTHER',
    bitness: 86,
  });

  useEffect(() => {
    getBitness().then(bitness => {
      const userAgent = navigator?.userAgent;

      setUserOSState({
        os: detectOS(),
        bitness:
          bitness === '64' ||
          userAgent?.includes('WOW64') ||
          userAgent?.includes('Win64')
            ? 64
            : 86,
      });
    });
  }, []);

  return userOSState;
};
