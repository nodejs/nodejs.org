'use client';

import { useEffect, useState } from 'react';

import type { UserOS } from '@/types/userOS';
import { detectOS } from '@/util/detectOS';
import { getBitness } from '@/util/getBitness';

type UserOSState = {
  os: UserOS;
  bitness: number;
};

const useDetectOS = () => {
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

export default useDetectOS;
