'use client';

import type { FC } from 'react';
import { useEffect, useContext } from 'react';
import semVer from 'semver';

import Select from '@/components/Common/Select';
import { useDetectOS } from '@/hooks/react-client';
import { ReleaseContext } from '@/providers/releaseProvider';
import { bitnessItems, formatDropdownItems } from '@/util/downloadUtils';

const BitnessDropdown: FC = () => {
  const { bitness: userBitness } = useDetectOS();
  const { bitness, os, release, setBitness } = useContext(ReleaseContext);
  const hasWindowsArm64 = semVer.satisfies(release.version, '>= 19.9.0');

  useEffect(() => setBitness(String(userBitness)), [setBitness, userBitness]);

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
