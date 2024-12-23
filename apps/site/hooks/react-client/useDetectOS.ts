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
    bitness: 64,
    architecture: '',
  });

  useEffect(() => {
    // If the navigator User Agent indicates a 64-bit OS, we can assume the bitness is 64.
    const uaIndicates64 = /WOW64|Win64|x86_64|x86-64|x64_64|x64;|AMD64/.test(
      navigator.userAgent
    );

    // We immediately set the OS to LOADING, and then we update it with the detected OS.
    // This is due to that initial render set within the state will indicate a mismatch from
    // the server-side rendering versus what the initial state is from the client-side
    setUserOSState(current => ({ ...current, os: detectOS() }));

    // We then update the bitness based on the detected OS and the user agent
    getBitness().then((bitness = '64') =>
      setUserOSState(current => ({
        ...current,
        bitness: bitness === '64' || uaIndicates64 ? 64 : 86,
      }))
    );

    // We then update the architecture based on the detected OS
    getArchitecture().then((architecture = '') =>
      setUserOSState(current => ({ ...current, architecture }))
    );
  }, []);

  return userOSState;
};

export default useDetectOS;
