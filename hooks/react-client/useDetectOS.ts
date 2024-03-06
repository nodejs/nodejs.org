'use client';

import { useEffect, useState } from 'react';

import type { UserOS } from '@/types/userOS';
import { detectOS } from '@/util/detectOS';
import { getArchitecture } from '@/util/getArchitecture';
import { getBitness } from '@/util/getBitness';

type UserOSState = {
  os: UserOS;
  bitness: number;
  architecture: string;
};

const useDetectOS = () => {
  const [userOSState, setUserOSState] = useState<UserOSState>({
    os: 'OTHER',
    bitness: 86,
    architecture: 'ARM',
  });

  useEffect(() => {
    Promise.all([getBitness(), getArchitecture()]).then(
      ([bitness, architecture]) => {
        const userAgent: string | undefined =
          (typeof navigator === 'object' && navigator.userAgent) || '';
        const defaultBitness: number = 86; // Default bitness if unable to determine
        setUserOSState({
          os: detectOS(),
          bitness:
            bitness === '64' ||
            userAgent?.includes('WOW64') ||
            userAgent?.includes('Win64')
              ? 64
              : defaultBitness,
          architecture: architecture ? architecture : '',
        });
      }
    );
  }, []);

  return userOSState;
};

export default useDetectOS;
