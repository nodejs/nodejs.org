'use client';

import type { FC } from 'react';
import { useEffect } from 'react';
import semVer from 'semver';

import Select from '@/components/Common/Select';
import { useDetectOS } from '@/hooks/react-client';
import { useReleaseContext } from '@/providers/releaseProvider';
import { installerBitnessMap } from '@/util/downloadUtils';

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
