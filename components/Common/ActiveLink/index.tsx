'use client';

import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import Link from '@/components/Link';
import { usePathname } from '@/navigation.mjs';

type ActiveLocalizedLinkProps = ComponentProps<typeof Link> & {
  activeClassName?: string;
  allowSubPath?: boolean;
};

const ActiveLink: FC<ActiveLocalizedLinkProps> = ({
  children,
  activeClassName = 'active',
  allowSubPath = false,
  className,
  href = '',
  ...props
}) => {
  const pathname = usePathname();

  const finalClassName = classNames(className, {
    [activeClassName]: allowSubPath
      ? pathname.startsWith(href.toString())
      : href.toString() === pathname,
  });

  return (
    <Link className={finalClassName} href={href} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;
