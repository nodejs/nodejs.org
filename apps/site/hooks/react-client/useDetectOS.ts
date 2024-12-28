'use client';

import { useEffect, useState } from 'react';

import type { UserArchitecture, UserBitness, UserOS } from '@/types/userOS';
import { detectOS } from '@/util/detectOS';
import { getHighEntropyValues } from '@/util/getHighEntropyValues';

type UserOSState = {
  os: UserOS | 'LOADING';
  bitness: UserBitness | '';
  architecture: UserArchitecture | '';
};

const useDetectOS = () => {
  const [userOSState, setUserOSState] = useState<UserOSState>({
    os: 'LOADING',
    bitness: '',
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

    // We attempt to get the high entropy values from the Browser and set the User OS State
    // based from the values we get from the Browser, if it fails we fallback to the User Agent
    // to determine the bitness and architecture of the User OS.
    getHighEntropyValues(['bitness', 'architecture']).then(
      ({
        // If there is no getHighEntropyValues API on the Browser or it failed to resolve
        // we attempt to fallback to what the User Agent indicates
        bitness = uaIndicates64 ? '64' : '32',
        architecture = 'x86',
      }) => {
        setUserOSState(current => ({
          ...current,
          bitness: bitness as UserBitness,
          architecture: architecture as UserArchitecture,
        }));
      }
    );
  }, []);

  return userOSState;
};

export default useDetectOS;
