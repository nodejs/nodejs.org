'use client';

import type { FC } from 'react';
import { useEffect, useMemo } from 'react';

import Select from '@/components/Common/Select';
import Apple from '@/components/Icons/Platform/Apple';
import Linux from '@/components/Icons/Platform/Linux';
import Microsoft from '@/components/Icons/Platform/Microsoft';
import { useDetectOS } from '@/hooks/react-client';
import { useReleaseContext } from '@/providers/releaseProvider';
import type { UserOS } from '@/types/userOS';
import { OperatingSystem } from '@/util/downloadUtils';

type OperatingSystemDropdownProps = { exclude: Array<UserOS> };

const OperatingSystemDropdown: FC<OperatingSystemDropdownProps> = ({
  exclude = [],
}) => {
  const { os: userOS } = useDetectOS();
  const {
    state: { os },
    dispatch: { setOs },
  } = useReleaseContext();

  useEffect(() => {
    setOs(userOS);
  }, [setOs, userOS]);

  const items = useMemo(
    () =>
      [
        {
          label: OperatingSystem.WIN,
          value: 'WIN' as UserOS,
          iconImage: <Microsoft width={16} height={16} />,
        },
        {
          label: OperatingSystem.MAC,
          value: 'MAC' as UserOS,
          iconImage: <Apple width={16} height={16} />,
        },
        {
          label: OperatingSystem.LINUX,
          value: 'LINUX' as UserOS,
          iconImage: <Linux width={16} height={16} />,
        },
      ].map(item => {
        if (exclude.indexOf(item.value) >= 0) {
          return {
            ...item,
            disabled: true,
          };
        }

        return item;
      }),
    [exclude]
  );

  return (
    <Select
      values={[
        {
          items: items,
        },
      ]}
      defaultValue={os}
      onChange={(value: string) => setOs(value as UserOS)}
      inline
      className="min-w-28"
    />
  );
};

export default OperatingSystemDropdown;
