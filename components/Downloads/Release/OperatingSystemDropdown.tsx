'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useMemo } from 'react';
import type { FC } from 'react';

import Select from '@/components/Common/Select';
import Apple from '@/components/Icons/Platform/Apple';
import Linux from '@/components/Icons/Platform/Linux';
import Microsoft from '@/components/Icons/Platform/Microsoft';
import { useDetectOS } from '@/hooks/react-client';
import { ReleaseContext } from '@/providers/releaseProvider';
import type { UserOS } from '@/types/userOS';
import {
  formatDropdownItems,
  operatingSystemItems,
} from '@/util/downloadUtils';

type OperatingSystemDropdownProps = { exclude: Array<UserOS> };

const OperatingSystemDropdown: FC<OperatingSystemDropdownProps> = ({
  exclude = [],
}) => {
  const { os: userOS } = useDetectOS();
  const { platform, os, setOS } = useContext(ReleaseContext);
  const t = useTranslations();

  // we shouldn't react when "actions" change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setOS(userOS), [userOS]);

  // @TODO: We should have a proper utility that gives
  // disabled OSs, Platforms, based on specific criteria
  // this can be an optimisation for the future
  // to remove this logic from this component
  const disabledItems = useMemo(() => {
    const disabledItems = exclude;

    if (platform === 'BREW') {
      disabledItems.push('WIN');
    }

    if (platform === 'DOCKER') {
      disabledItems.push('LINUX');
    }

    return disabledItems;
  }, [exclude, platform]);

  // @TODO: We should have a proper utility that gives
  // disabled OSs, Platforms, based on specific criteria
  // this can be an optimisation for the future
  // to remove this logic from this component
  useEffect(() => {
    const currentOSExcluded = disabledItems.includes(os);

    const nonExcludedOS = operatingSystemItems
      .map(({ value }) => value)
      .find(os => !disabledItems.includes(os));

    if (currentOSExcluded && nonExcludedOS) {
      setOS(nonExcludedOS);
    }
    // we shouldn't react when "actions" change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [os, disabledItems]);

  return (
    <Select
      label={t('layouts.download.dropdown.os')}
      values={formatDropdownItems({
        items: operatingSystemItems,
        disabledItems,
        icons: {
          WIN: <Microsoft width={16} height={16} />,
          MAC: <Apple width={16} height={16} />,
          LINUX: <Linux width={16} height={16} />,
        },
      })}
      defaultValue={os}
      onChange={value => setOS(value as UserOS)}
      className="w-[8.5rem]"
      inline={true}
    />
  );
};

export default OperatingSystemDropdown;
