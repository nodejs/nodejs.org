import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import type { ComponentProps, FC } from 'react';

import Link from '@/components/Link';

const LinkWithArrow: FC<ComponentProps<typeof Link>> = ({
  children,
  ...props
}) => (
  <Link {...props}>
    {children}
    <ArrowUpRightIcon className="ml-1 inline w-3 fill-white" />
  </Link>
);

export default LinkWithArrow;
