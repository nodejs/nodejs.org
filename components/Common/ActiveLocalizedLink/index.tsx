'use client';

import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import Link from '@/components/Link';
import { usePathname } from '@/navigation.mjs';

type ActiveLocalizedLinkProps = ComponentProps<typeof Link> & {
  activeClassName: string;
};

const ActiveLocalizedLink: FC<ActiveLocalizedLinkProps> = ({
  children,
  activeClassName,
  className,
  href = '',
  ...props
}) => {
  const pathname = usePathname();

  const linkURL = new URL(href.toString(), location.href);

  const finalClassName = classNames(className, {
    [activeClassName]: linkURL.pathname === pathname,
  });

  return (
    <Link className={finalClassName} href={href} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLocalizedLink;
