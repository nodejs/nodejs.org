'use client';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { useEffect, useContext, useMemo } from 'react';
import semVer from 'semver';

import Select from '@/components/Common/Select';
import { useDetectOS } from '@/hooks/react-client';
import { ReleaseContext } from '@/providers/releaseProvider';
import { bitnessItems, formatDropdownItems } from '@/util/downloadUtils';
import { getUserBitnessByArchitecture } from '@/util/getUserBitnessByArchitecture';

const parseNumericBitness = (bitness: string) =>
  /^\d+$/.test(bitness) ? Number(bitness) : bitness;

const BitnessDropdown: FC = () => {
  const { bitness: userBitness, architecture: userArchitecture } =
    useDetectOS();
  const { bitness, os, release, setBitness } = useContext(ReleaseContext);
  const t = useTranslations();

  // we also reset the bitness when the OS changes, because different OSs have
  // different bitnesses available

  useEffect(() => {
    setBitness(getUserBitnessByArchitecture(userArchitecture, userBitness));
    // we shouldn't update the effect on setter state change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userArchitecture, userBitness]);

  // @TODO: We should have a proper utility that gives
  // disabled OSs, Platforms, based on specific criteria
  // this can be an optimisation for the future
  // to remove this logic from this component
  const disabledItems = useMemo(() => {
    const disabledItems = [];

    if (os === 'WIN' && semVer.satisfies(release.version, '< 19.9.0')) {
      disabledItems.push('arm64');
    }

    if (os === 'LINUX' && semVer.satisfies(release.version, '< 4.0.0')) {
      disabledItems.push('arm64', 'armv7l');
    }

    if (os === 'LINUX' && semVer.satisfies(release.version, '< 4.4.0')) {
      disabledItems.push('ppc64le');
    }

    if (os === 'LINUX' && semVer.satisfies(release.version, '< 6.6.0')) {
      disabledItems.push('s390x');
    }

    if (os === 'AIX' && semVer.satisfies(release.version, '< 6.7.0')) {
      disabledItems.push('ppc64');
    }

    return disabledItems;
  }, [os, release.version]);

  // @TODO: We should have a proper utility that gives
  // disabled OSs, Platforms, based on specific criteria
  // this can be an optimisation for the future
  // to remove this logic from this component
  useEffect(() => {
    const mappedBitnessValues = bitnessItems[os].map(({ value }) => value);

    const currentBitnessExcluded =
      // Different OSs support different Bitnessess, hence we should also check
      // if besides the current bitness not being supported for a given release version
      // we also should check if it is not supported by the OS
      disabledItems.includes(String(bitness)) ||
      !mappedBitnessValues.includes(String(bitness));

    const nonExcludedBitness = mappedBitnessValues.find(
      bitness => !disabledItems.includes(bitness)
    );

    if (currentBitnessExcluded && nonExcludedBitness) {
      // We set it as a Number for cases where it is 64 or 86 otherwise we are
      // setting it as a string (ARMv7, ARMv6, etc.)
      const numericBitness = Number(nonExcludedBitness);

      setBitness(
        numericBitness.toString() === nonExcludedBitness
          ? numericBitness
          : nonExcludedBitness
      );
    }
    // we shouldn't react when "actions" change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [os, disabledItems]);

  return (
    <Select
      values={formatDropdownItems({
        items: bitnessItems[os],
        disabledItems,
      })}
      ariaLabel={t('layouts.download.dropdown.bitness')}
      defaultValue={String(bitness)}
      onChange={bitness => setBitness(parseNumericBitness(bitness))}
      className="w-28"
      inline={true}
    />
  );
};

export default BitnessDropdown;
