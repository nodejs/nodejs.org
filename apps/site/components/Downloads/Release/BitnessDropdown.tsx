'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { useEffect, useContext, useMemo } from 'react';

import Select from '@/components/Common/Select';
import { useClientContext } from '@/hooks';
import { ReleaseContext } from '@/providers/releaseProvider';
import { ARCHITECTURES, nextItem, parseCompat } from '@/util/downloadUtils';
import { getUserBitnessByArchitecture } from '@/util/getUserBitnessByArchitecture';

const parseNumericBitness = (bitness: string) =>
  /^\d+$/.test(bitness) ? Number(bitness) : bitness;

const BitnessDropdown: FC = () => {
  const { architecture, bitness } = useClientContext();

  const release = useContext(ReleaseContext);
  const t = useTranslations();

  // Prevents the Bitness from being set during OS loading state
  // and always correctly parses the Bitness to a number when needed
  const setBitness = (bitness: string) => {
    if (release.os !== 'LOADING') {
      release.setBitness(parseNumericBitness(bitness));
    }
  };

  useEffect(
    () => setBitness(getUserBitnessByArchitecture(architecture, bitness)),
    // Only react on the change of the Client Context Architecture and Bitness
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [architecture, bitness]
  );

  // We parse the compatibility of the dropdown items
  const parsedArchitectures = useMemo(
    () => parseCompat(ARCHITECTURES[release.os], release),
    // We only want to react on the change of the OS, Bitness, and Version
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release.os, release.bitness, release.version]
  );

  // We set the Bitness to the next available Architecture when the current
  // one is not valid anymore due to OS or Version changes
  useEffect(
    () => setBitness(nextItem(String(release.bitness), parsedArchitectures)),
    // We only want to react on the change of the OS and Version
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [release.os, release.version, release.bitness]
  );

  return (
    <Select
      values={parsedArchitectures}
      loading={release.os === 'LOADING'}
      placeholder={t('layouts.download.dropdown.unknown')}
      ariaLabel={t('layouts.download.dropdown.bitness')}
      defaultValue={String(release.bitness)}
      onChange={bitness => setBitness(bitness)}
      className="min-w-20"
      inline={true}
    />
  );
};

export default BitnessDropdown;
