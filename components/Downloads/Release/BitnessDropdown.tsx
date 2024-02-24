'use client';

import type { FC } from 'react';
import { useEffect, useContext, useMemo } from 'react';
import semVer from 'semver';

import Select from '@/components/Common/Select';
import { useDetectOS } from '@/hooks/react-client';
import { ReleaseContext } from '@/providers/releaseProvider';
import { bitnessItems, formatDropdownItems } from '@/util/downloadUtils';

const parseNumericBitness = (bitness: string) =>
  /^\d+$/.test(bitness) ? Number(bitness) : bitness;

const BitnessDropdown: FC = () => {
  const { bitness: userBitness } = useDetectOS();
  const { bitness, os, release, setBitness } = useContext(ReleaseContext);

  // we also reset the bitness when the OS changes, because different OSs have
  // different bitnesses available
  useEffect(() => setBitness(userBitness), [setBitness, os, userBitness]);

  const disabledItems = useMemo(() => {
    const disabledItems = [];

    if (os === 'WIN' && semVer.satisfies(release.version, '< 19.9.0')) {
      disabledItems.push('arm64');
    }

    if (os === 'LINUX' && semVer.satisfies(release.version, '< 4.0.0')) {
      disabledItems.push('arm64', 'armv7l');
    }

    return disabledItems;
  }, [os, release.version]);

  return (
    <Select
      values={formatDropdownItems({
        items: bitnessItems[os],
        disabledItems,
      })}
      defaultValue={String(bitness)}
      onChange={bitness => setBitness(parseNumericBitness(bitness))}
      inline={true}
      className="min-w-20"
    />
  );
};

export default BitnessDropdown;
