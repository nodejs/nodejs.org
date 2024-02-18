'use client';

import type { FC } from 'react';
import { useEffect } from 'react';
import semVer from 'semver';

import Select from '@/components/Common/Select';
import { useDetectOS } from '@/hooks/react-client';
import { useReleaseContext } from '@/providers/releaseProvider';
import type { UserOS } from '@/types/userOS';

const installerBitnessMap = (os: UserOS, hasWindowsArm64: boolean) => {
  const bitnessMap = {
    WIN: [
      {
        label: '32-bit',
        value: '86',
      },
      {
        label: '64-bit',
        value: '64',
      },
      {
        label: 'ARM64',
        value: 'arm64',
        disabled: !hasWindowsArm64,
      },
    ],
    MAC: [
      {
        label: '64-bit / ARM64',
        value: '64',
      },
    ],
    LINUX: [],
    OTHER: [],
  };

  return bitnessMap[os];
};

const BitnessDropdown: FC = () => {
  const { bitness: userBitness } = useDetectOS();
  const {
    state: { bitness, os, release },
    dispatch: { setBitness },
  } = useReleaseContext();

  const hasWindowsArm64 = semVer.satisfies(release.version, '>= 19.9.0');

  useEffect(() => {
    setBitness(String(userBitness));
  }, [setBitness, userBitness]);

  return (
    <Select
      values={[
        {
          items: installerBitnessMap(os, hasWindowsArm64),
        },
      ]}
      defaultValue={String(bitness)}
      onChange={setBitness}
      inline
      className="min-w-20"
    />
  );
};

export default BitnessDropdown;
