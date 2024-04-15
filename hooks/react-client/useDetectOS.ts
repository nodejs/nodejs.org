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
    os: 'LOADING',
    bitness: 86,
    architecture: 'ARM',
  });

  useEffect(() => {
    Promise.all([getBitness(), getArchitecture()]).then(
      ([bitness, architecture]) => {
        const userAgent: string | undefined =
          (typeof navigator === 'object' && navigator.userAgent) || '';
        // Default bitness if unable to determine
        const defaultBitness: number = 86;
        // Regex to detect 64-bit architecture in user agent
        const bitnessRegex = /WOW64|Win64|x86_64|x86-64|x64_64|x64;|AMD64/;

        setUserOSState({
          os: detectOS(),
          bitness:
            bitness === '64' || bitnessRegex.test(userAgent)
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
