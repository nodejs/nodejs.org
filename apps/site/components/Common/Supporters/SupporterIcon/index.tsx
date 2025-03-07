import Link from 'next/link';
import { cloneElement, type ComponentProps, type FC } from 'react';

import Skeleton from '@/components/Common/Skeleton';
import type { Supporter } from '@/types';

type SupporterIconProps = Supporter & ComponentProps<typeof Skeleton>;

const SupporterIcon: FC<SupporterIconProps> = ({
  name,
  href,
  icon,
  loading = false,
}) => (
  <Skeleton loading={loading}>
    <Link href={href} aria-label={name}>
      {cloneElement(icon, {
        className: 'h-12 w-12 rounded-lg bg-neutral-100 p-1',
      })}
    </Link>
  </Skeleton>
);

export default SupporterIcon;
