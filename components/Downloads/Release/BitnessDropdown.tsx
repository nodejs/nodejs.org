'use client';

import type { FC } from 'react';
import { useEffect } from 'react';
import semVer from 'semver';

import Select from '@/components/Common/Select';
import { useDetectOS } from '@/hooks/react-client';
import { useReleaseContext } from '@/providers/releaseProvider';
import { bitnessItems, formatDropdownItems } from '@/util/downloadUtils';

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
      values={formatDropdownItems({
        items: bitnessItems[os],
        disabledItems: !hasWindowsArm64 && os === 'WIN' ? ['arm64'] : [],
      })}
      defaultValue={String(bitness)}
      onChange={setBitness}
      inline={true}
      className="min-w-20"
    />
  );
};

export default BitnessDropdown;
