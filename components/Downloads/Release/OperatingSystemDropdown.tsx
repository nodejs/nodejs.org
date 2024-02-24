'use client';

import { useContext, useEffect } from 'react';
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
  const { os, setOS } = useContext(ReleaseContext);

  // we shouldn't react when "actions" change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setOS(userOS), [userOS]);

  useEffect(() => {
    const currentOSExcluded = exclude.includes(os);

    const nonExcludedOS = operatingSystemItems
      .map(os => os.value)
      .find(os => !exclude.includes(os));

    if (currentOSExcluded && nonExcludedOS) {
      setOS(nonExcludedOS);
    }
    // we shouldn't react when "actions" change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [os]);

  return (
    <Select
      values={formatDropdownItems({
        items: operatingSystemItems,
        disabledItems: exclude,
        icons: {
          WIN: <Microsoft width={16} height={16} />,
          MAC: <Apple width={16} height={16} />,
          LINUX: <Linux width={16} height={16} />,
        },
      })}
      defaultValue={os}
      onChange={value => setOS(value as UserOS)}
      inline={true}
      className="min-w-28"
    />
  );
};

export default OperatingSystemDropdown;
