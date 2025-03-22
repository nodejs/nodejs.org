import Link from 'next/link';
import { cloneElement, type ComponentProps, type FC } from 'react';

import Skeleton from '@/components/Common/Skeleton';
import type { Supporter } from '@/types';

import style from './index.module.css';

type SupporterIconProps = Supporter & ComponentProps<typeof Skeleton>;

const SupporterIcon: FC<SupporterIconProps> = ({
  name,
  href,
  icon,
  loading = false,
}) => (
  <Skeleton loading={loading}>
    <Link href={href} aria-label={name}>
      {cloneElement(icon, { className: style.supporterIcon })}
    </Link>
  </Skeleton>
);

export default SupporterIcon;
