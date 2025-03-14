import classNames from 'classnames';
import { cloneElement, type FC } from 'react';

import Link from '@/components/Link';
import type { Supporter } from '@/types';

const SupporterLogoSizeByThreshold: Record<Supporter['threshold'], string> = {
  0.1: 'h-8 w-8',
  0.2: 'h-10 w-10',
  0.3: 'h-12 w-12',
  0.4: 'h-14 w-14',
  0.5: 'h-16 w-16',
  0.6: 'h-18 w-18',
  0.7: 'h-20 w-20',
  0.8: 'h-22 w-22',
  0.9: 'h-24 w-24',
  1: 'h-24 w-24',
};

const SupporterLogo: FC<Supporter> = ({ href, logo, name, threshold }) => (
  <Link href={href} aria-label={name}>
    {cloneElement(logo, {
      className: classNames('p-1', SupporterLogoSizeByThreshold[threshold]),
    })}
  </Link>
);

export default SupporterLogo;
