'use client';

import Select from '@node-core/ui-components/Common/Select';
import AppleIcon from '@node-core/ui-components/Icons/Platform/Apple';
import AixIcon from '@node-core/ui-components/Icons/Platform/Generic';
import LinuxIcon from '@node-core/ui-components/Icons/Platform/Linux';
import MicrosoftIcon from '@node-core/ui-components/Icons/Platform/Microsoft';
import { useTranslations } from 'next-intl';
import { useContext, useEffect } from 'react';
import type { FC } from 'react';

import { useDetectOS } from '@/hooks/react-client';
import { ReleaseContext } from '@/providers/releaseProvider';
import type { UserOS } from '@/types/userOS';
import {
  formatDropdownItems,
  operatingSystemItems,
} from '@/util/downloadUtils';

type OperatingSystemDropdownProps = { exclude?: Array<UserOS> };

const OperatingSystemDropdown: FC<OperatingSystemDropdownProps> = ({
  exclude = [],
}) => {
  const { os: userOS } = useDetectOS();
  const { os, setOS } = useContext(ReleaseContext);
  const t = useTranslations();

  // we shouldn't react when "actions" change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setOS(userOS), [userOS]);

  // @TODO: We should have a proper utility that gives
  // disabled OSs, Platforms, based on specific criteria
  // this can be an optimisation for the future
  // to remove this logic from this component
  useEffect(() => {
    const currentOSExcluded = exclude.includes(os);

    const nonExcludedOS = operatingSystemItems
      .map(({ value }) => value)
      .find(os => !exclude.includes(os));

    if (currentOSExcluded && nonExcludedOS) {
      setOS(nonExcludedOS);
    }
    // we shouldn't react when "actions" change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [os, exclude]);

  return (
    <Select
      values={formatDropdownItems({
        items: operatingSystemItems,
        disabledItems: exclude,
        icons: {
          WIN: <MicrosoftIcon width={16} height={16} />,
          MAC: <AppleIcon width={16} height={16} />,
          LINUX: <LinuxIcon width={16} height={16} />,
          AIX: <AixIcon width={16} height={16} />,
        },
      })}
      ariaLabel={t('layouts.download.dropdown.os')}
      defaultValue={os}
      onChange={value => setOS(value as UserOS)}
      className="min-w-[8.5rem]"
      inline={true}
    />
  );
};

export default OperatingSystemDropdown;
